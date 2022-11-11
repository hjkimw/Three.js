import "./scss/style.scss";
import Orbit from "./components/Orbit";
import { Canvas, extend } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
extend({ OrbitControls });

function App() {
  return (
    <figure>
      <Canvas
        shadowMap
        style={{ background: "#111" }}
        // 카메라 시점 x, y, z
        camera={{ position: [7, 7, 7] }}
      >
        {/* 궤도 Orbit */}
        <Orbit />
        {/* 시점을 보여주는 axesHelper */}
        <axesHelper args={[6]} />
      </Canvas>
    </figure>
  );
}

export default App;
