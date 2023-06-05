/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.3 toy.gltf
Author: Kaine_G (https://sketchfab.com/Kaine_G)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/blahaj-ce981de49111488c81ea646067abe1ec
Title: Blahaj
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Toy1(props) {
  const { nodes, materials } = useGLTF('/models/blahaj/model.gltf')
  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <group position={[0.037, 0, 0.099]} rotation={[0, 0.71, 0]}>
          <mesh geometry={nodes.Low_poly_blahaj1_Shark_0.geometry} material={materials.Shark} />
          <mesh geometry={nodes.Low_poly_blahaj1_teef_0.geometry} material={materials.teef} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/blahaj/model.gltf')