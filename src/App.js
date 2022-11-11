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
  // 클릭한 object에 active key값을 만들고 true값을 저장!!
  e.object.active = true;
  if (window.activeMesh) {
    scaleDown(window.activeMesh);
    window.activeMesh.active = false;
  }
  console.log(e.object);
  //해당 정보값을 다시 window 전역객체에 activeMesh속성을 만들고 옮겨담음!
  window.activeMesh = e.object;
  console.log(window);
};

const handlePointerEnter = (e) => {
  e.object.scale.x = 1.5;
  e.object.scale.y = 1.5;
  e.object.scale.z = 1.5;
};

const handlePointerLeave = (e) => {
  // 해당 object를 클릭해서 active키값이 true가 아닐때만 동작
  // 그냥 호버시에는 커지고 작아지지만 한번이라도 클릭하면 아래 조건식에 의해서
  // mouseLeave이벤트는 발생하되 작아지지 않음
  if (!e.object.active) {
    e.object.scale.x = 1;
    e.object.scale.y = 1;
    e.object.scale.z = 1;
  }
};

const scaleDown = (object) => {
  object.scale.x = 1;
  object.scale.y = 1;
  object.scale.z = 1;
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
