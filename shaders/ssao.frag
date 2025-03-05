#version 450

#include "helpers.glsl"

layout(location = 0) in vec2 i_uv;
layout(location = 0) out float o_ssao;
layout(set = 2, binding = 0) uniform sampler2D s_position;
layout(set = 2, binding = 1) uniform sampler2D s_uv;
layout(set = 2, binding = 2) uniform usampler2D s_voxel;
layout(set = 2, binding = 3) uniform sampler2D s_random;

bool test(
    const uint direction,
    const vec3 position,
    const vec2 uv)
{
    const vec3 neighbor_position = texture(s_position, uv).xyz;
    const vec2 neighbor_uv = texture(s_uv, uv).xy;
    if (length(neighbor_uv) == 0)
    {
        return false;
    }
    const float bias = 0.01;
    switch (direction)
    {
    case 4: return position.y < neighbor_position.y - bias;
    case 5: return position.y > neighbor_position.y + bias;
    case 2: return position.x < neighbor_position.x - bias;
    case 3: return position.x > neighbor_position.x + bias;
    case 0: return position.z < neighbor_position.z - bias;
    case 1: return position.z > neighbor_position.z + bias;
    }
    return false;
}

void main()
{
    const vec2 uv = texture(s_uv, i_uv).xy;
    const uint voxel = texture(s_voxel, i_uv).x;
    if (!get_occluded(voxel) || length(uv) == 0)
    {
        discard;
    }
    const vec4 position = texture(s_position, i_uv);
    const uint direction = get_direction(voxel);
    const vec2 scale = 75.0 / (textureSize(s_voxel, 0) * position.w);
    float ssao = 0.0;
    int kernel = 2;
    for (int x = -kernel; x <= kernel; x++)
    {
        for (int y = -kernel; y <= kernel; y++)
        {
            const vec2 origin = i_uv + vec2(x, y) * scale;
            const vec2 offset = texture(s_random, origin).xy * scale;
            if (test(direction, position.xyz, origin + offset))
            {
                ssao += 1.0;
            }
        }
    }
    kernel = kernel * 2 + 1;
    kernel = kernel * kernel;
    kernel -= 1;
    o_ssao = 1.0 - (ssao / float(kernel));
}