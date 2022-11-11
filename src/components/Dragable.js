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

  // 자식요소인 Box컴포넌트가 실제 Dragable컴포넌트에 담기는 순간 호버 이벤트 연결!!
  useEffect(() => {
    controlRef.current.addEventListener("hoveron", (e) => {
      console.log(scene.__objects);
      // 요소 hover시 scene에서 orbit기능을 false를 대입해 비활성화
      scene.__objects[0].enabled = false;
      //   console.log(scene.__objects[0].enabled);
    });

    controlRef.current.addEventListener("hoveroff", (e) => {
      // 요소 hover시 scene에서 orbit기능을 false를 대입해 비활성화
      scene.__objects[0].enabled = true;
      //   console.log(scene.__objects[0].enabled);
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
