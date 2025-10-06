'use client';
import React, { useState, useEffect, Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import SpaceBaseComponents from './worlds/SpaceBaseComponents';
import PirateWorldComponents from './worlds/PirateWorldComponents';
import CastleWorldComponents from './worlds/CastleWorldComponents';
import { AboutModal, ResumeModal, ProjectModal } from './modals/WorldModals';
import { PortfolioNavbar } from './PortfolioNavbar';
import CameraReset from './CameraReset';
import * as THREE from 'three';
import path from 'path';

export type WorldFocus = 'spacebase' | 'pirate' | 'castle';

// Camera Zoom Transition Controller
function CameraZoomController({ 
  isTransitioning, 
  currentWorld,
  onTransitionComplete,
  isModalOpen,
  onAnimationComplete
}: { 
  isTransitioning: boolean;
  currentWorld: WorldFocus;
  onTransitionComplete: () => void;
  isModalOpen: boolean;
  onAnimationComplete: (completed: boolean) => void;
}) {
  const { camera } = useThree();
  const transitionProgress = useRef(0);
  const isTransitioningRef = useRef(false);
  const modalAnimationComplete = useRef(false);

  // Helper function to get responsive camera position
  const getResponsiveCameraPosition = (): [number, number, number] => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    if (isMobile) {
      // Different positions for different worlds
      if (currentWorld === 'pirate') return [-12, 4, 12];
      if (currentWorld === 'castle') return [-8, 8, 8];
      return [-10, 3, 10];
    }
    if (currentWorld === 'castle') return [-7, 4, 7];
    return [-7, 3, 7];
  };

  useEffect(() => {
    if (isTransitioning && !isTransitioningRef.current) {
      isTransitioningRef.current = true;
      transitionProgress.current = 0;
    }
  }, [isTransitioning]);

  useFrame(() => {
    if (isTransitioningRef.current) {
      // World transition animation
      transitionProgress.current += 0.01; // Adjust speed here

      if (transitionProgress.current >= 1) {
        // Transition complete
        isTransitioningRef.current = false;
        transitionProgress.current = 0;
        // Return to responsive normal position
        const normalPosition = getResponsiveCameraPosition();
        camera.position.set(...normalPosition);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        onTransitionComplete();
        return;
      }

      const progress = transitionProgress.current;
      
      if (progress <= 0.5) {
        // First half: zoom out to far position
        const zoomProgress = progress * 2; // 0 to 1
        const easeOut = 1 - Math.pow(1 - zoomProgress, 2); // Ease out for smooth deceleration
        const startPos = getResponsiveCameraPosition();
        const farPos = [-200, 203, 200];
        
        camera.position.x = THREE.MathUtils.lerp(startPos[0], farPos[0], easeOut);
        camera.position.y = THREE.MathUtils.lerp(startPos[1], farPos[1], easeOut);
        camera.position.z = THREE.MathUtils.lerp(startPos[2], farPos[2], easeOut);
      } else {
        // Second half: zoom back in from far position
        const zoomProgress = (progress - 0.5) * 2; // 0 to 1
        const easeIn = Math.pow(zoomProgress, 2); // Ease in for smooth acceleration
        const farPos = [-200, 203, 200];
        const endPos = getResponsiveCameraPosition();
    
        camera.position.x = THREE.MathUtils.lerp(farPos[0], endPos[0], easeIn);
        camera.position.y = THREE.MathUtils.lerp(farPos[1], endPos[1], easeIn);
        camera.position.z = THREE.MathUtils.lerp(farPos[2], endPos[2], easeIn);
      }
      
      camera.lookAt(new THREE.Vector3(0, 0, 0));
    } else if (isModalOpen) {
      // Modal camera animation - use responsive positioning
      const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
      const modalPosition = isMobile ? [-12, 10, 12] : [-8, 8, 8];
      camera.position.lerp({ x: modalPosition[0], y: modalPosition[1], z: modalPosition[2] }, 0.03);
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      
      const distance = camera.position.distanceTo(new THREE.Vector3(...modalPosition));
      const threshold = isMobile ? 3 : 2;
      if (distance < threshold && !modalAnimationComplete.current) {
        modalAnimationComplete.current = true;
        onAnimationComplete(true);
      }
    } else {
      // Return from modal - use responsive positioning
      if (modalAnimationComplete.current) {
        const normalPosition = getResponsiveCameraPosition();
        camera.position.lerp({ x: normalPosition[0], y: normalPosition[1], z: normalPosition[2] }, 0.03);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        
        const distance = camera.position.distanceTo(new THREE.Vector3(...normalPosition));
        if (distance < 0.5) {
          modalAnimationComplete.current = false;
          onAnimationComplete(false);
        }
      }
    }
  });

  return null;
}

// Simple lighting that works for both worlds
function UniversalLighting() {
  return (
    <>
      <ambientLight intensity={0.8} color="#ffffff" />
      <directionalLight
        position={[10, 10, 10]}
        intensity={1.5}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
      />
      <pointLight
        position={[5, 5, 5]}
        intensity={1}
        color="#ffa500"
        distance={20}
        decay={2}
      />
    </>
  );
}

