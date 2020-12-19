/*
 * 	main.js
 *
 * 	Core engine loop.
 *
 */

import * as vmem from './geometry/vertex_memory.js';
import * as scripting from './scripting/register.js';
import * as render from './render/render3D.js';
import * as gameobject from './core/gameobject.js';

function initTestObjects() {
	var c = gameobject.create("/assets/models/basic/cube.json", ['rotate']);
	var c2 = gameobject.create("/assets/models/basic/cube.json", ['rotate']);

	mat4.translate(c.geometry.mat, c.geometry.mat, [-0.0, 0.0, -6.0]);
	mat4.translate(c2.geometry.mat, c2.geometry.mat, [-1.0, -1.0, -8.0]);
}

main();

function main() {
	const canvas = document.querySelector('#glcanvas');

	render.init(canvas);

	initTestObjects();

	var then = 0;

	function update(now) {
		const delta = (now - then) * 0.001;
		then = now;

		scripting.update(delta);

		render.drawScene();

		requestAnimationFrame(update);
	}

	requestAnimationFrame(update);
}

