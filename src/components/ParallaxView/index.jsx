import { useMemo } from 'react';
import { Canvas, extend } from '@react-three/fiber';

import ParallaxCamera from './Parallax/ParallaxCamera';
import CameraControl from './Parallax/CameraControl';

import CameraView from './CameraView';

extend({ ParallaxCamera });

export default (props) => {
  const { width, height, depth, children } = props;

  const camera = useMemo(() => {
    const parallaxCamera = new ParallaxCamera(0, 0, depth, width, height);
    parallaxCamera.cameraControl = new CameraControl(parallaxCamera);
    parallaxCamera.cameraControl.init();
    return parallaxCamera;
  });

  return (
    <Canvas camera={camera}>
      <CameraView>
        {children}
      </CameraView>
    </Canvas>
  );
}
