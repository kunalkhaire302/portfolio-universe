import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const earthVertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  
  void main() {
    vUv = uv;
    // Calculate normal in view space
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const earthFragmentShader = `
  uniform sampler2D tDay;
  uniform sampler2D tNight;
  uniform sampler2D tSpecular;
  uniform vec3 uSunDirection;
  
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  
  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);
    vec3 sunDir = normalize(uSunDirection); // Sun direction in view space
    
    // Lighting intensity (Lambert)
    float intensity = dot(normal, sunDir);
    
    // Smooth day/night terminator
    // -0.1 to 0.2 creates a soft blend zone resembling twilight
    float blend = smoothstep(-0.1, 0.2, intensity);
    
    vec4 dayTex = texture2D(tDay, vUv);
    vec4 nightTex = texture2D(tNight, vUv);
    vec4 specTex = texture2D(tSpecular, vUv);
    
    // Specular highlight (oceans only)
    vec3 reflectDir = reflect(-sunDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
    // Multiply by blend so the night side doesn't have specular highlights
    vec3 specularHighlight = vec3(0.5) * spec * specTex.r * blend;
    
    // City lights boost: make night lights punchier
    vec3 nightColor = nightTex.rgb * 1.5;
    // Base day color
    vec3 dayColor = dayTex.rgb;
    
    // Mix based on sun angle
    vec3 finalColor = mix(nightColor, dayColor, blend);
    finalColor += specularHighlight;
    
    // Very subtle atmospheric rim on the solid earth itself
    float rim = 1.0 - max(dot(viewDir, normal), 0.0);
    rim = smoothstep(0.6, 1.0, rim);
    finalColor += vec3(0.1, 0.4, 0.8) * rim * 0.3 * blend;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

const Earth = ({ isPaused, sunPosition }) => {
  const earthRef = useRef();
  const materialRef = useRef();

  // Load high-res textures
  const [dayMap, nightMap, specularMap] = useTexture([
    'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
    'https://unpkg.com/three-globe/example/img/earth-night.jpg',
    'https://unpkg.com/three-globe/example/img/earth-water.png'
  ]);

  const uniforms = useMemo(() => ({
    tDay: { value: dayMap },
    tNight: { value: nightMap },
    tSpecular: { value: specularMap },
    uSunDirection: { value: new THREE.Vector3(1, 0, 0) }
  }), [dayMap, nightMap, specularMap]);

  useFrame((state, delta) => {
    if (!isPaused && earthRef.current) {
      // Natural slow rotation
      earthRef.current.rotation.y += delta * 0.02;
    }

    if (materialRef.current) {
      // Calculate sun direction in view space so it works with camera rotation
      const sunDir = new THREE.Vector3().copy(sunPosition).normalize();
      sunDir.transformDirection(state.camera.matrixWorldInverse);
      materialRef.current.uniforms.uSunDirection.value.copy(sunDir);
    }
  });

  return (
    <mesh ref={earthRef} rotation={[0, -Math.PI / 2, 0]}>
      {/* 48 segments for high definition sphere but optimized performance */}
      <sphereGeometry args={[2, 48, 48]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={earthVertexShader}
        fragmentShader={earthFragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

export default Earth;
