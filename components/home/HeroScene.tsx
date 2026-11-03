import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const HeroScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.z = 11;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Wireframe core
    const coreGeo = new THREE.IcosahedronGeometry(2.6, 1);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.55 });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    const innerGeo = new THREE.IcosahedronGeometry(1.5, 0);
    const innerMat = new THREE.MeshBasicMaterial({ color: 0x34d399, wireframe: true, transparent: true, opacity: 0.8 });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    group.add(inner);

    // Orbit rings
    const rings: THREE.Mesh[] = [];
    [4.2, 5.2].forEach((radius, i) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius, 0.012, 8, 160),
        new THREE.MeshBasicMaterial({ color: i === 0 ? 0x818cf8 : 0x38bdf8, transparent: true, opacity: 0.45 })
      );
      ring.rotation.x = Math.PI / 2.4 + i * 0.5;
      ring.rotation.y = i * 0.7;
      group.add(ring);
      rings.push(ring);
    });

    // Particle network
    const count = isMobile ? 70 : 140;
    const positions = new Float32Array(count * 3);
    const velocities: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 11;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 9;
      velocities.push(new THREE.Vector3((Math.random() - 0.5) * 0.008, (Math.random() - 0.5) * 0.008, (Math.random() - 0.5) * 0.008));
    }
    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const points = new THREE.Points(
      pointsGeo,
      new THREE.PointsMaterial({ color: 0x7dd3fc, size: 0.07, transparent: true, opacity: 0.9 })
    );
    scene.add(points);

    const maxLinks = count * 6;
    const linePositions = new Float32Array(maxLinks * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeo.setDrawRange(0, 0);
    const lines = new THREE.LineSegments(
      lineGeo,
      new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.18 })
    );
    scene.add(lines);

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      group.position.x = w > 900 ? 3.2 : 0;
      group.scale.setScalar(w > 900 ? 1 : 0.75);
    };
    resize();
    window.addEventListener('resize', resize);

    const mouse = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);

    const linkDist = 3.1;
    const updateLines = () => {
      let n = 0;
      for (let i = 0; i < count && n < maxLinks; i++) {
        for (let j = i + 1; j < count && n < maxLinks; j++) {
          const dx = positions[i * 3] - positions[j * 3];
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
          if (dx * dx + dy * dy + dz * dz < linkDist * linkDist) {
            linePositions.set(
              [positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2], positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]],
              n * 6
            );
            n++;
          }
        }
      }
      lineGeo.setDrawRange(0, n * 2);
      lineGeo.attributes.position.needsUpdate = true;
    };

    let raf = 0;
    let visible = true;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(mount);

    const render = () => {
      raf = requestAnimationFrame(render);
      if (!visible) return;

      if (!reduceMotion) {
        core.rotation.x += 0.0025;
        core.rotation.y += 0.004;
        inner.rotation.x -= 0.006;
        inner.rotation.y -= 0.004;
        rings[0].rotation.z += 0.003;
        rings[1].rotation.z -= 0.002;

        for (let i = 0; i < count; i++) {
          positions[i * 3] += velocities[i].x;
          positions[i * 3 + 1] += velocities[i].y;
          positions[i * 3 + 2] += velocities[i].z;
          if (Math.abs(positions[i * 3]) > 9) velocities[i].x *= -1;
          if (Math.abs(positions[i * 3 + 1]) > 5.5) velocities[i].y *= -1;
          if (Math.abs(positions[i * 3 + 2]) > 4.5) velocities[i].z *= -1;
        }
        pointsGeo.attributes.position.needsUpdate = true;
        updateLines();

        group.rotation.y += (mouse.x * 0.4 - group.rotation.y) * 0.03;
        group.rotation.x += (mouse.y * 0.25 - group.rotation.x) * 0.03;
      }
      renderer.render(scene, camera);
    };
    updateLines();
    render();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      [coreGeo, innerGeo, pointsGeo, lineGeo].forEach((g) => g.dispose());
      [coreMat, innerMat].forEach((m) => m.dispose());
      rings.forEach((r) => {
        r.geometry.dispose();
        (r.material as THREE.Material).dispose();
      });
      (points.material as THREE.Material).dispose();
      (lines.material as THREE.Material).dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'absolute', inset: 0 }} aria-hidden="true" />;
};

export default HeroScene;
