import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

function CadViewer({ modelUrl }) {
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Get the actual container dimensions
    const rect = container.getBoundingClientRect();
    const width = rect.width || container.clientWidth || 400;
    const height = rect.height || container.clientHeight || 480;

    const isPcb = modelUrl.toLowerCase().includes("pcb");

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, isPcb ? 0.001 : 0.1, 1000);
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isPcb;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x090909, 0); // Transparent background
    container.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = isPcb ? 0.01 : 1;
    controls.maxDistance = isPcb ? 5 : 50;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.8;

    // Lights
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x111122, 1.2);
    scene.add(hemiLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.0);
    dirLight1.position.set(15, 30, 20);
    dirLight1.castShadow = !isPcb;
    dirLight1.shadow.mapSize.width = 2048;
    dirLight1.shadow.mapSize.height = 2048;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x00f0ff, 0.8);
    dirLight2.position.set(-20, 15, -20);
    scene.add(dirLight2);

    const dirLight3 = new THREE.DirectionalLight(0x7f00ff, 0.5);
    dirLight3.position.set(20, -10, 20);
    scene.add(dirLight3);

    const underLight = new THREE.DirectionalLight(0xffffff, 0.6);
    underLight.position.set(0, -25, 0);
    scene.add(underLight);

    const rotatingLight = new THREE.PointLight(0x00f0ff, 1.0, 30);
    scene.add(rotatingLight);

    let loadedModel = null;

    // Load Model
    const loader = new GLTFLoader();
    loader.load(
      modelUrl,
      (gltf) => {
        loadedModel = gltf.scene;

        // Auto-center and scale model
        const box = new THREE.Box3().setFromObject(loadedModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        loadedModel.position.sub(center);

        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
        cameraZ *= 1.45;

        camera.position.set(cameraZ * 0.7, maxDim * 0.6, cameraZ * 0.7);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        controls.target.set(0, 0, 0);

        controls.minDistance = maxDim * 0.15;
        controls.maxDistance = maxDim * 10;

        if (dirLight1.castShadow) {
          dirLight1.shadow.camera.left = -maxDim;
          dirLight1.shadow.camera.right = maxDim;
          dirLight1.shadow.camera.top = maxDim;
          dirLight1.shadow.camera.bottom = -maxDim;
          dirLight1.shadow.camera.near = 0.1;
          dirLight1.shadow.camera.far = maxDim * 4;
          dirLight1.shadow.camera.updateProjectionMatrix();
        }

        let meshIndex = 0;
        loadedModel.traverse((child) => {
          if (child.isMesh) {
            if (isPcb) {
              child.castShadow = false;
              child.receiveShadow = false;
            } else {
              child.castShadow = true;
              child.receiveShadow = true;
              meshIndex++;

              if (child.material) {
                child.material = child.material.clone();

                if (meshIndex % 4 === 0) {
                  child.material.color.setRGB(0.18, 0.18, 0.18);
                  child.material.roughness = 0.55;
                  child.material.metalness = 0.1;
                } else if (meshIndex % 4 === 1) {
                  child.material.color.setRGB(0.85, 0.85, 0.9);
                  child.material.roughness = 0.12;
                  child.material.metalness = 0.95;
                } else if (meshIndex % 4 === 2) {
                  child.material.color.setRGB(0.55, 0.55, 0.57);
                  child.material.roughness = 0.35;
                  child.material.metalness = 0.75;
                } else {
                  child.material.color.setRGB(0.38, 0.38, 0.4);
                  child.material.roughness = 0.28;
                  child.material.metalness = 0.8;
                }
              }
            }
          }
        });

        scene.add(loadedModel);
        setLoading(false);
      },
      (xhr) => {
        if (xhr.total > 0) {
          const percent = Math.round((xhr.loaded / xhr.total) * 100);
          setProgress(percent);
        }
      },
      (error) => {
        console.error("Error loading GLB model:", error);
        setError(true);
        setLoading(false);
      }
    );

    // Animation loop
    let animationFrameId;
    let time = 0;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      time += 0.015;
      rotatingLight.position.x = Math.sin(time) * 12;
      rotatingLight.position.z = Math.cos(time) * 12;
      rotatingLight.position.y = Math.sin(time * 0.7) * 7;

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const w = rect.width || container.clientWidth || 400;
      const h = rect.height || container.clientHeight || 480;
      
      if (w > 0 && h > 0) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    };
    
    // Use ResizeObserver for more reliable resize detection
    let resizeObserver;
    if (window.ResizeObserver) {
      resizeObserver = new ResizeObserver(() => handleResize());
      resizeObserver.observe(container);
    } else {
      window.addEventListener("resize", handleResize);
    }

    // Clean up
    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener("resize", handleResize);
      }
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [modelUrl]);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
      <div ref={containerRef} style={{ width: "100%", height: "100%", position: "relative" }} />
      
      {loading && (
        <div className="cad-loading-overlay">
          <div className="cad-spinner-ring" />
          <span className="cad-percentage-text">{progress}%</span>
          <p className="terminal-log">SYS: LOADING MODEL</p>
        </div>
      )}

      {error && (
        <div className="cad-error-overlay">
          <p className="terminal-log error">ERROR LOADING GLB MODEL</p>
          <p className="terminal-log">Verify the file exists and is valid.</p>
        </div>
      )}
    </div>
  );
}

export default CadViewer;