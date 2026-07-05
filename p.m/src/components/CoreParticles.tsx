import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MotionValue } from 'framer-motion';

interface CoreParticlesProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  isHovering: boolean;
}

export const CoreParticles: React.FC<CoreParticlesProps> = ({ mouseX, mouseY, isHovering }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  
  const count = 40;
  const maxDistance = 1.2; // distance threshold for connecting lines
  
  // Use a custom class to store particle velocities
  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      // Position around the core (radius 1.8 to 2.5)
      const r = 1.8 + Math.random() * 0.7;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      data.push({
        position: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01
        ),
        originalR: r
      });
    }
    return data;
  }, [count]);

  const positions = useMemo(() => new Float32Array(count * 3), [count]);
  
  // Line segments can be at most count*(count-1)/2 lines. Each line needs 2 vertices (6 floats).
  const maxLines = (count * (count - 1)) / 2;
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);
  const lineColors = useMemo(() => new Float32Array(maxLines * 6), [maxLines]); // to handle fading opacity

  useFrame((state, delta) => {
    if (!pointsRef.current || !linesRef.current) return;
    
    // Magnetic field speed multiplier
    const speedMultiplier = isHovering ? 2.5 : 0.8;
    
    let lineIndex = 0;
    
    // Update particle positions
    for (let i = 0; i < count; i++) {
      const p = particles[i];
      
      // Update position with velocity
      p.position.addScaledVector(p.velocity, speedMultiplier);
      
      // Keep them within a certain radius sphere (bounce back softly)
      const dist = p.position.length();
      if (dist > 3.0) {
        p.velocity.addScaledVector(p.position, -0.001 * speedMultiplier);
      } else if (dist < 1.6) {
        p.velocity.addScaledVector(p.position, 0.002 * speedMultiplier);
      }
      
      // Add slight organic wandering
      p.velocity.x += (Math.random() - 0.5) * 0.001;
      p.velocity.y += (Math.random() - 0.5) * 0.001;
      p.velocity.z += (Math.random() - 0.5) * 0.001;
      
      // Cap velocity to prevent exploding
      p.velocity.clampLength(0, 0.02);

      positions[i * 3] = p.position.x;
      positions[i * 3 + 1] = p.position.y;
      positions[i * 3 + 2] = p.position.z;
    }
    
    // Check connections
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const p1 = particles[i].position;
        const p2 = particles[j].position;
        
        const dist = p1.distanceTo(p2);
        
        if (dist < maxDistance) {
          const alpha = 1.0 - (dist / maxDistance); // 0 to 1
          // We want opacity below 10%, so max alpha 0.1
          const colorVal = alpha * 0.1;
          
          linePositions[lineIndex * 6] = p1.x;
          linePositions[lineIndex * 6 + 1] = p1.y;
          linePositions[lineIndex * 6 + 2] = p1.z;
          
          linePositions[lineIndex * 6 + 3] = p2.x;
          linePositions[lineIndex * 6 + 4] = p2.y;
          linePositions[lineIndex * 6 + 5] = p2.z;
          
          // Using vertex colors for alpha fading
          lineColors[lineIndex * 6] = colorVal;
          lineColors[lineIndex * 6 + 1] = colorVal;
          lineColors[lineIndex * 6 + 2] = colorVal;
          
          lineColors[lineIndex * 6 + 3] = colorVal;
          lineColors[lineIndex * 6 + 4] = colorVal;
          lineColors[lineIndex * 6 + 5] = colorVal;
          
          lineIndex++;
        }
      }
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    linesRef.current.geometry.setDrawRange(0, lineIndex * 2);
    linesRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.geometry.attributes.color.needsUpdate = true;
    
    // Parallax rotation
    const targetRotX = -mouseY.get() * 0.05;
    const targetRotY = -mouseX.get() * 0.05;
    
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, targetRotX, 0.05);
    pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, targetRotY, 0.05);
    
    linesRef.current.rotation.copy(pointsRef.current.rotation);
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial 
          size={0.03} 
          color="#86868B" 
          transparent 
          opacity={0.3} 
          sizeAttenuation 
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={maxLines * 2} array={linePositions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={maxLines * 2} array={lineColors} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial 
          vertexColors 
          transparent 
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
};
