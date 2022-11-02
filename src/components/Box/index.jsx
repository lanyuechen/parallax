import { Plane } from '@react-three/drei';

export default (props) => {
  const { width, height, depth } = props;
  const wireframe = false;

  return (
    <>
      {/* left */}
      <Plane args={[depth, height]} rotation={[0, Math.PI / 2, 0]} position={[-width / 2, 0, -depth / 2]} receiveShadow>
        <meshPhongMaterial wireframe={wireframe} />
      </Plane>
      {/* right */}
      <Plane args={[depth, height]} rotation={[0, -Math.PI / 2, 0]} position={[width / 2, 0, -depth / 2]} receiveShadow>
        <meshPhongMaterial wireframe={wireframe} />
      </Plane>
      {/* front */}
      <Plane args={[width, depth]} rotation={[Math.PI / 2, 0, 0]} position={[0, height / 2, -depth / 2]} receiveShadow>
        <meshPhongMaterial wireframe={wireframe} />
      </Plane>
      {/* back */}
      <Plane args={[width, depth]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -height / 2, -depth / 2]} receiveShadow>
        <meshPhongMaterial wireframe={wireframe} />
      </Plane>
      {/* bottom */}
      <Plane args={[width, height]} position={[0, 0, -depth]} receiveShadow>
        <meshPhongMaterial wireframe={wireframe} />
      </Plane>
    </>
  );
}
