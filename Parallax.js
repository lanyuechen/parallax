
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

export default class {
  constructor(width, height, depth) {
    this.scene = new THREE.Scene();

    this.camera = new THREE.ParallaxCamera(0, 0, depth, width, height);
    // this.camera.cameraControl.init();

    const box = createBox(width, height, depth);
    this.scene.add(box);

    const geometry = new THREE.BoxGeometry( 40, 30, 50 );
    const cubeMaterial = new THREE.MeshPhongMaterial( { color: 0xffff00 } );
    const cube = new THREE.Mesh( geometry, cubeMaterial );
    cube.position.set(0, 0, -depth / 2 + 15);
    cube.castShadow = true;
    this.scene.add(cube);

    const sphereGeometry = new THREE.SphereGeometry( 10, 32, 16 );
    const sphereMaterial = new THREE.MeshPhongMaterial( { color: 0xffff00 } );
    const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
    sphere.position.set(50, 10, -depth / 2 + 10);
    sphere.castShadow = true;
    this.scene.add( sphere );

    const light = new THREE.AmbientLight( 0x404040 ); // soft white light
    this.scene.add( light );

    const pointLight = new THREE.PointLight( 0x606060, 2, 500 );
    pointLight.position.set( 0, 0, 0 );
    pointLight.castShadow = true;
    this.scene.add( pointLight );
    
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.shadowMap.enabled = true;
    document.body.appendChild( this.renderer.domElement );

    this.animate();
  }

  animate() {
    requestAnimationFrame(() => {
      this.animate();
    });
    this.camera.updateProjectionMatrix();
  
    this.renderer.render(this.scene, this.camera);
  }
}
