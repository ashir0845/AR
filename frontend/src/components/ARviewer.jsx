import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ARViewer = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#ffffff');

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    mountRef.current.appendChild(renderer.domElement);

    // Object (spinning cube)
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: '#4F46E5' });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Animation loop
   const animate = () => {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  };
  animate();

  // ✅ Cleanup
  return () => {
    if (mountRef.current && renderer.domElement) {
      mountRef.current.removeChild(renderer.domElement);
    }
  };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full max-w-md h-64 border rounded-xl shadow-md"
    />
  );
};

export default ARViewer;
