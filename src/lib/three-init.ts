import * as THREE from "three";

// ===== Галактика: шейдерный фон с вращающейся спиралью =====
const galaxyVertexShader = `
  varying vec3 vPosition;
  uniform float uTime;
  uniform float uRotation;
  void main() {
    vPosition = position;
    vec3 pos = position;
    float angle = atan(pos.z, pos.x) + uTime * 0.05;
    float radius = length(pos.xz);
    pos.y += sin(angle * 6.0 + uTime * 2.0) * 0.01;
    pos.x += cos(angle * 3.0 + uTime) * radius * 0.02;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const galaxyFragmentShader = `
  varying vec3 vPosition;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  void main() {
    float d = length(vPosition);
    float strength = 0.15 / (0.1 + abs(d - 0.8));
    vec3 color = mix(uColor1, uColor2, vPosition.y * 0.5 + 0.5);
    color = mix(color, uColor3, strength * 0.3);
    gl_FragColor = vec4(color, strength * 0.3);
  }
`;

export function initSpaceScene(
  container: HTMLElement
) {
  const scene = new THREE.Scene();

  // ===== Галактика =====
  const galaxyGeometry = new THREE.TorusGeometry(1.5, 0.4, 300, 120);

  const galaxyMaterial = new THREE.ShaderMaterial({
    vertexShader: galaxyVertexShader,
    fragmentShader: galaxyFragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uRotation: { value: 0 },
      uColor1: { value: new THREE.Color(0x00f0ff) },
      uColor2: { value: new THREE.Color(0xff00ff) },
      uColor3: { value: new THREE.Color(0x818cf8) },
    },
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const galaxy = new THREE.Points(galaxyGeometry, galaxyMaterial);
  scene.add(galaxy);

  // ===== Динамическое звёздное поле =====
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 3000;
  const starPositions = new Float32Array(starCount * 3);
  const starSizes = new Float32Array(starCount);
  const starPhases = new Float32Array(starCount);

  const starColors = [0x00f0ff, 0xff00ff, 0xffffff, 0x818cf8];

  for (let i = 0; i < starCount; i++) {
    starPositions[i * 3] = (Math.random() - 0.5) * 80;
    starPositions[i * 3 + 1] = (Math.random() - 0.5) * 45;
    starPositions[i * 3 + 2] = (Math.random() - 0.5) * 80;
    starSizes[i] = Math.random() * 3 + 0.5;
    starPhases[i] = Math.random() * Math.PI * 2;
  }

  starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
  starGeometry.setAttribute("size", new THREE.BufferAttribute(starSizes, 1));
  starGeometry.setAttribute("phase", new THREE.BufferAttribute(starPhases, 1));

  const starMaterial = new THREE.PointsMaterial({
    size: 0.5,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.8,
    vertexColors: false,
  });

  const color = new THREE.Color();
  const starColorsTyped = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    const col = starColors[Math.floor(Math.random() * starColors.length)];
    color.setHex(col);
    starColorsTyped[i * 3] = color.r;
    starColorsTyped[i * 3 + 1] = color.g;
    starColorsTyped[i * 3 + 2] = color.b;
  }
  starGeometry.setAttribute("color", new THREE.BufferAttribute(starColorsTyped, 3));

  const starField = new THREE.Points(starGeometry, starMaterial);
  scene.add(starField);

  // ===== Планеты и спутники (динамические) =====
  const planetGeometry = new THREE.IcosahedronGeometry(0.6, 1);
  const planetMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x00f0ff,
    metalness: 0.3,
    roughness: 0.1,
    transmission: 0.5,
    ior: 1.5,
    iridescence: 0.8,
    emissive: 0x00f0ff,
    emissiveIntensity: 0.2,
  });

  const planets: THREE.Mesh[] = [];
  const planetData: { speed: number; radius: number; height: number }[] = [];

  for (let i = 0; i < 8; i++) {
    const planet = new THREE.Mesh(planetGeometry, planetMaterial.clone());
    planet.material.color.setHSL(i * 0.12, 0.8, 0.5 + i * 0.03);
    planet.material.emissive.setHSL(i * 0.12, 0.8, 0.5 + i * 0.03);

    const radius = 6 + i * 1.8;
    const speed = 0.3 + i * 0.15;
    const height = (Math.random() - 0.5) * 8;

    planet.position.set(
      Math.cos(i) * radius,
      height,
      Math.sin(i) * radius
    );

    planetData.push({ speed, radius, height });
    scene.add(planet);
    planets.push(planet);
  }

  // ===== Тонкая сетка (grid) =====
  const gridHelper = new THREE.GridHelper(60, 60, 0x00f0ff, 0x00f0ff);
  gridHelper.material.opacity = 0.1;
  gridHelper.material.transparent = true;
  gridHelper.position.y = -15;
  scene.add(gridHelper);

  // ===== Освет =====
  const ambientLight = new THREE.AmbientLight(0x404040, 1.2);
  scene.add(ambientLight);

  const mainLight = new THREE.DirectionalLight(0x00f0ff, 0.8);
  mainLight.position.set(5, 10, 7);
  scene.add(mainLight);

  const pointLight = new THREE.PointLight(0xff00ff, 1.0, 30);
  scene.add(pointLight);

  // ===== Камера =====
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 12;

  // ===== Рендерер =====
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.8;
  container.appendChild(renderer.domElement);

  // Store reference
  (container as any).__spaceScene = { uniforms: galaxyMaterial.uniforms };

  // ===== Resize handler =====
  const handleResize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  window.addEventListener("resize", handleResize);

  // ===== Анимация =====
  let time = 0;
  let animationId: number;

  const animate = () => {
    animationId = requestAnimationFrame(animate);
    time += 0.01;

    // Галактика вращается
    galaxyMaterial.uniforms.uTime.value = time;
    galaxy.rotation.y = time * 0.03;
    galaxy.rotation.x = Math.sin(time * 0.1) * 0.1;

    // Планеты движутся по орбитам
    planets.forEach((planet, i) => {
      const data = planetData[i];
      const angle = time * data.speed;
      planet.position.set(
        Math.cos(angle + i) * data.radius,
        data.height + Math.sin(time * 0.3 + i) * 0.5,
        Math.sin(angle + i) * data.radius
      );
      planet.rotation.y += 0.02;
      planet.rotation.x += 0.01;
    });

    // Звёздное поле мерцает
    starMaterial.size = 0.5 + Math.sin(time * 0.5) * 0.2;

    // Плавное центрирование камеры
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, 0, 0.02);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0, 0.02);
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  };

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else {
      animate();
    }
  });

  animate();

  // Cleanup
  return () => {
    window.removeEventListener("resize", handleResize);
    cancelAnimationFrame(animationId);
    renderer.dispose();
    container.removeChild(renderer.domElement);
  };
}
