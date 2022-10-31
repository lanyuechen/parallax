import * as THREE from 'three';

export default class CameraControl {
  constructor(camera) {
    this.camera = camera;

    this.domElement = document.body;
    this.enable = false;
    this.moveFlag = false;

    this.movePosition = new THREE.Vector3();

    this.moveStart = new THREE.Vector2();
    this.moveEnd = new THREE.Vector2();
    this.moveDelta = new THREE.Vector2();

    this.distanceStart = 0;
    this.distanceDelta = 0;
    this.distanceEnd = 0;
    this.distanceRange = Math.sqrt(this.camera.ow * this.camera.ow + this.camera.oh * this.camera.oh);
  }

  onTouchStart = (event) => {
    if (!this.enable) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    this.movePosition = this.camera.position.clone();

    if (event.touches.length > 1) {
      const dx = event.touches[0].pageX - event.touches[1].pageX;
      const dy = event.touches[0].pageY - event.touches[1].pageY;

      this.distanceStart = Math.sqrt(dx * dx + dy * dy);
    } else {
      this.moveStart.set(event.touches[0].pageX, event.touches[0].pageY);
    }

    this.moveFlag = true;
  }

  onTouchMove = (event) => {
    if (!this.moveFlag) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    if (event.touches.length > 1) {
      const dx = event.touches[0].pageX - event.touches[1].pageX;
      const dy = event.touches[0].pageY - event.touches[1].pageY;

      if (this.distanceStart == null) {
        this.distanceStart = Math.sqrt(dx * dx + dy * dy);
      }
      this.distanceDelta = Math.sqrt(dx * dx + dy * dy);

      this.distanceEnd = ((this.distanceDelta - this.distanceStart) * this.camera.ori_pos.z) / this.distanceRange;

      this.camera.position.z = Math.max(1, this.movePosition.z - this.distanceEnd);
    } else {
      this.moveEnd.set(event.touches[0].pageX, event.touches[0].pageY);

      this.moveDelta.subVectors(this.moveEnd, this.moveStart);

      this.camera.position.x = this.movePosition.x + (this.moveDelta.x / this.domElement.clientWidth) * this.camera.ow * 2;
      this.camera.position.y = this.movePosition.y - (this.moveDelta.y / this.domElement.clientHeight) * this.camera.oh * 2;

      this.camera.position.x = Math.max(
        this.camera.left,
        Math.min(this.camera.right, this.camera.position.x)
      );
      this.camera.position.y = Math.max(
        this.camera.bottom,
        Math.min(this.camera.top, this.camera.position.y)
      );
    }
  }

  onTouchEnd = (event) => {
    this.distanceStart = null;
    this.moveFlag = false;
    this.camera.move_pos = this.camera.position.clone();
  }

  onMouseDown = (event) => {
    if (!this.enable) {
      return;
    }

    event.preventDefault();

    this.movePosition = this.camera.position.clone();
    this.moveStart.set(event.clientX, event.clientY);

    this.moveFlag = true;
  }

  onMouseMove = (event) => {
    if (!this.moveFlag) {
      return;
    }

    event.preventDefault();

    this.moveEnd.set(event.clientX, event.clientY);

    this.moveDelta.subVectors(this.moveEnd, this.moveStart);

    this.camera.position.x = this.movePosition.x + (this.moveDelta.x / this.domElement.clientWidth) * this.camera.ow * 2;
    this.camera.position.y = this.movePosition.y - (this.moveDelta.y / this.domElement.clientHeight) * this.camera.oh * 2;

    this.camera.position.x = Math.max(
      this.camera.left,
      Math.min(this.camera.right, this.camera.position.x)
    );
    this.camera.position.y = Math.max(
      this.camera.bottom,
      Math.min(this.camera.top, this.camera.position.y)
    );
  }

  onMouseUp = (event) => {
    this.moveFlag = false;
    this.camera.move_pos = this.camera.position.clone();
  }

  init() {
    this.domElement.addEventListener('mousedown', this.onMouseDown, false);
    this.domElement.addEventListener('mousemove', this.onMouseMove, false);
    this.domElement.addEventListener('mouseup', this.onMouseUp, false);

    this.domElement.addEventListener('touchstart', this.onTouchStart, false);
    this.domElement.addEventListener('touchend', this.onTouchEnd, false);
    this.domElement.addEventListener('touchmove', this.onTouchMove, {
      passive: false,
    });

    this.enable = true;
  }

  close() {
    this.domElement.removeEventListener('mousedown', this.onMouseDown, false);
    this.domElement.removeEventListener('mousemove', this.onMouseMove, false);
    this.domElement.removeEventListener('mouseup', this.onMouseUp, false);

    this.domElement.removeEventListener('touchstart', this.onTouchStart, false);
    this.domElement.removeEventListener('touchend', this.onTouchEnd, false);
    this.domElement.removeEventListener('touchmove', this.onTouchMove, false);

    this.enable = false;
  }
}
