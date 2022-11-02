import ParallaxView from '@/components/ParallaxView';
import Box from '@/components/Box';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const DEPTH = 1000;

export default () => {
  return (
    <ParallaxView width={WIDTH} height={HEIGHT} depth={DEPTH}>
      <Box width={WIDTH} height={HEIGHT} depth={DEPTH} />
      <ambientLight color={0x404040} />
      <pointLight color={0x404040} intensity={2} distance={DEPTH} />
    </ParallaxView>
  );
}
