import { DragControls } from "three/examples/jsm/controls/DragControls";
import { extend, useThree } from "react-three-fiber";
import { useRef, useEffect, useState } from "react";
extend({ DragControls });

function Dragable(props) {
  const groupRef = useRef(null);
  const controlRef = useRef(null);
  const { camera, gl, scene } = useThree();
  const [Children, setChildren] = useState([]);

  useEffect(() => {
    setChildren(groupRef.current.children);
  }, []);

  //자식 요소인 Box컴포넌트가 실제 Dragable컴포넌트에 담기는 순간 호버 이벤트 연결
  useEffect(() => {
    controlRef.current.addEventListener("hoveron", (e) => {
      console.log(scene);
      //요소에 호버시 씬에서의 orbit기능을 false로 비활성화
      scene.__objects[0].enabled = false;
    });

    controlRef.current.addEventListener("hoveroff", (e) => {
      //요소에 호버시 씬에서의 orbit기능을 true로 다시 활성화
      scene.__objects[0].enabled = true;
    });
  }, [Children]);

  return (
    //해당 wrapping컴포넌트로 감싸진 자식 요소를 useRef로 참조
    <group ref={groupRef}>
      <dragControls args={[Children, camera, gl.domElement]} ref={controlRef} />
      {props.children}
    </group>
  );
}

export default Dragable;
