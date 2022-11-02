import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

export const log = (...params) => {
  const logBox = document.getElementById('log');

  const li = document.createElement('li');
  li.innerHTML = params.join(' ');

  logBox.appendChild(li);
  logBox.scrollTop = logBox.clientHeight + logBox.scrollHeight;
}

export const loadModel = () => {
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

export const createBox = (width, height, depth) => {
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