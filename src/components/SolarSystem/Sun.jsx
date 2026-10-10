import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Custom Sun shader with animated plasma effect
const sunVertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const sunFragmentShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  // Simple hash-based noise
  float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }
  
  float noise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    
    return mix(mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
                   mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
               mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                   mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
  }
  
  float fbm(vec3 p) {
    float f = 0.0;
    f += 0.5000 * noise(p); p *= 2.01;
    f += 0.2500 * noise(p); p *= 2.02;
    f += 0.1250 * noise(p); p *= 2.03;
    f += 0.0625 * noise(p);
    return f / 0.9375;
  }
  
  void main() {
    vec3 pos = vPosition * 2.0;
    
    // Animated turbulent noise
    float n1 = fbm(pos + vec3(uTime * 0.08, uTime * 0.05, 0.0));
    float n2 = fbm(pos * 1.5 + vec3(0.0, uTime * 0.06, uTime * 0.04));
    
    float combined = n1 * 0.7 + n2 * 0.3;
    
    // Sun color palette
    vec3 deepOrange = vec3(0.8, 0.2, 0.0);
    vec3 orange = vec3(1.0, 0.5, 0.0);
    vec3 brightYellow = vec3(1.0, 0.85, 0.2);
    vec3 white = vec3(1.0, 0.95, 0.75);
    
    vec3 color;
    float t = combined;
    if (t < 0.3) {
      color = mix(deepOrange, orange, t / 0.3);
    } else if (t < 0.6) {
      color = mix(orange, brightYellow, (t - 0.3) / 0.3);
    } else {
      color = mix(brightYellow, white, (t - 0.6) / 0.4);
    }
    
    // Edge glow for spherical feel  
    float rim = 1.0 - max(0.0, dot(vNormal, vec3(0.0, 0.0, 1.0)));
    rim = pow(rim, 2.0);
    color = mix(color, deepOrange * 0.8, rim * 0.4);
    
    // Make it emissive / bright
    color *= 1.8;
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

const Sun = ({ position = [0, 0, 0] }) => {
  const meshRef = useRef();
  const coronaRef = useRef();
  const corona2Ref = useRef();
  const flareRef = useRef();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
  }), []);

  // Corona glow sprite material
  const coronaMaterial = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, 'rgba(255, 200, 80, 0.8)');
    gradient.addColorStop(0.2, 'rgba(255, 150, 30, 0.5)');
    gradient.addColorStop(0.5, 'rgba(255, 80, 0, 0.2)');
    gradient.addColorStop(0.8, 'rgba(255, 40, 0, 0.05)');
    gradient.addColorStop(1, 'rgba(255, 20, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    const texture = new THREE.CanvasTexture(canvas);
    return new THREE.SpriteMaterial({
      map: texture,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 1.0,
      depthWrite: false,
    });
  }, []);

  const corona2Material = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, 'rgba(255, 120, 30, 0.4)');
    gradient.addColorStop(0.4, 'rgba(255, 60, 0, 0.15)');
    gradient.addColorStop(1, 'rgba(200, 20, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    const texture = new THREE.CanvasTexture(canvas);
    return new THREE.SpriteMaterial({
      map: texture,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
    });
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    uniforms.uTime.value = time;

    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.05;
    }

    // Pulsating corona
    if (coronaRef.current) {
      const pulse = 1 + Math.sin(time * 1.5) * 0.06;
      coronaRef.current.scale.set(8.2 * pulse, 8.2 * pulse, 1);
    }
    if (corona2Ref.current) {
      const pulse2 = 1 + Math.sin(time * 0.8 + 1) * 0.08;
      corona2Ref.current.scale.set(11.5 * pulse2, 11.5 * pulse2, 1);
    }
    if (flareRef.current) {
      flareRef.current.rotation.z = time * 0.08;
      flareRef.current.rotation.x = Math.sin(time * 0.18) * 0.16;
    }
  });

  return (
    <group position={position}>
      {/* Sun sphere with procedural shader */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.35, 64, 64]} />
        <shaderMaterial
          vertexShader={sunVertexShader}
          fragmentShader={sunFragmentShader}
          uniforms={uniforms}
        />
      </mesh>

      {/* Inner corona glow */}
      <sprite ref={coronaRef} material={coronaMaterial} />

      {/* Outer corona */}
      <sprite ref={corona2Ref} material={corona2Material} />

      {/* Thin plasma arcs add structure to the corona without extra textures. */}
      <group ref={flareRef}>
        <mesh rotation={[Math.PI / 2, 0.25, 0]}>
          <torusGeometry args={[2.65, 0.03, 8, 128, Math.PI * 1.35]} />
          <meshBasicMaterial color="#ffb33b" transparent opacity={0.7} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        <mesh rotation={[0.35, Math.PI / 2, 1.1]}>
          <torusGeometry args={[2.82, 0.022, 8, 128, Math.PI * 1.05]} />
          <meshBasicMaterial color="#fff0a8" transparent opacity={0.5} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      </group>

      {/* Main sunlight — strong enough to illuminate all planets */}
      <pointLight
        color="#ffeedd"
        intensity={100}
        distance={400}
        decay={1.0}
      />

      {/* Secondary fill light */}
      <pointLight
        color="#ff9944"
        intensity={30}
        distance={300}
        decay={1.0}
      />
    </group>
  );
};

export default Sun;
