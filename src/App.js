import "./scss/style.scss";
import { Canvas, useFrame, extend, useThree } from "react-three-fiber";
import { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
extend({ OrbitControls }); //  orbitControls를 확장시켜서 사용가능하게 함

//화면축을 변경할 수 있는 컴포넌트
const Orbit = () => {
  const { camera, gl } = useThree(); // react에서 Three.js 기능을 사용하기 위한 useTree();
  return <orbitControls args={[camera, gl.domElement]} />;
};

const Box = () => {
  const ref = useRef(null); // Box참조

  // 1초마다 프레임 렌더링하며 useFrame을 활용해 모션을 구현한다.
  // 콜백함수에 인자로 state객체가 들어온다.
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

        {/* 마우스 드래그로 시점을 컨트롤 할 수 있게함 */}
        <Orbit />

        {/* Object */}
        <Box />
      </Canvas>
    </figure>
  );
}

export default App;
