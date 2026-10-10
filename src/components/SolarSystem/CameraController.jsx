import React, { useRef, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const CameraController = ({
  focusTarget,
  onBackToOverview,
  reducedMotion = false,
}) => {
  const controlsRef = useRef();
  const { camera } = useThree();

  // Default camera position
  const defaultPosition = useRef(new THREE.Vector3(11, 17, 33));
  const defaultTarget = useRef(new THREE.Vector3(0, 0, 0));

  // Smooth camera transition
  const targetPosition = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());
  const isTransitioning = useRef(false);
  const transitionSpeed = 2;

  // Handle focus on a planet
  const updateFocus = useCallback(() => {
    if (focusTarget) {
      const [x, y, z] = focusTarget.position;
      const planetRadius = focusTarget.data.radius;
      const viewDistance = Math.max(planetRadius * 6, 3);

      targetPosition.current.set(
        x + viewDistance * 0.5,
        y + viewDistance * 0.4,
        z + viewDistance * 0.7
      );
      targetLookAt.current.set(x, y, z);
      isTransitioning.current = true;
    } else {
      targetPosition.current.copy(defaultPosition.current);
      targetLookAt.current.copy(defaultTarget.current);
      isTransitioning.current = true;
    }
  }, [focusTarget]);

  // Watch for focusTarget changes
  React.useEffect(() => {
    updateFocus();
  }, [focusTarget, updateFocus]);

  useFrame((state, delta) => {
    if (isTransitioning.current && controlsRef.current) {
      const controls = controlsRef.current;
      const speed = transitionSpeed * delta;

      // Lerp camera position
      camera.position.lerp(targetPosition.current, speed);

      // Lerp controls target (look-at point)
      controls.target.lerp(targetLookAt.current, speed);
      controls.update();

      // Check if we've arrived
      const posDist = camera.position.distanceTo(targetPosition.current);
      const lookDist = controls.target.distanceTo(targetLookAt.current);

      if (posDist < 0.1 && lookDist < 0.1) {
        isTransitioning.current = false;
      }
    }

    // Subtle auto-rotation when not focused and not transitioning
    if (!focusTarget && !isTransitioning.current && controlsRef.current && !reducedMotion) {
      controlsRef.current.autoRotateSpeed = 0.22;
    } else if (controlsRef.current) {
      controlsRef.current.autoRotateSpeed = 0;
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.05}
      enablePan={false}
      minDistance={5}
      maxDistance={80}
      maxPolarAngle={Math.PI * 0.85}
      minPolarAngle={Math.PI * 0.1}
      autoRotate={!focusTarget}
      autoRotateSpeed={0.22}
      rotateSpeed={0.5}
      zoomSpeed={0.8}
    />
  );
};

export default CameraController;
