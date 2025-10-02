import React, { useState, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Stars } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';

// Floating Particles with Glow
function Particles() {
  const count = 200;
  const particles = useRef();

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 25;
    positions[i + 1] = (Math.random() - 0.5) * 25;
    positions[i + 2] = (Math.random() - 0.5) * 25;

    colors[i] = Math.random();
    colors[i + 1] = Math.random() * 0.5 + 0.5;
    colors[i + 2] = 1;
  }

  useFrame((state) => {
    if (particles.current) {
      particles.current.rotation.y = state.clock.elapsedTime * 0.03;
      particles.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Enhanced Shape Component
function Shape({ shape, color, wireframe, rotation, metalness, roughness, emissive, shapeRef }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      if (rotation) {
        meshRef.current.rotation.x += delta * 0.4;
        meshRef.current.rotation.y += delta * 0.25;
      }
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  // Expose mesh ref to parent
  React.useEffect(() => {
    if (shapeRef) {
      shapeRef.current = meshRef.current;
    }
  }, [shapeRef, meshRef.current]);

  const getGeometry = () => {
    switch (shape) {
      case 'box':
        return <boxGeometry args={[2, 2, 2]} />;
      case 'sphere':
        return <sphereGeometry args={[1.5, 128, 128]} />;
      case 'cone':
        return <coneGeometry args={[1.5, 2.5, 64]} />;
      case 'cylinder':
        return <cylinderGeometry args={[1, 1, 2.5, 64]} />;
      case 'torus':
        return <torusGeometry args={[1, 0.4, 64, 100]} />;
      case 'torusKnot':
        return <torusKnotGeometry args={[1, 0.3, 200, 32]} />;
      case 'octahedron':
        return <octahedronGeometry args={[1.5, 1]} />;
      case 'dodecahedron':
        return <dodecahedronGeometry args={[1.5, 1]} />;
      case 'icosahedron':
        return <icosahedronGeometry args={[1.5, 1]} />;
      default:
        return <boxGeometry args={[2, 2, 2]} />;
    }
  };

  return (
    <group>
      <mesh ref={meshRef} castShadow receiveShadow>
        {getGeometry()}
        <meshStandardMaterial
          color={color}
          wireframe={wireframe}
          metalness={metalness}
          roughness={roughness}
          emissive={color}
          emissiveIntensity={emissive}
          envMapIntensity={1.5}
        />
      </mesh>
      <mesh ref={meshRef} scale={1.05}>
        {getGeometry()}
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

// Screenshot Component
function ScreenshotHelper({ onCapture }) {
  const { gl, scene, camera } = useThree();

  React.useImperativeHandle(onCapture, () => ({
    capture: () => {
      gl.render(scene, camera);
      return gl.domElement.toDataURL('image/png');
    }
  }));

  return null;
}

// Premium Slider Component
const PremiumSlider = ({ label, value, onChange, min = 0, max = 1, step = 0.01 }) => (
  <div style={{ marginBottom: '24px' }}>
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '10px',
      fontSize: '13px',
      fontWeight: '500',
    }}>
      <span style={{ color: '#94a3b8' }}>{label}</span>
      <span style={{
        color: '#fff',
        background: 'rgba(99, 102, 241, 0.2)',
        padding: '2px 10px',
        borderRadius: '6px',
        fontSize: '12px',
      }}>
        {Math.round(value * 100)}%
      </span>
    </div>
    <div style={{ position: 'relative' }}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        style={{
          width: '100%',
          height: '6px',
          borderRadius: '3px',
          background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${value * 100}%, rgba(255,255,255,0.1) ${value * 100}%, rgba(255,255,255,0.1) 100%)`,
          outline: 'none',
          cursor: 'pointer',
          WebkitAppearance: 'none',
          appearance: 'none',
        }}
      />
      <style>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          cursor: pointer;
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.8);
          border: 2px solid #0f172a;
        }
        input[type='range']::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          cursor: pointer;
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.8);
          border: 2px solid #0f172a;
        }
      `}</style>
    </div>
  </div>
);

// Modern Button Component
const ModernButton = ({ children, active, onClick, icon }) => (
  <motion.button
    whileHover={{ scale: 1.03, y: -2 }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    style={{
      padding: '12px 16px',
      background: active
        ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
        : 'rgba(15, 23, 42, 0.8)',
      border: active ? 'none' : '1px solid rgba(148, 163, 184, 0.2)',
      borderRadius: '10px',
      color: active ? '#fff' : '#94a3b8',
      cursor: 'pointer',
      fontSize: '12px',
      fontWeight: '600',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      justifyContent: 'center',
      boxShadow: active ? '0 10px 40px rgba(99, 102, 241, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)' : '0 2px 8px rgba(0,0,0,0.3)',
      textShadow: active ? '0 1px 2px rgba(0,0,0,0.3)' : 'none',
    }}
  >
    {icon && <span style={{ fontSize: '16px' }}>{icon}</span>}
    <span>{children}</span>
  </motion.button>
);

// Export Button Component
const ExportButton = ({ children, onClick, icon, color = '#6366f1' }) => (
  <motion.button
    whileHover={{ scale: 1.02, y: -2 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    style={{
      padding: '14px 20px',
      background: `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`,
      border: `1px solid ${color}40`,
      borderRadius: '12px',
      color: '#fff',
      cursor: 'pointer',
      fontSize: '13px',
      fontWeight: '600',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      justifyContent: 'center',
      width: '100%',
      boxShadow: `0 4px 20px ${color}20`,
    }}
  >
    <span style={{ fontSize: '18px' }}>{icon}</span>
    <span>{children}</span>
  </motion.button>
);

// Color Swatch Component
const ColorSwatch = ({ color, name, active, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.1, y: -4 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    style={{
      width: '100%',
      aspectRatio: '1',
      background: `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)`,
      border: active ? '2px solid #fff' : '1px solid rgba(148, 163, 184, 0.3)',
      borderRadius: '12px',
      cursor: 'pointer',
      boxShadow: active
        ? `0 0 0 3px rgba(99, 102, 241, 0.3), 0 10px 40px ${color}80, inset 0 1px 0 rgba(255,255,255,0.3)`
        : `0 4px 12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)`,
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
    }}
  >
    {active && (
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 15 }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '20px',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
        }}
      >
        ✓
      </motion.div>
    )}
  </motion.button>
);

// Main App Component
export default function App() {
  const [shape, setShape] = useState('icosahedron');
  const [color, setColor] = useState('#6366f1');
  const [wireframe, setWireframe] = useState(false);
  const [rotation, setRotation] = useState(true);
  const [menuOpen, setMenuOpen] = useState(true);
  const [metalness, setMetalness] = useState(0.8);
  const [roughness, setRoughness] = useState(0.2);
  const [emissive, setEmissive] = useState(0.3);
  const [exportFormat, setExportFormat] = useState('glb');
  const [isExporting, setIsExporting] = useState(false);

  const shapeRef = useRef();
  const screenshotRef = useRef();

  const shapes = [
    { name: 'Cube', value: 'box', icon: '◼' },
    { name: 'Sphere', value: 'sphere', icon: '●' },
    { name: 'Cone', value: 'cone', icon: '▲' },
    { name: 'Cylinder', value: 'cylinder', icon: '⬭' },
    { name: 'Torus', value: 'torus', icon: '◯' },
    { name: 'Knot', value: 'torusKnot', icon: '∞' },
    { name: 'Octahedron', value: 'octahedron', icon: '◆' },
    { name: 'Dodecahedron', value: 'dodecahedron', icon: '⬢' },
    { name: 'Icosahedron', value: 'icosahedron', icon: '⬣' },
  ];

  const colors = [
    { name: 'Indigo', value: '#6366f1' },
    { name: 'Purple', value: '#8b5cf6' },
    { name: 'Fuchsia', value: '#d946ef' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Cyan', value: '#06b6d4' },
    { name: 'Emerald', value: '#10b981' },
    { name: 'Amber', value: '#f59e0b' },
    { name: 'Rose', value: '#f43f5e' },
  ];

  // Export 3D Model
  const export3DModel = () => {
    if (!shapeRef.current) return;

    setIsExporting(true);

    const exporter = new GLTFExporter();
    const options = {
      binary: exportFormat === 'glb',
      onlyVisible: true,
    };

    exporter.parse(
      shapeRef.current,
      (result) => {
        if (result instanceof ArrayBuffer) {
          // Binary GLB format
          saveArrayBuffer(result, `shape-${shape}-${Date.now()}.glb`);
        } else {
          // JSON GLTF format
          const output = JSON.stringify(result, null, 2);
          saveString(output, `shape-${shape}-${Date.now()}.gltf`);
        }
        setIsExporting(false);
        showNotification('✅ Model exported successfully!');
      },
      (error) => {
        console.error('Export error:', error);
        setIsExporting(false);
        showNotification('❌ Export failed!');
      },
      options
    );
  };

  // Export Screenshot
  const exportScreenshot = () => {
    if (!screenshotRef.current) return;

    const dataURL = screenshotRef.current.capture();
    const link = document.createElement('a');
    link.download = `screenshot-${shape}-${Date.now()}.png`;
    link.href = dataURL;
    link.click();
    showNotification('✅ Screenshot saved!');
  };

  // Export OBJ format
  const exportOBJ = () => {
    if (!shapeRef.current) return;

    const geometry = shapeRef.current.geometry;
    let objString = 'o Shape\n';

    const vertices = geometry.attributes.position;
    for (let i = 0; i < vertices.count; i++) {
      objString += `v ${vertices.getX(i)} ${vertices.getY(i)} ${vertices.getZ(i)}\n`;
    }

    if (geometry.index) {
      const indices = geometry.index;
      for (let i = 0; i < indices.count; i += 3) {
        objString += `f ${indices.getX(i) + 1} ${indices.getX(i + 1) + 1} ${indices.getX(i + 2) + 1}\n`;
      }
    }

    saveString(objString, `shape-${shape}-${Date.now()}.obj`);
    showNotification('✅ OBJ file exported!');
  };

  // Helper functions
  const saveArrayBuffer = (buffer, filename) => {
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  const saveString = (text, filename) => {
    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  const showNotification = (message) => {
    // Simple notification (you can enhance this)
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 32px;
      padding: 16px 24px;
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(139, 92, 246, 0.9));
      color: white;
      border-radius: 12px;
      font-size: 14px;
      font-weight: 600;
      z-index: 9999;
      box-shadow: 0 8px 32px rgba(99, 102, 241, 0.4);
      animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#000000',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(400px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(400px); opacity: 0; }
        }
      `}</style>

      {/* Animated Gradient Background */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(ellipse at top, #0f172a 0%, #000000 50%)',
        zIndex: 0,
      }}>
        <motion.div
          animate={{
            x: [0, 150, -100, 0],
            y: [0, -150, 100, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            top: '20%',
            right: '20%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(80px)',
          }}
        />
        <motion.div
          animate={{
            x: [0, -120, 150, 0],
            y: [0, 120, -80, 0],
            scale: [1, 0.8, 1.3, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            bottom: '15%',
            left: '15%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* Scanline Effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,.03) 2px, rgba(0,0,0,.03) 4px)',
        pointerEvents: 'none',
        zIndex: 5,
      }} />

      {/* 3D Canvas */}
      <Canvas shadows gl={{ antialias: true, alpha: false, preserveDrawingBuffer: true }} style={{ zIndex: 1 }}>
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 5, 20]} />

        <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={50} />
        <OrbitControls
          enablePan={false}
          maxDistance={12}
          minDistance={4}
          enableDamping
          dampingFactor={0.05}
        />

        {/* Lighting Setup */}
        <ambientLight intensity={0.2} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#6366f1" />
        <pointLight position={[10, -10, -5]} intensity={0.5} color="#8b5cf6" />
        <spotLight
          position={[0, 10, 0]}
          intensity={0.8}
          angle={0.3}
          penumbra={1}
          color="#ffffff"
          castShadow
        />

        {/* Stars */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        {/* Environment */}
        <Environment preset="night" />

        {/* Particles */}
        <Particles />

        {/* Main Shape */}
        <Shape
          shape={shape}
          color={color}
          wireframe={wireframe}
          rotation={rotation}
          metalness={metalness}
          roughness={roughness}
          emissive={emissive}
          shapeRef={shapeRef}
        />

        {/* Floor Plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial
            color="#0f172a"
            metalness={0.8}
            roughness={0.2}
            opacity={0.5}
            transparent
          />
        </mesh>

        {/* Grid */}
        <gridHelper
          args={[30, 30, '#1e293b', '#0f172a']}
          position={[0, -2.99, 0]}
        />

        {/* Screenshot Helper */}
        <ScreenshotHelper onCapture={screenshotRef} />
      </Canvas>

      {/* Control Panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: -450, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -450, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 35 }}
            style={{
              position: 'absolute',
              top: '24px',
              left: '24px',
              height: 'calc(100% - 48px)',
              width: '380px',
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(15, 23, 42, 0.5) 100%)',
              backdropFilter: 'blur(40px) saturate(180%)',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              borderRadius: '20px',
              padding: '32px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
              overflowY: 'auto',
              overflowX: 'hidden',
              color: 'white',
              zIndex: 10,
            }}
          >
            {/* Custom Scrollbar */}
            <style>{`
              div::-webkit-scrollbar {
                width: 8px;
              }
              div::-webkit-scrollbar-track {
                background: rgba(15, 23, 42, 0.3);
                border-radius: 10px;
              }
              div::-webkit-scrollbar-thumb {
                background: rgba(99, 102, 241, 0.5);
                border-radius: 10px;
              }
              div::-webkit-scrollbar-thumb:hover {
                background: rgba(99, 102, 241, 0.7);
              }
            `}</style>

            {/* Header */}
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              style={{ marginBottom: '36px' }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '8px',
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  boxShadow: '0 0 20px rgba(99, 102, 241, 0.8)',
                  animation: 'pulse 2s infinite',
                }} />
                <h1 style={{
                  margin: 0,
                  fontSize: '32px',
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, #ffffff 0%, #94a3b8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-1px',
                }}>
                  Genesis
                </h1>
              </div>
              <p style={{
                margin: 0,
                fontSize: '13px',
                color: '#64748b',
                fontWeight: '500',
                letterSpacing: '0.5px',
              }}>
                3D Shape Generator Studio
              </p>
            </motion.div>

            <style>{`
              @keyframes pulse {
                0%, 100% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.5; transform: scale(1.2); }
              }
            `}</style>

            {/* Shape Selection */}
            <motion.section
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              style={{ marginBottom: '36px' }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px',
              }}>
                <div style={{
                  width: '3px',
                  height: '16px',
                  background: 'linear-gradient(to bottom, #6366f1, #8b5cf6)',
                  borderRadius: '2px',
                }} />
                <h3 style={{
                  fontSize: '11px',
                  color: '#64748b',
                  margin: 0,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontWeight: '700',
                }}>
                  Geometry
                </h3>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '10px'
              }}>
                {shapes.map((s) => (
                  <ModernButton
                    key={s.value}
                    active={shape === s.value}
                    onClick={() => setShape(s.value)}
                    icon={s.icon}
                  >
                    {s.name}
                  </ModernButton>
                ))}
              </div>
            </motion.section>

            {/* Color Palette */}
            <motion.section
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{ marginBottom: '36px' }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px',
              }}>
                <div style={{
                  width: '3px',
                  height: '16px',
                  background: 'linear-gradient(to bottom, #6366f1, #8b5cf6)',
                  borderRadius: '2px',
                }} />
                <h3 style={{
                  fontSize: '11px',
                  color: '#64748b',
                  margin: 0,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontWeight: '700',
                }}>
                  Color Palette
                </h3>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '12px'
              }}>
                {colors.map((c) => (
                  <ColorSwatch
                    key={c.value}
                    color={c.value}
                    name={c.name}
                    active={color === c.value}
                    onClick={() => setColor(c.value)}
                  />
                ))}
              </div>
            </motion.section>

            {/* Material Properties */}
            <motion.section
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25 }}
              style={{ marginBottom: '36px' }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '20px',
              }}>
                <div style={{
                  width: '3px',
                  height: '16px',
                  background: 'linear-gradient(to bottom, #6366f1, #8b5cf6)',
                  borderRadius: '2px',
                }} />
                <h3 style={{
                  fontSize: '11px',
                  color: '#64748b',
                  margin: 0,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontWeight: '700',
                }}>
                  Material Properties
                </h3>
              </div>

              <PremiumSlider
                label="Metalness"
                value={metalness}
                onChange={(e) => setMetalness(parseFloat(e.target.value))}
              />

              <PremiumSlider
                label="Roughness"
                value={roughness}
                onChange={(e) => setRoughness(parseFloat(e.target.value))}
              />

              <PremiumSlider
                label="Emissive Intensity"
                value={emissive}
                onChange={(e) => setEmissive(parseFloat(e.target.value))}
              />
            </motion.section>

            {/* Export Section - NEW! */}
            <motion.section
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.28 }}
              style={{ marginBottom: '36px' }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px',
              }}>
                <div style={{
                  width: '3px',
                  height: '16px',
                  background: 'linear-gradient(to bottom, #10b981, #059669)',
                  borderRadius: '2px',
                }} />
                <h3 style={{
                  fontSize: '11px',
                  color: '#64748b',
                  margin: 0,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontWeight: '700',
                }}>
                  Export Options
                </h3>
              </div>

              {/* Format Selection */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '8px',
                  marginBottom: '12px',
                }}>
                  {['glb', 'gltf', 'obj'].map((format) => (
                    <motion.button
                      key={format}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setExportFormat(format)}
                      style={{
                        padding: '8px',
                        background: exportFormat === format
                          ? 'linear-gradient(135deg, #10b981, #059669)'
                          : 'rgba(15, 23, 42, 0.8)',
                        border: exportFormat === format ? 'none' : '1px solid rgba(148, 163, 184, 0.2)',
                        borderRadius: '8px',
                        color: exportFormat === format ? '#fff' : '#94a3b8',
                        cursor: 'pointer',
                        fontSize: '11px',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        transition: 'all 0.3s ease',
                        boxShadow: exportFormat === format ? '0 4px 20px rgba(16, 185, 129, 0.3)' : 'none',
                      }}
                    >
                      .{format}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Export Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <ExportButton
                  onClick={exportFormat === 'obj' ? exportOBJ : export3DModel}
                  icon={isExporting ? '⏳' : '💾'}
                  color="#10b981"
                >
                  {isExporting ? 'Exporting...' : `Export as .${exportFormat.toUpperCase()}`}
                </ExportButton>

                <ExportButton
                  onClick={exportScreenshot}
                  icon="📸"
                  color="#8b5cf6"
                >
                  Save Screenshot
                </ExportButton>
              </div>

              <div style={{
                marginTop: '12px',
                padding: '12px',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                borderRadius: '10px',
                fontSize: '11px',
                color: '#64748b',
                lineHeight: '1.5',
              }}>
                <div style={{ color: '#10b981', fontWeight: '700', marginBottom: '4px' }}>
                  ℹ️ Export Info
                </div>
                <div>• GLB: Binary format (recommended)</div>
                <div>• GLTF: JSON format with textures</div>
                <div>• OBJ: Universal geometry format</div>
              </div>
            </motion.section>

            {/* Display Options */}
            <motion.section
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px',
              }}>
                <div style={{
                  width: '3px',
                  height: '16px',
                  background: 'linear-gradient(to bottom, #6366f1, #8b5cf6)',
                  borderRadius: '2px',
                }} />
                <h3 style={{
                  fontSize: '11px',
                  color: '#64748b',
                  margin: 0,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontWeight: '700',
                }}>
                  Display Options
                </h3>
              </div>

              <motion.label
                whileHover={{ x: 6 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  marginBottom: '12px',
                  cursor: 'pointer',
                  padding: '14px 16px',
                  background: wireframe
                    ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.15))'
                    : 'rgba(15, 23, 42, 0.5)',
                  borderRadius: '12px',
                  border: '1px solid ' + (wireframe ? 'rgba(99, 102, 241, 0.3)' : 'rgba(148, 163, 184, 0.15)'),
                  transition: 'all 0.3s ease',
                  boxShadow: wireframe ? '0 4px 20px rgba(99, 102, 241, 0.2)' : 'none',
                }}
              >
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '6px',
                  background: wireframe ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'rgba(148, 163, 184, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  boxShadow: wireframe ? '0 0 20px rgba(99, 102, 241, 0.5)' : 'none',
                }}>
                  {wireframe && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      style={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                    >
                      ✓
                    </motion.span>
                  )}
                </div>
                <input
                  type="checkbox"
                  checked={wireframe}
                  onChange={(e) => setWireframe(e.target.checked)}
                  style={{ display: 'none' }}
                />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#fff', marginBottom: '2px' }}>
                    Wireframe Mode
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>
                    Show mesh structure
                  </div>
                </div>
              </motion.label>

              <motion.label
                whileHover={{ x: 6 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  cursor: 'pointer',
                  padding: '14px 16px',
                  background: rotation
                    ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.15))'
                    : 'rgba(15, 23, 42, 0.5)',
                  borderRadius: '12px',
                  border: '1px solid ' + (rotation ? 'rgba(99, 102, 241, 0.3)' : 'rgba(148, 163, 184, 0.15)'),
                  transition: 'all 0.3s ease',
                  boxShadow: rotation ? '0 4px 20px rgba(99, 102, 241, 0.2)' : 'none',
                }}
              >
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '6px',
                  background: rotation ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'rgba(148, 163, 184, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  boxShadow: rotation ? '0 0 20px rgba(99, 102, 241, 0.5)' : 'none',
                }}>
                  {rotation && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      style={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                    >
                      ✓
                    </motion.span>
                  )}
                </div>
                <input
                  type="checkbox"
                  checked={rotation}
                  onChange={(e) => setRotation(e.target.checked)}
                  style={{ display: 'none' }}
                />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#fff', marginBottom: '2px' }}>
                    Auto Rotation
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>
                    Continuous spin animation
                  </div>
                </div>
              </motion.label>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          position: 'absolute',
          top: '36px',
          left: menuOpen ? '428px' : '36px',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(15, 23, 42, 0.6) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          borderRadius: '14px',
          width: '52px',
          height: '52px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          color: '#fff',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
          transition: 'left 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 11,
        }}
      >
        <motion.div
          animate={{ rotate: menuOpen ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {menuOpen ? '✕' : '☰'}
        </motion.div>
      </motion.button>

      {/* Info Badge */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{
          position: 'absolute',
          bottom: '32px',
          right: '32px',
          padding: '14px 20px',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(15, 23, 42, 0.6) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          borderRadius: '12px',
          color: '#94a3b8',
          fontSize: '12px',
          fontWeight: '500',
          zIndex: 10,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span style={{ fontSize: '16px' }}>🎮</span>
        <span>Drag to rotate • Scroll to zoom</span>
      </motion.div>

      {/* Export Badge */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        style={{
          position: 'absolute',
          top: '32px',
          right: '32px',
          padding: '10px 16px',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.2) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '10px',
          color: '#10b981',
          fontSize: '11px',
          fontWeight: '700',
          zIndex: 10,
          boxShadow: '0 4px 20px rgba(16, 185, 129, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
          letterSpacing: '1px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <span>💾</span>
        <span>EXPORT READY</span>
      </motion.div>
    </div>
  );
}