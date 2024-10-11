"use client";

import { Canvas } from "@react-three/fiber";

import NavigationControls from "@/components/NavigationControls";
import Lights from "@/components/Lights";
import { Physics } from "@react-three/rapier";
import Ground from "@/components/Ground";
import { Suspense } from "react";
import { Avatar } from "@/components/Avatar";

const Scene = () => {
  return (
    <NavigationControls>
      <Canvas
        shadows
        camera={{
          position: [0, 5, 10],
        }}
      >
        <Lights />

        <Suspense fallback={null}>
          <Physics>
            <Avatar />
            <Ground scale-y={5} position-z={-45} />
          </Physics>
        </Suspense>
      </Canvas>
    </NavigationControls>
  );
};

export default Scene;
