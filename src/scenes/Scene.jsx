"use client";

import { Canvas } from "@react-three/fiber";

import NavigationControls from "@/components/NavigationControls";
import Experience from "@/components/Experince";

const Scene = () => {
  return (
    <NavigationControls>
      <Canvas shadows camera={{ position: [3, 3, 3], near: 0.1, fov: 40 }}>
        <Experience />
      </Canvas>
    </NavigationControls>
  );
};

export default Scene;
