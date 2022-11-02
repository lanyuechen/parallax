import ParallaxView from '@/components/ParallaxView';

import Model1 from '@/components/Model1';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const DEPTH = 200;

export default () => {
  return (
    <ParallaxView width={WIDTH} height={HEIGHT} depth={DEPTH}>
      <Model1 width={WIDTH} height={HEIGHT} />
    </ParallaxView>
  );
}
