import "./scss/style.scss";
import { Canvas, useFrame, extend, useThree } from "react-three-fiber";
import { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
extend({ OrbitControls });

//화면축을 변경할 수 있는 컴포넌트
const Orbit = () => {
  const { camera, gl } = useThree();
  return <orbitControls args={[camera, gl.domElement]} />;
};

const Box = (props) => {
  const ref = useRef(null);
  useFrame(() => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });
  return (
    <mesh ref={ref} {...props}>
      <boxBufferGeometry />
      <meshPhysicalMaterial color="blue" />
    </mesh>
  );
};

const Floor = (props) => {
  return (
    <mesh {...props}>
      <boxBufferGeometry args={[20, 1, 10]} />
      <meshPhysicalMaterial color="white" />
    </mesh>
  );
};

function App() {
  return (
    <figure>
      <Canvas style={{ background: "#111" }} camera={{ position: [3, 3, 3] }}>
        <axesHelper args={[6]} />
        <Orbit />

        <ambientLight intensity={0.2} />
        <Box position={[-1, 1, 2]} />
        <Floor position={[0, -0.5, 0]} />
      </Canvas>
    </figure>
  );
}

export default App;
