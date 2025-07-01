'use client';
import React, { Suspense, useRef, useEffect, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

const SPACEBASE_POSITION: [number, number, number] = [0, 0, 0];

interface SpaceBaseComponentsProps {
  onSoldierClick: () => void;
}

// Terrain components
function TerrainSquare() {
  const { scene } = useGLTF('/models/terrain_low.gltf');
  return (
    <group position={SPACEBASE_POSITION}>
      <primitive object={scene.clone()} position={[0, 0, 0]} receiveShadow castShadow />
      <primitive object={scene.clone()} position={[0, 0, -1]} receiveShadow castShadow />
      <primitive object={scene.clone()} position={[0, 0, 1]} receiveShadow castShadow />
      <primitive object={scene.clone()} position={[-1, 0, 0]} receiveShadow castShadow />
      <primitive object={scene.clone()} position={[1, 0, 0]} receiveShadow castShadow />
      <primitive object={scene.clone()} position={[0, 0, -2]} receiveShadow castShadow />
      <primitive object={scene.clone()} position={[0, 0, 2]} receiveShadow castShadow />
      <primitive object={scene.clone()} position={[-2, 0, 0]} receiveShadow castShadow />
      <primitive object={scene.clone()} position={[2, 0, 0]} receiveShadow castShadow />
    </group>
  );
}

function StructureLow() {
  const { scene } = useGLTF('/models/structure_low.gltf');
  return (
    <primitive 
      object={scene.clone()} 
      position={[SPACEBASE_POSITION[0] - 1.75, SPACEBASE_POSITION[1] + 1, SPACEBASE_POSITION[2] - 1.75]} 
      rotation={[0, Math.PI/5.2, 0]}
      receiveShadow 
      castShadow 
    />
  );
}

function BaseRoof() {
  const { scene } = useGLTF('/models/basemodule_E.gltf');
  return (
    <primitive 
      object={scene.clone()} 
      position={[SPACEBASE_POSITION[0] - 1.75, SPACEBASE_POSITION[1] + 2, SPACEBASE_POSITION[2] - 1.75]} 
      rotation={[0, Math.PI/2, 0]}
      receiveShadow 
      castShadow 
    />
  );
}

function Base2() {
  const { scene } = useGLTF('/models/basemodule_C.gltf');
  return (
    <primitive 
      object={scene.clone()} 
      position={[SPACEBASE_POSITION[0] + 1.75, SPACEBASE_POSITION[1] + 1, SPACEBASE_POSITION[2] - 1.75]} 
      rotation={[0, -Math.PI/5.2, 0]}
      receiveShadow 
      castShadow 
    />
  );
}

function Cargobase2() {
  const { scene } = useGLTF('/models/roofmodule_cargo_C.gltf');
  return (
    <primitive 
      object={scene.clone()} 
      position={[SPACEBASE_POSITION[0] + 1.75, SPACEBASE_POSITION[1] + 2, SPACEBASE_POSITION[2] - 1.75]} 
      rotation={[0, -Math.PI/5.2, 0]}
      receiveShadow 
      castShadow 
    />
  );
}

function Base1() {
  const { scene } = useGLTF('/models/basemodule_A.gltf');
  return (
    <primitive 
      object={scene.clone()} 
      position={[SPACEBASE_POSITION[0] - 1.75, SPACEBASE_POSITION[1], SPACEBASE_POSITION[2] - 1.75]} 
      rotation={[0, Math.PI/5.2, 0]}
      receiveShadow 
      castShadow 
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
      scale={[1, 1, 1]}
      position={[SPACEBASE_POSITION[0] - 1.4, SPACEBASE_POSITION[1], SPACEBASE_POSITION[2] + 2.1]}
      rotation={[0, -Math.PI / 3, 0]}
      onClick={(e) => { e.stopPropagation(); onSoldierClick(); }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <primitive object={scene} receiveShadow castShadow />
    </group>
  );
}

function Slope() {
  const { scene } = useGLTF('/models/terrain_slope_outer_corner.gltf');
  return (
    <primitive 
      object={scene.clone()} 
      position={[SPACEBASE_POSITION[0] + 0.5, SPACEBASE_POSITION[1], SPACEBASE_POSITION[2] - 0.5]} 
      rotation={[0, 0, 0]}
      receiveShadow 
      castShadow 
    />        
  );
}

function Corners() {
  const { scene } = useGLTF('/models/terrain_low_curved.gltf');
  return (
    <>
      <primitive 
        object={scene.clone()} 
        position={[SPACEBASE_POSITION[0] - 2, SPACEBASE_POSITION[1], SPACEBASE_POSITION[2] - 2]} 
        rotation={[0, -Math.PI/2, 0]}
        receiveShadow 
        castShadow 
      />
      <primitive 
        object={scene.clone()} 
        position={[SPACEBASE_POSITION[0] + 2, SPACEBASE_POSITION[1], SPACEBASE_POSITION[2] + 2]} 
        rotation={[0, Math.PI/2, 0]}
        receiveShadow 
        castShadow 
      />
      <primitive 
        object={scene.clone()} 
        position={[SPACEBASE_POSITION[0] - 2, SPACEBASE_POSITION[1], SPACEBASE_POSITION[2] + 2]} 
        rotation={[0, 0, 0]}
        receiveShadow 
        castShadow 
      />
    </>
  );
}

function Cornertall() {
  const { scene } = useGLTF('/models/terrain_tall_curved.gltf');
  return (
    <primitive 
      object={scene.clone()} 
      position={[SPACEBASE_POSITION[0] + 2, SPACEBASE_POSITION[1], SPACEBASE_POSITION[2] - 2]} 
      rotation={[0, Math.PI, 0]}
      receiveShadow 
      castShadow 
   />
  );
}

function RockA() {
  const { scene } = useGLTF('/models/rocks_A.gltf');
  return (
    <primitive 
      object={scene.clone()} 
      position={[SPACEBASE_POSITION[0] - 0.5, SPACEBASE_POSITION[1] - 0.1, SPACEBASE_POSITION[2] + 1]} 
      receiveShadow 
      castShadow 
    />
  );
}

function RockC() {
  const { scene } = useGLTF('/models/rocks_A.gltf');
  return (
    <primitive 
      object={scene.clone()} 
      position={[SPACEBASE_POSITION[0] + 1.5, SPACEBASE_POSITION[1] - 0.25, SPACEBASE_POSITION[2] + 2]} 
      rotation={[0, Math.PI/2, 0]} 
      receiveShadow 
      castShadow 
    />
  );
}

function RockAA() {
  const { scene } = useGLTF('/models/rock_A.gltf');
  return (
    <primitive 
      object={scene.clone()} 
      position={[SPACEBASE_POSITION[0] + 2.5, SPACEBASE_POSITION[1] - 0.1, SPACEBASE_POSITION[2] + 1]} 
      receiveShadow 
      castShadow 
    />
  );
}

function RockAB() {
  const { scene } = useGLTF('/models/rock_A.gltf');
  return (
    <primitive 
      object={scene.clone()} 
      position={[SPACEBASE_POSITION[0] - 2.5, SPACEBASE_POSITION[1] - 0.1, SPACEBASE_POSITION[2] + 1.2]} 
      rotation={[0, 2, 0]} 
      receiveShadow 
      castShadow 
    />
  );
}

function RockAD() {
  const { scene } = useGLTF('/models/rock_B.gltf');
  return (
    <primitive 
      object={scene.clone()} 
      position={[SPACEBASE_POSITION[0] - 2.2, SPACEBASE_POSITION[1] - 0.35, SPACEBASE_POSITION[2] + 2.1]} 
      rotation={[0, 14, 0]} 
      receiveShadow 
      castShadow 
    />
  );
}

function RockB() {
  const { scene } = useGLTF('/models/rocks_B.gltf');
  return (
    <primitive 
      object={scene.clone()} 
      rotation={[0, 2, 0]} 
      position={[SPACEBASE_POSITION[0] + 1.3, SPACEBASE_POSITION[1] - 0.1, SPACEBASE_POSITION[2] + 0.75]} 
      receiveShadow 
      castShadow 
    />
  );
}

function RockD() {
  const { scene } = useGLTF('/models/rocks_B.gltf');
  return (
    <primitive 
      object={scene.clone()} 
      rotation={[0, 24, 0]} 
      position={[SPACEBASE_POSITION[0] - 0.8, SPACEBASE_POSITION[1] - 0.7, SPACEBASE_POSITION[2] + 1.9]} 
      receiveShadow 
      castShadow 
    />
  );
}

function Curve() {
  const { scene } = useGLTF('/models/terrain_slope.gltf');
  return (
    <>
      <primitive 
        object={scene.clone()} 
        rotation={[0, Math.PI/2, 0]} 
        position={[SPACEBASE_POSITION[0] + 2, SPACEBASE_POSITION[1], SPACEBASE_POSITION[2] - 0.5]} 
        receiveShadow 
        castShadow 
      />
      <primitive 
        object={scene.clone()} 
        rotation={[0, 0, 0]} 
        position={[SPACEBASE_POSITION[0] + 0.5, SPACEBASE_POSITION[1], SPACEBASE_POSITION[2] - 2]} 
        receiveShadow 
        castShadow 
      />
    </>
  );
}

function SpaceTruckLarge() {
  const { scene } = useGLTF('/models/spacetruck_large.gltf');
  return (
    <primitive 
      object={scene.clone()} 
      rotation={[0, Math.PI/10, 0]} 
      position={[SPACEBASE_POSITION[0] - 1.6, SPACEBASE_POSITION[1] + 0.1, SPACEBASE_POSITION[2] + 1]} 
      receiveShadow 
      castShadow 
    />
  );
}

function SpaceTruckSmall() {
  const { scene } = useGLTF('/models/spacetruck_trailer.gltf');
  return (
    <primitive 
      object={scene.clone()} 
      rotation={[0, Math.PI/1.7, 0]} 
      position={[SPACEBASE_POSITION[0] + 0.4, SPACEBASE_POSITION[1] + 0.1, SPACEBASE_POSITION[2] + 1.8]} 
      receiveShadow 
      castShadow 
    />
  );
}

function CargoC() {
  const { scene } = useGLTF('/models/containers_C.gltf');
  return (
    <primitive 
      object={scene.clone()} 
      rotation={[0, Math.PI/1.7, 0]} 
      position={[SPACEBASE_POSITION[0] + 0.2, SPACEBASE_POSITION[1] + 0.3, SPACEBASE_POSITION[2] + 1.85]} 
      receiveShadow 
      castShadow 
    />
  );
}

function CargoC1() {
  const { scene } = useGLTF('/models/containers_C.gltf');
  return (
    <primitive 
      object={scene.clone()} 
      rotation={[0, Math.PI/1.7, 0]} 
      position={[SPACEBASE_POSITION[0] + 0.7, SPACEBASE_POSITION[1] + 0.3, SPACEBASE_POSITION[2] + 1.7]} 
      receiveShadow 
      castShadow 
    />
  );
}

function CargoC2() {
  const { scene } = useGLTF('/models/containers_D.gltf');
  return (
    <primitive 
      object={scene.clone()} 
      rotation={[0, Math.PI/1.7, 0]} 
      position={[SPACEBASE_POSITION[0] + 0.7, SPACEBASE_POSITION[1] + 0.5, SPACEBASE_POSITION[2] + 1.7]} 
      receiveShadow 
      castShadow 
    />
  );
}

function Lander() {
  const { scene } = useGLTF('/models/lander_A.gltf');
  const meshRef = useRef<THREE.Object3D | null>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });
  
  return (
    <primitive 
      ref={meshRef}
      object={scene.clone()} 
      rotation={[Math.PI/6, Math.PI/1.7, Math.PI/50]} 
      position={[SPACEBASE_POSITION[0] + 1.7, SPACEBASE_POSITION[1] + 3.5, SPACEBASE_POSITION[2] + 1.9]} 
      receiveShadow 
      castShadow 
    />
  );
}

