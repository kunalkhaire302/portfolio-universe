import React, { useState, useCallback, useMemo, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';

import Sun from './Sun';
import Planet from './Planet';
import Saturn from './Saturn';
import Orbit from './Orbit';
import Starfield, { NebulaHaze } from './Starfield';
import CameraController from './CameraController';
import PlanetInfoPanel from './PlanetInfoPanel';
import { planetData } from '../../data/planetData';

// Detect reduced motion preference
const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Detect if mobile
const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

const SolarSystemScene = ({ selectedPlanet, onPlanetClick, reducedMotion }) => {
  const isMobile = useMemo(() => isMobileDevice(), []);
  const starCount = isMobile ? 800 : 3000;

  // On mobile, show fewer planets for performance
  const visiblePlanets = useMemo(() => {
    if (isMobile) {
      return planetData.filter(p =>
        ['Earth', 'Mars', 'Jupiter', 'Saturn'].includes(p.name)
      );
    }
    return planetData;
  }, [isMobile]);

  return (
    <>
      {/* Ambient light for visibility on dark sides */}
      <ambientLight intensity={0.25} color="#3a4a6a" />

      {/* Hemisphere light for subtle fill */}
      <hemisphereLight args={['#445577', '#0a0a1a', 0.4]} />

      {/* Sun */}
      <Sun position={[0, 0, 0]} />

      {/* Orbital paths */}
      {visiblePlanets.map((planet) => (
        <Orbit
          key={`orbit-${planet.name}`}
          radius={planet.orbitRadius}
          inclination={planet.orbitInclination}
          highlighted={selectedPlanet?.name === planet.name}
        />
      ))}

      {/* Planets */}
      {visiblePlanets.map((planet) => {
        if (planet.hasRings) {
          return (
            <Saturn
              key={planet.name}
              data={planet}
              onPlanetClick={onPlanetClick}
              selectedPlanet={selectedPlanet}
              reducedMotion={reducedMotion}
            />
          );
        }
        return (
          <Planet
            key={planet.name}
            data={planet}
            onPlanetClick={onPlanetClick}
            selectedPlanet={selectedPlanet}
            reducedMotion={reducedMotion}
          />
        );
      })}

      {/* Starfield */}
      <Starfield count={starCount} reducedMotion={reducedMotion} />
      {!isMobile && (
        <>
          <NebulaHaze />
          <Sparkles count={90} scale={[48, 18, 48]} size={2.2} speed={0.12} opacity={0.45} color="#8be9ff" />
        </>
      )}

      {/* Post-processing */}
      <EffectComposer disableNormalPass multisampling={0}>
        <Bloom
          intensity={1.35}
          luminanceThreshold={0.42}
          luminanceSmoothing={0.7}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.12} darkness={0.55} />
      </EffectComposer>
    </>
  );
};

const SolarSystem = () => {
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [focusTarget, setFocusTarget] = useState(null);
  const reducedMotion = useMemo(() => prefersReducedMotion(), []);

  const handlePlanetClick = useCallback((planetData, position) => {
    setSelectedPlanet(planetData);
    setFocusTarget({ data: planetData, position });
  }, []);

  const handleClose = useCallback(() => {
    setSelectedPlanet(null);
    setFocusTarget(null);
  }, []);

  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{
          position: [15, 20, 35],
          fov: 45,
          near: 0.1,
          far: 500,
        }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]}
        style={{
          background: 'transparent',
          touchAction: 'pan-y',
        }}
      >
        <Suspense fallback={null}>
          <SolarSystemScene
            selectedPlanet={selectedPlanet}
            onPlanetClick={handlePlanetClick}
            reducedMotion={reducedMotion}
          />
          <CameraController
            focusTarget={focusTarget}
            reducedMotion={reducedMotion}
          />
        </Suspense>
      </Canvas>

      {/* Planet info panel overlay (HTML, outside Canvas) */}
      <PlanetInfoPanel
        planet={selectedPlanet}
        onClose={handleClose}
      />
    </div>
  );
};

export default SolarSystem;
