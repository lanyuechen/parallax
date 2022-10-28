export default class DeviceOrientationControl {
  constructor(camera) {
    this.camera = camera;

    this.enable = false;

    this.originDeviceFace = null;
    this.deviceOrientation = {};
    this.screenOrientation = 0;
  }

  static getDeviceFce(alpha, beta, gamma, orient) {
    const zee = new THREE.Vector3(0, 0, 1);
    const euler = new THREE.Euler();
    const q0 = new THREE.Quaternion();
    const q1 = new THREE.Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5));
    const quaternion = new THREE.Quaternion();
    const rotation = new THREE.Euler();

    euler.set(beta, alpha, -gamma, 'YXZ');

    quaternion.setFromEuler(euler);
    quaternion.multiply(q1);
    quaternion.multiply(q0.setFromAxisAngle(zee, -orient));

    return quaternion.invert();
  }

  onDeviceOrientationChangeEvent = (event) => {
    this.deviceOrientation = event;
    const alpha = event.alpha ? THREE.MathUtils.degToRad(event.alpha) : 0;
    const beta = event.beta ? THREE.MathUtils.degToRad(event.beta) : 0;
    const gamma = event.gamma ? THREE.MathUtils.degToRad(event.gamma) : 0;
    const orient = event.screenOrientation ? THREE.MathUtils.degToRad(event.screenOrientation) : 0;

    if (!this.originDeviceFace) {
      this.originDeviceFace = DeviceOrientationControl.getDeviceFce(alpha, beta, gamma, orient).invert();
    }
    
    const quaternion = DeviceOrientationControl.getDeviceFce(alpha, beta, gamma, orient);
    this.DeviceFace = new THREE.Vector3(0, 0, 1).applyQuaternion(this.originDeviceFace);
    this.DeviceFace.applyQuaternion(quaternion);
  }

  onScreenOrientationChangeEvent = () => {
    this.screenOrientation = window.orientation || 0;
  }

  init() {
    this.close();

    this.onScreenOrientationChangeEvent();
    if (typeof DeviceOrientationEvent.requestPermission !== 'function') {
      window.addEventListener('orientationchange', this.onScreenOrientationChangeEvent, false);
      window.addEventListener('deviceorientation', this.onDeviceOrientationChangeEvent, false);
    } else {
      DeviceOrientationEvent.requestPermission()
        .then(() => {
          window.addEventListener('orientationchange', this.onScreenOrientationChangeEvent, false);
          window.addEventListener('deviceorientation', this.onDeviceOrientationChangeEvent, false);
        })
        .catch(alert);
    }

    this.originDeviceFace = null;
    this.enable = true;
  }

  close() {
    this.enable = false;
    window.removeEventListener('orientationchange', this.onScreenOrientationChangeEvent, false);
    window.removeEventListener('deviceorientation', this.onDeviceOrientationChangeEvent, false);
  }

  deviceOrientationUpdate() {
    if (!this.enable) {
      return;
    }

    const d = this.DeviceFace;
    const o = this.originDeviceFace;

    if (d && o) {
      this.camera.position.x = d.x * this.camera.oz;
      this.camera.position.y = d.y * this.camera.oz;
      this.camera.position.z = d.z * this.camera.oz + this.camera.move_pos.z;
    }
  }
}
