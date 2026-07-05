import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { MotionValue } from 'framer-motion';

interface FloatingParticlesProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({ mouseX, mouseY }) => {
  const ref = useRef<THREE.Points>(null);
  
  // Restrained particle count
  const count = 300;
  
  // Initial positions
  const { positions, originalPositions } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Create a localized cloud around the core (radius 2 to 4)
      const r = 2 + Math.random() * 2;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      
      orig[i * 3] = x;
      orig[i * 3 + 1] = y;
      orig[i * 3 + 2] = z;
    }
    return { positions: pos, originalPositions: orig };
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;

    // Slow ambient rotation
    ref.current.rotation.y -= delta * 0.05;
    
    // Calculate mouse distance from center
    const mX = mouseX.get();
    const mY = mouseY.get();
    const distToCenter = Math.sqrt(mX * mX + mY * mY);
    
    // When mouse approaches center (distToCenter -> 0), attract particles
    const attractionForce = Math.max(0, 1 - distToCenter * 2);

    const positionsArray = ref.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const ox = originalPositions[i3];
      const oy = originalPositions[i3 + 1];
      const oz = originalPositions[i3 + 2];
      
      // Time-based organic floating
      const t = state.clock.elapsedTime + i;
      const floatX = Math.sin(t * 0.5) * 0.2;
      const floatY = Math.cos(t * 0.3) * 0.2;
      const floatZ = Math.sin(t * 0.4) * 0.2;

      // Target position: original + float, mixed with center (0,0,0) based on attraction
      const targetX = THREE.MathUtils.lerp(ox + floatX, (ox + floatX) * 0.4, attractionForce);
      const targetY = THREE.MathUtils.lerp(oy + floatY, (oy + floatY) * 0.4, attractionForce);
      const targetZ = THREE.MathUtils.lerp(oz + floatZ, (oz + floatZ) * 0.4, attractionForce);

      // Smooth interpolation for inertia/damping feel
      positionsArray[i3] = THREE.MathUtils.lerp(positionsArray[i3], targetX, 0.02);
      positionsArray[i3 + 1] = THREE.MathUtils.lerp(positionsArray[i3 + 1], targetY, 0.02);
      positionsArray[i3 + 2] = THREE.MathUtils.lerp(positionsArray[i3 + 2], targetZ, 0.02);
    }
    
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#86868B"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  );
};
