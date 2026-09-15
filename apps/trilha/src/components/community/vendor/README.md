# COBE 2.0.1 — local modification

The vendored MIT-licensed build has one intentional change in its arc vertex shader.

The screen-space ribbon width is multiplied by:

```glsl
mix(0.18, 1.0, smoothstep(0.0, 0.55, t))
```

`t` is the Bézier parameter, zero at `from` (Paraíba) and one at `to`.
Arcs begin at 18% width and smoothly reach their configured width at 55% of the route. Position, color, curvature, markers and interaction are unchanged.

In the minified build, the modified expression is `P=K+I*w*k.y*h*mix(.18,1.,smoothstep(0.,.55,p));`.
Reapply this change when upgrading COBE. See `COBE-LICENSE` for the original license.
