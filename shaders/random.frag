#version 450

layout(location = 0) in vec2 i_uv;
layout(location = 0) out vec2 o_random;

void main()
{
    o_random.x = fract(sin(dot(i_uv * 1.0, vec2(12.9898, 78.233))) * 43758.5453);
    o_random.y = fract(sin(dot(i_uv * 2.0, vec2(12.9898, 78.233))) * 43758.5453);
    o_random = o_random * 2.0 - 1.0;
}