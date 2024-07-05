import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { gsap } from 'gsap';

import { vertexShader } from './shader/vertexShader.glsl.js';
import { fragmentShader } from './shader/fragmentShader.glsl.js';

import t1 from './img/pic6.jpg?url';
import t2 from './img/pic2.jpg?url';

// -------------*****ThreeJS*****-------------------------------------------

const width = window.innerWidth,
	height = window.innerHeight;

const pointer = new THREE.Vector2();
// Cámera---------------------------------------------

const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 200);

camera.position.x = 0;
camera.position.y = -1;
camera.position.z = 8.2;
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x3b2f40);

// Shader****************************************************
const texture1 = new THREE.TextureLoader().load(t1);
const texture2 = new THREE.TextureLoader().load(t2);
let shaderMaterial = new THREE.ShaderMaterial({
	uniforms: {
		uProgress: { value: 0 },
		uWave: { value: 0 },
		u_resolution: { value: new THREE.Vector2(width, height) },
		uMause: { value: pointer },
		uTexture: { value: texture1 },
		uTexture2: { value: texture2 },
	},
	vertexShader,
	fragmentShader,
	side: THREE.DoubleSide,
	wireframe: true,
});

// geometries-------------------------------------
const plane = new THREE.PlaneGeometry(20, 10, 100, 100);
const cube = new THREE.BoxGeometry(5, 5, 5);
const sphere = new THREE.SphereGeometry(2, 30, 30);
let mesh = new THREE.Mesh(plane, shaderMaterial);
scene.add(mesh);

// fin**********************************************************
// Render------------------------------------------
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// CONTROLS--------------
const controls = new OrbitControls(camera, renderer.domElement);

// animate-----------------------------

function animate(time) {
	// Calcule el valor de progreso entre 0 y 1 usando una función sinusoidal
	// let progress = (Math.sin(time / 2000) + 1) / 2;

	// Asigne el valor de progreso al shader
	shaderMaterial.uniforms.uProgress.value = time / 2000;
	shaderMaterial.uniforms.uMause.value = pointer;
	// Render the scene using the camera and the renderer
	renderer.render(scene, camera);
}

const waveMove = (start = 0, value = 1.0) => {
	const progress = gsap.to(shaderMaterial.uniforms.uWave, {
		startAt: { value: start },
		value: value,
		duration: 7,
		ease: 'power3.out',
		onComplete: () => {
			console.log('clomplete');

			window.addEventListener('pointermove', handleMouseEvents);
			window.addEventListener('click', handleClick);
		},
	});
};

// Eventos--------------------------
window.addEventListener('click', handleClick);

function handleClick(e) {
	handleMouseEvents(e);
	if (e.target.matches('canvas')) {
		waveMove(0, 1.0);
		removeMouseListener(e);
		removeClickListener(e);
	}
}

//  Mouse events
window.addEventListener('pointermove', handleMouseEvents);

function handleMouseEvents(e) {
	// normalizado(-1 to +1)
	pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
	pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;

	shaderMaterial.uniforms.uMause.value = pointer;

	// console.log(pointer);
}

// remuever eventos------------
const removeMouseListener = (e) => {
	window.removeEventListener('pointermove', handleMouseEvents);
};
const removeClickListener = (e) => {
	window.removeEventListener('click', handleClick);
};

window.addEventListener('resize', () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.render(scene, camera);
});
