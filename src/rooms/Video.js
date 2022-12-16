import * as THREE from 'three';
import { BufferAttribute } from 'three';
var scene, video, context;

export function setup(ctx) {
	context = ctx;

	// video

	video = document.getElementById('video');

	const texture = new THREE.VideoTexture(video);

	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x101010);

	// left

	const geometry1 = new THREE.SphereBufferGeometry(500, 60, 40);
	// invert the geometry on the x-axis so that all of the faces point inward
	geometry1.scale(- 1, 1, 1);

	const uvs1 = geometry1.getAttribute('uv');

	for (let i = 0; i < uvs1.count; i += 2) {

		uvs1[i] *= 0.5;

	}

	const material1 = new THREE.MeshBasicMaterial({ map: texture });

	const mesh1 = new THREE.Mesh(geometry1, material1);
	mesh1.rotation.y = Math.PI / 2;
	mesh1.layers.set(1); // display in left eye only
	scene.add(mesh1);

	// right

	const geometry2 = new THREE.SphereBufferGeometry(500, 60, 40);
	geometry2.scale(- 1, 1, 1);

	const uvs2 = geometry2.getAttribute('uv');

	for (let i = 0; i < uvs2.count; i += 2) {

		uvs2[i] *= 0.5;
		uvs2[i] += 0.5;

	}

	const material2 = new THREE.MeshBasicMaterial({ map: texture });

	const mesh2 = new THREE.Mesh(geometry2, material2);
	mesh2.rotation.y = Math.PI / 2;
	mesh2.layers.set(2); // display in right eye only
	scene.add(mesh2);

	ctx.raycontrol.addState('video', {
		raycaster: false,
		onSelectStart: onSelectStart
	}, false);
}

export function enter(ctx) {

  ctx.camera.layers.enable(1); // render left view when no stereo available

  ctx.renderer.setClearColor(0x000000);
  ctx.scene.add(scene);
  video.play();

  ctx.raycontrol.activateState('video');
}

export function exit(ctx) {
  video.load();
  ctx.scene.remove(scene);
  ctx.raycontrol.deactivateState('video');
}

export function execute(ctx, delta, time) {
  
}

export function onSelectStart(evt) {
	context.goto = 0;
}