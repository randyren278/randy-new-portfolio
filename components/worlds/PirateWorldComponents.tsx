'use client';
import React, { Suspense, useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

const PIRATE_POSITION: [number, number, number] = [0, 0, 0];

interface PirateWorldComponentsProps {
  onPirateClick: () => void;
}

function PirateCharacter({ onPirateClick }: { onPirateClick: () => void }) {
  const { scene, animations } = useGLTF('/models/figurine-cube.glb');
  const pirateRef = useRef<THREE.Group>(null);
  const { actions } = useAnimations(animations, pirateRef);
  const [hovered, setHovered] = useState(false);
  const { gl } = useThree();

  useEffect(() => {
    if (pirateRef.current) {
      console.log('Pirate structure:', pirateRef.current);
    }

    // Play Idle animation if it exists
    if (actions && actions['idle']) {
      actions['idle'].reset().fadeIn(0.5).play();
    } else {
      console.warn('Idle animation not found. Available animations:', Object.keys(actions));
    }
  }, [actions]);

  useEffect(() => {
    gl.domElement.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered, gl]);

  useFrame(() => {
    if (pirateRef.current) {
      const targetScale = hovered ? 1.15 : 1;
      pirateRef.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale }, 0.1);
    }
  });

  return (
    <group
      ref={pirateRef}
      scale={[1, 1, 1]}
      position={[PIRATE_POSITION[0], PIRATE_POSITION[1], PIRATE_POSITION[2]]}
      rotation={[0, -Math.PI / 4, 0]}
      onClick={(e) => { e.stopPropagation(); onPirateClick(); }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <primitive object={scene} receiveShadow castShadow />
    </group>
  );
}

export default function PirateWorldComponents({ onPirateClick }: PirateWorldComponentsProps) {
  return (
    <Suspense fallback={null}>
      <PirateCharacter onPirateClick={onPirateClick} />
    </Suspense>
  );
}