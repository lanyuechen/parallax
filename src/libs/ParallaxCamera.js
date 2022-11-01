import * as THREE from 'three';

import CameraControl from './CameraControl';
import DeviceOrientationControl from './DeviceOrientationControl';

export default class extends THREE.PerspectiveCamera {
  type = "ParallaxCamera";

  constructor(xAxis, yAxis, zAxis, width, height) {
    super();

    this.left = xAxis - width / 2;
    this.right = xAxis + width / 2;
    this.top = yAxis + height / 2;
    this.bottom = yAxis - height / 2;

    this.ow = width;
    this.oh = height;
    this.oz = zAxis;

    this.near = 0.1;
    this.far = 10000;

    this.position.set(xAxis, yAxis, zAxis);
    this.ori_pos = new THREE.Vector3(xAxis, yAxis, zAxis);
    this.move_pos = this.position.clone();

    this.enabled = true;

		// this.deviceOrientationControl = new DeviceOrientationControl(this);
		// this.cameraControl = new CameraControl(this);

    this.updateProjectionMatrix();
  }

  updateProjectionMatrix() {
    if (this.enabled) {
      if (this.deviceOrientationControl?.enable) {
        this.deviceOrientationControl.deviceOrientationUpdate();
      }

      const left = this.ori_pos.x - this.position.x + this.left;
      const right = this.ori_pos.x - this.position.x + this.right;
      const top = this.ori_pos.y - this.position.y + this.top;
      const bottom = this.ori_pos.y - this.position.y + this.bottom;
      const zoom = this.near / (this.position.z - this.ori_pos.z + this.oz);

      this.projectionMatrix.makePerspective(
        left * zoom,
        right * zoom,
        top * zoom,
        bottom * zoom,
        this.near,
        this.far
      );
      this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
    }
  }
};
