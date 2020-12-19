/*
 *	geometry
 *
 *	Creation, deletion and modification of geometry objects.
 *
 */

import * as io from './io.js'
import * as vmem from './vertex_memory.js'

export function create(model_path) {
	var obj = {
		vref: undefined,
		verts: undefined,
		indices: undefined,
		mat: mat4.create(),
	};

	io.load(model_path, obj);

	return obj;
}

export function destroy(obj) {
	if (obj.vref !== undefined) {
		vmem.free(vref, obj.indices.length);
	} else {
		console.log("WARNING: Tried to free undefined vertices");
	}
}

