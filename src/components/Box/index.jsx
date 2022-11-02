export default (props) => {
  const { width, height, depth } = props;

  return (
    <>
      {/* left */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-width / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[depth, height]} />
        <meshStandardMaterial />
      </mesh>
      {/* right */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[width / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[depth, height]} />
        <meshStandardMaterial />
      </mesh>
      {/* front */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, height / 2, 0]} receiveShadow>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial />
      </mesh>
      {/* back */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -height / 2, 0]} receiveShadow>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial />
      </mesh>
      {/* bottom */}
      <mesh position={[0, 0, -depth / 2]} receiveShadow>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial />
      </mesh>
    </>
  );
}
