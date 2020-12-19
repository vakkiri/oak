/*
 *	geometry
 *
 *	Creation, deletion and modification of geometry objects.
 *
 */

import * as models from './models.js';
import * as vmem from './vertex_memory.js';

export function get(model_name) {
	return models.get(model_name);
}

export function create(model_name, model) {
	models.create(model_name, model);
}

