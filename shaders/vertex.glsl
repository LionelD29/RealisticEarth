varying vec2 vertexUV; // Defines a new vec2 variable called vertexUV
varying vec3 vertexNormal;

void main() {
    vertexUV = uv;
    vertexNormal = normalize(normalMatrix * normal);
    // The normalize function removes the normal bug of the shaders (good looking earth except when
    // we rotate around it, the backside was too intense)
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
    // Maps the vertices to a sphere (because we use a SphereGeometry) and projects them on a 2D surface
    // using the projection and model view matrices.

    /*
        projectionMatrix, modelViewMatrix, position and uv are coming from threeJS
        See the WebGL doc on threeJS
    */
}