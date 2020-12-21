/*
 * 	main.js
 *
 * 	Core engine loop.
 *
 */

import * as scripting from './scripting/register.js';
import * as render from './render/render.js';
import * as gameobject from './core/gameobject.js';
import * as model_io from './io/models.js';

function initTestObjects() {
	var c = gameobject.create("cube", ['rotate']);
	var c2 = gameobject.create("cube", ['rotate']);

	mat4.translate(c.mat, c.mat, [-0.0, 0.0, -7.0]);
	mat4.translate(c2.mat, c2.mat, [-3.0, -1.0, -12.0]);
}

main();

function main() {
	const canvas = document.querySelector('#glcanvas');
	const gl = canvas.getContext('webgl');

	// TODO: load from a config file
	render.init(canvas, "opengl");

	model_io.load("/assets/models/basic/cube.json");

	initTestObjects();

	var then = 0;

	function update(now) {
		const delta = (now - then) * 0.001;
		then = now;

		scripting.update(delta);

		render.updateCamera();
		render.drawScene();

		requestAnimationFrame(update);
	}

	requestAnimationFrame(update);
}

