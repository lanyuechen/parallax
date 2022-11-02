import { useMemo } from 'react';
import { Box, Plane } from '@react-three/drei';

const generateBox = (width, height, count = 10) => {
  const boxes = [];
  for (let i = 0; i < count; i++) {
    const w = Math.max(Math.random() * 100, 50);
    const h = Math.max(Math.random() * 100, 50);
    const d = Math.max(Math.random() * 50, 10);
    boxes.push({
      width: w,
      height: h,
      depth: d,
      x: (Math.random() - 0.5) * width / 3,
      y: (Math.random() - 0.5) * height / 3,
      z: d / 2,
      color: parseInt(Math.random() * 0xffffff),
    });
  }
  return boxes;
}

export default (props) => {
  const { width, height } = props;

  const boxes = useMemo(() => generateBox(width, height, 10), [width, height]);

  return (
    <>
      {boxes.map((d, i) => (
        <Box key={i} args={[d.width, d.height, d.depth]} position={[d.x, d.y, d.z]} receiveShadow castShadow>
          <meshPhongMaterial color={d.color} />
        </Box>
      ))}
      <Plane args={[width, height]} receiveShadow>
        <meshPhongMaterial color={0xffffff} />
      </Plane>
      <ambientLight color={0x404040} />
      <pointLight position={[width / 6, height / 6, 150]} color={0x404040} intensity={2} castShadow />
    </>
  );
}
