import { useAnimations, useGLTF } from "@react-three/drei";
import React, { useEffect, useRef } from "react";

useGLTF.preload("/assets/models/avatar.glb");

const Character = ({ animation, ...props }) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/assets/models/avatar.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions[animation]?.reset().fadeIn(0.24).play();
    return () => actions?.[animation]?.fadeOut(0.24);
  }, [animation]);

  console.log(nodes);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene_avatar">
        <group name="avatar">
          <primitive object={nodes.Hips} />
          <skinnedMesh
            name="AvatarBody"
            geometry={nodes.AvatarBody.geometry}
            material={materials.Material}
            skeleton={nodes.AvatarBody.skeleton}
            castShadow
            receiveShadow
          />

          {/* <skinnedMesh
            name="AvatarEyelashes"
            geometry={nodes.AvatarEyelashes.geometry}
            material={materials.Material}
            skeleton={nodes.AvatarEyelashes.skeleton}
            castShadow
            receiveShadow
          />

          <skinnedMesh
            name="AvatarHead"
            geometry={nodes.AvatarHead.geometry}
            material={materials.Material}
            skeleton={nodes.AvatarHead.skeleton}
            castShadow
            receiveShadow
          />

          <skinnedMesh
            name="AvatarLeftCornea"
            geometry={nodes.AvatarLeftCornea.geometry}
            material={materials.Material}
            skeleton={nodes.AvatarLeftCornea.skeleton}
            castShadow
            receiveShadow
          />

          <skinnedMesh
            name="AvatarLeftEyeball"
            geometry={nodes.AvatarLeftEyeball.geometry}
            material={materials.Material}
            skeleton={nodes.AvatarLeftEyeball.skeleton}
            castShadow
            receiveShadow
          />

          <skinnedMesh
            name="AvatarRightCornea"
            geometry={nodes.AvatarRightCornea.geometry}
            material={materials.Material}
            skeleton={nodes.AvatarRightCornea.skeleton}
            castShadow
            receiveShadow
          />

          <skinnedMesh
            name="AvatarRightEyeball"
            geometry={nodes.AvatarRightEyeball.geometry}
            material={materials.Material}
            skeleton={nodes.AvatarRightEyeball.skeleton}
            castShadow
            receiveShadow
          />

          <skinnedMesh
            name="AvatarTeethLower"
            geometry={nodes.AvatarTeethLower.geometry}
            material={materials.Material}
            skeleton={nodes.AvatarTeethLower.skeleton}
            castShadow
            receiveShadow
          />

          <skinnedMesh
            name="AvatarTeethUpper"
            geometry={nodes.AvatarTeethUpper.geometry}
            material={materials.Material}
            skeleton={nodes.AvatarTeethUpper.skeleton}
            castShadow
            receiveShadow
          />

          <skinnedMesh
            name="outfit_bottom"
            geometry={nodes.outfit_bottom.geometry}
            material={materials.Material}
            skeleton={nodes.outfit_bottom.skeleton}
            castShadow
            receiveShadow
          />

          <skinnedMesh
            name="outfit_shoes"
            geometry={nodes.outfit_shoes.geometry}
            material={materials.Material}
            skeleton={nodes.outfit_shoes.skeleton}
            castShadow
            receiveShadow
          />

          <skinnedMesh
            name="outfit_top"
            geometry={nodes.outfit_top.geometry}
            material={materials.Material}
            skeleton={nodes.outfit_top.skeleton}
            castShadow
            receiveShadow
          /> */}
        </group>
      </group>
    </group>
  );
};

export default Character;
