import * as THREE from "three";

export async function createArtworkScene(host: HTMLElement, { src, aspect, spin }: { src: string; aspect: number; spin: boolean }) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
  const mobile = window.matchMedia("(pointer: coarse)").matches;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const canvas = renderer.domElement;
  canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;pointer-events:none";
  canvas.setAttribute("aria-hidden", "true");
  let texture: THREE.Texture;
  try { texture = await new THREE.TextureLoader().loadAsync(src); }
  catch (error) { renderer.dispose(); throw error; }
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 30);
  const model = new THREE.Group();
  const h = 3, w = h * aspect, radius = spin ? 0.11 : 0.035;
  const x = -w / 2, y = -h / 2;
  const shape = new THREE.Shape();
  shape.moveTo(x + radius, y);
  shape.lineTo(x + w - radius, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + radius);
  shape.lineTo(x + w, y + h - radius);
  shape.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  shape.lineTo(x + radius, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);
  const depth = spin ? 0.018 : 0.045;
  const bodyGeometry = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.006, bevelThickness: 0.004, curveSegments: 12 });
  bodyGeometry.translate(0, 0, -depth / 2);
  const edgeMaterial = new THREE.MeshStandardMaterial({ color: spin ? "#d8d9df" : "#3d3d5c", roughness: 0.45, metalness: 0.25 });
  model.add(new THREE.Mesh(bodyGeometry, edgeMaterial));
  const faceGeometry = new THREE.ShapeGeometry(shape, 24);
  const positions = faceGeometry.getAttribute("position");
  const uv = faceGeometry.getAttribute("uv");
  for (let i = 0; i < positions.count; i++) uv.setXY(i, (positions.getX(i) + w / 2) / w, (positions.getY(i) + h / 2) / h);
  const artwork = new THREE.MeshBasicMaterial({ map: texture, transparent: true, toneMapped: false });
  for (const side of [1, -1]) {
    const face = new THREE.Mesh(faceGeometry, artwork);
    face.position.z = side * (depth / 2 + 0.005);
    if (side === -1) face.rotation.y = Math.PI;
    model.add(face);
  }
  const deck = new THREE.Group();
  const leftCard = model.clone();
  const rightCard = model.clone();
  if (spin) deck.add(leftCard, rightCard);
  model.position.z = 0.06;
  deck.add(model);
  scene.add(deck, new THREE.HemisphereLight(0xffffff, 0x777799, 3));
  const light = new THREE.DirectionalLight(0xffffff, 4);
  light.position.set(-3, 4, 5);
  scene.add(light);
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  let reducedMotion = media.matches, paused = reducedMotion;
  let targetX = spin ? -0.08 : 0, targetY = spin ? -0.22 : 0;
  let frame = 0, visible = false, last = 0, idleTime = 0, scrollFrame = 0;
  let spread = 0, targetSpread = reducedMotion ? 0.75 : 0;
  let pointer: { id: number; x: number; y: number; rx: number; ry: number } | null = null;
  deck.rotation.set(targetX, targetY, spin ? -0.04 : 0);
  const render = (now: number) => {
    if (mobile && now - last < 1000 / 30) { frame = requestAnimationFrame(render); return; }
    const dt = Math.min((now - last) / 1000 || 0, 0.05);
    last = now;
    if (spin && !paused && !pointer) idleTime += dt;
    const breathe = spin && !paused && !pointer ? Math.sin(idleTime * 0.7) * 0.12 : 0;
    deck.rotation.x = THREE.MathUtils.damp(deck.rotation.x, targetX, 10, dt);
    deck.rotation.y = THREE.MathUtils.damp(deck.rotation.y, targetY + breathe, 10, dt);
    deck.position.y = spin && !reducedMotion && !paused ? Math.sin(idleTime * 1.2) * 0.035 : 0;
    spread = THREE.MathUtils.damp(spread, targetSpread, 7, dt);
    for (const [card, direction] of [[leftCard, -1], [rightCard, 1]] as const) {
      card.position.set(direction * w * 0.58 * spread, -0.12 * spread, -0.06);
      card.rotation.z = direction * -0.22 * spread;
      card.rotation.y = direction * -0.14 * spread;
    }
    renderer.render(scene, camera);
    const settling = Math.abs(targetX - deck.rotation.x) + Math.abs(targetY + breathe - deck.rotation.y) + Math.abs(targetSpread - spread) > 0.0001;
    frame = visible && !document.hidden && (settling || (spin && !paused)) ? requestAnimationFrame(render) : 0;
  };
  const wake = () => { if (!frame && visible && !document.hidden) { last = performance.now(); frame = requestAnimationFrame(render); } };
  const resize = () => {
    const width = host.clientWidth, height = host.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    // Frame the entire diagonal so rotations never clip on narrow screens.
    const extent = Math.max(h / (spin ? 0.68 : 0.78), w * (spin ? 2.5 : 1) / (camera.aspect * 0.85));
    camera.position.z = extent / (2 * Math.tan(THREE.MathUtils.degToRad(17.5)));
    camera.updateProjectionMatrix();
    wake();
  };
  const clampY = (value: number) => spin ? value : THREE.MathUtils.clamp(value, -0.48, 0.48);
  const down = (event: PointerEvent) => {
    if (!event.isPrimary || event.button !== 0) return;
    pointer = { id: event.pointerId, x: event.clientX, y: event.clientY, rx: targetX, ry: targetY };
    host.setPointerCapture(event.pointerId);
  };
  const move = (event: PointerEvent) => {
    if (pointer && event.pointerId === pointer.id) {
      targetY = clampY(pointer.ry + (event.clientX - pointer.x) / host.clientWidth * (spin ? 6 : 2));
      if (event.pointerType === "mouse") targetX = THREE.MathUtils.clamp(pointer.rx + (event.clientY - pointer.y) / host.clientHeight * 1.5, -0.4, 0.4);
      wake();
    } else if (!spin && event.pointerType === "mouse" && !reducedMotion) {
      const bounds = host.getBoundingClientRect();
      targetY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.5;
      targetX = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.35;
      wake();
    }
  };
  const up = (event: PointerEvent) => {
    if (pointer?.id !== event.pointerId) return;
    pointer = null;
    if (host.hasPointerCapture(event.pointerId)) host.releasePointerCapture(event.pointerId);
    wake();
  };
  const reset = () => { targetX = 0; targetY = Math.round(targetY / (2 * Math.PI)) * 2 * Math.PI; wake(); };
  const leave = () => { if (!spin && !pointer) reset(); };
  const motionChange = () => { reducedMotion = media.matches; if (reducedMotion) paused = true; wake(); };
  const updateSpread = () => {
    scrollFrame = 0;
    if (!visible || !spin) return;
    const bounds = host.getBoundingClientRect();
    targetSpread = reducedMotion ? 0.75 : THREE.MathUtils.clamp((innerHeight * 0.9 - bounds.top) / (innerHeight * 0.4 + bounds.height * 0.35), 0, 1);
    wake();
  };
  const onScroll = () => { if (visible && !scrollFrame) scrollFrame = requestAnimationFrame(updateSpread); };
  const visibilityChange = () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else wake(); };
  host.appendChild(canvas);
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) { updateSpread(); wake(); } else { cancelAnimationFrame(frame); frame = 0; } });
  observer.observe(host);
  const resizer = new ResizeObserver(resize);
  resizer.observe(host);
  host.addEventListener("pointerdown", down);
  host.addEventListener("pointermove", move);
  host.addEventListener("pointerup", up);
  host.addEventListener("pointercancel", up);
  host.addEventListener("lostpointercapture", up);
  host.addEventListener("pointerleave", leave);
  document.addEventListener("visibilitychange", visibilityChange);
  media.addEventListener("change", motionChange);
  window.addEventListener("scroll", onScroll, { passive: true });
  resize();
  return {
    reducedMotion,
    rotate: (direction: number) => { targetY = clampY(targetY + direction * (spin ? Math.PI / 4 : 0.2)); wake(); },
    reset,
    pause: (value: boolean) => { paused = value; wake(); },
    dispose: () => {
      observer.disconnect(); resizer.disconnect(); cancelAnimationFrame(frame); cancelAnimationFrame(scrollFrame);
      window.removeEventListener("scroll", onScroll);
      host.removeEventListener("pointerdown", down); host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerup", up); host.removeEventListener("pointercancel", up);
      host.removeEventListener("lostpointercapture", up); host.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", visibilityChange); media.removeEventListener("change", motionChange);
      bodyGeometry.dispose(); faceGeometry.dispose(); edgeMaterial.dispose(); artwork.dispose(); texture.dispose();
      renderer.dispose(); canvas.remove();
    },
  };
}
