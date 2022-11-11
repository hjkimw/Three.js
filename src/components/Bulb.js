const Bulb = (props) => {
  return (
    <mesh {...props}>
      <pointLight castShadow intensity={5} color="white" />
      <sphereBufferGeometry args={[15, 200, 200]} />
      <meshPhongMaterial emissive="yellow" />
    </mesh>
  );
};

export default Bulb;
