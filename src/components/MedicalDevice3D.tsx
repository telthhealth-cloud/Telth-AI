import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface MedicalDevice3DProps {
  selectedColor: string;
  category: string;
}

// GLTF Model Component
const MedicalDeviceModel = ({ selectedColor, category }: MedicalDevice3DProps) => {
  const modelRef = useRef<THREE.Group>(null);
  
  // Load your GLTF model - replace '/models/your-model.glb' with your actual model path
  const { scene } = useGLTF('/models/futuristicstasispod3dmodel.glb');
  
  // Simple rotation animation
  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  // You can apply color to materials if needed
  // scene.traverse((child) => {
  //   if (child instanceof THREE.Mesh && child.material) {
  //     child.material.color.set(selectedColor);
  //   }
  // });

  return (
    <primitive 
      ref={modelRef}
      object={scene} 
      scale={1} // Adjust scale as needed for your model
      position={[0, 0, 0]}
    />
  );
};

// Animated background particles (optional - keep if you want)
const BackgroundParticles = () => {
  return (
    <>
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh 
          key={i}
          position={[
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 3,
            (Math.random() - 0.5) * 2
          ]}
        >
          <sphereGeometry args={[0.01, 8, 8]} />
          <meshStandardMaterial
            color="#00d4ff"
            emissive="#00d4ff"
            emissiveIntensity={0.5}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </>
  );
};

// Main Export Component - SIMPLIFIED
export default function MedicalDevice3D({ 
  selectedColor, 
  category 
}: MedicalDevice3DProps) {
  return (
  <div className="w-full h-[600px] md:h-[700px] lg:h-[800px] relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
    <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      {/* Your 3D scene - you can keep it consistent or make responsive */}
      <PerspectiveCamera makeDefault position={[5, 3, 5]} fov={50} />
      
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={4}
        autoRotate={true}
        autoRotateSpeed={0.5}
        enableDamping={true}
      />
      
      {/* Rest of your scene remains unchanged */}
      <ambientLight intensity={0.6} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[0, 5, 5]} intensity={0.5} color="#ffffff" />
      
      <Environment preset="night" />
      <fog attach="fog" args={['#0a1628', 5, 20]} />
      
      <MedicalDeviceModel 
        selectedColor={selectedColor} 
        category={category}
      />
      
      <BackgroundParticles />
      
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial 
          color="#0a1628" 
          metalness={0.3}
          roughness={0.6}
        />
      </mesh>
    </Canvas>
  </div>
);
}
useGLTF.preload("/models/futuristicstasispod3dmodel.glb");
