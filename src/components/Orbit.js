import { useThree } from "react-three-fiber";

function Orbit() {
  const { camera, gl } = useThree();
  return (
    <orbitControls attach="orbitControls" args={[camera, gl.domElement]} />
  );
}

export default Orbit;
