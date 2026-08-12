import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

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
  uniform vec3 uSunDirection;
  uniform vec3 uColor;
  
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  
  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);
    vec3 sunDir = normalize(uSunDirection);
    
    // Fresnel effect (glow at the edges)
    float fresnel = dot(viewDir, normal);
    fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
    fresnel = pow(fresnel, 3.0);
    
    // Light intensity based on sun direction
    float intensity = dot(normal, sunDir);
    float blend = smoothstep(-0.2, 0.5, intensity);
    
    // The dark side should still have a very subtle glow
    float finalAlpha = fresnel * (blend * 0.8 + 0.2);
    
    gl_FragColor = vec4(uColor, finalAlpha);
  }
`;

const Atmosphere = ({ sunPosition }) => {
  const materialRef = useRef();

  const uniforms = useMemo(() => ({
    uSunDirection: { value: new THREE.Vector3(1, 0, 0) },
    uColor: { value: new THREE.Color('#4d94ff') }
  }), []);

  useFrame((state) => {
    if (materialRef.current) {
      const sunDir = new THREE.Vector3().copy(sunPosition).normalize();
      sunDir.transformDirection(state.camera.matrixWorldInverse);
      materialRef.current.uniforms.uSunDirection.value.copy(sunDir);
    }
  });

  return (
    // Outer atmosphere halo
    <mesh>
      <sphereGeometry args={[2.2, 48, 48]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={atmosphereVertexShader}
        fragmentShader={atmosphereFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
      />
    </mesh>
  );
};

export default Atmosphere;
