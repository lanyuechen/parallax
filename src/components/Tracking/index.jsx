import { useEffect, useRef } from 'react';
import 'tracking';


import 'tracking/build/data/face-min';
// import 'tracking/build/data/eye-min';
// import 'tracking/build/data/mouth-min';

// console.log('===', ObjectTracker)


export default () => {
  const canvasRef = useRef();
  const videoRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const video = videoRef.current;

    const tracker = new tracking.ObjectTracker(['face']);
    tracker.setInitialScale(1);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);

    tracking.track(video, tracker, { camera: true });

    tracker.on('track', (event) => {
      ctx.clearReact(0, 0, canvas.width, canvas.height);
      event.data.forEach((d) => {
        ctx.strokeStyle = '#a64ceb';
        ctx.strokeRect(d.x, d.y, d.width, d.height);
      })
    })
  }, []);

  return (
    <div>
      <video ref={videoRef} width={200} height={150} autoPlay loop muted />
      <canvas ref={canvasRef} width={200} height={150} />
    </div>
  )
}