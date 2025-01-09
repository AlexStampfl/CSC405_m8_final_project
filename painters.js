main();

function main() {
    // Setup webgl, get context
    const canvas = document.getElementById("gl-canvas");
    const gl = canvas.getContext("webgl");

    if (!gl) {
        alert("Not able to start WebGL.");
        return;
    }

    // Set clear color to black, fully opaque
    gl.clearColor(0.3, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Define shaders
    const vertextShader = `
        attribute vec3 avPos;
        attribute vec3 aNorm;
    `
}