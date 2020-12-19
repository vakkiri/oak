/*
 * 	models.js
 *
 * 	Model initialization and storage.
 *
 */

import * as vmem from './vertex_memory.js'

var models = {}

export function get(model_name) {
	return models[model_name];
}

export function create(model) {
	const num_verts = model.verts.length / 3;
	const vref = vmem.allocate(num_verts);

	for (var i = 0; i < model.verts.length; ++i) {
		vmem.set(	vref + i,
				model.verts[i*3],
				model.verts[i*3+1],
				model.verts[i*3+2], );
	}

	models[model.name] = {
		vref: vref,
		num_verts: num_verts,
		indices: model.indices,
	};
}

