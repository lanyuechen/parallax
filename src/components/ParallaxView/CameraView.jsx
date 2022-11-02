import { useFrame, useThree } from '@react-three/fiber';

export default (props) => {
  const { children } = props;
  const { camera } = useThree();

  useFrame(() => {
    camera.updateProjectionMatrix();
  });

  return children;
}
