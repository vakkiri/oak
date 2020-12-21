/*
 * 	input
 *
 * 	Keyboard input. Key mappings, event handling, etc.
 *
 */

/*
 * Map key names to js keycodes.
 *
 * The point of this is just to replace string comparison with
 * dictionary lookups. It is probably overkill.
 *
 */
var keys = {
	"keyUp":	38,
	"keyDown":	40,
	"keyLeft":	37,
	"keyRight":	39,
	"keyW":		87,
	"keyA":		65,
	"keyS":		83,
	"keyD":		68,
};

var actions = {
	"cameraLeft": 	"keyLeft",
	"cameraRight":	"keyRight",
	"cameraUp":	"keyUp",
	"cameraDown":	"keyDown",
	"moveLeft":	"keyA",
	"moveRight":	"keyD",
	"moveForward":	"keyW",
	"moveBackward":	"keyS",
};

export function keyCode(key) {
	return keys[key];
}

export function action(name) {
	return keys[actions[name]];
}

