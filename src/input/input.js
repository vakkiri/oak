/*
 * 	input
 *
 * 	Keyboard input. Key mappings, event handling, etc.
 *
 */

/* map key names to js keycodes */
var keys = {
	"key_up":	38,
	"key_down":	40,
	"key_left":	37,
	"key_right":	39,
	"key_w":	87,
	"key_s":	83,
	"key_a":	65,
	"key_d":	68,
}

export function keyCode(name) {
	return keys[name];
}

