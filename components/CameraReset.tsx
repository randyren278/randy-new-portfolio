import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

function CameraReset() {
  const { camera } = useThree();
  const isResetting = useRef(false);
  
  // Get initial camera position based on screen size
  const getInitialPosition = (): [number, number, number] => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    return isMobile ? [-10, 3, 10] : [-7, 3, 7];
  };

  useEffect(() => {
    const handleResetCamera = () => {
      if (isResetting.current) return; // Prevent multiple resets
      
      isResetting.current = true;
      const initialPosition = getInitialPosition();
      const targetPosition = new THREE.Vector3(...initialPosition);
      const startPosition = camera.position.clone();
      const duration = 1000; // 1 second animation
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Smooth easing function
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        // Interpolate position
        camera.position.lerpVectors(startPosition, targetPosition, easeProgress);
        
        // Reset camera rotation/lookAt
        camera.lookAt(0, 0, 0);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          isResetting.current = false;
        }
      };
      
      animate();
    };

    // Listen for reset camera event
    window.addEventListener('resetCamera', handleResetCamera);
    
    // Cleanup
    return () => {
      window.removeEventListener('resetCamera', handleResetCamera);
    };
  }, [camera]);

  return null; // This component doesn't render anything
}

export default CameraReset;