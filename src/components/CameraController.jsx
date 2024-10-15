import React, { useRef, useState, useEffect } from "react";
import { OrthographicCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Vector3 } from "three";

const CameraController = () => {
  const { camera, gl } = useThree();
  const cameraRef = useRef();
  const [isManualMode, setIsManualMode] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cameraOffset, setCameraOffset] = useState(new Vector3(0, 5, 10));

  const handleMouseMove = (event) => {
    if (isManualMode) {
      const deltaX = (event.movementX / window.innerWidth) * 2;
      const deltaY = (event.movementY / window.innerHeight) * 2;

      const newPosition = camera.position
        .clone()
        .add(new Vector3(deltaX, -deltaY, 0));
      camera.position.copy(newPosition);

      const newRotation = camera.rotation
        .clone()
        .set(
          camera.rotation.x + deltaY * 0.01,
          camera.rotation.y - deltaX * 0.01,
          camera.rotation.z
        );
      camera.rotation.copy(newRotation);
    }
  };

  const handleMouseDown = (event) => {
    if (event.button === 2) {
      setIsManualMode(true);
      gl.domElement.style.cursor = "grab";
    }
  };

  const handleMouseUp = () => {
    setIsManualMode(false);
    gl.domElement.style.cursor = "default";
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isManualMode, camera]);

  return (
    <OrthographicCamera
      ref={cameraRef}
      makeDefault
      position={cameraOffset}
      zoom={2}
      near={0.1}
      far={1000}
      rotation={[Math.PI / 4, 0, 0]}
    />
  );
};

export default CameraController;
