export const fragmentShader = /*glsl*/`

uniform float u_time;

varying vec2 vUv;

float rand(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p){
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u*u*(3.0-2.0*u);
    
    float res = mix(
        mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
        mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
    return res*res;
}

float fbm(vec2 x) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100);
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for (int i = 0; i < 5; ++i) {
        v += a * noise(x);
        x = rot * x * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}


void main(void)
{

    vec2 uv = vUv;
    float time = u_time;

    float movement = 0.05 * sin(uv.x * 15.0 + time * 0.8) +
        0.4 * sin(uv.x * 2.0 + time * 0.3);
    
    uv.y += movement * pow(uv.y, 1.5);
    uv.y *= 24.0;
    uv.y = fract(uv.y);
    float t = smoothstep(0.2, 0.3, uv.y) - smoothstep(0.7, 0.8, uv.y);
    
    vec4 color1 = vec4(255.0 / 255.0, 255.0 / 255.0, 255.0 / 255.0, 1.0);
    vec4 color2 = vec4(0.0, 0.0, 0.0, 1.0);
    
    vec4 color = mix(color1, color2, t);
    
    gl_FragColor = vec4(t, t, t, 1.0);
    gl_FragColor = color;
}
`;