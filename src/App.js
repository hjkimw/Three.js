import "./scss/style.scss";
import { Canvas, useFrame } from "react-three-fiber";
import { useRef } from "react";

const Box = () => {
  const ref = useRef(null); // Box참조

  // 1초마다 프레임 렌더링하며 useFrame을 활용해 모션을 구현한다.
  useFrame(() => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={ref}>
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
