import "./scss/style.scss";
import { Canvas, useFrame, extend, useThree } from "react-three-fiber";
import { useRef } from "react";
import { MeshPhongMaterial } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
extend({ OrbitControls });

const Orbit = () => {
  const { camera, gl } = useThree();
  return <orbitControls args={[camera, gl.domElement]} />;
};
const Bulb = (props) => {
  return (
    <mesh {...props}>
      <pointLight castShadow intensity={1} />
      {/* 반지름, 가로면분할, 세로면분할 */}
      <sphereBufferGeometry args={[0.5, 20, 20]} />
      <meshPhongMaterial emissive="yellow" />
    </mesh>
  );
};
const Box = (props) => {
  const ref = useRef(null);
  useFrame(() => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });
  return (
    <mesh ref={ref} {...props} receiveShadow castShadow>
      <boxBufferGeometry />
      <meshPhysicalMaterial color="blue" />
    </mesh>
  );
};
const Floor = (props) => {
  return (
    <mesh {...props} receiveShadow>
      <boxBufferGeometry args={[20, 1, 10]} />
      <meshPhysicalMaterial color="white" />
    </mesh>
  );
};
function App() {
  return (
    <figure>
      <Canvas
        //그림자 설정시 필요함
        shadowMap
        style={{ background: "#111" }}
        camera={{ position: [4, 4, 4] }}
      >
        <axesHelper args={[6]} />
        <Orbit />

        <ambientLight intensity={0.2} />
        <Bulb position={[0, 3, 0]} />
        <Box position={[-1, 1, 2]} />
        <Floor position={[0, -0.5, 0]} />
      </Canvas>
    </figure>
  );
}

export default App;
