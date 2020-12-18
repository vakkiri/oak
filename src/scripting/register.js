/*
 * 	register
 *
 * 	Register object for use in a script.
 *
 * 	Scripts contain of an update() function which is used 
 * 	to process all objects using the script at each frame.
 *
 * 	Scripts must contain a register() function to add
 * 	objects.
 *
 */

import * as rotate from '../scripts/rotate-example.js'

var scripts = {
	'rotate': rotate,
};

export function register(obj, script) {
	scripts[script].register(obj);
}

export function update(delta) {
	for (let script in scripts) {
		scripts[script].update(delta);
	}
}
