import { useEffect, useRef } from 'react';

import Parallax from './Parallax';
import CameraControl from './Parallax/CameraControl';

export default (props) => {
  const { width, height, depth } = props;
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      const parallax = new Parallax(width, height, depth);
      ref.current.appendChild(parallax.renderer.domElement);
      parallax.camera.cameraControl = new CameraControl(parallax.camera, ref.current);
      parallax.camera.cameraControl.init();
    }
  }, []);

  return (
    <div ref={ref}>

    </div>
  );
}
