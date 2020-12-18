/*
 *	geometric
 *
 *	A geometric is an array of 3d points.
 *	This module defines operations which assume the above structure.
 *
 *	Lists of points must follow the order x_0,y_0,z_0 .. x_n,y_n,z_n
 */

export function translateX(out, a, x) {
	for (var vert = 0; vert < a.length / 3; ++vert) {
		out[vert*3] += x;
	}
}

export function translateY(out, a, y) {
	for (var vert = 0; vert < a.length / 3; ++vert) {
		out[vert*3+1] += y;
	}
}

export function translateZ(out, a, z) {
	for (var vert = 0; vert < a.length / 3; ++vert) {
		out[vert*3+2] += z;
	}
}
