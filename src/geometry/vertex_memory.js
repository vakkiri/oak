/*
 * 	geometric/memory
 *
 * 	Memory allocation etc. for geometric objects.
 *
 */

const MAX_VERTS = 1024;
const VERT_SIZE = 3;

var verts = new Float32Array(MAX_VERTS * VERT_SIZE);
var used = new Uint8Array(MAX_VERTS);

for (var i = 0; i < MAX_VERTS; ++i) {
	used[i] = 0;
}

export function allocate(size) {
	// TODO: keep track of the next free block
	for (var left = 0; left < MAX_VERTS; ++left) {
		while (used[left] != 0 && left < MAX_VERTS) {
			left += 1;
		}
		if (left+size >= MAX_VERTS) {
			return -1;
		}
		else {
			for (var right = left + 1; right + left < size; ++right) {
				if (used[right] != 0) {
					left = right;
					continue;
				}
			}
			for (var right = left; right + left < size; ++right) {
				used[right] = 1;
			}
			return left;
		}
	}
}

export function set(i, x, y, z) {
	verts[i*3] = x;
	verts[i*3+1] = y;
	verts[i*3+2] = z;
}

export function get(i, size) {
	return verts.subarray(i*3, (i+size)*3);
}

export function free(i, size) {
	for (var v = i; v < i + size; ++v) {
		used[v] = 0;
	}
}

