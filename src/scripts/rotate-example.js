/*
 * 	rotate-example.js
 *
 * 	Example of a custom script to make an object rotate at each frame.
 *
 */

var objects = []

function rotate(mat, delta) {
	mat4.rotateZ(mat, mat, 0.1 * delta);
	mat4.rotateY(mat, mat, 0.2 * delta);
}

export function register(obj) {
	if (obj.mat !== undefined) {
		objects.push(obj);
	} else {
		console.log("Error: rotate-example requires all objects have mat property.\n");
	}
}

export function update(delta) {
	objects.forEach(element => rotate(element.mat, delta));
}

