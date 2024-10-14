import React, { Suspense } from "react";
import { Physics } from "@react-three/rapier";

import Map from "@/components/Map";
import CharacterController from "@/components/CharacterController";
import { Environment, OrthographicCamera } from "@react-three/drei";
import { useRef } from "react";

const Experince = () => {
  const shadowCameraRef = useRef();

  return (
    <>
      <Environment preset="sunset" />
      <directionalLight
        intensity={0.65}
        castShadow
        position={[-15, 10, 15]}
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
      <Suspense fallback={null}>
        <Physics debug>
          <Map scale={20} position={[-15, -1, 10]} />
          <CharacterController />
        </Physics>
      </Suspense>
    </>
  );
};

export default Experince;
