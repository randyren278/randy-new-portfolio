'use client';
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

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
      {/* Top Left Corner - no rotation needed */}
      <primitive 
        object={scene.clone()} 
        position={[-2, 0, -2]} 
        rotation={[0, -Math.PI/2, 0]}
        receiveShadow 
        castShadow 
      />
      {/* Bottom Right Corner - rotate 180° */}
      <primitive 
        object={scene.clone()} 
        position={[2, 0, 2]} 
        rotation={[0, Math.PI/2, 0]}
        receiveShadow 
        castShadow 
      />
      {/* Bottom Left Corner - rotate 270° (or -90°) */}
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

function RockB () {
  const { scene } = useGLTF('/models/rocks_B.gltf');
  return (
    <primitive object={scene.clone()} rotation={[0, 2, 0]} position={[1.3, -0.1, 0.75]} receiveShadow castShadow />
  );
}

function Curve () {
  const { scene } = useGLTF('/models/terrain_slope.gltf');
  return (
    <>
      {/* First rock */}
      <primitive object={scene.clone()} rotation={[0, Math.PI/2, 0]} position={[2, 0.0, -0.5]} receiveShadow castShadow />
      {/* Second rock */}
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

function Lander() {
  const { scene } = useGLTF('/models/lander_A.gltf');
  return (
    
    <primitive object={scene.clone()} rotation={[Math.PI/6, Math.PI/1.7, Math.PI/50]} position={[1.7, 3.5, 2]} receiveShadow castShadow />
  );
}

function Scene() {
  return (
    <>
      {/* Bright ambient light for overall illumination */}
      <ambientLight intensity={1.3} color="#ffffff" />
      {/* Strong directional light acting as the sun */}
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
      {/* Terrain tiles */}
      <Suspense fallback={null}>
        <TerrainSquare />
      </Suspense>
      {/* Space truck */}
      <Suspense fallback={null}>
        <SpaceTruckLarge />
      </Suspense>
      {/* Terrain corners */}
      <Suspense fallback={null}>
        <Corners />
      </Suspense>
      {/* Rocks */}
      <Suspense fallback={null}>
        <RockA />
      </Suspense>
      {/* Slopes */}
      <Suspense fallback={null}>
        <Slope />
      </Suspense>
      <Suspense fallback={null}>
        <Curve />
      </Suspense>
      <Suspense fallback={null}>
        <Cornertall />
      </Suspense>
      {/* Base module */}
      <Suspense fallback={null}>
        <Base1 />
      </Suspense>
      {/* Structure */}
      <Suspense fallback={null}>
        <StructureLow />
      </Suspense>
      {/* Base roof */} 
      <Suspense fallback={null}>
        <BaseRoof />
      </Suspense>
      {/* Base 2 */}
      <Suspense fallback={null}>
        <Base2 />
      </Suspense>
      {/* Cargo depot */}
      <Suspense fallback={null}>
        <Cargobase2 />
      </Suspense>
      {/* Additional rocks */}
      <Suspense fallback={null}>
        <RockB />
      </Suspense>
      {/* Space truck trailer */}
      <Suspense fallback={null}>
        <SpaceTruckSmall />
      </Suspense>
      {/* Cargo containers */}
      <Suspense fallback={null}>
        <CargoC />
      </Suspense>
      <Suspense fallback={null}>
        <CargoC1 />
      </Suspense>
      <Suspense fallback={null}>
        <CargoC2 />
      </Suspense>
      {/* Lander */}
      <Suspense fallback={null}>
        <Lander />
      </Suspense>
    </>
  );
}

export default function SimpleEnvironment() {
  return (
    <div className="h-screen w-full" style={{ backgroundColor: '#1B1919' }}>
      <Canvas
        camera={{ position: [-7, 3, 7], fov: 65 }}
        shadows
        gl={{ antialias: true }}
      >
        <Scene />
        <OrbitControls />
      </Canvas>
    </div>
  );
}