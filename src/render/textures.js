/*
 * 	textures
 *
 * 	Texture storage/handling.
 *
 */

import * as texture_io from '../io/textures.js';

var textures = [];

export function init(gl) {
	textures.push(texture_io.load(gl, "/assets/textures/testing/box.png"));
}

export function get(index) {
	if (index >= textures.length || index < 0) {
		console.log("Invalid texture index: ", index);
		// TODO: programmaticly create a texture for slot 0 so we
		// can always return something.
		return undefined;
	}

	return textures[index];
}

