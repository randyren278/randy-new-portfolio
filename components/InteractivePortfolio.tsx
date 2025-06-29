'use client';
import React, { Suspense, useRef, useMemo, useEffect, useState, JSX } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

function TerrainSquare() {
  const { scene } = useGLTF('/models/terrain_low.gltf');
  return (
    <>
      {/* Center */}
      <primitive object={scene.clone()} position={[0, 0, 0]} receiveShadow castShadow />
      {/* Top */}
      <primitive object={scene.clone()} position={[0, 0, -1]} receiveShadow castShadow />
      {/* Bottom */}
      <primitive object={scene.clone()} position={[0, 0, 1]} receiveShadow castShadow />
      {/* Left */}
      <primitive object={scene.clone()} position={[-1, 0, 0]} receiveShadow castShadow />
      {/* Right */}
      <primitive object={scene.clone()} position={[1, 0, 0]} receiveShadow castShadow />
      {/* Top */}
      <primitive object={scene.clone()} position={[0, 0, -2]} receiveShadow castShadow />
      {/* Bottom */}
      <primitive object={scene.clone()} position={[0, 0, 2]} receiveShadow castShadow />
      {/* Left */}
      <primitive object={scene.clone()} position={[-2, 0, 0]} receiveShadow castShadow />
      {/* Right */}
      <primitive object={scene.clone()} position={[2, 0, 0]} receiveShadow castShadow />
    </>
  );
}

function StructureLow() {
  const { scene } = useGLTF('/models/structure_low.gltf');
  return (
    <primitive 
      object={scene.clone()} 
      position={[-1.75, 1, -1.75]} 
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
      position={[-1.75, 2, -1.75]} 
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
      position={[1.75, 1, -1.75]} 
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
      position={[1.75, 2, -1.75]} 
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
      position={[-1.75, 0, -1.75]} 
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
    if (soldierRef.current) {
      console.log('Soldier structure:', soldierRef.current);
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
    if (soldierRef.current) {
      const targetScale = hovered ? 1.15 : 1;
      soldierRef.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale }, 0.1);
    }
  });

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onSoldierClick();
  };

  return (
    <group
      ref={soldierRef}
      scale={[1, 1, 1]}
      position={[-1.4, 0, 2.1]}
      rotation={[0, -Math.PI / 3, 0]}
      onClick={handleClick}
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
        position={[0.5, 0, -0.5]} 
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
        position={[-2, 0, -2]} 
        rotation={[0, -Math.PI/2, 0]}
        receiveShadow 
        castShadow 
      />
      <primitive 
        object={scene.clone()} 
        position={[2, 0, 2]} 
        rotation={[0, Math.PI/2, 0]}
        receiveShadow 
        castShadow 
      />
      <primitive 
        object={scene.clone()} 
        position={[-2, 0, 2]} 
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
        position={[2, 0, -2]} 
        rotation={[0, Math.PI, 0]}
        receiveShadow 
        castShadow 
     />
  );
}

function RockA () {
  const { scene } = useGLTF('/models/rocks_A.gltf');
  return (
    <primitive object={scene.clone()} position={[-0.5, -0.1, 1]} receiveShadow castShadow />
  );
}

function RockC () {
  const { scene } = useGLTF('/models/rocks_A.gltf');
  return (
    <primitive object={scene.clone()} position={[1.5, -0.25, 2]} rotation={[0, Math.PI/2, 0]} receiveShadow castShadow />
  );
}

function RockAA () {
  const { scene } = useGLTF('/models/rock_A.gltf');
  return (
    <primitive object={scene.clone()} position={[2.5, -0.1, 1]} receiveShadow castShadow />
  );
}
function RockAB () {
  const { scene } = useGLTF('/models/rock_A.gltf');
  return (
    <primitive object={scene.clone()} position={[-2.5, -0.1, 1.2]} rotation={[0, 2, 0]} receiveShadow castShadow />
  );
}

function RockAD () {
  const { scene } = useGLTF('/models/rock_B.gltf');
  return (
    <primitive object={scene.clone()} position={[-2.2, -0.35, 2.1]} rotation={[0, 14, 0]} receiveShadow castShadow />
  );
}

function RockB () {
  const { scene } = useGLTF('/models/rocks_B.gltf');
  return (
    <primitive object={scene.clone()} rotation={[0, 2, 0]} position={[1.3, -0.1, 0.75]} receiveShadow castShadow />
  );
}

function RockD () {
  const { scene } = useGLTF('/models/rocks_B.gltf');
  return (
    <primitive object={scene.clone()} rotation={[0, 24, 0]} position={[-0.8, -0.7, 1.9]} receiveShadow castShadow />
  );
}

function Curve () {
  const { scene } = useGLTF('/models/terrain_slope.gltf');
  return (
    <>
      <primitive object={scene.clone()} rotation={[0, Math.PI/2, 0]} position={[2, 0.0, -0.5]} receiveShadow castShadow />
      <primitive object={scene.clone()} rotation={[0, 0, 0]} position={[0.5, 0, -2]} receiveShadow castShadow />
    </>
  );
}

