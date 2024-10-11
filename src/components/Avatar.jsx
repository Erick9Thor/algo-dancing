import { useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

export const Avatar = () => {
  const model = useLoader(FBXLoader, "assets/models/model.fbx");

  return <primitive object={model} position={[0, 0, 0]} />;
};
