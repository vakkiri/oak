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

export function create(geometry, scripts) {
	var obj = {
		geometry: geo.create(geometry),
	};

	scripts.forEach(script => scripting.register(obj.geometry, script));

	// We do a queued add to the rendere because geometry loads async.
	// The renderer will add the object once it has valid geometry.
	renderer.queueAdd(obj.geometry);

	return obj;
}

export function destroy(obj) {
	
}

