import "./scss/style.scss";
import {
  Canvas,
  useFrame,
  extend,
  useThree,
  useLoader,
} from "react-three-fiber";
//Suspense: 리액트 컴포넌트 안쪽에서 비동기로 실행되는 구문을 동기화
import { useRef, Suspense } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
extend({ OrbitControls });

const handlePointerDown = (e) => {
  console.log(e);
};

const handlePointerEnter = (e) => {
  e.object.scale.x = 1.5;
  e.object.scale.y = 1.5;
  e.object.scale.z = 1.5;
};

const handlePointerLeave = (e) => {
  e.object.scale.x = 1;
  e.object.scale.y = 1;
  e.object.scale.z = 1;
};

const Orbit = () => {
  const { camera, gl } = useThree();
  return <orbitControls args={[camera, gl.domElement]} />;
};

const Bulb = (props) => {
  return (
    <mesh {...props}>
      <pointLight castShadow intensity={1} color="white" />
      <sphereBufferGeometry args={[0.5, 20, 20]} />
      <meshPhongMaterial emissive="yellow" />
    </mesh>
  );
};

const Box = (props) => {
  const ref = useRef(null);
  const texture = useLoader(
    THREE.TextureLoader,
    `${process.env.PUBLIC_URL}/img/wood.jpg`
  );

  useFrame(() => {
    ref.current.rotation.x += 0.02;
    ref.current.rotation.y += 0.02;
  });
  return (
    <mesh
      ref={ref}
      {...props}
      castShadow
      receiveShadow
      onPointerDown={handlePointerDown}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <boxBufferGeometry />
      <meshPhysicalMaterial map={texture} />
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
        camera={{ position: [3, 5, 3] }}
      >
        <axesHelper args={[6]} />
        <Orbit />

        <ambientLight intensity={0.2} />
        <Bulb position={[0, 3, 0]} />
        <Suspense fallback={null}>
          <Box position={[-1, 2, 1]} />
        </Suspense>
        <Floor position={[0, -0.5, 0]} />
      </Canvas>
    </figure>
  );
}

export default App;
