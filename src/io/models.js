/*
 *	io/models	
 *
 * 	Load model files.
 *
 */

import * as geometry from '../geometry/geometry.js'
import * as renderer from '../render/render3D.js'

function create(model) {
	geometry.create(model);
	renderer.initBuffers(model);
}

export function load(path, obj) {
	var model;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			model = JSON.parse(this.responseText);
			// TODO: refactor into a validation function
			if ("verts" in model) {
				if (model.verts.length % 3 == 0) {
					create(model, obj);
				} else {
					console.log("Invalid vertices in ", path);
				}
			} else {
				consolelog("No vertices in ", path);
			}
		}
	}
	xmlhttp.open("GET", path, true);
	xmlhttp.send();
}

