import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Starfield = ({ count = 3000, reducedMotion = false }) => {
  const meshRef = useRef();

  const { positions, sizes, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Distribute stars in a large sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 80 + Math.random() * 120; // Between 80 and 200 units away

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      // Varying sizes
      sz[i] = Math.random() * 0.8 + 0.1;

      // Subtle color variation (white to slight blue/warm)
      const colorVar = Math.random();
      if (colorVar > 0.9) {
        // Subtle blue stars
        col[i * 3] = 0.7;
        col[i * 3 + 1] = 0.8;
        col[i * 3 + 2] = 1.0;
      } else if (colorVar > 0.8) {
        // Warm stars
        col[i * 3] = 1.0;
        col[i * 3 + 1] = 0.9;
        col[i * 3 + 2] = 0.7;
      } else if (colorVar > 0.95) {
        // Cyan accent (rare)
        col[i * 3] = 0.4;
        col[i * 3 + 1] = 1.0;
        col[i * 3 + 2] = 0.85;
      } else {
        // White
        const brightness = 0.6 + Math.random() * 0.4;
        col[i * 3] = brightness;
        col[i * 3 + 1] = brightness;
        col[i * 3 + 2] = brightness;
      }
    }

    return { positions: pos, sizes: sz, colors: col };
  }, [count]);

  // Subtle rotation for depth
  useFrame((state, delta) => {
    if (reducedMotion) return;
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.003;
      meshRef.current.rotation.x += delta * 0.001;
    }
  });

  // Star sprite texture
  const starTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        map={starTexture}
        vertexColors
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
        size={0.5}
      />
    </points>
  );
};

// Nebula haze — subtle background cosmic gradient
export const NebulaHaze = () => {
  const spriteMaterial = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Soft purple/blue nebula
    const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
    gradient.addColorStop(0, 'rgba(30, 20, 80, 0.08)');
    gradient.addColorStop(0.5, 'rgba(20, 30, 60, 0.04)');
    gradient.addColorStop(1, 'rgba(10, 15, 30, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);

    const texture = new THREE.CanvasTexture(canvas);
    return new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);

  return (
    <group>
      <sprite material={spriteMaterial} position={[40, 20, -60]} scale={[80, 80, 1]} />
      <sprite material={spriteMaterial} position={[-50, -10, -80]} scale={[60, 60, 1]} />
      <sprite material={spriteMaterial} position={[10, -30, -90]} scale={[70, 70, 1]} />
    </group>
  );
};

export default Starfield;
