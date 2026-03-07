/* eslint-disable react/no-unknown-property */
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import {
  Physics,
  RigidBody,
  BallCollider,
  CuboidCollider,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";

extend({ MeshLineGeometry, MeshLineMaterial });

// ─────────────────────────────────────────────────────────────────────────────
// Assets
// ─────────────────────────────────────────────────────────────────────────────
const CARD_GLB = "/lanyard/card.glb";
const CARD_IMG = "/lanyard/lanyard.png";
const ROPE_IMG = "/lanyard/lanyard.png";

// ─────────────────────────────────────────────────────────────────────────────
// Tuning / Constants
// ─────────────────────────────────────────────────────────────────────────────
const CARD_W = 1.6;
const CARD_H = 2.25;

const BAND_LENGTH = 1.6;
const ROPE_SEGMENTS = 4;
const SEG_LENGTH = BAND_LENGTH / ROPE_SEGMENTS;

const MOBILE_BREAKPOINT = 768;

const ANCHOR_POS = [0, 0.9, 0];
const J1_POS = [0, 0.4, 0];
const J2_POS = [0, -0.1, 0];
const J3_POS = [0, -0.6, 0];
const CARD_POS = [0, -1.15, 0];
const GROUP_POS = [0, 1.6, 0];

const VEC2_ZERO = new THREE.Vector2();
const IDENTITY_QUAT = new THREE.Quaternion();

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/** Projects pointer to a world plane at Z = planeZ */
function pointerToWorldOnZPlane(pointer, camera, planeZ, out) {
  out.set(pointer.x, pointer.y, 0.5);
  out.unproject(camera);

  out.sub(camera.position).normalize();

  const dz = out.z;
  if (Math.abs(dz) < 1e-5) {
    return out.copy(camera.position);
  }

  const t = (planeZ - camera.position.z) / dz;
  return out.multiplyScalar(t).add(camera.position);
}

function configureTexture(texture, { repeatX = 1, repeatY = 1, flipY = false } = {}) {
  if (!texture) return;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeatX, repeatY);
  texture.flipY = flipY;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
}

function useIsMobile(breakpoint = MOBILE_BREAKPOINT) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < breakpoint
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);

  return isMobile;
}

