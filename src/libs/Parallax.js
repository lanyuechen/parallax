import * as THREE from 'three';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';

import ParallaxCamera from './ParallaxCamera';

const createBox = (width, height, depth) => {
  const material = new THREE.MeshPhongMaterial();

  const leftPlaneGeometry = new THREE.PlaneGeometry(depth, height);
  const leftPlane = new THREE.Mesh(leftPlaneGeometry, material);
  leftPlane.rotateY(Math.PI / 2);
  leftPlane.position.set(-width / 2, 0, 0);
  leftPlane.receiveShadow = true;

  const rightPlaneGeometry = new THREE.PlaneGeometry(depth, height);
  const rightPlane = new THREE.Mesh(rightPlaneGeometry, material);
  rightPlane.rotateY(-Math.PI / 2);
  rightPlane.position.set(width / 2, 0, 0);
  rightPlane.receiveShadow = true;

  const frontPlaneGeometry = new THREE.PlaneGeometry(width, depth);
  const frontPlane = new THREE.Mesh(frontPlaneGeometry, material);
  frontPlane.rotateX(Math.PI / 2);
  frontPlane.position.set(0, height / 2, 0);
  frontPlane.receiveShadow = true;

  const backPlaneGeometry = new THREE.PlaneGeometry(width, depth);
  const backPlane = new THREE.Mesh(backPlaneGeometry, material);
  backPlane.rotateX(-Math.PI / 2);
  backPlane.position.set(0, -height / 2, 0);
  backPlane.receiveShadow = true;

  const bottomPlaneGeometry = new THREE.PlaneGeometry(width, height);
  const bottomPlane = new THREE.Mesh(bottomPlaneGeometry, material);
  bottomPlane.position.set(0, 0, -depth / 2);
  bottomPlane.receiveShadow = true;

  const group = new THREE.Group();
  group.add(leftPlane);
  group.add(rightPlane);
  group.add(frontPlane);
  group.add(backPlane);
  group.add(bottomPlane);
  return group;
}

const loadModel = () => {
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/loaders/draco/gltf/');

  const loader = new GLTFLoader();
  loader.setDRACOLoader( dracoLoader );
  return new Promise((resolve, reject) => {
    loader.load('/models/gltf/LittlestTokyo.glb', (gltf) => {
      resolve(gltf);
    }, undefined, (err) => {
      reject(err);
    });
  });
}

export default class {
  constructor(width, height, depth) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize(width, height);
    this.renderer.shadowMap.enabled = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    // document.body.appendChild( this.renderer.domElement );

    // const pmremGenerator = new THREE.PMREMGenerator( this.renderer );

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0xffffff );
		// this.scene.environment = pmremGenerator.fromScene( new RoomEnvironment(), 0.04 ).texture;

    const light = new THREE.AmbientLight( 0x404040 ); // soft white light
    this.scene.add(light);

    const pointLight = new THREE.PointLight( 0x404040, 2, depth );
    light.position.set( 0, 0, depth / 2 );
    this.scene.add( pointLight );

    // this.clock = new THREE.Clock();

    this.camera = new ParallaxCamera(0, 0, depth, width, height);
    // this.camera.cameraControl.init();

    const box = createBox(width, height, depth);
    this.scene.add(box);

    // loadModel().then((gltf) => {
    //   const model = gltf.scene;
    //   model.position.set( 0, 0, 0 );
    //   model.rotateY(Math.PI / 4);
    //   model.scale.set( 0.5, 0.5, 0.5 );
    //   this.scene.add( model );
  
    //   this.mixer = new THREE.AnimationMixer( model );
    //   this.mixer.clipAction( gltf.animations[ 0 ] ).play();
    // });

    this.animate();
  }

  animate() {
    requestAnimationFrame(() => {
      this.animate();
    });
    
    this.camera.updateProjectionMatrix();

    // if (this.mixer) {
    //   const delta = this.clock.getDelta();
    //   this.mixer.update(delta);
    // }
  
    this.renderer.render(this.scene, this.camera);
  }
}
