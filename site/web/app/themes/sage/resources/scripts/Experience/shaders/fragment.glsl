uniform sampler2D uTexture;
varying vec2 vUv;

void main()
{
    vec4 textureColor = texture2D(uTexture, vUv);
    textureColor = LinearTosRGB(textureColor);
    float avg = (textureColor.r + textureColor.g + textureColor.b) / 3.0;
    vec4 textureGrayscale = vec4(vec3(avg), 1.0);
    gl_FragColor = textureColor;
}