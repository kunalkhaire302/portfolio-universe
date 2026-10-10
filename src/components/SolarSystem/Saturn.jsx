import React, { useRef, useMemo, useState, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { getProceduralTexture, generateSaturnRingTexture } from './ProceduralTextures';

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

const Saturn = ({
  data,
  onPlanetClick,
  selectedPlanet,
  reducedMotion = false,
}) => {
  const groupRef = useRef();
  const planetRef = useRef();
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
    ringInnerRadius,
    ringOuterRadius,
  } = data;

  // Planet texture
  const texture = useMemo(() => {
    const canvas = getProceduralTexture(name);
    if (!canvas) return null;
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }, [name]);

  // Ring texture
  const ringTexture = useMemo(() => {
    const canvas = generateSaturnRingTexture();
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    return tex;
  }, []);

  // Atmosphere
  const atmosphereUniforms = useMemo(() => {
    if (!atmosphereColor) return null;
    return {
      uColor: { value: new THREE.Color(atmosphereColor) },
      uIntensity: { value: 1.2 },
    };
  }, [atmosphereColor]);

  useFrame((state, delta) => {
    if (reducedMotion) return;

    orbitAngleRef.current += orbitSpeed * delta * 0.3;
    const angle = orbitAngleRef.current;

    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(angle) * orbitRadius;
      groupRef.current.position.z = Math.sin(angle) * orbitRadius;
      groupRef.current.position.y = Math.sin(angle) * orbitInclination * orbitRadius * 0.15;
    }

    if (planetRef.current) {
      planetRef.current.rotation.y += rotationSpeed;
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
  const displayRadius = hovered ? radius * 1.1 : radius;

  return (
    <group ref={groupRef}>
      {/* Planet body with tilt for ring inclination */}
      <group rotation={[0.45, 0, 0.1]}>
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
            clearcoat={0.1}
            clearcoatRoughness={0.55}
          />
        </mesh>

        {/* Atmosphere glow */}
        {atmosphereColor && atmosphereUniforms && (
          <mesh scale={[displayRadius * 1.12, displayRadius * 1.12, displayRadius * 1.12]}>
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

        {/* Rings */}
        {ringInnerRadius && ringOuterRadius && (
          <>
            {/* Top side of ring */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[ringInnerRadius, ringOuterRadius, 128]} />
              <meshStandardMaterial
                map={ringTexture}
                transparent
                opacity={0.7}
                side={THREE.DoubleSide}
                depthWrite={false}
                roughness={0.8}
                metalness={0.1}
                emissive={hovered ? color : '#000000'}
                emissiveIntensity={hovered ? 0.2 : 0}
              />
            </mesh>
          </>
        )}
      </group>

      {/* Hover tooltip (outside tilt group so it stays upright) */}
      {hovered && !isSelected && (
        <Html
          position={[0, displayRadius + 1.0, 0]}
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
              {data.facts.moons} moons • {ringInnerRadius ? 'Ringed planet' : data.type}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};

export default Saturn;
