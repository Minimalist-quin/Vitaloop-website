"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, OrbitControls } from "@react-three/drei";

/**
 * PLACEHOLDER geometry: a capsule stands in for the wearable until a real
 * GLB model exists. Swap <PlaceholderDevice> for a loaded model and this
 * stage (lighting, camera, shadow) should need no changes.
 */
function PlaceholderDevice() {
  return (
    <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
      <capsuleGeometry args={[0.5, 1.2, 8, 32]} />
      <meshStandardMaterial color="#2fa786" metalness={0.4} roughness={0.25} />
    </mesh>
  );
}

export interface ProductStageProps {
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
      <color attach="background" args={["#0a0b0b"]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} castShadow />
      <pointLight position={[-4, -2, -3]} intensity={0.6} color="#4fc3a1" />
      <PlaceholderDevice />
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
