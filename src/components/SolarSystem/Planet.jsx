import React, { useRef, useMemo, useState, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { getProceduralTexture, generateEarthClouds } from './ProceduralTextures';

// Atmosphere glow shader (Fresnel rim)
const atmosphereVertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const atmosphereFragmentShader = `
  uniform vec3 uColor;
  uniform float uIntensity;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  
  void main() {
    vec3 viewDir = normalize(vViewPosition);
    float fresnel = 1.0 - abs(dot(viewDir, vNormal));
    fresnel = pow(fresnel, 3.0) * uIntensity;
    gl_FragColor = vec4(uColor, fresnel);
  }
`;

const Planet = ({
  data,
  onPlanetClick,
  selectedPlanet,
  reducedMotion = false,
}) => {
  const groupRef = useRef();
  const planetRef = useRef();
  const cloudRef = useRef();
  const orbitAngleRef = useRef(Math.random() * Math.PI * 2);
  const [hovered, setHovered] = useState(false);

  const {
    name,
    radius,
    orbitRadius,
    orbitSpeed,
    rotationSpeed,
    orbitInclination,
    color,
    emissive,
    atmosphereColor,
  } = data;

  // Generate procedural texture
  const texture = useMemo(() => {
    const canvas = getProceduralTexture(name);
    if (!canvas) return null;
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }, [name]);

  // Earth cloud layer
  const cloudTexture = useMemo(() => {
    if (name !== 'Earth') return null;
    const canvas = generateEarthClouds();
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }, [name]);

  // Atmosphere uniforms
  const atmosphereUniforms = useMemo(() => {
    if (!atmosphereColor) return null;
    const c = new THREE.Color(atmosphereColor);
    return {
      uColor: { value: c },
      uIntensity: { value: 1.5 },
    };
  }, [atmosphereColor]);

  // Animation
  useFrame((state, delta) => {
    if (reducedMotion) return;

    // Orbital movement
    orbitAngleRef.current += orbitSpeed * delta * 0.3;
    const angle = orbitAngleRef.current;

    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(angle) * orbitRadius;
      groupRef.current.position.z = Math.sin(angle) * orbitRadius;
      groupRef.current.position.y = Math.sin(angle) * orbitInclination * orbitRadius * 0.15;
    }

    // Self-rotation
    if (planetRef.current) {
      planetRef.current.rotation.y += rotationSpeed;
    }

    // Cloud rotation (slightly faster for Earth)
    if (cloudRef.current) {
      cloudRef.current.rotation.y += rotationSpeed * 1.2;
    }
  });

  const handleClick = useCallback((e) => {
    e.stopPropagation();
    if (onPlanetClick) {
      const pos = groupRef.current?.position;
      onPlanetClick(data, pos ? [pos.x, pos.y, pos.z] : [0, 0, 0]);
    }
  }, [data, onPlanetClick]);

  const handlePointerOver = useCallback((e) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
  }, []);

  const handlePointerOut = useCallback(() => {
    setHovered(false);
    document.body.style.cursor = 'auto';
  }, []);

  const isSelected = selectedPlanet?.name === name;
  const displayRadius = radius * (hovered ? 1.3 : 1.18);

  return (
    <group ref={groupRef}>
      {/* Planet sphere */}
      <mesh
        ref={planetRef}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        scale={[displayRadius, displayRadius, displayRadius]}
      >
        <sphereGeometry args={[1, 48, 48]} />
        <meshPhysicalMaterial
          map={texture}
          color={texture ? '#ffffff' : color}
          emissive={hovered ? color : (emissive || color)}
          emissiveIntensity={hovered ? 0.42 : 0.16}
          roughness={0.72}
          metalness={0.0}
          clearcoat={name === 'Earth' ? 0.35 : 0.08}
          clearcoatRoughness={0.5}
        />
      </mesh>

      {/* Earth cloud layer */}
      {name === 'Earth' && cloudTexture && (
        <mesh ref={cloudRef} scale={[displayRadius * 1.02, displayRadius * 1.02, displayRadius * 1.02]}>
          <sphereGeometry args={[1, 48, 48]} />
          <meshStandardMaterial
            map={cloudTexture}
            transparent
            opacity={0.4}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Atmosphere glow (Fresnel rim) */}
      {atmosphereColor && atmosphereUniforms && (
        <mesh scale={[displayRadius * 1.15, displayRadius * 1.15, displayRadius * 1.15]}>
          <sphereGeometry args={[1, 32, 32]} />
          <shaderMaterial
            vertexShader={atmosphereVertexShader}
            fragmentShader={atmosphereFragmentShader}
            uniforms={atmosphereUniforms}
            transparent
            side={THREE.BackSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}

      {/* Hover tooltip */}
      {hovered && !isSelected && (
        <Html
          position={[0, displayRadius + 0.6, 0]}
          center
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          <div style={{
            background: 'rgba(10, 15, 30, 0.85)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(100, 255, 218, 0.3)',
            borderRadius: '10px',
            padding: '10px 16px',
            color: '#e6f1ff',
            fontFamily: 'Avenir Next, Segoe UI, sans-serif',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
          }}>
            <div style={{
              fontSize: '13px',
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#64ffda',
              marginBottom: '4px',
            }}>
              {name}
            </div>
            <div style={{ fontSize: '10px', color: '#8892b0' }}>
              {data.facts.distance} from Sun
            </div>
            <div style={{ fontSize: '10px', color: '#8892b0' }}>
              ⌀ {data.facts.diameter}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};

export default Planet;
