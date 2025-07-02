'use client';
import React, { Suspense, useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

const PIRATE_POSITION: [number, number, number] = [0, 0, 0];

interface PirateWorldComponentsProps {
  onPirateClick: () => void;
}

function Cannon() {
    const { scene } = useGLTF('/model_pirate/cannon-mobile.glb');
    return (
      <primitive 
        scale={[0.5, 0.5, 0.5]}
        object={scene.clone()} 
        position={[PIRATE_POSITION[0]+2.1, PIRATE_POSITION[1]+0.1, PIRATE_POSITION[2]+0.7]} 
        rotation={[0, 0, 0]}
        receiveShadow 
        castShadow 
      />
    );
    
  }

function Crate() {
    const { scene } = useGLTF('/model_pirate/crate-bottles.glb');
    return (
      <primitive 
        scale={[0.5, 0.5, 0.5]}
        object={scene.clone()} 
        position={[PIRATE_POSITION[0]+0.4, PIRATE_POSITION[1]+0.1, PIRATE_POSITION[2]-1.7]} 
        rotation={[0, 2, 0]}
        receiveShadow 
        castShadow 
      />
    );
    
  }

  function Flag() {
    const { scene } = useGLTF('/model_pirate/flag-pirate-pennant.glb');
    return (
      <primitive 
        scale={[0.5, 0.6, 0.6]}
        object={scene.clone()} 
        position={[PIRATE_POSITION[0]-1.2, PIRATE_POSITION[1]+0.1, PIRATE_POSITION[2]]} 
        rotation={[0,6, 0]}
        receiveShadow 
        castShadow 
      />
    );
  }

function Dock() {
    const { scene } = useGLTF('/model_pirate/structure-platform-dock.glb');
    return (
      <primitive 
        scale={[0.5, 0.5, 0.5]}
        object={scene.clone()} 
        position={[PIRATE_POSITION[0]+1, PIRATE_POSITION[1]-0.5, PIRATE_POSITION[2]+3.1]} 
        rotation={[0, Math.PI/2.1, 0]}
        receiveShadow 
        castShadow 
      />
    );
    
  }

  function Bison() {
    const { scene } = useGLTF('/models/animal-bison.glb');
    return (
      <primitive 
        scale={[0.7, 0.7, 0.7]}
        object={scene.clone()} 
        position={[PIRATE_POSITION[0]+0.6, PIRATE_POSITION[1]+0.1, PIRATE_POSITION[2]+1.8]} 
        rotation={[0, -Math.PI/10, 0]}
        receiveShadow 
        castShadow 
      />
    );
    
  }


function Sand() {
    const { scene } = useGLTF('/model_pirate/patch-sand.glb');
    return (
      <primitive 
        scale={[0.7, 2.7, 0.7]}
        object={scene.clone()} 
        position={[PIRATE_POSITION[0], PIRATE_POSITION[1]-0.5, PIRATE_POSITION[2]]} 
        rotation={[0, 0, 0]}
        receiveShadow 
        castShadow 
      />
    );
    
  }

function Sand1() {
    const { scene } = useGLTF('/model_pirate/patch-sand.glb');
    return (
      <primitive 
        scale={[0.7, 2.7, 0.7]}
        object={scene.clone()} 
        position={[PIRATE_POSITION[0]-0.1, PIRATE_POSITION[1]-0.5, PIRATE_POSITION[2]]} 
        rotation={[0, 5, 0]}
        receiveShadow 
        castShadow 
      />
    );
    
  }

function Sand2() {
    const { scene } = useGLTF('/model_pirate/patch-sand-foliage.glb');
    return (
      <primitive 
        scale={[0.5, 0.7, 0.5]}
        object={scene.clone()} 
        position={[PIRATE_POSITION[0]-0.1, PIRATE_POSITION[1]+0.0001, PIRATE_POSITION[2]]} 
        rotation={[0, 5, 0]}
        receiveShadow 
        castShadow 
      />
    );
    
  }

function Sand3() {
    const { scene } = useGLTF('/model_pirate/patch-sand.glb');
    return (
      <primitive 
        scale={[0.7, 2.7, 0.7]}
        object={scene.clone()} 
        position={[PIRATE_POSITION[0]+1.1, PIRATE_POSITION[1]-0.5, PIRATE_POSITION[2]]} 
        rotation={[0, 5, 0]}
        receiveShadow 
        castShadow 
      />
    );
    
  }

function Sand4() {
    const { scene } = useGLTF('/model_pirate/patch-sand-foliage.glb');
    return (
      <primitive 
        scale={[0.5, 0.7, 0.5]}
        object={scene.clone()} 
        position={[PIRATE_POSITION[0]+1.1, PIRATE_POSITION[1], PIRATE_POSITION[2]]} 
        rotation={[0, 5, 0]}
        receiveShadow 
        castShadow 
      />
    );
    
  }

  function Sand5() {
    const { scene } = useGLTF('/model_pirate/patch-sand.glb');
    return (
      <primitive 
        scale={[0.7, 2.7, 0.7]}
        object={scene.clone()} 
        position={[PIRATE_POSITION[0]-1.1, PIRATE_POSITION[1]-0.5, PIRATE_POSITION[2]-2]} 
        rotation={[0, 5, 0]}
        receiveShadow 
        castShadow 
      />
    );
    
  }

  function Rock() {
    const { scene } = useGLTF('/model_pirate/rocks-c.glb');
    return (
      <primitive 
        scale={[0.6, 0.6, 0.6]}
        object={scene.clone()} 
        position={[PIRATE_POSITION[0]-3.1, PIRATE_POSITION[1]-0.499, PIRATE_POSITION[2]-1.5]} 
        rotation={[0, Math.PI/3, 0]}
        receiveShadow 
        castShadow 
      />
    );    
  }

  function Rock2() {
    const { scene } = useGLTF('/model_pirate/rocks-sand-c.glb');
    return (
      <primitive 
        scale={[0.6, 0.6, 0.6]}
        object={scene.clone()} 
        position={[PIRATE_POSITION[0]-1.9, PIRATE_POSITION[1]-0.4, PIRATE_POSITION[2]-1.8]} 
        rotation={[0, Math.PI/1, 0]}
        receiveShadow 
        castShadow 
      />
    );    
  }

  function Rock3() {
    const { scene } = useGLTF('/model_pirate/rocks-a.glb');
    return (
      <primitive 
        scale={[0.6, 0.5, 0.6]}
        object={scene.clone()} 
        position={[PIRATE_POSITION[0]+3.1, PIRATE_POSITION[1]-0.499, PIRATE_POSITION[2]-0.4]} 
        rotation={[0, -Math.PI/3, 0]}
        receiveShadow 
        castShadow 
      />
    );    
  }

  function Pirateship() {
    const { scene } = useGLTF('/model_pirate/ship-pirate-small.glb');
    return (
      <primitive 
        scale={[0.4, 0.4, 0.4]}
        object={scene.clone()} 
        position={[PIRATE_POSITION[0]+3.2, PIRATE_POSITION[1]-0.499, PIRATE_POSITION[2]+3.2]} 
        rotation={[0, -Math.PI/3, 0]}
        receiveShadow 
        castShadow 
      />
    );    
  }


  function Rowboat() {
    const { scene } = useGLTF('/model_pirate/boat-row-small.glb');
    return (
      <primitive 
        scale={[0.6, 0.6, 0.6]}
        object={scene.clone()} 
        position={[PIRATE_POSITION[0]-3.5, PIRATE_POSITION[1]-0.6, PIRATE_POSITION[2]+0.2]} 
        rotation={[0, -Math.PI/2.3, 0]}
        receiveShadow 
        castShadow 
      />
    );    
  }

  function Chest() {
    const { scene } = useGLTF('/model_pirate/chest.glb');
    return (
      <primitive 
        scale={[0.4, 0.4, 0.4]}
        object={scene.clone()} 
        position={[PIRATE_POSITION[0]-2.65, PIRATE_POSITION[1]+0.2, PIRATE_POSITION[2]-2]} 
        rotation={[0, Math.PI, 0]}
        receiveShadow 
        castShadow 
      />
    );    
  }

function Tower() {
    const { scene } = useGLTF('/model_pirate/tower-complete-small.glb');
    return (
      <primitive 
        scale={[0.4, 0.39, 0.4]}
        object={scene.clone()} 
        position={[PIRATE_POSITION[0]-0.66, PIRATE_POSITION[1]+0.2, PIRATE_POSITION[2]-2.4]} 
        rotation={[0, -Math.PI/20, 0]}
        receiveShadow 
        castShadow 
      />
    );    
  }

function Grass() {
    const { scene } = useGLTF('/model_pirate/patch-grass-foliage.glb');
    return (
      <primitive 
        scale={[0.7, 0.7, 0.7]}
        object={scene.clone()} 
        position={[PIRATE_POSITION[0], PIRATE_POSITION[1]+0.05, PIRATE_POSITION[2]]} 
        rotation={[0, 0, 0]}
        receiveShadow 
        castShadow 
      />
    );
    
  }
  function Palm2() {
    const { scene } = useGLTF('/model_pirate/palm-detailed-bend.glb');
    return (
      <primitive 
        scale={[0.6, 0.45, 0.5]}
        object={scene.clone()} 
        position={[PIRATE_POSITION[0]-2.2, PIRATE_POSITION[1]+0.1, PIRATE_POSITION[2]-2.5]} 
        rotation={[0, 2, 0]}
        receiveShadow 
        castShadow 
      />
    );
  }


  function Shipwreck() {
    const { scene } = useGLTF('/model_pirate/ship-wreck.glb');
    return (
      <primitive 
        scale={[0.3, 0.3, 0.3]}
        object={scene.clone()} 
        position={[PIRATE_POSITION[0]-2, PIRATE_POSITION[1]+0.1, PIRATE_POSITION[2]-3.6]} 
        rotation={[0, -Math.PI/2.3, 0]}
        receiveShadow 
        castShadow
      />
    );
  }

  function Palm() {
    const { scene } = useGLTF('/model_pirate/palm-detailed-bend.glb');
    return (
      <primitive 
        scale={[0.6, 0.6, 0.6]}
        object={scene.clone()} 
        position={[PIRATE_POSITION[0]+1.2, PIRATE_POSITION[1]+0.1, PIRATE_POSITION[2]]} 
        rotation={[0, 0, 0]}
        receiveShadow 
        castShadow 
      />
    );
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
      position={[PIRATE_POSITION[0], PIRATE_POSITION[1]+0.20, PIRATE_POSITION[2]]}
      rotation={[0, -Math.PI / 4, 0]}      onClick={(e) => { e.stopPropagation(); onPirateClick(); }}
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
    <Sand />
    <Palm />
    <Sand1 />
    <Sand2 />
    <Sand3 />
    <Sand4 />
    <Sand5 />
    <Grass />
    <Cannon />
    <Dock />
    <Crate />
    <Flag />
    <Rock />
    <Rock2 />
    <Chest />
    <Rowboat />
    <Tower />
    <Palm2 />
    <Shipwreck />
    <Rock3 />
    <Pirateship />
    <Bison />
    

    </Suspense>
);
}