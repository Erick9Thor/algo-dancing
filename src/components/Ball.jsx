import React, { useRef } from "react";
import { RigidBody } from "@react-three/rapier";
import { Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Ball = ({ position }) => {
  const ballRef = useRef();

  return (
    <RigidBody
      type="dynamic"
      ref={ballRef}
      position={position}
      colliders="ball"
    >
      <Sphere args={[1]} castShadow receiveShadow>
        <meshStandardMaterial color="red" />
      </Sphere>
    </RigidBody>
  );
};

export default Ball;