// Main World Flipper System
export default function WorldFlipperSystem() {
  const [currentWorld, setCurrentWorld] = useState<WorldFocus>('spacebase');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'about' | 'resume' | 'project'>('about');
  const [selectedProject, setSelectedProject] = useState<null | { id: number; title: string; description: string; linkUrl?: string; path?: string }>(null);
  const [isCastleMenuOpen, setIsCastleMenuOpen] = useState(false);

  // Randomly select initial world on load
  useEffect(() => {
    const worlds: WorldFocus[] = ['spacebase', 'pirate', 'castle'];
    const randomWorld = worlds[Math.floor(Math.random() * worlds.length)];
    setCurrentWorld(randomWorld);
  }, []);

  const handleAboutClick = () => {
    if (currentWorld !== 'spacebase') {
      // Transition to space base first, then show modal
      transitionToWorld('spacebase');
      setTimeout(() => {
        setModalType('about');
        setIsModalOpen(true);
      }, 1250); // Wait for transition to complete (reduced from 2500)
    } else {
      setModalType('about');
      setIsModalOpen(true);
    }
  };

  const handlePirateClick = () => {
    setModalType('resume');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setShowModal(false);
    setIsCastleMenuOpen(false);
  };

  const handleContactClick = () => {
    window.open('mailto:me@randyren.org', '_blank');
  };

  const handleProjectsClick = () => {
    console.log('Projects clicked - implement your projects view');
  };

  // Dummy project data (8 items). We'll skip tile (2, -2) later in Castle component
  const projects = [
    { id: 0, title: 'Weather App', description: 'A weather app with an intuitive and modern design, featuring real-time updates, 5-day forecast, and much more..', linkUrl: 'https://randy-weather-app.vercel.app' },
    { id: 1, title: 'Facial Recognition', description: 'An application captures images from a webcam, detects faces, and recognizes them from a database.', linkUrl: 'https://github.com/randyren278/computervision' },
    { id: 2, title: '3D-Modeller', description: 'This 3D modeller program allows you to create, manipulate, and view 3D objects in a virtual environment.', linkUrl: 'https://github.com/randyren278/3D-Modeller' },
    { id: 3, title: 'Portfolio', description: 'A fully responsive portfolio site using Next.js, Tailwind CSS, and Framer Motion to showcase projects, resume, and contact information', linkUrl: 'http://randyren.org' },
    { id: 4, title: 'Dissertation on Kuwait', description: 'Exploring the integration of renewable energy into Kuwait\'s desalination sector to reduce dependency on fossil fuels and promote environmental sustainability.', linkUrl: '/Dissertation on Renewable Energy in Kuwait.pdf' },
    { id: 5, title: 'Wordle!', description: 'A popular word guessing game with a built-in solving algorithm.', linkUrl: 'https://randy-eldrow.vercel.app' },
    { id: 6, title: 'Credit Risk Analysis System', description: 'This application is designed to analyze the credit risk of customers. This system leverages a database to store customer data, credit histories, and analysis results.', linkUrl: 'https://github.com/randyren278/CreditRiskAnalysis.git' },
    { id: 7, title: 'Rservation Management', description: 'A production-ready reservation system built with Next.js and Supabase. Handles customer booking, email confirmations, and admin management', linkUrl: 'https://float30-reservations.vercel.app/' },
  ];

  const handleProjectSelect = (id: number) => {
    const p = projects.find(pr => pr.id === id);
    if (!p) return;
    setSelectedProject(p);
    setModalType('project');
    setIsModalOpen(true);
    // Trigger modal animation by setting showModal after a brief delay
    setTimeout(() => setShowModal(true), 50);
  };

  const transitionToWorld = (targetWorld: WorldFocus) => {
    if (currentWorld === targetWorld || isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Change world at the peak of zoom out (when camera is farthest and can't see anything)
    setTimeout(() => {
      setCurrentWorld(targetWorld);
    }, 625); // Change world at 50% of transition (peak zoom out)
  };

  const handleGoToPirateWorld = () => {
    if (currentWorld !== 'pirate') {
      // Transition to pirate world first, then show resume modal
      transitionToWorld('pirate');
      setTimeout(() => {
        setModalType('resume');
        setIsModalOpen(true);
      }, 3333); // Wait for full transition to complete
    } else {
      // Already in pirate world, show resume modal immediately
      setModalType('resume');
      setIsModalOpen(true);
    }
  };

  const handleTransitionComplete = () => {
    setIsTransitioning(false);
  };

  const handleHomeClick = () => {
    if (isModalOpen) { closeModal(); return; }
    const order: WorldFocus[] = ['spacebase', 'pirate', 'castle'];
    const next = order[(order.indexOf(currentWorld) + 1) % order.length];
    transitionToWorld(next);
  };

  const handleAnimationComplete = (completed: boolean) => {
    setShowModal(completed);
  };

  // Close Castle menu on Escape for better UX
  useEffect(() => {
    if (!isCastleMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsCastleMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isCastleMenuOpen]);

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const initialCameraPosition: [number, number, number] = isMobile 
    ? (currentWorld === 'pirate' 
        ? [-13, 4, 13] 
        : currentWorld === 'castle' 
          ? [-10, 4, 10] 
          : [-10, 3, 10])
    : (currentWorld === 'castle' 
        ? [-7, 4, 7] 
        : [-7, 3, 7]);

  return (
    <div className="h-screen w-full relative" style={{ backgroundColor: '#1B1919' }}>
      <Canvas
        camera={{ position: initialCameraPosition, fov: 65 }}
        shadows
        gl={{ antialias: true }}
      >
        <UniversalLighting />
        
        <CameraZoomController 
          isTransitioning={isTransitioning}
          currentWorld={currentWorld}
          onTransitionComplete={handleTransitionComplete}
          isModalOpen={isModalOpen} 
          onAnimationComplete={handleAnimationComplete}
        />
        
        <Suspense fallback={null}>
          {currentWorld === 'spacebase' && (
            <SpaceBaseComponents onSoldierClick={handleAboutClick} />
          )}
          {currentWorld === 'pirate' && (
            <PirateWorldComponents onPirateClick={handlePirateClick} />
          )}
          {currentWorld === 'castle' && (
            <CastleWorldComponents onProjectClick={handleProjectSelect} />
          )}
        </Suspense>
        
        <CameraReset />
        
        <OrbitControls 
          enabled={!isModalOpen && !isTransitioning}
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          zoomSpeed={0.6}
          rotateSpeed={0.5}
          minDistance={3}
          maxDistance={200}
          maxPolarAngle={Math.PI * 0.75}
          minPolarAngle={Math.PI * 0.1}
          enableDamping={true}
          dampingFactor={0.05}
          autoRotate={false}
          autoRotateSpeed={0}
        />
      </Canvas>
      
      {modalType === 'about' && (
        <AboutModal isOpen={isModalOpen} onClose={closeModal} showModal={showModal} />
      )}
      {modalType === 'resume' && (
        <ResumeModal isOpen={isModalOpen} onClose={closeModal} showModal={showModal} />
      )}
      {modalType === 'project' && selectedProject && (
        <ProjectModal isOpen={isModalOpen} onClose={closeModal} showModal={showModal} title={selectedProject.title} description={selectedProject.description} linkUrl={selectedProject.linkUrl || ''} />
      )}
      {currentWorld === 'castle' && (
        <div className="absolute top-4 right-4 z-40">
          {/* Toggle button */}
          <button
            aria-label="Open projects menu"
            aria-haspopup="menu"
            aria-expanded={isCastleMenuOpen}
            onClick={() => setIsCastleMenuOpen((v) => !v)}
            className="w-10 h-10 flex flex-col items-center justify-center gap-1 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/15 transition-all focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            <span className="block w-6 h-[2px] bg-white/80" />
            <span className="block w-6 h-[2px] bg-white/80" />
            <span className="block w-6 h-[2px] bg-white/80" />
          </button>

          {/* Backdrop to close on outside click */}
          {isCastleMenuOpen && (
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsCastleMenuOpen(false)}
            />
          )}

          {/* Dropdown panel */}
          <div
            role="menu"
            aria-hidden={!isCastleMenuOpen}
            className={`absolute right-0 mt-2 min-w-[240px] rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl overflow-hidden transition-all duration-200 z-50 ${
              isCastleMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="py-2">
              {[0,1,2,3,4,5].map((id) => (
                <button
                  key={id}
                  role="menuitem"
                  onClick={() => { setIsCastleMenuOpen(false); handleProjectSelect(id); }}
                  className="w-full text-left px-4 py-2.5 text-sm text-white/90 hover:bg-white/15 hover:text-white transition-colors"
                >
                  {projects[id]?.title || `Project ${String.fromCharCode(65 + id)}`}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <div className="absolute top-4 left-4 bg-white/2 backdrop-blur-md rounded-2xl p-3 text-white/80 text-sm border border-white/10">
        <p>
          {currentWorld === 'spacebase' && '🚀 Click for my contact info!'}
          {currentWorld === 'pirate' && '🏴‍☠️ Click for my resume!'}
          {currentWorld === 'castle' && '🏰 Click for my projects!'}
        </p>
        <p className="text-xs text-white/60 mt-1">
          {isTransitioning ? '🌌 Traveling through space...' : 'Press Home to travel to another world!'}
        </p>
      </div>
      
      {/* Only show navbar when modal is not open */}
      {!isModalOpen && (
        <PortfolioNavbar
          onAboutClick={handleAboutClick}
          onContactClick={handleContactClick}
          onProjectsClick={handleProjectsClick}
          onHomeClick={handleHomeClick}
          onGoToPirateWorld={handleGoToPirateWorld} 
        />
      )}
    </div>
  );
}