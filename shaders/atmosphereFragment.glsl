varying vec3 vertexNormal;

void main() {
    float intensity = 0.5 - dot(vertexNormal, vec3(0.0, 0.0, 1.0));
    vec3 atmosphere = vec3(0.3, 0.6, 1.0) * pow(intensity, 2.0);
    gl_FragColor = vec4(atmosphere, 1.0);
    // Creates a blurry effect, like a sphere of gas, 
    // with the edges becoming less sharp than the center
}