import React, { Suspense, useRef } from "react";
import { Physics } from "@react-three/rapier";

import Map from "@/components/Map";
import CharacterController from "@/components/CharacterController";
import { Environment, OrthographicCamera } from "@react-three/drei";
import Ball from "@/components/Ball";

const Experience = () => {
  const shadowCameraRef = useRef();

  return (
    <>
      <Environment preset="sunset" />
      <directionalLight
        intensity={0.65}
        castShadow
        position={[18, 10, 8]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.00005}
      >
        <OrthographicCamera
          left={-22}
          right={15}
          top={10}
          bottom={-20}
          ref={shadowCameraRef}
          attach={"shadow-camera"}
        />
      </directionalLight>

      <ambientLight intensity={0.5} />

      <Suspense fallback={null}>
        <Physics>
          <Map scale={20} position={[-15, -1, 10]} />
          <CharacterController />

          <Ball position={[0, 1, 5]} />
        </Physics>
      </Suspense>
    </>
  );
};

export default Experience;
