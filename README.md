✨ Genesis - 3D Shape Generator Studio

live demo : https://genesis3.netlify.app/

License: MIT 


🌟 Overview Genesis is a modern, interactive 3D shape generator that lets you create, customize, and export beautiful geometric models directly in your browser. Built with cutting-edge web technologies, it combines stunning visuals with powerful functionality.
✨ Key Highlights 🎨 9 Geometric Shapes - From basic cubes to complex icosahedrons 🌈 Real-time Customization - Adjust colors, materials, and properties 💾 Multiple Export Formats - GLB, GLTF, and OBJ support 🎭 Premium Dark UI - Glassmorphic design with smooth animations ⚡ High Performance - 60 FPS rendering with optimized graphics 📸 Screenshot Capture - Save high-quality PNG images 🎮 Interactive Controls - Intuitive drag, rotate, and zoom 🖼️ Screenshots

Main Interface Main Interface
Shape Gallery

  

Material Customization Materials
🚀 Features 🎯 Geometry Options Cube - Classic 6-sided box Sphere - Smooth spherical shape Cone - Pointed conical geometry Cylinder - Circular cylindrical form Torus - Donut-shaped ring Torus Knot - Complex knotted torus Octahedron - 8-faced polyhedron Dodecahedron - 12-faced polyhedron Icosahedron - 20-faced polyhedron 🎨 Customization 8 Color Presets - Carefully curated color palette Material Properties Metalness control (0-100%) Roughness adjustment (0-100%) Emissive intensity (0-100%) Wireframe Mode - Toggle mesh visualization Auto Rotation - Continuous animation toggle 💾 Export Capabilities Format Use Case Best For GLB Binary GLTF Web, Unity, Unreal Engine GLTF JSON format Three.js, Web applications OBJ Universal Blender, Maya, 3D printing PNG Screenshot Documentation, sharing 🎭 Visual Effects ✨ Particle system with 200+ floating points 🌟 5000+ star background 💫 Dynamic gradient orbs 🌊 Reflective floor plane 💡 Advanced lighting (ambient, directional, point, spot) 🔮 HDR environment mapping 🛠️ Tech Stack
Technology Purpose React UI Framework Three.js 3D Graphics Framer Motion Animations Vite Build Tool React Three Fiber React + Three.js Drei R3F Helpers
📦 Installation Prerequisites Node.js 16.x or higher npm or yarn Quick Start Bash
Clone the repository
git clone https://github.com/YOUR-USERNAME/genesis-3d-generator.git

Navigate to project directory
cd genesis-3d-generator

Install dependencies
npm install

Start development server
npm run dev The app will open at http://localhost:5173

Build for Production Bash

Create optimized build
npm run build

Preview production build
npm run preview 🎮 Usage Guide Basic Controls Select Shape - Click on any geometry button in the sidebar Change Color - Click a color swatch to apply Adjust Materials - Use sliders to fine-tune appearance Rotate View - Click and drag on the canvas Zoom - Scroll wheel to zoom in/out Exporting Models Choose Format Click GLB, GLTF, or OBJ button Export 3D Model Click "Export as..." button File downloads automatically Save Screenshot Click "Save Screenshot" button PNG image downloads instantly Keyboard Shortcuts Shortcut Action Space Toggle auto-rotation W Toggle wireframe mode R Reset camera position Esc Close sidebar 📁 Project Structure text

genesis-3d-generator/ ├── public/ │ └── favicon.ico ├── src/ │ ├── App.jsx # Main application component │ ├── main.jsx # Entry point │ ├── index.css # Global styles │ └── assets/ # Static assets ├── package.json ├── vite.config.js ├── .gitignore └── README.md 🎨 Color Palette CSS

/* Primary Colors */ --indigo: #6366f1; --purple: #8b5cf6; --fuchsia: #d946ef; --pink: #ec4899;

/* Accent Colors */ --cyan: #06b6d4; --emerald: #10b981; --amber: #f59e0b; --rose: #f43f5e;

/* Background */ --background: #000000; --panel: rgba(15, 23, 42, 0.7); --border: rgba(148, 163, 184, 0.2); 🔧 Configuration Customize Default Settings Edit src/App.jsx:

JavaScript

// Default shape const [shape, setShape] = useState('icosahedron');

// Default color const [color, setColor] = useState('#6366f1');

// Material properties const [metalness, setMetalness] = useState(0.8); const [roughness, setRoughness] = useState(0.2); const [emissive, setEmissive] = useState(0.3); 🌐 Browser Support Browser Version Chrome ✅ 90+ Firefox ✅ 88+ Safari ✅ 14+ Edge ✅ 90+ Opera ✅ 76+ Note: Requires WebGL 2.0 support

🤝 Contributing Contributions are what make the open-source community amazing! Any contributions you make are greatly appreciated.

Fork the Project Create your Feature Branch (git checkout -b feature/AmazingFeature) Commit your Changes (git commit -m 'Add some AmazingFeature') Push to the Branch (git push origin feature/AmazingFeature) Open a Pull Request 📝 License Distributed under the MIT License. See LICENSE for more information.

👨‍💻 Author SOURAV ROY

GitHub: @CoderSouravvv Email: souravroymoyna05@gmail.com.com 🙏 Acknowledgments Three.js - 3D graphics library React Three Fiber - React renderer for Three.js Framer Motion - Animation library Drei - Useful helpers for R3F Vite - Next generation frontend tooling 🗺️ Roadmap Add texture mapping support Implement custom shape editor Add animation timeline Support for multiple objects Collaborative editing mode Cloud save functionality VR/AR preview mode Advanced lighting presets 💬 FAQ Q: Can I use exported models commercially? A: Yes! All models you create are yours to use freely.

Q: What's the best export format? A: GLB for web/games, OBJ for 3D modeling software.

Q: Can I add custom shapes? A: Yes, edit the getGeometry() function in App.jsx.

Q: Does it work offline? A: Yes, once loaded, it works without internet.

📊 Stats

GitHub stars GitHub forks GitHub watchers
⭐ Star this repo if you find it useful! Made with ❤️ and ☕ by Sourav
