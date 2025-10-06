'use client';
import { useAnimations, useGLTF } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// Keep props inline on the component to avoid cross-file type resolution issues

function Car1({ onClick }: { onClick: () => void }) {
  const { scene } = useGLTF('/cars/hatchback-sports.glb');
  return (
    <primitive 
      object={scene.clone()} 
      position={[0, 1.2, 0]} 
      scale={0.3}
      rotation ={[0, Math.PI/8, 0]}
      receiveShadow 
      castShadow
      onClick={(e: { stopPropagation: () => void; }) => { e.stopPropagation(); onClick(); }} 
    />
  );
}

function Car2({ onClick }: { onClick: () => void }) {
  const { scene } = useGLTF('/cars/race.glb');
  return (
    <primitive 
      object={scene.clone()} 
      position={[2, 1.2, 0]} 
      scale={0.3}
      rotation ={[0, -Math.PI/2.3, 0]}
      receiveShadow 
      castShadow
      onClick={(e: { stopPropagation: () => void; }) => { e.stopPropagation(); onClick(); }} 
    />
  );
}

function Car3({ onClick }: { onClick: () => void }) {
  const { scene } = useGLTF('/cars/tractor.glb');
  return (
    <primitive 
      object={scene.clone()} 
      position={[0, 1.2, -2]} 
      scale={0.3}
      rotation ={[0, Math.PI/9, 0]}
      receiveShadow 
      castShadow
      onClick={(e: { stopPropagation: () => void; }) => { e.stopPropagation(); onClick(); }} 
    />
  );
}

function Car4({ onClick }: { onClick: () => void }) {
  const { scene } = useGLTF('/cars/ambulance.glb');
  return (
    <primitive 
      object={scene.clone()} 
      position={[0, 1.2, 2]} 
      scale={0.3}
      rotation ={[0, -Math.PI/7, 0]}
      receiveShadow 
      castShadow
      onClick={(e: { stopPropagation: () => void; }) => { e.stopPropagation(); onClick(); }} 
    />
  );
}

function Car5({ onClick }: { onClick: () => void }) {
  const { scene } = useGLTF('/cars/van.glb');
  return (
    <primitive 
      object={scene.clone()} 
      position={[-2, 1.2, 0]} 
      scale={0.3}
      rotation ={[0, -Math.PI/45, 0]}
      receiveShadow 
      castShadow
      onClick={(e: { stopPropagation: () => void; }) => { e.stopPropagation(); onClick(); }} 
    />
  );
}

function Car6({ onClick }: { onClick: () => void }) {
  const { scene } = useGLTF('/cars/taxi.glb');
  return (
    <primitive 
      object={scene.clone()} 
      position={[2, 1.2, 2]} 
      scale={0.3}
      rotation ={[0, -Math.PI/3.5, 0]}
      receiveShadow 
      castShadow
      onClick={(e: { stopPropagation: () => void; }) => { e.stopPropagation(); onClick(); }} 
    />
  );
}

function Car7({ onClick }: { onClick: () => void }) {
  const { scene } = useGLTF('/cars/sedan-sports.glb');
  return (
    <primitive 
      object={scene.clone()} 
      position={[-2, 1.2, -2]} 
      scale={0.3}
      rotation ={[0, -Math.PI/3.7, 0]}
      receiveShadow 
      castShadow
      onClick={(e: { stopPropagation: () => void; }) => { e.stopPropagation(); onClick(); }} 
    />
  );
}

function CharacterSoldier({ onSoldierClick }: { onSoldierClick: () => void }) {
  const { scene, animations } = useGLTF('/models/figurine-cube.glb');
  const soldierRef = useRef<THREE.Group>(null);
  const { actions } = useAnimations(animations, soldierRef);
  const [hovered, setHovered] = useState(false);
  const { gl } = useThree();

  useEffect(() => {
    if (actions && actions['idle']) {
      actions['idle'].reset().fadeIn(0.5).play();
    }
  }, [actions]);

  useEffect(() => {
    gl.domElement.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered, gl]);

  useFrame(() => {
    if (soldierRef.current) {
      const targetScale = hovered ? 1.15 : 1;
      soldierRef.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale }, 0.1);
    }
  });

  return (
    <group
      ref={soldierRef}
      scale={[0.8, 0.8, 0.8]}
      position={[-2,1.2, 2]}
      rotation={[0, -Math.PI / 3.5, 0]}
      onClick={(e) => { e.stopPropagation(); onSoldierClick(); }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <primitive object={scene} receiveShadow castShadow />
    </group>
  );
}

function Castle() {
  const { scene } = useGLTF('/castle/tower-square-arch.glb');
  return (
    <primitive 
      object={scene.clone()} 
      position={[2, 1.2, -2]} 
      receiveShadow 
      castShadow 
    />
  );
}

function CastleRoof() {
  const { scene } = useGLTF('/castle/tower-square-top-roof.glb');
  return (
    <primitive 
      object={scene.clone()} 
      position={[2, 2.2, -2]} 
      receiveShadow 
      castShadow 
    />
  );
}

function CastleBase() {
  const { scene } = useGLTF('/castle/tower-square.glb');
  return (
    <primitive 
      object={scene.clone()} 
      position={[2, 0, -2]} 
      receiveShadow 
      castShadow 
    />
  );
}


function ProjectSquare({ position }: { position: [number, number, number] }){
  const { scene } = useGLTF('/castle/tower-square.glb');
  return (
    <primitive object={scene.clone()} scale={1} position={position} />
  );
}


export default function CastleWorldComponents({ onProjectClick }: { onProjectClick: (id: number) => void }) {
  const offsets = [-2, 0, 2]; // 3x3 grid centers; assumes ~1 unit gap between tiles
  const special: [number, number] = [2, -2];
  const positions: Array<[number, number, number]> = [];
  for (const x of offsets) {
    for (const z of offsets) {
      if (!(x === special[0] && z === special[1])) {
        positions.push([x, 0, z]);
      }
    }
  }
  const coordToId = new Map<string, number>();
  positions.forEach(([x, , z], idx) => coordToId.set(`${x},${z}`, idx));
  return (
    <Suspense fallback={null}>
      {positions.map(([x, y, z], id) => (
        <group key={`${x},${z}`} onClick={(e) => { e.stopPropagation(); onProjectClick(id); }}>
          <ProjectSquare position={[x, y, z]} />
        </group>
      ))}
      <Castle />
      <CastleRoof />
      <Car1 onClick={() => { const id = coordToId.get('0,0'); if (id !== undefined) onProjectClick(id); }} />
      <Car2 onClick={() => { const id = coordToId.get('2,0'); if (id !== undefined) onProjectClick(id); }} />
      <Car3 onClick={() => { const id = coordToId.get('0,-2'); if (id !== undefined) onProjectClick(id); }} />
      <Car4 onClick={() => { const id = coordToId.get('0,2'); if (id !== undefined) onProjectClick(id); }} />
      <Car5 onClick={() => { const id = coordToId.get('-2,0'); if (id !== undefined) onProjectClick(id); }} />
      <Car6 onClick={() => { const id = coordToId.get('2,2'); if (id !== undefined) onProjectClick(id); }} />
      <Car7 onClick={() => { const id = coordToId.get('-2,-2'); if (id !== undefined) onProjectClick(id); }} />
      <CharacterSoldier onSoldierClick={() => { const id = coordToId.get('-2,2'); if (id !== undefined) onProjectClick(id); }} />
      <CastleBase />
    </Suspense>
  );
}

