import React, { useMemo } from 'react';
import * as THREE from 'three';

const Orbit = ({ radius, inclination = 0, highlighted = false }) => {
  const points = useMemo(() => {
    const segments = 128;
    const pts = [];
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.sin(angle) * inclination * radius * 0.15;
      pts.push(new THREE.Vector3(x, y, z));
    }
    return pts;
  }, [radius, inclination]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, [points]);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial
        color={highlighted ? '#64ffda' : '#ffffff'}
        transparent
        opacity={highlighted ? 0.25 : 0.06}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </line>
  );
};

export default Orbit;
