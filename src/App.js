import "./scss/style.scss";
import { Canvas } from "react-three-fiber";
import { Suspense } from "react";
import * as THREE from "three";
import Orbit from "./components/Orbit";
import Box from "./components/Box";
import Floor from "./components/Floor";
import Bulb from "./components/Bulb";

function App() {
  const handleClick = (e) => {
    // 색상패널 클릭시 만약 전역에 등록한 오브제가 없으면 종료
    if (!window.activeMesh) return;
    window.activeMesh.material.color = new THREE.Color(
      e.target.style.background
    );
  };

  return (
    <figure>
      <article className="colorPicker">
        <div style={{ background: "blue" }} onClick={handleClick}></div>
        <div style={{ background: "red" }} onClick={handleClick}></div>
        <div style={{ background: "green" }} onClick={handleClick}></div>
        <div style={{ background: "transparent" }} onClick={handleClick}></div>
      </article>

      <Canvas
        //그림자 설정시 필요함
        shadowMap
        style={{ background: "#111" }}
        camera={{ position: [3, 5, 3] }}
      >
        <axesHelper args={[6]} />
        <Orbit />

        <ambientLight intensity={0.2} />
        <Bulb position={[0, 3, 0]} />
        <Suspense fallback={null}>
          <Box position={[-2, 1, 0]} />
        </Suspense>
        <Suspense fallback={null}>
          <Box position={[-1, 1, 2]} />
        </Suspense>
        <Floor position={[0, -0.5, 0]} />
      </Canvas>
    </figure>
  );
}

export default App;
