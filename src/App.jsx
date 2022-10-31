import { useEffect } from 'react';
import Parallax from '@/libs/Parallax';

const parallax = new Parallax(window.innerWidth, window.innerHeight, 1000);

export default () => {
  useEffect(() => {
    const parallax = new Parallax(window.innerWidth, window.innerHeight, 1000);
  }, []);

  const setTouch = () => {
    parallax.camera.cameraControl.init();
    parallax.camera.deviceOrientationControl.close();
  }

  const setOrientation = () => {
    parallax.camera.cameraControl.init();
    parallax.camera.deviceOrientationControl.close();
  }

  return (
    <div>
      <button onClick={setTouch}>拖动</button>
      <button onClick={setOrientation}>陀螺仪</button>
    </div>
  );
}
