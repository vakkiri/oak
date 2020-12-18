/*
 * 	rotate-example.js
 *
 * 	Example of a custom script to make an object rotate at each frame.
 *
 */

var objects = []

function rotate(mat) {
	mat4.rotateZ(mat, mat, 0.0001);
	mat4.rotateY(mat, mat, 0.0002);
}

export function update() {
	objects.forEach(element => rotate(element.mat));
}

