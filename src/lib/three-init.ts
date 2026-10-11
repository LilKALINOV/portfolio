import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

export function initSpaceScene(
  container: HTMLElement,
  cursor: { x: number; y: number },
  locale: string
) {
  // Scene
  const scene = new THREE.Scene();

  // Starfield background (shaders)
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 2000;
  const starPositions = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount * 3; i++) {
    starPositions[i] = (Math.random() - 0.5) * 100;
  }

  starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
  const starMaterial = new THREE.PointsMaterial({
    color: 0x00f0ff,
    size: 0.15,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.6,
  });

  const starField = new THREE.Points(starGeometry, starMaterial);
  scene.add(starField);

  // Floating geometric objects (rings, crystals, helix)
  const ringGeometry = new THREE.TorusGeometry(2, 0.1, 16, 100);
  const ringMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x00f0ff,
    metalness: 0.8,
    roughness: 0.1,
    transmission: 0.3,
    ior: 1.5,
    iridescence: 0.9,
  });

  const rings: THREE.Mesh[] = [];
  for (let i = 0; i < 8; i++) {
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.position.set(
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 20
    );
    ring.rotation.x = Math.random() * Math.PI;
    ring.rotation.y = Math.random() * Math.PI;
    (ring as any).userData = {
      rotX: (Math.random() - 0.5) * 0.002,
      rotY: (Math.random() - 0.5) * 0.002,
    };
    scene.add(ring);
    rings.push(ring);
  }

  // Crystal clusters
  const crystalGeometry = new THREE.IcosahedronGeometry(0.4, 1);
  const crystalMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xff00ff,
    metalness: 0.9,
    roughness: 0.05,
    transmission: 0.5,
    ior: 2.0,
    iridescence: 0.8,
    emissive: 0xff00ff,
    emissiveIntensity: 0.3,
  });

  const crystals: THREE.Mesh[] = [];
  for (let i = 0; i < 15; i++) {
    const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);
    crystal.position.set(
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 12,
      (Math.random() - 0.5) * 30
    );
    (crystal as any).userData = {
      phase: Math.random() * Math.PI * 2,
    };
    scene.add(crystal);
    crystals.push(crystal);
  }

  // Helix coil (like dwertyfa's hero)
  const helixGeometry = new THREE.CapsuleGeometry(0.05, 1.5, 4, 8);
  const helixMaterial = new THREE.MeshStandardMaterial({
    color: 0x00f0ff,
    metalness: 0.7,
    roughness: 0.1,
    emissive: 0x00f0ff,
    emissiveIntensity: 0.5,
  });

  const helixPoints: THREE.Mesh[] = [];
  const helixRadius = 3;
  const helixTurns = 10;
  for (let i = 0; i < helixTurns * 20; i++) {
    const t = i / (helixTurns * 20);
    const angle = t * Math.PI * 2 * helixTurns;
    const y = t * 8 - 4;
    const x = Math.cos(angle) * helixRadius;
    const z = Math.sin(angle) * helixRadius;
    const sphere = new THREE.Mesh(helixGeometry, helixMaterial);
    sphere.position.set(x, y, z);
    scene.add(sphere);
    helixPoints.push(sphere);
  }

  // Lighting
  const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0x00f0ff, 0.5);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0xff00ff, 0.8, 50);
  scene.add(pointLight);

  // Camera
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 8;

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  container.appendChild(renderer.domElement);

  // Store uniforms for external cursor updates
  const uniforms = {
    cursor: { value: new THREE.Vector2(0.5, 0.5) },
  };
  (container as any).__spaceScene = { uniforms };

  // Resize handler
  const handleResize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  window.addEventListener("resize", handleResize);

  // Visibility handling
  let time = 0;
  let animationId: number;

  const animate = () => {
    animationId = requestAnimationFrame(animate);
    time += 0.01;

    // Rotate rings
    rings.forEach((ring, i) => {
      const ud = ring.userData as { rotX: number; rotY: number };
      ring.rotation.x += ud.rotX + Math.sin(time * 0.3 + i) * 0.0005;
      ring.rotation.y += ud.rotY + Math.cos(time * 0.2 + i) * 0.0005;
      ring.scale.setScalar(1 + Math.sin(time + i) * 0.02);
    });

    // Pulse crystals
    crystals.forEach((crystal, i) => {
      const ud = crystal.userData as { phase: number };
      crystal.scale.setScalar(0.8 + Math.sin(time + ud.phase) * 0.2);
      (crystal.material as THREE.MeshPhysicalMaterial).emissiveIntensity = 0.2 + Math.sin(time + ud.phase) * 0.1;
    });

    // Animate helix
    helixPoints.forEach((point, i) => {
      const s = Math.sin(time + i * 0.1);
      point.scale.setScalar(0.8 + s * 0.2);
      point.position.y += Math.sin(time * 2 + i) * 0.001;
    });

    // Subtle star rotation
    starField.rotation.y = time * 0.005;

    // Gentle camera drift based on cursor
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      (uniforms.cursor.value.x - 0.5) * 2,
      0.02
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      -(uniforms.cursor.value.y - 0.5) * 2,
      0.02
    );

    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  };

  // Only animate when tab is visible
  const handleVisibility = () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else {
      animate();
    }
  };

  document.addEventListener("visibilitychange", handleVisibility);
  animate();

  // Return cleanup
  return () => {
    window.removeEventListener("resize", handleResize);
    document.removeEventListener("visibilitychange", handleVisibility);
    cancelAnimationFrame(animationId);
    renderer.dispose();
    container.removeChild(renderer.domElement);
  };
}

export const useThreeScene = () => {
  return { initSpaceScene };
};