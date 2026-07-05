import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MotionValue } from 'framer-motion';

interface AppleAICoreProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  isHovering: boolean;
}

export const AppleAICore: React.FC<AppleAICoreProps> = ({ mouseX, mouseY, isHovering }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  
  // Custom abstract geometry: A slightly deformed smooth knot or sphere
  const geometry = useMemo(() => {
    // A TorusKnot provides a complex, organic "brain-like" folded structure
    const geo = new THREE.TorusKnotGeometry(1.2, 0.4, 256, 64, 2, 3);
    // Smooth it out even more
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current || !materialRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // 1. Slow breathing (scale 1.0 -> 1.02, period 6-8s)
    // Math.sin(time) goes -1 to 1. We want 1.0 to 1.02
    // scale = 1.01 + 0.01 * sin(time * PI / 3.5)
    const scale = 1.01 + 0.01 * Math.sin(time * (Math.PI / 3.5));
    meshRef.current.scale.set(scale, scale, scale);

    // 2. Slow rotation
    meshRef.current.rotation.y += delta * 0.05;
    meshRef.current.rotation.x += delta * 0.02;

    // 3. Mouse interaction (leans less than 4 degrees towards cursor)
    // 4 degrees is ~0.07 radians
    const targetRotX = -mouseY.get() * 0.07;
    const targetRotZ = -mouseX.get() * 0.07;
    
    // Spring-like damping settling
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, 0.03);
    meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, targetRotZ, 0.03);

    // 4. Magnetic Field effect
    // When hovering, material gets slightly brighter, reflection changes
    const targetRoughness = isHovering ? 0.05 : 0.15;
    const targetTransmission = isHovering ? 1.0 : 0.95;
    const targetEmissive = isHovering ? 0.1 : 0.0;
    
    materialRef.current.roughness = THREE.MathUtils.lerp(materialRef.current.roughness, targetRoughness, 0.05);
    materialRef.current.transmission = THREE.MathUtils.lerp(materialRef.current.transmission, targetTransmission, 0.05);
    materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(materialRef.current.emissiveIntensity, targetEmissive, 0.05);
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshPhysicalMaterial 
        ref={materialRef}
        color="#ffffff"
        emissive="#2997FF"
        emissiveIntensity={0}
        metalness={0.1}
        roughness={0.15}
        transmission={0.95} // glass-like
        ior={1.5}          // index of refraction for glass
        thickness={2.5}      // volume thickness for refraction
        attenuationColor="#a6d4ff" // subtle cold blue tint inside
        attenuationDistance={3}
        clearcoat={1.0}
        clearcoatRoughness={0.1}
      />
    </mesh>
  );
};
