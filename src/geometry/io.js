/*
 * 	geometry/io
 *
 * 	Import/export geometry between internal representation and json.
 *
 */

import * as vmem from './vertex_memory.js'

function create(geometry, obj) {
	const num_verts = geometry.verts.length / 3;
	const num_indices = geometry.indices.length;
	const vref = vmem.allocate(num_verts);

	var verts = vmem.get(vref, num_verts);
	for (var i = 0; i < geometry.verts.length; ++i) {
		vmem.set(	vref + i, 
				geometry.verts[i*3],
				geometry.verts[i*3+1],
				geometry.verts[i*3+2] );
	}

	obj.verts = verts;
	obj.indices = new Uint16Array(geometry.indices);
	obj.vref = vref;
}

export function load(path, obj) {
	var geometry;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			geometry = JSON.parse(this.responseText);
			// TODO: refactor into a validation function
			if ("verts" in geometry) {
				if (geometry.verts.length % 3 == 0) {
					create(geometry, obj);
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

