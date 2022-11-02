import * as THREE from 'three';

import { createBox } from '@/utils/util';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';

import ParallaxCamera from './ParallaxCamera';

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
