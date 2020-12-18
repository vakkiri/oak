/*
 * 	cube
 *
 * 	A simple volumetric cube.
 *	As with any volumetric, it consists of:
 *		- a list of points
 *		- a list of indices which define triangular faces
 */

import * as vmem from './vertex_memory.js';

export function create() {
	// TODO: refactor this out into template json files
	const num_verts = 8;
	const num_indices = 36;
	const vref = vmem.allocate(num_verts);
	var verts = vmem.get(vref, num_verts);
	var mat = mat4.create();

	console.log(vref);
	vmem.set(vref, -1.0, -1.0, 1.0);
	vmem.set(vref+1, 1.0, -1.0, 1.0);
	vmem.set(vref+2, 1.0, 1.0, 1.0);
	vmem.set(vref+3, -1.0, 1.0, 1.0);
	vmem.set(vref+4, -1.0, -1.0, -1.0);
	vmem.set(vref+5, -1.0, 1.0, -1.0);
	vmem.set(vref+6, 1.0, 1.0, -1.0);
	vmem.set(vref+7, 1.0, -1.0, -1.0);

	const indices = [
		0, 1, 2,	0, 2, 3,
		4, 5, 6,	4, 6, 7,
		5, 3, 2,	5, 2, 7,
		4, 7, 1,	4, 1, 0,
		7, 6, 2,	7, 2, 1,
		4, 0, 3,	4, 3, 5
	];

	return {
		verts: verts,
		indices: new Uint16Array(indices),
		mat: mat,
	};
}

