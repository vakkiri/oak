/*
 * 	cube
 *
 * 	A simple volumetric cube.
 *	As with any volumetric, it consists of:
 *		- a list of points
 *		- a list of indices which define triangular faces
 */

import * as vmem from './vertex_memory.js';
import * as io from './io.js';

export function create() {
	var obj = {
		verts: undefined,
		indices: undefined,
		mat: mat4.create()
	};

	io.load("/assets/models/basic/cube.json", obj);

	return obj;
}