function LanderFlames() {
    const flameRef = useRef<THREE.BufferGeometry>(null);
    const innerFlameRef = useRef<THREE.BufferGeometry>(null);
    const sparkRef = useRef<THREE.BufferGeometry>(null);
    const [flameVisible, setFlameVisible] = useState(false);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setFlameVisible(true);
      }, 500); 
      
      return () => clearTimeout(timer);
    }, []);
  
    // Create particle systems
    const particleCount = 100;
    const innerParticleCount = 80;
    const sparkCount = 50;
    
    const particles = useMemo(() => {
      const positions = new Float32Array(particleCount * 3);
      const velocities = new Float32Array(particleCount * 3);
      const scales = new Float32Array(particleCount);
      const opacities = new Float32Array(particleCount);
      const colors = new Float32Array(particleCount * 3);
      const lifetimes = new Float32Array(particleCount); // Add lifetime tracking
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        // Start from lander position with tapered shape
        const startHeight = Math.random() * 0.15;
        const radiusScale = Math.max(0.1, 1 - startHeight * 4); // Taper factor
        
        positions[i3] = (Math.random() - 0.5) * 0.4 * radiusScale;
        positions[i3 + 1] = startHeight;
        positions[i3 + 2] = (Math.random() - 0.5) * 0.4 * radiusScale;
        
        const baseSpread = Math.random() * 0.03;
        velocities[i3] = (Math.random() - 0.5) * baseSpread;
        velocities[i3 + 1] = -Math.random() * 0.08 - 0.02;
        velocities[i3 + 2] = (Math.random() - 0.5) * baseSpread;
        
        scales[i] = Math.random() * 0.1 + 0.05;
        opacities[i] = Math.random() * 0.8 + 0.2;
        lifetimes[i] = Math.random() * 0.5 + 0.3; // Random lifetime between 0.3-0.8
        
        // Orange to red flame colors
        colors[i3] = 1.0; // R
        colors[i3 + 1] = Math.random() * 0.5 + 0.3; // G
        colors[i3 + 2] = Math.random() * 0.2; // B
      }
      
      return { positions, velocities, scales, opacities, colors, lifetimes };
    }, []);
    
    const innerParticles = useMemo(() => {
      const positions = new Float32Array(innerParticleCount * 3);
      const velocities = new Float32Array(innerParticleCount * 3);
      const scales = new Float32Array(innerParticleCount);
      const opacities = new Float32Array(innerParticleCount);
      const colors = new Float32Array(innerParticleCount * 3);
      const lifetimes = new Float32Array(innerParticleCount);
      
      for (let i = 0; i < innerParticleCount; i++) {
        const i3 = i * 3;
        const startHeight = Math.random() * 0.08;
        const radiusScale = Math.max(0.05, 1 - startHeight * 6);
        
        positions[i3] = (Math.random() - 0.5) * 0.2 * radiusScale;
        positions[i3 + 1] = startHeight;
        positions[i3 + 2] = (Math.random() - 0.5) * 0.2 * radiusScale;
        
        velocities[i3] = (Math.random() - 0.5) * 0.015;
        velocities[i3 + 1] = -Math.random() * 0.06 - 0.03;
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.015;
        
        scales[i] = Math.random() * 0.06 + 0.02;
        opacities[i] = Math.random() * 0.9 + 0.1;
        lifetimes[i] = Math.random() * 0.4 + 0.2; // Shorter lifetime for core
        
        // Bright blue-white core
        colors[i3] = 0.8 + Math.random() * 0.2; // R
        colors[i3 + 1] = 0.9 + Math.random() * 0.1; // G
        colors[i3 + 2] = 1.0; // B
      }
      
      return { positions, velocities, scales, opacities, colors, lifetimes };
    }, []);
    
    const sparks = useMemo(() => {
      const positions = new Float32Array(sparkCount * 3);
      const velocities = new Float32Array(sparkCount * 3);
      const scales = new Float32Array(sparkCount);
      const opacities = new Float32Array(sparkCount);
      const lifetimes = new Float32Array(sparkCount);
      
      for (let i = 0; i < sparkCount; i++) {
        const i3 = i * 3;
        positions[i3] = (Math.random() - 0.5) * 0.25;
        positions[i3 + 1] = Math.random() * 0.1;
        positions[i3 + 2] = (Math.random() - 0.5) * 0.25;
        
        velocities[i3] = (Math.random() - 0.5) * 0.04;
        velocities[i3 + 1] = -Math.random() * 0.05 - 0.01;
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.04;
        
        scales[i] = Math.random() * 0.02 + 0.01;
        opacities[i] = Math.random() * 0.7 + 0.3;
        lifetimes[i] = Math.random() * 0.8 + 0.4; // Longer sparks
      }
      
      return { positions, velocities, scales, opacities, lifetimes };
    }, []);
   
    useFrame((state) => {
      if (!flameRef.current || !innerFlameRef.current || !sparkRef.current) return;
      
      const time = state.clock.getElapsedTime();
      const deltaTime = state.clock.getDelta();
      
      // Dynamic flame intensity (varies flame length)
      const flameIntensity = 0.75 + Math.sin(time * 4) * 0.1 + Math.sin(time * 7) * 0.005;
      
      // Animate main flame particles
      const positions = flameRef.current.attributes.position.array as Float32Array;
      const scales = flameRef.current.attributes.scale.array as Float32Array;
      const opacities = flameRef.current.attributes.opacity.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Update particle lifetime
        particles.lifetimes[i] -= deltaTime * (1.5 + Math.random() * 0.5);
        
        // Add inward pull as flame rises (creates taper)
        const centerPull = 0.0008;
        particles.velocities[i3] *= 0.985 - centerPull;
        particles.velocities[i3 + 2] *= 0.985 - centerPull;
        
        // Update positions with turbulence
        positions[i3] += particles.velocities[i3] + Math.sin(time * 3 + i) * 0.001;
        positions[i3 + 1] += particles.velocities[i3 + 1] * flameIntensity;
        positions[i3 + 2] += particles.velocities[i3 + 2] + Math.cos(time * 2 + i) * 0.001;
        
        // Reset particles based on lifetime or distance
        const maxDistance = -1.2 - (flameIntensity * 0.8); // Dynamic max distance
        if (particles.lifetimes[i] <= 0 || positions[i3 + 1] < maxDistance) {
          const radiusScale = Math.max(0.1, 1 - Math.random() * 0.15 * 4);
          positions[i3] = (Math.random() - 0.5) * 0.4 * radiusScale;
          positions[i3 + 1] = Math.random() * 0.15;
          positions[i3 + 2] = (Math.random() - 0.5) * 0.4 * radiusScale;
          
          // Reset velocity and lifetime
          const baseSpread = Math.random() * 0.03;
          particles.velocities[i3] = (Math.random() - 0.5) * baseSpread;
          particles.velocities[i3 + 2] = (Math.random() - 0.5) * baseSpread;
          particles.lifetimes[i] = Math.random() * 0.5 + 0.3;
        }
        
        // Scale based on height and lifetime (taper effect)
        const lifetimeScale = Math.max(0.1, particles.lifetimes[i] / 0.8);
        const heightScale = Math.max(0.05, 1 - Math.abs(positions[i3 + 1]) * 0.6);
        const flicker = Math.sin(time * 8 + i * 0.5) * 0.1 + 1;
        scales[i] = particles.scales[i] * flicker * heightScale * lifetimeScale;
        opacities[i] = particles.opacities[i] * lifetimeScale * flicker * heightScale;
      }
      
      // Animate inner flame
      const innerPositions = innerFlameRef.current.attributes.position.array as Float32Array;
      const innerScales = innerFlameRef.current.attributes.scale.array as Float32Array;
      const innerOpacities = innerFlameRef.current.attributes.opacity.array as Float32Array;
      
      for (let i = 0; i < innerParticleCount; i++) {
        const i3 = i * 3;
        
        // Update lifetime
        innerParticles.lifetimes[i] -= deltaTime * (2 + Math.random() * 0.5);
        
        // Stronger inward pull for core
        const centerPull = 0.001;
        innerParticles.velocities[i3] *= 0.98 - centerPull;
        innerParticles.velocities[i3 + 2] *= 0.98 - centerPull;
        
        innerPositions[i3] += innerParticles.velocities[i3] + Math.sin(time * 4 + i) * 0.002;
        innerPositions[i3 + 1] += innerParticles.velocities[i3 + 1] * flameIntensity;
        innerPositions[i3 + 2] += innerParticles.velocities[i3 + 2] + Math.cos(time * 3 + i) * 0.002;
        
        const maxInnerDistance = -0.8 - (flameIntensity * 0.6);
        if (innerParticles.lifetimes[i] <= 0 || innerPositions[i3 + 1] < maxInnerDistance) {
          const radiusScale = Math.max(0.05, 1 - Math.random() * 0.08 * 6);
          innerPositions[i3] = (Math.random() - 0.5) * 0.2 * radiusScale;
          innerPositions[i3 + 1] = Math.random() * 0.08;
          innerPositions[i3 + 2] = (Math.random() - 0.5) * 0.2 * radiusScale;
          
          innerParticles.velocities[i3] = (Math.random() - 0.5) * 0.015;
          innerParticles.velocities[i3 + 2] = (Math.random() - 0.5) * 0.015;
          innerParticles.lifetimes[i] = Math.random() * 0.4 + 0.2;
        }
        
        const lifetimeScale = Math.max(0.1, innerParticles.lifetimes[i] / 0.6);
        const heightScale = Math.max(0.02, 1 - Math.abs(innerPositions[i3 + 1]) * 0.8);
        const coreFlicker = Math.sin(time * 10 + i * 0.8) * 0.2 + 1;
        innerScales[i] = innerParticles.scales[i] * coreFlicker * heightScale * lifetimeScale;
        innerOpacities[i] = innerParticles.opacities[i] * lifetimeScale * coreFlicker * heightScale;
      }
      
      // Animate sparks
      const sparkPositions = sparkRef.current.attributes.position.array as Float32Array;
      const sparkScales = sparkRef.current.attributes.scale.array as Float32Array;
      const sparkOpacities = sparkRef.current.attributes.opacity.array as Float32Array;
      
      for (let i = 0; i < sparkCount; i++) {
        const i3 = i * 3;
        
        // Update lifetime
        sparks.lifetimes[i] -= deltaTime * (1 + Math.random() * 0.3);
        
        sparkPositions[i3] += sparks.velocities[i3];
        sparkPositions[i3 + 1] += sparks.velocities[i3 + 1] * flameIntensity;
        sparkPositions[i3 + 2] += sparks.velocities[i3 + 2];
        
        const maxSparkDistance = -1.8 - (flameIntensity * 0.4);
        if (sparks.lifetimes[i] <= 0 || sparkPositions[i3 + 1] < maxSparkDistance) {
          sparkPositions[i3] = (Math.random() - 0.5) * 0.25;
          sparkPositions[i3 + 1] = Math.random() * 0.1;
          sparkPositions[i3 + 2] = (Math.random() - 0.5) * 0.25;
          sparks.lifetimes[i] = Math.random() * 0.8 + 0.4;
        }
        
        const lifetimeScale = Math.max(0.1, sparks.lifetimes[i] / 1.2);
        const heightScale = Math.max(0.1, 1 - Math.abs(sparkPositions[i3 + 1]) * 0.4);
        sparkScales[i] = sparks.scales[i] * (1 + Math.sin(time * 15 + i) * 0.3) * heightScale * lifetimeScale;
        sparkOpacities[i] = sparks.opacities[i] * lifetimeScale * heightScale;
      }
      
      // Mark attributes as needing update
      flameRef.current.attributes.position.needsUpdate = true;
      flameRef.current.attributes.scale.needsUpdate = true;
      flameRef.current.attributes.opacity.needsUpdate = true;
      
      innerFlameRef.current.attributes.position.needsUpdate = true;
      innerFlameRef.current.attributes.scale.needsUpdate = true;
      innerFlameRef.current.attributes.opacity.needsUpdate = true;
      
      sparkRef.current.attributes.position.needsUpdate = true;
      sparkRef.current.attributes.scale.needsUpdate = true;
      sparkRef.current.attributes.opacity.needsUpdate = true;
    });
  
    if (!flameVisible) return null;
   
    return (
      <group position={[1.7, 3.8, 2.1]} rotation={[Math.PI/6, Math.PI/1.7, Math.PI/50]}>
        {/* Main flame particles */}
        <points>
          <bufferGeometry ref={flameRef}>
            <bufferAttribute
              attach="attributes-position"
              count={particleCount}
              array={particles.positions}
              itemSize={3}
              args={[particles.positions, 3]}
            />
            <bufferAttribute
              attach="attributes-color"
              count={particleCount}
              array={particles.colors}
              itemSize={3}
              args={[particles.colors, 3]}
            />
            <bufferAttribute
              attach="attributes-scale"
              count={particleCount}
              array={particles.scales}
              itemSize={1}
              args={[particles.scales, 1]}
            />
            <bufferAttribute
              attach="attributes-opacity"
              count={particleCount}
              array={particles.opacities}
              itemSize={1}
              args={[particles.opacities, 1]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.1}
            sizeAttenuation={true}
            transparent={true}
            opacity={0.8}
            vertexColors={true}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
        
        {/* Inner bright core */}
        <points>
          <bufferGeometry ref={innerFlameRef}>
            <bufferAttribute
              attach="attributes-position"
              count={innerParticleCount}
              array={innerParticles.positions}
              itemSize={3}
              args={[innerParticles.positions, 3]}
            />
            <bufferAttribute
              attach="attributes-color"
              count={innerParticleCount}
              array={innerParticles.colors}
              itemSize={3}
              args={[innerParticles.colors, 3]}
            />
            <bufferAttribute
              attach="attributes-scale"
              count={innerParticleCount}
              array={innerParticles.scales}
              itemSize={1}
              args={[innerParticles.scales, 1]}
            />
            <bufferAttribute
              attach="attributes-opacity"
              count={innerParticleCount}
              array={innerParticles.opacities}
              itemSize={1}
              args={[innerParticles.opacities, 1]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.08}
            sizeAttenuation={true}
            transparent={true}
            opacity={0.9}
            vertexColors={true}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
        
        {/* Sparks */}
        <points>
          <bufferGeometry ref={sparkRef}>
            <bufferAttribute
              attach="attributes-position"
              count={sparkCount}
              array={sparks.positions}
              itemSize={3}
              args={[sparks.positions, 3]}
            />
            <bufferAttribute
              attach="attributes-scale"
              count={sparkCount}
              array={sparks.scales}
              itemSize={1}
              args={[sparks.scales, 1]}
            />
            <bufferAttribute
              attach="attributes-opacity"
              count={sparkCount}
              array={sparks.opacities}
              itemSize={1}
              args={[sparks.opacities, 1]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.03}
            sizeAttenuation={true}
            transparent={true}
            opacity={0.8}
            color="#ffaa00"
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
      </group>
    );
  }
  
  function FloatingMenu({ onClick }: { onClick: () => void }) {
    return (
      <div className="absolute bottom-4 right-4 z-40">
        <button
          onClick={onClick}
          className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 hover:bg-white/20 transition-all duration-300 group shadow-2xl"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
              <span className="text-lg font-bold text-white">R</span>
            </div>
            <div className="text-left">
              <div className="text-white font-medium text-sm">Randy Ren</div>
              <div className="text-white/60 text-xs">Click to connect</div>
            </div>
          </div>
        </button>
      </div>
    );
  }
  

export default function SpaceBaseComponents({ onSoldierClick }: SpaceBaseComponentsProps) {
  return (
    <Suspense fallback={null}>
      <TerrainSquare />
      <StructureLow />
      <BaseRoof />
      <Base2 />
      <Cargobase2 />
      <Base1 />
      <CharacterSoldier onSoldierClick={onSoldierClick} />
      <Slope />
      <Corners />
      <Cornertall />
      <RockA />
      <RockC />
      <RockAA />
      <RockAB />
      <RockAD />
      <RockB />
      <RockD />
      <Curve />
      <SpaceTruckLarge />
      <SpaceTruckSmall />
      <CargoC />
      <CargoC1 />
      <CargoC2 />
      <Lander />
      <LanderFlames />
    </Suspense>
  );
}