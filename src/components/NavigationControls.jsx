import React from "react";

import { KeyboardControls } from "@react-three/drei";

const NavigationControls = ({ children }) => {
  const controls = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "left", keys: ["ArrowLeft", "KeyA"] },
    { name: "right", keys: ["ArrowRight", "KeyD"] },
    { name: "jump", keys: ["Space"] },
    { name: "reset", keys: ["r", "R"] },
  ];

  return <KeyboardControls map={controls}>{children}</KeyboardControls>;
};

export default NavigationControls;
