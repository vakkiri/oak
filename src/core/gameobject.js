/*
 * 	gameobject
 *
 * 	Core game object. Contains:
 * 		- A geometry reference
 * 		- A render instance
 * 		- An update function reference
 *
 */

import * as geo from '../geometry/geometry.js';
import * as scripting from '../scripting/register.js';
import * as renderer from '../render/render3D.js';

export function create(model_name, scripts) {
	var obj = {
		model: model_name,
		mat: mat4.create(),
	};

	scripts.forEach(script => scripting.register(obj, script));

	renderer.add(obj);

	return obj;
}

export function destroy(obj) {
	
}

