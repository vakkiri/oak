/*
 * 	default_camera.js
 *
 *	A default camera for the engine.
 *
 */

import * as input from '../../input/input.js';

export var position = vec3.create();
export var rotation = vec3.create();

vec3.set(position, 1.0, 0.0, 0.0);

rotation.x = 0;
rotation.y = 0;
rotation.z = 0;

document.addEventListener('keydown', function(event) {
	if (event.keyCode == input.action("cameraLeft")) {
		rotation.y -= 0.03;
	} else if (event.keyCode == input.action("cameraRight")) {
		rotation.y += 0.03;
	} else if (event.keyCode == input.action("cameraUp")) {
		rotation.x -= 0.03;
	} else if (event.keyCode == input.action("cameraDown")) {
		rotation.x += 0.03;
	} else if (event.keyCode == input.action("moveForward")) {
		vec3.add(position, position, [0, 0, 0.2]);
	} else if (event.keyCode == input.action("moveBackward")) {
		vec3.add(position, position, [0, 0, -0.2]);
	}
});

export function update() {
}

