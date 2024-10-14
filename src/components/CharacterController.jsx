import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CapsuleCollider, RigidBody, useRapier } from "@react-three/rapier";
import { useRef, useState, useCallback, useEffect } from "react";
import { MathUtils, Vector3 } from "three";
import Avatar from "@/components/Avatar";

const normalizeAngle = (angle) => {
  while (angle > Math.PI) angle -= 2 * Math.PI;
  while (angle < -Math.PI) angle += 2 * Math.PI;
  return angle;
};

const lerpAngle = (start, end, t) => {
  start = normalizeAngle(start);
  end = normalizeAngle(end);

  if (Math.abs(end - start) > Math.PI) {
    if (end > start) {
      start += 2 * Math.PI;
    } else {
      end += 2 * Math.PI;
    }
  }

  return normalizeAngle(start + (end - start) * t);
};

const CharacterController = () => {
  const rb = useRef();
  const container = useRef();
  const character = useRef();

  const { rapier, world } = useRapier();

  const [animation, setAnimation] = useState("idle");

  const characterRotationTarget = useRef(0);
  const rotationTarget = useRef(0);
  const cameraTarget = useRef();
  const cameraPosition = useRef();
  const cameraWorldPosition = useRef(new Vector3());
  const cameraLookAtWorldPosition = useRef(new Vector3());
  const cameraLookAt = useRef(new Vector3());
  const playerCapsuleColliderRef = useRef();

  const runSpeedMultiplier = 5;

  const [subscribeKeys, getKeys] = useKeyboardControls();

  const jumpHandler = useCallback(() => {
    const ray = world.castRay(
      new rapier.Ray(rb.current.translation(), { x: 0, y: -1, z: 0 }),
      1,
      true,
      undefined,
      undefined,
      // filter out player capsule collider
      playerCapsuleColliderRef.current
    );
    const grounded = ray && ray.collider;
    console.log(grounded);
    if (grounded) {
      rb.current.applyImpulse({ x: 0, y: 2, z: 0 });
    }
  }, [rb, rapier, world]);

  // JUMP
  useEffect(() => {
    return subscribeKeys(
      ({ jump }) => ({ jump }),
      ({ jump }) => {
        if (jump) jumpHandler();
      }
    );
  }, [subscribeKeys, jumpHandler]);

  // MOVMENT
  useFrame(() => {
    const { forward, backward, left, right, run } = getKeys();

    if (rb.current) {
      const vel = rb.current.linvel();

      const movement = {
        x: 0,
        z: 0,
      };

      if (forward) {
        movement.z = 1;
      }
      if (backward) {
        movement.z = -1;
      }

      if (left) {
        movement.x = 1;
      }
      if (right) {
        movement.x = -1;
      }

      let speed = 1;

      if (run) {
        speed = runSpeedMultiplier;
      }

      if (movement.x !== 0 || movement.z !== 0) {
        characterRotationTarget.current = Math.atan2(movement.x, movement.z);

        vel.x =
          speed *
          Math.sin(rotationTarget.current + characterRotationTarget.current);

        vel.z =
          speed *
          Math.cos(rotationTarget.current + characterRotationTarget.current);

        if (run) {
          setAnimation("run");
        } else {
          setAnimation("walking");
        }
      } else {
        setAnimation("idle");
      }

      character.current.rotation.y = lerpAngle(
        character.current.rotation.y,
        characterRotationTarget.current,
        0.1
      );

      rb.current.setLinvel(vel, true);
    }
  });

  // CAMERA
  useFrame(({ camera }) => {
    container.current.rotation.y = MathUtils.lerp(
      container.current.rotation.y,
      rotationTarget.current,
      0.1
    );

    cameraPosition.current.getWorldPosition(cameraWorldPosition.current);
    camera.position.lerp(cameraWorldPosition.current, 0.1);

    if (cameraTarget.current) {
      cameraTarget.current.getWorldPosition(cameraLookAtWorldPosition.current);
      cameraLookAt.current.lerp(cameraLookAtWorldPosition.current, 0.1);

      camera.lookAt(cameraLookAt.current);
    }
  });

  return (
    <RigidBody
      colliders={false}
      lockRotations
      ref={rb}
      mass={0.8}
      type="dynamic"
    >
      <group ref={container}>
        <group ref={cameraTarget} position-z={1.5} />
        <group ref={cameraPosition} position-y={4} position-z={-4} />
        <group ref={character}>
          <Avatar scale={1} position-y={-0.25} animation={animation} />
        </group>
      </group>
      <CapsuleCollider
        ref={playerCapsuleColliderRef}
        position={[0, 0.6, 0]}
        args={[0.8, 0.3, 5]}
      />
    </RigidBody>
  );
};

export default CharacterController;
