import React from "react";
import * as THREE from "three";

import { useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { RigidBody, useRapier } from "@react-three/rapier";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export const Avatar = (props) => {
  const model = useLoader(FBXLoader, "assets/models/model.fbx");

  const refAvatar = useRef();
  const { rapier, world } = useRapier();

  const cameraProperties = useMemo(
    () => ({
      position: new THREE.Vector3(0, 20, 20),
      target: new THREE.Vector3(),
    }),
    []
  );

  const [subscribeKeys, getKeys] = useKeyboardControls();

  // JUMP

  const jumpHandler = useCallback(() => {
    const rapierWorld = world.raw();

    const avatarPosition = refAvatar.current.translation();
    const groundDirection = { x: 0, y: -1, z: 0 };
    const ray = new rapier.Ray(avatarPosition, groundDirection);
    const hit = rapierWorld.castRay(ray);
    const isAvatarOnGround = hit?.toi < 1;

    if (isAvatarOnGround) {
      refAvatar.current.applyImpulse({ x: 0, y: 15, z: 0 });
    }
  }, [refAvatar, rapier, world]);

  // HANDLE KEYBOARD ACTIONS

  useEffect(() => {
    return subscribeKeys(
      ({ jump }) => ({ jump }),
      ({ jump }) => {
        if (jump) jumpHandler();
      }
    );
  }, [subscribeKeys, jumpHandler]);

  // FRAME AVATAR CONTROL

  useFrame((_, delta) => {
    const { forward, backward, left, right } = getKeys();

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 50 * delta;
    const torqueStrength = 1 * delta;

    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }
    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }
    if (left) {
      impulse.x -= impulseStrength;
      torque.z -= torqueStrength;
    }
    if (right) {
      impulse.x += impulseStrength;
      torque.z += torqueStrength;
    }

    refAvatar.current.applyImpulse(impulse);
    refAvatar.current.applyTorqueImpulse(torque);
  });

  useFrame(({ camera }, delta) => {
    const avatarPosition = refAvatar.current.translation();

    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(avatarPosition);
    cameraPosition.z += 6;
    cameraPosition.y += 3;

    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(avatarPosition);
    cameraTarget.y += 0.5;

    cameraProperties.position.lerp(cameraPosition, 5 * delta);
    cameraProperties.target.lerp(cameraTarget, 5 * delta);

    camera.position.copy(cameraProperties.position);
    camera.lookAt(cameraProperties.target);
  });

  return (
    <RigidBody
      ref={refAvatar}
      name="avatar"
      restitution={0.2}
      friction={10}
      linearDamping={1}
      angularDamping={1}
      {...props}
    >
      <primitive object={model} />
      {/* <mesh castShadow>
                <sphereGeometry />
                <meshStandardMaterial color="#FFDE91" />
            </mesh> */}
    </RigidBody>
  );
};
