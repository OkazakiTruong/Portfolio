import { Canvas, useFrame, extend, Object3DNode } from "@react-three/fiber";
import { useTexture, OrbitControls, shaderMaterial, Stars } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

// Shader Material for atmosphere glow effect
const AtmosphereMaterial = shaderMaterial(
  { 
    glowColor: new THREE.Color(0.2, 0.6, 1.0)
  },
  // Vertex shader
  `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // Fragment shader  
  `
  varying vec3 vNormal;
  uniform vec3 glowColor;
  void main() {
    float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 4.0);
    gl_FragColor = vec4(glowColor, intensity);
  }
  `
);

extend({ AtmosphereMaterial });

// Type declaration for custom shader material
declare module '@react-three/fiber' {
  interface ThreeElements {
    atmosphereMaterial: Object3DNode<THREE.ShaderMaterial, typeof AtmosphereMaterial>;
  }
}

function Atmosphere() {
  return (
    <mesh scale={1.3}>
      <sphereGeometry args={[3, 50, 50]} />
      <atmosphereMaterial 
        attach="material"
        side={THREE.BackSide}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const [earthTexture, cloudsTexture] = useTexture([
    "/img/earth_img.png",
    "/img/cloud.jpg",
  ]);

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += hovered ? 0.01 : 0.002;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += hovered ? 0.012 : 0.0025;
    }
  });

  return (
    <group>
      <mesh 
        ref={earthRef}
        onPointerOver={() => setHovered(true)} 
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[3, 50, 50]} />
        <meshStandardMaterial map={earthTexture} />
      </mesh>

      <mesh ref={cloudsRef} scale={1.02}>
        <sphereGeometry args={[3, 50, 50]} />
        <meshStandardMaterial 
          map={cloudsTexture}
          transparent
          opacity={0.2}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function StarBackground() {
  return (
    <Stars 
      radius={200}
      depth={60}
      count={5000}
      factor={4}
    />
  );
}

export default function EarthThree() {
  return (
    <div className="h-full">
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ambientLight intensity={2} />
        <directionalLight position={[5, 5, 5]} intensity={4} />
        <StarBackground />
        <Earth />
        <Atmosphere />
        <OrbitControls 
          rotateSpeed={1}
          zoomSpeed={1.5}
          panSpeed={1}
        />
      </Canvas>
    </div>
  );
}