function SpaceTruckLarge() {
  const { scene } = useGLTF('/models/spacetruck_large.gltf');
  return (
    <primitive object={scene.clone()} rotation={[0, Math.PI/10, 0]} position={[-1.6, 0.1, 1]} receiveShadow castShadow />
  );
}

function SpaceTruckSmall() {
  const { scene } = useGLTF('/models/spacetruck_trailer.gltf');
  return (
    <primitive object={scene.clone()} rotation={[0, Math.PI/1.7, 0]} position={[0.4, 0.1, 1.8]} receiveShadow castShadow />
  );
}

function CargoC() {
  const { scene } = useGLTF('/models/containers_C.gltf');
  return (
    <primitive object={scene.clone()} rotation={[0, Math.PI/1.7, 0]} position={[0.2, 0.3, 1.85]} receiveShadow castShadow />
  );
}

function CargoC1() {
  const { scene } = useGLTF('/models/containers_C.gltf');
  return (
    <primitive object={scene.clone()} rotation={[0, Math.PI/1.7, 0]} position={[0.7, 0.3, 1.7]} receiveShadow castShadow />
  );
}

function CargoC2() {
  const { scene } = useGLTF('/models/containers_D.gltf');
  return (
    <primitive object={scene.clone()} rotation={[0, Math.PI/1.7, 0]} position={[0.7, 0.5, 1.7]} receiveShadow castShadow />
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


function Lander() {
  const { scene } = useGLTF('/models/lander_A.gltf');
  const meshRef = useRef<THREE.Object3D | null>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Rotate around Y-axis continuously
      meshRef.current.rotation.y += 0.01;
    }
  });
  
  return (
    <primitive 
      ref={meshRef}
      object={scene.clone()} 
      rotation={[Math.PI/6, Math.PI/1.7, Math.PI/50]} 
      position={[1.7, 3.5, 1.9]} 
      receiveShadow 
      castShadow 
    />
  );
}

