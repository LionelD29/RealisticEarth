uniform sampler2D globeTexture; // Import the globeTexture we use in the main.js file

varying vec2 vertexUV; // vec2(0, 0.24)
varying vec3 vertexNormal;

void main() {
    // gl_FragColor = vec4(1, 0, 0, 1);
    // The spaces between vertices will be red (1, 0, 0).
    // The last 1 is needed for the shader to work correctly.

    float intensity = 1.05 - dot(vertexNormal, vec3(0.0, 0.0, 1.0));
    // dot() is a dot product of two vec3 vectors. For vectors pointing towards positive values of z (towards the camera)
    // This dot product will be equal to 1 => intensity is minimized, while its maximized towards the limbs.
    // This therefore makes the intensity larger at the limbs than at the center of the projected surface of the sphere.

    vec3 atmosphere = vec3(0.3, 0.6, 1.0) * pow(intensity, 1.5);
    // The color of the atmosphere will be this vec3(0.3, 0.6, 1.0) skyblue color times intensity to the power 3/2
    // It is therefore dark blue at the middle of the disk, and light blue at the edges

    gl_FragColor = vec4(atmosphere + texture2D(globeTexture, vertexUV).xyz, 1.0);
    // The spaces between vertices will be covered by the globeTexture.
    // So the texture is applied to our sphere.
}