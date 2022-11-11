import * as THREE from "three";
import { useRef } from "react";
import { useLoader, useFrame } from "react-three-fiber";

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

export default Box;
