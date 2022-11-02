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
