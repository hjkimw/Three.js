import { DragControls } from "three/examples/jsm/controls/DragControls";
import { extend, useThree } from "react-three-fiber";
import { useRef, useEffect } from "react";
extend({ DragControls });

function Dragable(props) {
  const groupRef = useRef(null);
  const { camera, gl } = useThree();

  useEffect(() => {
    console.log(groupRef.current);
  }, []);

  return (
    //해당 wrapping컴포넌트로 감싸진 자식 요소를 useRef로 참조
    <group ref={groupRef}>{props.children}</group>
  );
}

export default Dragable;
