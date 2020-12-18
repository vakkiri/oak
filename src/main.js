/*
 * 	main.js
 *
 * 	Core engine loop.
 *
 */

import * as cube from './geometry/cube.js';
import * as vmem from './geometry/vertex_memory.js';
import * as scripts from './scripting/register.js';
import * as render from './render/render3D.js';

var c = cube.create();
var c2 = cube.create();

mat4.translate(c.mat, c.mat, [-0.0, 0.0, -6.0]);
mat4.translate(c2.mat, c2.mat, [-1.0, -1.0, -8.0]);
scripts.register(c, 'rotate');
scripts.register(c2, 'rotate');

main();

function main() {
	const canvas = document.querySelector('#glcanvas');

	render.init(canvas);

	render.add(c);
	render.add(c2);

	var then = 0;

	function update(now) {
		const delta = (now - then) * 0.001;
		then = now;

		scripts.update(delta);

		render.drawScene();

		requestAnimationFrame(update);
	}

	requestAnimationFrame(update);
}

