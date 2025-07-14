// src/components/Preloader.tsx
import React, { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";
import "../styles/preloader.css";

// Props for Preloader
type PreloaderProps = {
  fadeOut?: boolean;
};

// Animated Cloud Loader (rotating spheres)
const CloudLoader = () => {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(() => {
    groupRef.current.rotation.y += 0.012;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <mesh position={[-0.6, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[0.6, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  );
};

// Text that always faces the camera and is responsive
const BillboardText = () => {
  const textRef = useRef<THREE.Mesh>(null!);
  const { viewport } = useThree();

  // Responsive font size based on screen width
  const fontSize = viewport.width < 6 ? 0.18 : 0.28;

  useFrame(({ camera }) => {
    if (textRef.current) {
      textRef.current.lookAt(camera.position);
    }
  });

  return (
    <Text
      ref={textRef}
      position={[0, -1.2, 0]}
      fontSize={fontSize}
      color="white"
      anchorX="center"
      anchorY="middle"
    >
      Loading Weather Magically... ☁️
    </Text>
  );
};

// Main Preloader component
const Preloader: React.FC<PreloaderProps> = ({ fadeOut = false }) => {
  return (
    <div className={`preloader ${fadeOut ? "fade-out" : ""}`}>
      <Canvas className="canvas-background" camera={{ position: [0, 0, 5] }}>
        <Stars radius={100} depth={50} count={5000} factor={2.5} saturation={0} fade />
        <ambientLight intensity={0.4} />
        <directionalLight position={[0, 2, 5]} intensity={0.8} />
        <CloudLoader />
        <BillboardText />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.23} />
      </Canvas>
    </div>
  );
};

export default Preloader;
