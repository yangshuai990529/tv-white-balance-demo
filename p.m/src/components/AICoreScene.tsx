import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Instance, Instances, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { MotionValue } from 'framer-motion';

interface AICoreSceneProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

export const AICoreScene: React.FC<AICoreSceneProps> = ({ mouseX, mouseY }) => {
  const coreRef = useRef<THREE.Group>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (coreRef.current) {
      // Base rotation
      coreRef.current.rotation.y += delta * 0.2;
      
      // Mouse tracking (parallax)
      const targetX = mouseX.get() * 0.5;
      const targetY = -mouseY.get() * 0.5;
      
      coreRef.current.rotation.x = THREE.MathUtils.lerp(coreRef.current.rotation.x, targetY, 0.05);
      coreRef.current.rotation.z = THREE.MathUtils.lerp(coreRef.current.rotation.z, -targetX * 0.5, 0.05);
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.x -= delta * 0.3;
      outerRingRef.current.rotation.y += delta * 0.4;
    }
    
    if (innerRingRef.current) {
      innerRingRef.current.rotation.x += delta * 0.5;
      innerRingRef.current.rotation.y -= delta * 0.2;
    }
  });

  return (
    <group ref={coreRef}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        {/* Core Nucleus */}
        <mesh scale={1.5}>
          <icosahedronGeometry args={[1, 2]} />
          <MeshTransmissionMaterial 
            backside
            samples={4}
            thickness={1.2}
            chromaticAberration={0.025}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.1}
            temporalDistortion={0.2}
            clearcoat={1}
            attenuationDistance={2}
            attenuationColor="#000000"
            color="#2997FF"
            metalness={0.5}
            roughness={0.1}
          />
        </mesh>

        {/* Inner Wireframe Ring */}
        <mesh ref={innerRingRef} scale={1.8}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial 
            color="#2997FF" 
            wireframe 
            transparent 
            opacity={0.15}
          />
        </mesh>

        {/* Outer Ring */}
        <mesh ref={outerRingRef} scale={2.2}>
          <torusGeometry args={[1, 0.01, 16, 100]} />
          <meshStandardMaterial 
            color="#ffffff" 
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.3}
          />
        </mesh>
      </Float>
    </group>
  );
};
