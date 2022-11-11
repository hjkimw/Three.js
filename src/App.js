import "./scss/style.scss";
import { Canvas } from "react-three-fiber";
import { Suspense } from "react";
import Orbit from "./components/Orbit";
import Bulb from "./components/Bulb";
import ColorPicker from "./components/ColorPicker";
import Dragable from "./components/Dragable";
import Model from "./components/Model";

function App() {
  return (
    <figure>
      {/* <ColorPicker /> */}
      <Canvas
        shadowMap
        style={{ background: "#111" }}
        camera={{ position: [100, 120, 160] }}
      >
        {/* <axesHelper args={[6]} /> */}

        <Orbit />

        <ambientLight intensity={0.2} />

        <Dragable>
          {/* 광원 */}
          <Bulb position={[30, 200, 0]} />
          <Bulb position={[30, 200, 0]} />
          <Bulb position={[30, 200, 0]} />
        </Dragable>
        <Suspense fallback={null}>
          {/* Model불러오기 */}
          <Model path={`${process.env.PUBLIC_URL}lotus_elise/scene.gltf`} />
        </Suspense>
      </Canvas>
    </figure>
  );
}

export default App;
