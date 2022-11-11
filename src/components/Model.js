import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Model = (props) => {
  const model = useLoader(GLTFLoader, props.path);
  return (
    <primitive
      object={model.scene}
      scale={new Array(3).fill(50)}
      postition={[0, -3, 0]}
      // 회전값 1 === 90deg
      rotation-y={4.5}
    />
  );
};

export default Model;
