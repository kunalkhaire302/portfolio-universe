import React, { useState, Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, ToneMapping } from '@react-three/postprocessing';
import * as THREE from 'three';

import Earth from './Earth';
import Atmosphere from './Atmosphere';
import Clouds from './Clouds';
import EarthUI from './EarthUI';

// Reuse Starfield from the SolarSystem components
import Starfield, { NebulaHaze } from '../SolarSystem/Starfield';

// A simple component to manage the camera reset
const CameraManager = ({ resetTrigger }) => {
  const controlsRef = useRef();

  // Reset camera to default position when trigger changes
  React.useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  }, [resetTrigger]);

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={false}
      minDistance={3.5}
      maxDistance={8}
      enableDamping={true}
      dampingFactor={0.05}
      rotateSpeed={0.5}
      autoRotate={false} // We handle auto-rotation manually in the Earth components
    />
  );
};

const EarthScene = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [infoPanelOpen, setInfoPanelOpen] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);

  // Position the sun to create a beautiful terminator line (day/night transition)
  const sunPosition = new THREE.Vector3(5, 2, 3);

  const resetView = () => {
    setResetTrigger(prev => prev + 1);
  };

  return (
    <div className="relative w-full h-full min-h-[500px]">
      
      {/* UI Overlay */}
      <EarthUI 
        isPaused={isPaused}
        setIsPaused={setIsPaused}
        resetView={resetView}
        infoPanelOpen={infoPanelOpen}
        setInfoPanelOpen={setInfoPanelOpen}
      />

      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]} // Capped pixel ratio to prevent extreme GPU load on 4K/retina screens
      >
        <Suspense fallback={null}>
          <color attach="background" args={['#050811']} />
          
          <ambientLight intensity={0.02} color="#ffffff" />
          <directionalLight
            position={sunPosition}
            intensity={2.5}
            color="#ffffff"
          />

          <group onClick={() => setInfoPanelOpen(true)}>
            <Earth isPaused={isPaused} sunPosition={sunPosition} />
            <Clouds isPaused={isPaused} />
            <Atmosphere sunPosition={sunPosition} />
          </group>

          <Starfield count={1500} />
          <NebulaHaze />

          <CameraManager resetTrigger={resetTrigger} />
          <Preload all />

          {/* Cinematic Post-Processing - Removed multisampling for massive performance boost */}
          <EffectComposer disableNormalPass multisampling={0}>
            <Bloom 
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              intensity={0.5}
              mipmapBlur
            />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default EarthScene;
