import "./scss/style.scss";
import { Canvas } from "react-three-fiber";

const Box = () => {
  return (
    <mesh>
      {/* 정육면체 도형 가져오기 */}
      <boxBufferGeometry />
      {/* 기본 색상 지정 */}
      <meshBasicMaterial color="blue" />
    </mesh>
  );
};

function App() {
  return (
    <figure>
      <Canvas
        style={{ background: "#111" }}
        // 카메라 시점 x, y, z
        camera={{ position: [7, 7, 7] }}
      >
        {/* 축 기준점 가이드 */}
        <axesHelper args={[6]} />

        {/* Object */}
        <Box />
      </Canvas>
    </figure>
  );
}

export default App;
