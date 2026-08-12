import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const Clouds = ({ isPaused }) => {
  const cloudsRef = useRef();
  
  // Use a reliable cloud map from the three.js examples repository
  const cloudMap = useTexture('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png');

  useFrame((state, delta) => {
    if (!isPaused && cloudsRef.current) {
      // Clouds rotate slightly faster than the Earth to create parallax/weather movement
      cloudsRef.current.rotation.y += delta * 0.025;
    }
  });

  return (
    <mesh ref={cloudsRef} rotation={[0, 0, 0]}>
      {/* Slightly larger than Earth (radius 2.0), optimized segments */}
      <sphereGeometry args={[2.02, 48, 48]} />
      <meshStandardMaterial
        map={cloudMap}
        transparent
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending} // Additive blending works great for clouds against dark space
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default Clouds;
