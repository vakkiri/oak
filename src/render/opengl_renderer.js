/*
 * 	render3D
 *
 * 	Basic rendering functionality for 3D objects.
 *
 * 	This covers most things other than UI.
 *
 */

var objs = [];
var buffers = {};
var gl;
var programInfo;
var camera;

// Renderer constants -- TODO move to a config file
const projectionMatrix = mat4.create();
const modelViewMatrix = mat4.create();
const fieldOfView = 45 * Math.PI / 180;
const zNear = 0.1;
const zFar = 100.0;

// Renderer global variables
var aspect;

// TODO: move shaders to separate file.
const vsSource = `
	attribute vec4 aVertexPosition;
	attribute vec4 aVertexColor;

	uniform mat4 uModelViewMatrix;
	uniform mat4 uProjectionMatrix;

	varying lowp vec4 vColor;

	void main(void) {
		gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
		vColor = aVertexColor;
	}`;

const fsSource = `
	varying lowp vec4 vColor;

	void main(void) {
		gl_FragColor = vColor;
	}`;

export function init(canvas, renderer_camera) {
	gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
	aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;

	camera = renderer_camera;

	if (!gl) {
		alert('Unable to initialize WebGL.');
		return;
	}
	const shaderProgram = initShaderProgram();

	programInfo = {
		program: shaderProgram,
		attribLocations: {
			vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
			vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),

		},
		uniformLocations: {
			projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
			modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
		}
	}

	mat4.perspective(projectionMatrix,
			fieldOfView,
			aspect,
			zNear,
			zFar);
}

export function addObject(obj) {
	objs.push(obj);
}

export function addModel(model) {
	const positionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(model.verts), gl.STATIC_DRAW);


	const faceColors = [
		[0.8, 0.2, 0.4, 1.0],   // front
		[0.6, 0.1, 0.5, 1.0],   // back
	];

	var colors = [];

	for (var j = 0; j < faceColors.length; ++j) {
		const c = faceColors[j];
		colors = colors.concat(c, c, c, c);
	}

	const colorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

	const indexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(model.indices), gl.STATIC_DRAW);

	buffers[model.name] = {
		position: positionBuffer,
		color: colorBuffer,
		indices: indexBuffer,
		num_indices: model.indices.length,
	};
}

function drawObject(obj) {
	const modelMatrix = obj.mat;
	const model_buffers = buffers[obj.model];

	mat4.identity(modelViewMatrix);
	mat4.rotateX(modelViewMatrix, modelViewMatrix, camera.rotation.x);
	mat4.rotateY(modelViewMatrix, modelViewMatrix, camera.rotation.y);
	mat4.translate(modelViewMatrix, modelViewMatrix, camera.position);
	mat4.mul(modelViewMatrix, modelViewMatrix, modelMatrix);
	

	// This defines how the position buffer maps to the vertexPosition attr
	{
		const numComponents = 3;
		const type = gl.FLOAT;
		const normalize = false;
		const stride = 0;
		const offset = 0;

		gl.bindBuffer(gl.ARRAY_BUFFER, model_buffers.position);
		gl.vertexAttribPointer(
			programInfo.attribLocations.vertexPosition,
			numComponents,
			type,
			normalize,
			stride,
			offset);
		gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
	}

	{
		const numComponents = 4;
		const type = gl.FLOAT;
		const normalize = false;
		const stride = 0;
		const offset = 0;
		gl.bindBuffer(gl.ARRAY_BUFFER, model_buffers.color);
		gl.vertexAttribPointer(
			programInfo.attribLocations.vertexColor,
			numComponents,
			type,
			normalize,
			stride,
			offset);
		gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
	}

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model_buffers.indices);
	gl.useProgram(programInfo.program);
	gl.uniformMatrix4fv(
		programInfo.uniformLocations.projectionMatrix,
		false,
		projectionMatrix);
	gl.uniformMatrix4fv(
		programInfo.uniformLocations.modelViewMatrix,
		false,
		modelViewMatrix);

	{
		const vertexCount = model_buffers.num_indices;
		const type = gl.UNSIGNED_SHORT;
		const offset = 0;
		gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
	}
}

function tryDraw(obj) {
	if (obj.model in buffers) {
		drawObject(obj);
	}
}

export function drawScene() {
	gl.clearColor(0.3, 0.6, 0.9, 1.0);
	gl.clearDepth(1.0);
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	objs.forEach(obj => tryDraw(obj));
}

function initShaderProgram() {
	const vertexShader = loadShader(gl.VERTEX_SHADER, vsSource);
	const fragmentShader = loadShader(gl.FRAGMENT_SHADER, fsSource);

	const shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram);

	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		alert('Unable to initialize shader program: ' + gl.getProgramInfoLog(shaderProgram));
		return null;
	}

	return shaderProgram;
}

function loadShader(type, source) {
	const shader = gl.createShader(type);
	gl.shaderSource(shader, source);
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		alert('Error compoling shaders: ' + gl.getShaderInfoLog(shader));
		gl.deleteShader(shader);
		return null;
	}

	return shader;
}
