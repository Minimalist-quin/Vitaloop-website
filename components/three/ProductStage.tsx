"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, OrbitControls, RoundedBox } from "@react-three/drei";

/**
 * PLACEHOLDER geometry: a capsule stands in for the wearable until a real
 * GLB model exists. Swap for a loaded model and this stage (lighting,
 * camera, shadow) should need no changes.
 */
function WearablePlaceholder() {
  return (
    <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
      <capsuleGeometry args={[0.5, 1.2, 8, 32]} />
      <meshStandardMaterial color="#2a72de" metalness={0.4} roughness={0.25} />
    </mesh>
  );
}

/**
 * PLACEHOLDER geometry: a rounded body + head stand in for Robota until a
 * real GLB model exists.
 */
function RobotaPlaceholder() {
  return (
    <group>
      <RoundedBox
        args={[1.1, 1.4, 1]}
        radius={0.25}
        smoothness={4}
        position={[0, -0.15, 0]}
        castShadow
      >
        <meshStandardMaterial color="#efe6db" metalness={0.1} roughness={0.5} />
      </RoundedBox>
      <mesh position={[0, 0.85, 0]} castShadow>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshStandardMaterial color="#2a72de" metalness={0.3} roughness={0.3} />
      </mesh>
    </group>
  );
}

export type ProductStageDevice = "wearable" | "robota";

export interface ProductStageProps {
  /** Which placeholder model to show. */
  device?: ProductStageDevice;
  /** Disables auto-rotate and other continuous animation (reduced motion). */
  static?: boolean;
  className?: string;
  /** Fires once the WebGL renderer exists, i.e. first real frame. */
  onCreated?: () => void;
}

/**
 * A reusable, studio-lit stage for product 3D scenes. Keeps lighting and
 * camera setup in one place so the wearable, Robota and any future model
 * share identical staging. Rendered only on the client — see
 * ProductStageLazy for the lazy-loaded, poster-frame-fallback wrapper
 * every page should actually use.
 */
export function ProductStage({
  device = "wearable",
  static: isStatic = false,
  className,
  onCreated,
}: ProductStageProps) {
  return (
    <Canvas
      className={className}
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0, 4.5], fov: 35 }}
      gl={{ antialias: true }}
      onCreated={onCreated}
    >
      <color attach="background" args={["#211e1a"]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} castShadow />
      <pointLight position={[-4, -2, -3]} intensity={0.6} color="#5b94e8" />
      {device === "wearable" ? <WearablePlaceholder /> : <RobotaPlaceholder />}
      <ContactShadows position={[0, -0.9, 0]} opacity={0.5} blur={2.5} far={2} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={!isStatic}
        autoRotateSpeed={1.2}
      />
    </Canvas>
  );
}
