"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type AssemblyPiece = {
  delay: number;
  endPosition: THREE.Vector3;
  endRotation: THREE.Euler;
  mesh: THREE.Mesh;
  startPosition: THREE.Vector3;
  startRotation: THREE.Euler;
};

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const easeOutBack = (value: number) => {
  const c1 = 1.36;
  const c3 = c1 + 1;

  return 1 + c3 * Math.pow(value - 1, 3) + c1 * Math.pow(value - 1, 2);
};

export function FurnitureAssemblyScene() {
  const sceneHost = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = sceneHost.current;

    if (!host) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      40,
      host.clientWidth / host.clientHeight,
      0.1,
      100,
    );
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
      preserveDrawingBuffer: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    host.appendChild(renderer.domElement);

    camera.position.set(0, 4.7, 11.8);
    camera.lookAt(0, 0.85, 0.45);

    const room = new THREE.Group();
    scene.add(room);

    const pieces: AssemblyPiece[] = [];
    const materials = {
      brass: new THREE.MeshStandardMaterial({
        color: "#ba8a49",
        metalness: 0.64,
        roughness: 0.32,
      }),
      darkWood: new THREE.MeshStandardMaterial({
        color: "#493024",
        metalness: 0.04,
        roughness: 0.54,
      }),
      floor: new THREE.MeshStandardMaterial({
        color: "#14282b",
        metalness: 0.06,
        roughness: 0.74,
      }),
      green: new THREE.MeshStandardMaterial({
        color: "#315e54",
        metalness: 0.04,
        roughness: 0.8,
      }),
      ivory: new THREE.MeshStandardMaterial({
        color: "#e9dcc3",
        metalness: 0.02,
        roughness: 0.72,
      }),
      linen: new THREE.MeshStandardMaterial({
        color: "#9a8069",
        metalness: 0.02,
        roughness: 0.86,
      }),
      rug: new THREE.MeshStandardMaterial({
        color: "#806d62",
        metalness: 0,
        roughness: 0.98,
      }),
    };

    const addAssemblyPiece = (
      geometry: THREE.BufferGeometry,
      material: THREE.Material,
      endPosition: [number, number, number],
      endRotation: [number, number, number] = [0, 0, 0],
      delay = 0,
    ) => {
      const mesh = new THREE.Mesh(geometry, material);
      const index = pieces.length;
      const angle = (index / 15) * Math.PI * 2 + 0.38;
      const radius = 12 + (index % 4) * 1.4;
      const startPosition = new THREE.Vector3(
        Math.cos(angle) * radius,
        2.5 + ((index * 1.7) % 7),
        -4.5 + Math.sin(angle) * radius,
      );
      const startRotation = new THREE.Euler(
        0.7 + (index % 3) * 0.36,
        -1.2 + (index % 5) * 0.48,
        -0.52 + (index % 4) * 0.34,
      );

      mesh.position.copy(startPosition);
      mesh.rotation.copy(startRotation);
      mesh.scale.setScalar(0.28);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      room.add(mesh);
      pieces.push({
        delay,
        endPosition: new THREE.Vector3(...endPosition),
        endRotation: new THREE.Euler(...endRotation),
        mesh,
        startPosition,
        startRotation,
      });
    };

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(19, 12),
      materials.floor,
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, 0, 0);
    floor.receiveShadow = true;
    room.add(floor);

    const backWall = new THREE.Mesh(
      new THREE.PlaneGeometry(19, 7.8),
      new THREE.MeshStandardMaterial({
        color: "#102125",
        metalness: 0,
        roughness: 0.88,
      }),
    );
    backWall.position.set(0, 3.9, -3.6);
    backWall.receiveShadow = true;
    room.add(backWall);

    addAssemblyPiece(new THREE.PlaneGeometry(6.7, 3.5), materials.rug, [0.15, 0.012, 0.8], [-Math.PI / 2, 0, -0.06], 0.03);
    addAssemblyPiece(new THREE.BoxGeometry(4.85, 0.84, 0.38), materials.linen, [-1.3, 1.06, 1.56], [0, 0, 0], 0.05);
    addAssemblyPiece(new THREE.BoxGeometry(1.44, 0.38, 1.45), materials.ivory, [-2.72, 0.58, 1.16], [0, 0, 0], 0.09);
    addAssemblyPiece(new THREE.BoxGeometry(1.44, 0.38, 1.45), materials.ivory, [-1.22, 0.58, 1.16], [0, 0, 0], 0.13);
    addAssemblyPiece(new THREE.BoxGeometry(1.44, 0.38, 1.45), materials.ivory, [0.28, 0.58, 1.16], [0, 0, 0], 0.17);
    addAssemblyPiece(new THREE.BoxGeometry(0.36, 0.92, 1.55), materials.linen, [-3.52, 0.77, 1.19], [0, 0, 0], 0.2);
    addAssemblyPiece(new THREE.BoxGeometry(0.36, 0.92, 1.55), materials.linen, [1.08, 0.77, 1.19], [0, 0, 0], 0.23);

    addAssemblyPiece(new THREE.CylinderGeometry(1.18, 1.18, 0.16, 48), materials.darkWood, [0.65, 0.62, -0.44], [0, 0, 0], 0.18);
    addAssemblyPiece(new THREE.CylinderGeometry(0.18, 0.24, 0.58, 24), materials.brass, [0.65, 0.29, -0.44], [0, 0, 0], 0.23);

    addAssemblyPiece(new THREE.BoxGeometry(1.58, 0.34, 1.28), materials.green, [3.34, 0.56, 0.26], [0, -0.14, 0], 0.21);
    addAssemblyPiece(new THREE.BoxGeometry(1.62, 1.42, 0.3), materials.green, [3.42, 1.35, 0.85], [0, -0.14, 0], 0.25);
    addAssemblyPiece(new THREE.BoxGeometry(0.22, 0.72, 0.22), materials.darkWood, [2.78, 0.22, -0.16], [0, -0.14, 0], 0.29);
    addAssemblyPiece(new THREE.BoxGeometry(0.22, 0.72, 0.22), materials.darkWood, [3.86, 0.22, -0.3], [0, -0.14, 0], 0.31);

    addAssemblyPiece(new THREE.BoxGeometry(2.2, 0.16, 0.6), materials.darkWood, [4.52, 1.13, -2.92], [0, 0, 0], 0.27);
    addAssemblyPiece(new THREE.BoxGeometry(2.2, 0.16, 0.6), materials.darkWood, [4.52, 2.04, -2.92], [0, 0, 0], 0.31);
    addAssemblyPiece(new THREE.BoxGeometry(2.2, 0.16, 0.6), materials.darkWood, [4.52, 2.95, -2.92], [0, 0, 0], 0.35);
    addAssemblyPiece(new THREE.BoxGeometry(0.16, 2.98, 0.62), materials.brass, [3.49, 2.04, -2.92], [0, 0, 0], 0.39);
    addAssemblyPiece(new THREE.BoxGeometry(0.16, 2.98, 0.62), materials.brass, [5.56, 2.04, -2.92], [0, 0, 0], 0.42);

    addAssemblyPiece(new THREE.BoxGeometry(0.9, 1.26, 0.12), materials.brass, [-5.05, 2.38, -3.4], [0, 0, 0], 0.33);
    addAssemblyPiece(new THREE.BoxGeometry(0.64, 0.92, 0.13), materials.ivory, [-5.05, 2.38, -3.32], [0, 0, 0], 0.37);

    const ambient = new THREE.AmbientLight("#c9d4cb", 0.78);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight("#f3e3c0", 2.1);
    keyLight.position.set(-5, 8, 7);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    scene.add(keyLight);

    const pendantLight = new THREE.PointLight("#ffd68a", 0, 14, 1.8);
    pendantLight.position.set(0, 4.7, 0.16);
    pendantLight.castShadow = true;
    scene.add(pendantLight);

    let frame = 0;
    const startedAt = performance.now();

    const draw = (now: number) => {
      const elapsed = (now - startedAt) / 1000;
      const assembleProgress = clamp(elapsed / 2.58);

      pieces.forEach((piece) => {
        const localProgress = clamp((assembleProgress - piece.delay) / 0.58);
        const eased = easeOutBack(localProgress);
        piece.mesh.position.lerpVectors(piece.startPosition, piece.endPosition, eased);
        piece.mesh.rotation.set(
          THREE.MathUtils.lerp(piece.startRotation.x, piece.endRotation.x, eased),
          THREE.MathUtils.lerp(piece.startRotation.y, piece.endRotation.y, eased),
          THREE.MathUtils.lerp(piece.startRotation.z, piece.endRotation.z, eased),
        );
        piece.mesh.scale.setScalar(THREE.MathUtils.lerp(0.28, 1, eased));
      });

      const cameraProgress = clamp(elapsed / 4.6);
      camera.position.z = THREE.MathUtils.lerp(11.8, 9.9, cameraProgress);
      camera.position.y = THREE.MathUtils.lerp(4.7, 4.05, cameraProgress);
      camera.lookAt(0, 0.82, 0.45);

      if (elapsed > 2.63) {
        const flickerWindow = elapsed - 2.63;
        const flicker = flickerWindow < 0.66
          ? Math.abs(Math.sin(flickerWindow * 39)) * 4.8
          : 5.2;
        pendantLight.intensity = flicker;
      }

      room.rotation.y = Math.sin(elapsed * 0.74) * 0.018;
      renderer.render(scene, camera);
      frame = window.requestAnimationFrame(draw);
    };

    frame = window.requestAnimationFrame(draw);

    const resize = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      renderer.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
        }
      });
      Object.values(materials).forEach((material) => material.dispose());
      host.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="brand-intro__canvas" ref={sceneHost} />;
}
