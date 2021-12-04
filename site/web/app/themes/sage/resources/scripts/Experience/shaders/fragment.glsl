uniform sampler2D uTexture;
uniform float uPosY;
varying vec2 vUv;

float map(float value, float min1, float max1, float min2, float max2)
{
    return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

void main()
{
    float height = map(uPosY, 0.0, 35.0, 0.0, 1.0);
    vec4 heightV4 = vec4(height);

    // color
    vec4 textureColor = texture2D(uTexture, vUv);
    textureColor = LinearTosRGB(textureColor);

    // grayscale
    float avg = (textureColor.r + textureColor.g + textureColor.b) / 3.0;
    vec4 textureGrayscale = vec4(vec3(avg), 1.0);
    textureGrayscale = smoothstep(vec4(0.2), vec4(0.8), textureGrayscale);

    // mix
    vec4 mixedTexture = mix(textureGrayscale, textureColor, heightV4);

    gl_FragColor = mixedTexture;
}