import './style.css';

import * as THREE from 'three';
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';
import atmosphereVertexShader from './shaders/atmosphereVertex.glsl';
import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl';

//////////////////////////// settings ///////////////////////////////////

// set the scene, the camera and the renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  antialias: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(innerWidth, innerHeight);
camera.position.set(0, 0, 12);
renderer.render(scene, camera);

// set the mouse controls
const controls = new OrbitControls(camera, renderer.domElement);


/////////////////// Earth ////////////////////////////

// Earth
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(5, 50, 50), 
  new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
      globeTexture: {
        value: new THREE.TextureLoader().load('./assets/textures/earth.jpg')
      },
    }
  })
);

earth.rotateZ(0.375); // 21.5° in radians

// Atmosphere
const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(5, 50, 50),
  new THREE.ShaderMaterial({
    vertexShader: atmosphereVertexShader,
    fragmentShader: atmosphereFragmentShader,
    side: THREE.BackSide,
    depthWrite: false // allows to see the stars through the atmosphere
  })
);
atmosphere.scale.set(1.15, 1.15, 1.15);

scene.add(earth, atmosphere);

// Add stars in the background
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff
  /*map: new THREE.TextureLoader().load('./assets/textures/star.png'),
  transparent: true // transparent background of the png*/
});

const starVertices = [];
let x = 0;
let y = 0;
let z = 0;
for (let i = 0; i < 10000; i++) {
  do {
    x = (Math.random() - 0.5) * 2000;
    y = (Math.random() - 0.5) * 2000;
    z = (Math.random() - 0.5) * 2000;
  } while (Math.pow(x*x + y*y + z*z, 0.5) < 200); // no stars in the sphere of radius 200 centered on the Earth
  starVertices.push(x, y , z);
}

starGeometry.setAttribute('position',
  new THREE.Float32BufferAttribute(starVertices, 3)
);

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// Start the animation
animate();

///////////////////////// FUNCTIONS AND EVENTS ////////////////////////////////

window.addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

// animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();

  // Rotation of the Earth
  earth.rotateOnWorldAxis(new THREE.Vector3(-Math.sin(0.375), Math.cos(0.375), 0), 0.001);

  renderer.render(scene, camera);
}