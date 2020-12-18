/*
 * 	gameobject
 *
 * 	Core game object. Contains:
 * 		- A geometry reference
 * 		- A render instance
 * 		- An update function reference
 *
 */

import * as geo_io from '../geometry/io.js';
import * as scripting from '../scripting/register.js';

export function create(geometry, scripts) {
	var obj = {
		geometry: {
			verts: undefined,
			indices: undefined,
			mat: mat4.create(),
		},
	};

	geo_io.load(geometry, obj.geometry);

	scripts.forEach(script => scripting.register(obj.geometry, script));

	return obj;
}

