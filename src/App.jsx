import ParallaxView from '@/components/ParallaxView';
import Tracking from '@/components/Tracking';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const DEPTH = 1000;

export default () => {
  // const setTouch = () => {
  //   parallax.camera.cameraControl.init();
  //   parallax.camera.deviceOrientationControl.close();
  // }

  // const setOrientation = () => {
  //   parallax.camera.cameraControl.init();
  //   parallax.camera.deviceOrientationControl.close();
  // }

  return (
    <div>
      {/* <button onClick={setTouch}>拖动</button>
      <button onClick={setOrientation}>陀螺仪</button> */}
      <ParallaxView width={WIDTH} height={HEIGHT} depth={DEPTH} />
      {/* <Tracking /> */}
    </div>
  );
}
