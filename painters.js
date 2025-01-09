main();

function main() {
    // Get a WebGL context
    const canvas = document.getElementById("gl-canvas");
    const gl = canvas.getContext("webgl");
    if (!gl) {
        return;
    }

    // Shader sources
    const vertexShaderSource = document.querySelector("#vertex-shader-2d").text;
    const fragmentShaderSource = document.querySelector("#fragment-shader-2d").text;

    // Create GLSL shaders, upload the GLSL source, compile shaders
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    // Link two shaders into a program
    const program = createProgram(gl, vertexShader, fragmentShader);

    // Look up where vertex data needs to go
    const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    const colorUniformLocation = gl.getUniformLocation(program, "u_color");

    // Create a buffer and bind it
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Painter's Algorithm - Draw from the back to the front
    let positions = [
        // Small Triangle 1 (left)
        -0.9, -0.5, // Bottom-left
        -0.3, -0.5, // Bottom-right
        -0.6,  0.5, // Top-center

        // Small Triangle 2 (right)
        0.3, -0.5, // Bottom-left
        0.9, -0.5, // Bottom-right
        0.6,  0.5, // Top-center

        // Large Triangle (center)
        -0.5, -0.5, // Bottom-left
         0.5, -0.5, // Bottom-right
         0.0,  0.8, // Top-center
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // Resize canvas to match display size
    resizeCanvasToDisplaySize(gl.canvas);

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);

    // Turn on the attribute and bind the buffer
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Configure how to pull data from the buffer
    const size = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

    // // Draw the triangle
    // const primitiveType = gl.TRIANGLES;
    // const count = 3;
    // gl.drawArrays(primitiveType, 0, count);

    // // Draw Small Triangle 1
    // let primitiveType = gl.TRIANGLES;
    // gl.drawArrays(primitiveType, 0, 3);

    // // Draw Small Triangle 2
    // gl.drawArrays(primitiveType, 3, 3);

    // // Draw Big Triangle (center)
    // gl.drawArrays(primitiveType, 6, 3);

    gl.uniform4f(colorUniformLocation, 1.0, 0.0, 0.0, 1.0) // red
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    gl.uniform4f(colorUniformLocation, 0.0, 1.0, 0.0, 1.0) // green
    gl.drawArrays(gl.TRIANGLES, 3, 3);

    gl.uniform4f(colorUniformLocation, 0.0, 0.0, 1.0, 1.0) // blue
    gl.drawArrays(gl.TRIANGLES, 6, 3);

}

function resizeCanvasToDisplaySize(canvas) {
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    const dpr = window.devicePixelRatio || 1; // Hight-DPI support
    if (canvas.width !== displayWidth || canvas.height !== displayHeight * dpr) {
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
    }
}
// function resizeCanvasToDisplaySize(canvas) {
//     const displayWidth = canvas.clientWidth;
//     const displayHeight = canvas.clientHeight;

//     if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
//         canvas.width = displayWidth;
//         canvas.height = displayHeight;
//     }
// }

function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader); // ?
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}