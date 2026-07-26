import { useEffect, useRef } from "react";
import {
  Scene,
  Color,
  OrthographicCamera,
  WebGLRenderer,
  Group,
  Vector3,
  BufferGeometry,
  Float32BufferAttribute,
  LineBasicMaterial,
  LineSegments,
  PointsMaterial,
  Points,
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
  RingGeometry,
  DoubleSide,
  Clock,
} from "three";

export default function HeroGraph() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmall = window.innerWidth < 640;

    const colorPaper = new Color("#ede7da");
    const colorBrass = new Color("#ff5c3d");
    const colorSignal = new Color("#22d3ee");
    const colorLine = new Color("#3a3f45");

    const scene = new Scene();

    let width = mount.clientWidth;
    let height = mount.clientHeight;
    const frustum = 7.2;

    const camera = new OrthographicCamera(
      (-frustum * (width / height)) / 2,
      (frustum * (width / height)) / 2,
      frustum / 2,
      -frustum / 2,
      0.1,
      100
    );
    camera.position.set(0, 0, 12);
    camera.lookAt(0, 0, 0);

    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const group = new Group();
    scene.add(group);

    /* ---------- build node graph ---------- */
    const midCount = isSmall ? 6 : 8;
    const nodes = [];

    nodes.push({ pos: new Vector3(-4.6, 0, 0), anchor: true });
    for (let i = 0; i < midCount; i++) {
      const t = (i + 1) / (midCount + 1);
      const x = -4.6 + t * 9.2 + (Math.random() - 0.5) * 0.9;
      const y = (Math.random() - 0.5) * 3.4;
      const z = (Math.random() - 0.5) * 2.2;
      nodes.push({ pos: new Vector3(x, y, z), anchor: false });
    }
    nodes.push({ pos: new Vector3(4.6, 0, 0), anchor: true });

    // edges: connect anchor to nearest mid nodes, mid nodes to nearby mid nodes, last mids to end anchor
    const edges = [];
    const startIdx = 0;
    const endIdx = nodes.length - 1;
    const midIdxs = nodes.map((_, i) => i).slice(1, -1);

    midIdxs
      .slice()
      .sort((a, b) => nodes[a].pos.x - nodes[b].pos.x)
      .slice(0, 3)
      .forEach((i) => edges.push([startIdx, i]));

    midIdxs.forEach((i, k) => {
      const next = midIdxs[k + 1];
      if (next !== undefined) edges.push([i, next]);
      const rand = midIdxs[Math.floor(Math.random() * midIdxs.length)];
      if (rand !== i) edges.push([i, rand]);
    });

    midIdxs
      .slice()
      .sort((a, b) => nodes[b].pos.x - nodes[a].pos.x)
      .slice(0, 3)
      .forEach((i) => edges.push([i, endIdx]));

    // dedupe
    const seen = new Set();
    const uniqueEdges = edges.filter(([a, b]) => {
      const key = a < b ? `${a}-${b}` : `${b}-${a}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    /* ---------- lines ---------- */
    const linePositions = [];
    uniqueEdges.forEach(([a, b]) => {
      linePositions.push(nodes[a].pos.x, nodes[a].pos.y, nodes[a].pos.z);
      linePositions.push(nodes[b].pos.x, nodes[b].pos.y, nodes[b].pos.z);
    });
    const lineGeo = new BufferGeometry();
    lineGeo.setAttribute("position", new Float32BufferAttribute(linePositions, 3));
    const lineMat = new LineBasicMaterial({ color: colorLine, transparent: true, opacity: 0.5 });
    const lines = new LineSegments(lineGeo, lineMat);
    group.add(lines);

    /* ---------- mid node points ---------- */
    const midPositions = [];
    midIdxs.forEach((i) => {
      const p = nodes[i].pos;
      midPositions.push(p.x, p.y, p.z);
    });
    const pointsGeo = new BufferGeometry();
    pointsGeo.setAttribute("position", new Float32BufferAttribute(midPositions, 3));
    const pointsMat = new PointsMaterial({
      color: colorPaper,
      size: 0.11,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
    });
    const points = new Points(pointsGeo, pointsMat);
    group.add(points);

    /* ---------- anchor nodes ---------- */
    const anchorGeo = new SphereGeometry(0.16, 24, 24);
    const startMat = new MeshBasicMaterial({ color: colorSignal });
    const endMat = new MeshBasicMaterial({ color: colorBrass });

    const startMesh = new Mesh(anchorGeo, startMat);
    startMesh.position.copy(nodes[startIdx].pos);
    group.add(startMesh);

    const endMesh = new Mesh(anchorGeo, endMat);
    endMesh.position.copy(nodes[endIdx].pos);
    group.add(endMesh);

    // faint rings around anchors
    [{ mesh: startMesh, color: colorSignal }, { mesh: endMesh, color: colorBrass }].forEach(({ mesh, color }) => {
      const ringGeo = new RingGeometry(0.26, 0.29, 48);
      const ringMat = new MeshBasicMaterial({ color, transparent: true, opacity: 0.5, side: DoubleSide });
      const ring = new Mesh(ringGeo, ringMat);
      ring.position.copy(mesh.position);
      group.add(ring);
    });

    /* ---------- flowing particles ---------- */
    const particleCount = isSmall ? 5 : 9;
    const particleGeo = new SphereGeometry(0.05, 10, 10);
    const particles = Array.from({ length: particleCount }).map(() => {
      const edge = uniqueEdges[Math.floor(Math.random() * uniqueEdges.length)];
      let [a, b] = edge;
      if (nodes[a].pos.x > nodes[b].pos.x) [a, b] = [b, a];
      const mat = new MeshBasicMaterial({
        color: Math.random() > 0.5 ? colorBrass : colorSignal,
        transparent: true,
        opacity: 0.9,
      });
      const mesh = new Mesh(particleGeo, mat);
      group.add(mesh);
      return { mesh, a, b, t: Math.random(), speed: 0.12 + Math.random() * 0.1 };
    });

    /* ---------- interaction: gentle parallax tilt ---------- */
    let targetRotX = 0;
    let targetRotY = 0;
    const onMove = (e) => {
      const r = mount.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      targetRotY = nx * 0.35;
      targetRotX = -ny * 0.2;
    };
    if (!isSmall) window.addEventListener("mousemove", onMove);

    /* ---------- resize ---------- */
    const onResize = () => {
      width = mount.clientWidth;
      height = mount.clientHeight;
      camera.left = (-frustum * (width / height)) / 2;
      camera.right = (frustum * (width / height)) / 2;
      camera.top = frustum / 2;
      camera.bottom = -frustum / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    /* ---------- render loop ---------- */
    let raf;
    const clock = new Clock();

    const renderStatic = () => renderer.render(scene, camera);

    if (prefersReduced) {
      renderStatic();
    } else {
      const animateLoop = () => {
        const dt = clock.getDelta();

        group.rotation.x += (targetRotX - group.rotation.x) * 0.04;
        group.rotation.y += (targetRotY - group.rotation.y) * 0.04;
        group.rotation.y += dt * 0.01;

        particles.forEach((p) => {
          p.t += dt * p.speed;
          if (p.t > 1) {
            p.t = 0;
            const edge = uniqueEdges[Math.floor(Math.random() * uniqueEdges.length)];
            let [a, b] = edge;
            if (nodes[a].pos.x > nodes[b].pos.x) [a, b] = [b, a];
            p.a = a;
            p.b = b;
          }
          p.mesh.position.lerpVectors(nodes[p.a].pos, nodes[p.b].pos, p.t);
          const s = 0.6 + 0.4 * Math.sin(p.t * Math.PI);
          p.mesh.scale.setScalar(s);
        });

        renderer.render(scene, camera);
        raf = requestAnimationFrame(animateLoop);
      };
      raf = requestAnimationFrame(animateLoop);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      mount.removeChild(renderer.domElement);
      lineGeo.dispose();
      pointsGeo.dispose();
      anchorGeo.dispose();
      particleGeo.dispose();
      lineMat.dispose();
      pointsMat.dispose();
      startMat.dispose();
      endMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <div ref={mountRef} className="h-full w-full" />
      <span className="pointer-events-none absolute left-[6%] top-1/2 -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.18em] text-signal-soft">
        Pol. Sci.
      </span>
      <span className="pointer-events-none absolute right-[4%] top-1/2 -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.18em] text-brass-soft">
        Prod. Code
      </span>
    </div>
  );
}