function CameraController({ isModalOpen, onAnimationComplete }: { isModalOpen: boolean; onAnimationComplete: (completed: boolean) => void }) {
  const { camera } = useThree();
  
  // Different starting positions for mobile vs desktop
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const originalPosition = useRef<[number, number, number]>(isMobile ? [-10, 3, 10] : [-7, 3, 7]);
  const targetPosition = [-11, 11, 11]; // Position to view the floating card
  const animationComplete = useRef(false);
  
  // Update original position if screen size changes
  useEffect(() => {
    const handleResize = () => {
      const isMobileNow = window.innerWidth <= 768;
      originalPosition.current = isMobileNow ? [-10, 5, 10] : [-7, 3, 7];
      
      // If not in modal mode, update camera position immediately
      if (!isModalOpen && !animationComplete.current) {
        camera.position.set(...originalPosition.current);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [camera, isModalOpen]);
  
  useFrame(() => {
    if (isModalOpen) {
      // Smooth camera movement to target (facing the card)
      camera.position.lerp(
        { x: targetPosition[0], y: targetPosition[1], z: targetPosition[2] }, 
        0.03
      );
      // Look at the floating card
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      // Check if camera is close to target position
      const distance = camera.position.distanceTo(new THREE.Vector3(...targetPosition));
      if (distance < 2 && !animationComplete.current) {
        animationComplete.current = true;
        onAnimationComplete(true);
      }
    } else {
      // Only return to original position if we were previously in modal mode
      if (animationComplete.current) {
        camera.position.lerp(
          { x: originalPosition.current[0], y: originalPosition.current[1], z: originalPosition.current[2] }, 
          0.03
        );
        
        // Check if we're back to original position
        const distance = camera.position.distanceTo(new THREE.Vector3(...originalPosition.current));
        if (distance < 0.5) {
          animationComplete.current = false;
          onAnimationComplete(false);
        }
      }
    }
  });

  return null;
}
function AboutModal({
  isOpen,
  onClose,
  showModal,
}: {
  isOpen: boolean;
  onClose: () => void;
  showModal: boolean;
}) {
  if (!isOpen || !showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative bg-white/2 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl max-w-md w-full transition-all duration-500 ease-out"
        style={{
          transform: showModal ? 'scale(1)' : 'scale(0.8)',
          opacity: showModal ? 1 : 0,
        }}
      >
        <div className="relative p-8">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center text-white/60 hover:text-white"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-white/5 backdrop-blur-sm rounded-full mx-auto mb-4 flex items-center justify-center border border-white/20">
              <img
                src="/images/avatar.jpeg"
                alt="Randy Ren"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Randy Ren</h2>
            <p className="text-white/70"></p>
          </div>

          {/* Social links */}
          <div className="space-y-3">
            <a
              href="https://github.com/randyren278"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl bg-white/2 hover:bg-white/5 transition-all duration-200 group border border-white/10 hover:border-white/20"
            >
              <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
              <div>
                <div className="text-white font-medium">GitHub</div>
                <div className="text-white/60 text-sm">@randyren278</div>
              </div>
            </a>

            <a
              href="mailto:me@randyren.org"
              className="flex items-center gap-3 p-3 rounded-xl bg-white/2 hover:bg-white/5 transition-all duration-200 group border border-white/10 hover:border-white/20"
            >
              <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-white font-medium">Email</div>
                <div className="text-white/60 text-sm">me@randyren.org</div>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/randyren278/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl bg-white/2 hover:bg-white/5 transition-all duration-200 group border border-white/10 hover:border-white/20"
            >
              <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <div>
                <div className="text-white font-medium">LinkedIn</div>
                <div className="text-white/60 text-sm">@randyren278</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}


function Scene({ onSoldierClick, isModalOpen, onAnimationComplete }: { 
  onSoldierClick: () => void; 
  isModalOpen: boolean; 
  onAnimationComplete: (completed: boolean) => void;
}) {
  return (
    <>
      <CameraController isModalOpen={isModalOpen} onAnimationComplete={onAnimationComplete} />
      
      {/* Your existing lighting and components remain the same */}
      <ambientLight intensity={1.3} color="#ffffff" />
      <directionalLight
        position={[10, 10, 10]}
        intensity={2}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight
        position={[1.7, 2.5, 2]}
        intensity={3}
        color="#ff6600"
        distance={8}
        decay={2}
      />
      
      {/* All your existing scene components */}
      <Suspense fallback={null}>
        <TerrainSquare />
      </Suspense>
      <Suspense fallback={null}>
        <SpaceTruckLarge />
      </Suspense>
      <Suspense fallback={null}>
        <Corners />
      </Suspense>
      <Suspense fallback={null}>
        <RockA />
      </Suspense>
      <Suspense fallback={null}>
        <Slope />
      </Suspense>
      <Suspense fallback={null}>
        <Curve />
      </Suspense>
      <Suspense fallback={null}>
        <Cornertall />
      </Suspense>
      <Suspense fallback={null}>
        <RockC />
      </Suspense>
      <Suspense fallback={null}>
        <RockAD />
      </Suspense>
      <Suspense fallback={null}>
        <Base1 />
      </Suspense>
      <Suspense fallback={null}>
        <StructureLow />
      </Suspense>
      <Suspense fallback={null}>
        <BaseRoof />
      </Suspense>
      <Suspense fallback={null}>
        <Base2 />
      </Suspense>
      <Suspense fallback={null}>
        <Cargobase2 />
      </Suspense>
      <Suspense fallback={null}>
        <RockB />
      </Suspense>
      <Suspense fallback={null}>
        <RockAB />
      </Suspense>
      <Suspense fallback={null}>
        <RockD />
      </Suspense>
      <Suspense fallback={null}>
        <CharacterSoldier onSoldierClick={onSoldierClick} />
      </Suspense>
      <Suspense fallback={null}>
        <SpaceTruckSmall />
      </Suspense>
      <Suspense fallback={null}>
        <CargoC />
      </Suspense>
      <Suspense fallback={null}>
        <CargoC1 />
      </Suspense>
      <Suspense fallback={null}>
        <CargoC2 />
      </Suspense>
      <Suspense fallback={null}>
        <Lander />
      </Suspense>
      <Suspense fallback={null}>
        <LanderFlames />
      </Suspense>
      <Suspense fallback={null}>
        <RockAA />
      </Suspense>
    </>
  );
}

// Update main component to track animation state
export default function SimpleEnvironment() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Check if mobile for initial camera position
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const initialCameraPosition: [number, number, number] = isMobile ? [-10, 3, 10] : [-7, 3, 7];

  const handleSoldierClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setShowModal(false);
  };

  const handleAnimationComplete = (completed: boolean) => {
    setShowModal(completed);
  };

  return (
    <div className="h-screen w-full relative" style={{ backgroundColor: '#1B1919' }}>
      <Canvas
        camera={{ position: initialCameraPosition, fov: 65 }}
        shadows
        gl={{ antialias: true }}
      >
        <Scene 
          onSoldierClick={handleSoldierClick} 
          isModalOpen={isModalOpen} 
          onAnimationComplete={handleAnimationComplete}
        />
        <OrbitControls 
          enabled={!isModalOpen}
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          zoomSpeed={0.6}
          rotateSpeed={0.5}
          minDistance={3}
          maxDistance={200}
          maxPolarAngle={Math.PI * 0.75}
          minPolarAngle={Math.PI * 0.1}
        />
      </Canvas>
      
      <AboutModal isOpen={isModalOpen} onClose={closeModal} showModal={showModal} />
      
      {/* Instruction overlay */}
      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white text-sm border border-white/20">
        <p>💡 Click on the blue figurine to connect!</p>
      </div>
    </div>
  );
}