// ─────────────────────────────────────────────────────────────────────────────
// Root
// ─────────────────────────────────────────────────────────────────────────────
export default function Lanyard({
  position = [0, 0, 4.8],
  gravity = [0, -40, 0],
  fov = 45,
  transparent = true,
}) {
  const isMobile = useIsMobile();

  const dpr = useMemo(() => [1, isMobile ? 1.5 : 2], [isMobile]);

  const handleCreated = useCallback(
    ({ gl }) => {
      gl.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
      gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1);
      gl.outputColorSpace = THREE.SRGBColorSpace;
    },
    [isMobile, transparent]
  );

  return (
    <div className="h-full min-h-[260px] w-full overflow-hidden rounded-2xl sm:min-h-[360px]">
      <Canvas
        camera={{ position, fov }}
        dpr={dpr}
        gl={{ alpha: transparent, antialias: true, powerPreference: "high-performance" }}
        onCreated={handleCreated}
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 6, 6]} intensity={1.1} />
        <directionalLight position={[-4, 4, -4]} intensity={0.35} />

        <Suspense fallback={null}>
          <Physics
            gravity={gravity}
            timeStep={isMobile ? 1 / 30 : 1 / 60}
            interpolate
          >
            <Band isMobile={isMobile} />
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Band
// ─────────────────────────────────────────────────────────────────────────────
function Band({ isMobile = false }) {
  const bandRef = useRef(null);
  const fixedRef = useRef(null);
  const j1Ref = useRef(null);
  const j2Ref = useRef(null);
  const j3Ref = useRef(null);
  const cardBodyRef = useRef(null);

  const { size, camera } = useThree();

  const { nodes, materials } = useGLTF(CARD_GLB);

  const ropeTexture = useTexture(ROPE_IMG);
  const cardTexture = useTexture(CARD_IMG);

  useEffect(() => {
    configureTexture(ropeTexture, { repeatX: -4, repeatY: 1, flipY: false });
    configureTexture(cardTexture, { repeatX: 1, repeatY: 1, flipY: true });
  }, [ropeTexture, cardTexture]);

  // ── Stable reusable objects (important for performance)
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]),
    []
  );

  const resolution = useMemo(
    () => new THREE.Vector2(size.width, size.height),
    [size.width, size.height]
  );

  const tempWorldPoint = useMemo(() => new THREE.Vector3(), []);
  const tempTarget1 = useMemo(() => new THREE.Vector3(), []);
  const tempTarget2 = useMemo(() => new THREE.Vector3(), []);
  const currentQuat = useMemo(() => new THREE.Quaternion(), []);

  const lerp1 = useRef(new THREE.Vector3());
  const lerp2 = useRef(new THREE.Vector3());
  const lerpInit = useRef(false);

  const smoothPos = useRef(new THREE.Vector3());
  const dragOffset = useRef(new THREE.Vector3());
  const dragPlaneZ = useRef(0);

  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);

  // ── Joints
  useRopeJoint(fixedRef, j1Ref, [[0, 0, 0], [0, 0, 0], SEG_LENGTH]);
  useRopeJoint(j1Ref, j2Ref, [[0, 0, 0], [0, 0, 0], SEG_LENGTH]);
  useRopeJoint(j2Ref, j3Ref, [[0, 0, 0], [0, 0, 0], SEG_LENGTH]);
  useSphericalJoint(j3Ref, cardBodyRef, [[0, 0, 0], [0, CARD_H / 2, 0]]);

  // ── Cursor UX
  useEffect(() => {
    document.body.style.cursor = hovered ? (dragging ? "grabbing" : "grab") : "auto";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered, dragging]);

  // ── Pointer handlers
  const handlePointerDown = useCallback((e) => {
    e.stopPropagation();
    e.target.setPointerCapture?.(e.pointerId);

    const rb = cardBodyRef.current;
    if (!rb) return;

    const pos = rb.translation();
    dragPlaneZ.current = pos.z;

    dragOffset.current.set(
      e.point.x - pos.x,
      e.point.y - pos.y,
      e.point.z - pos.z
    );

    smoothPos.current.set(pos.x, pos.y, pos.z);

    rb.wakeUp?.();
    j1Ref.current?.wakeUp?.();
    j2Ref.current?.wakeUp?.();
    j3Ref.current?.wakeUp?.();

    setDragging(true);
  }, []);

  const handlePointerUp = useCallback((e) => {
    e.stopPropagation();
    e.target.releasePointerCapture?.(e.pointerId);
    setDragging(false);

    const rb = cardBodyRef.current;
    rb?.wakeUp?.();
  }, []);

  // ── Shared props
  const segmentProps = useMemo(
    () => ({
      type: "dynamic",
      canSleep: true,
      colliders: false,
      angularDamping: 4,
      linearDamping: 4,
    }),
    []
  );

  const frontMaterialProps = useMemo(
    () => ({
      map: cardTexture,
      side: THREE.FrontSide,
      roughness: 0.82,
      metalness: 0.08,
      clearcoat: isMobile ? 0.2 : 0.8,
      clearcoatRoughness: 0.14,
      toneMapped: false,
    }),
    [cardTexture, isMobile]
  );

  useFrame((state, dt) => {
    const safeDt = Math.min(dt, 0.05);

    const fixed = fixedRef.current;
    const j1 = j1Ref.current;
    const j2 = j2Ref.current;
    const j3 = j3Ref.current;
    const card = cardBodyRef.current;
    const band = bandRef.current;

    if (!fixed || !j1 || !j2 || !j3 || !card || !band?.geometry?.setPoints) {
      return;
    }

    // ─────────────────────────────────────────────────────────────────────
    // Drag
    // ─────────────────────────────────────────────────────────────────────
    if (dragging) {
      pointerToWorldOnZPlane(state.pointer, camera, dragPlaneZ.current, tempWorldPoint);

      const targetX = tempWorldPoint.x - dragOffset.current.x;
      const targetY = tempWorldPoint.y - dragOffset.current.y;

      const alpha = 1 - Math.pow(0.01, safeDt * 8);

      smoothPos.current.x += (targetX - smoothPos.current.x) * alpha;
      smoothPos.current.y += (targetY - smoothPos.current.y) * alpha;
      smoothPos.current.z = dragPlaneZ.current;

      card.setNextKinematicTranslation({
        x: smoothPos.current.x,
        y: smoothPos.current.y,
        z: smoothPos.current.z,
      });

      j1.wakeUp?.();
      j2.wakeUp?.();
      j3.wakeUp?.();
    } else {
      // ───────────────────────────────────────────────────────────────────
      // Damping / card stabilization
      // ───────────────────────────────────────────────────────────────────
      const ang = card.angvel();
      const vel = card.linvel();

      card.setAngvel(
        {
          x: ang.x * 0.94,
          y: ang.y * 0.94,
          z: ang.z * 0.94,
        },
        true
      );

      const rot = card.rotation();
      currentQuat.set(rot.x, rot.y, rot.z, rot.w);
      currentQuat.slerp(IDENTITY_QUAT, Math.min(1, safeDt * (isMobile ? 1.2 : 1.8)));

      card.setRotation(
        {
          x: currentQuat.x,
          y: currentQuat.y,
          z: currentQuat.z,
          w: currentQuat.w,
        },
        true
      );

      const speed = Math.hypot(vel.x, vel.y, vel.z);
      const angSpeed = Math.hypot(ang.x, ang.y, ang.z);

      if (speed < 0.05 && angSpeed < 0.05) {
        card.setLinvel({ x: 0, y: 0, z: 0 }, true);
        card.setAngvel({ x: 0, y: 0, z: 0 }, true);
      }
    }

    // ─────────────────────────────────────────────────────────────────────
    // Rope curve update
    // ─────────────────────────────────────────────────────────────────────
    const t0 = fixed.translation();
    const t1 = j1.translation();
    const t2 = j2.translation();
    const t3 = j3.translation();

    if (!lerpInit.current) {
      lerp1.current.set(t1.x, t1.y, t1.z);
      lerp2.current.set(t2.x, t2.y, t2.z);
      lerpInit.current = true;
    }

    const ropeAlpha = clamp(safeDt * (isMobile ? 10 : 16), 0, 1);

    tempTarget1.set(t1.x, t1.y, t1.z);
    tempTarget2.set(t2.x, t2.y, t2.z);

    lerp1.current.lerp(tempTarget1, ropeAlpha);
    lerp2.current.lerp(tempTarget2, ropeAlpha);

    curve.points[0].set(t0.x, t0.y, t0.z);
    curve.points[1].copy(lerp1.current);
    curve.points[2].copy(lerp2.current);
    curve.points[3].set(t3.x, t3.y, t3.z);

    band.geometry.setPoints(curve.getPoints(isMobile ? 20 : 32));
  });

  return (
    <>
      <group position={GROUP_POS}>
        {/* Fixed Anchor */}
        <RigidBody ref={fixedRef} type="fixed" position={ANCHOR_POS} />

        {/* Rope Segments */}
        <RigidBody ref={j1Ref} position={J1_POS} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody ref={j2Ref} position={J2_POS} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody ref={j3Ref} position={J3_POS} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        {/* Card */}
        <RigidBody
          ref={cardBodyRef}
          position={CARD_POS}
          colliders={false}
          type={dragging ? "kinematicPosition" : "dynamic"}
          linearDamping={2}
          angularDamping={3}
          friction={0.9}
          restitution={0.02}
          canSleep
        >
          <CuboidCollider args={[CARD_W / 2, CARD_H / 2, 0.02]} />

          <group
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
          >
            {/* Front */}
            <mesh castShadow>
              <planeGeometry args={[CARD_W, CARD_H]} />
              <meshPhysicalMaterial {...frontMaterialProps} />
            </mesh>

            {/* Back */}
            <mesh rotation={[0, Math.PI, 0]}>
              <planeGeometry args={[CARD_W, CARD_H]} />
              <meshPhysicalMaterial {...frontMaterialProps} />
            </mesh>

            {/* Optional GLB parts */}
            {nodes?.clip?.geometry && materials?.metal && (
              <mesh
                geometry={nodes.clip.geometry}
                material={materials.metal}
                position={[0, CARD_H / 2 - 0.25, 0.02]}
                castShadow
                receiveShadow
              />
            )}

            {nodes?.clamp?.geometry && materials?.metal && (
              <mesh
                geometry={nodes.clamp.geometry}
                material={materials.metal}
                position={[0, CARD_H / 2 - 0.05, 0.02]}
                castShadow
                receiveShadow
              />
            )}
          </group>
        </RigidBody>
      </group>

      {/* Rope */}
      <mesh ref={bandRef}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          transparent
          opacity={1}
          resolution={resolution || VEC2_ZERO}
          useMap={1}
          map={ropeTexture}
          repeat={[-4, 1]}
          lineWidth={0.045}
        />
      </mesh>
    </>
  );
}

useGLTF.preload(CARD_GLB);