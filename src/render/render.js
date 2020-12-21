/*
 * 	render.js
 *
 * 	Abstract renderer. Defines the interface which all renderes
 * 	must implement to be used.
 *
 */

import * as opengl from './opengl_renderer.js';
import * as camera from './camera/default_camera.js';
import * as textures from './textures.js';

var renderers = {
	"opengl": opengl,
};

var renderer;

/*
 * 	Initialize the renderer. Called at program start.
 */
export function init(canvas, renderer_name) {
	renderer = renderers[renderer_name];
	renderer.init(canvas, camera);
	textures.init(canvas.getContext('webgl'));
}

/*
 * 	Add an object to the scene to be drawn. Objects contain
 * 	a model name and a transformation matrix.
 */

export function addObject(obj) {
	renderer.addObject(obj);
}

/*
 * 	Add a model to the renderer. Models are referenced by name
 * 	when an object is being drawn, so that multiple objects can
 * 	share geometry without duplication.
 */

export function addModel(model) {
	renderer.addModel(model);
}

/*
 * 	The per-frame draw function.
 */

export function drawScene() {
	renderer.drawScene();
}

/*
 *	Per-frame camera update.
 */

export function updateCamera() {
	camera.update();
}
