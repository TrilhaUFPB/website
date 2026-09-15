import createGlobe from "./vendor/cobe-2.0.1.js";
export default function mountGlobe(canvas, design = 1) {
  const controller = new AbortController();
  const listen = (name, callback) =>
    canvas.addEventListener(name, callback, { signal: controller.signal });
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const origin = [-7.12, -34.86],
    destinations = [
      [-8.05, -34.95],
      [42.36, -71.06],
      [37.77, -122.42],
      [-18.5, -44],
      [-5.7, -36.5],
      [-15.79, -47.88],
      [-8.5, -38],
    ];
  // Additional locations illustrate national reach, alongside confirmed connections.
  const nationalPaths = [
    [-3.12, -60.02],
    [-1.46, -48.5],
    [-9.97, -67.81],
    [-10.18, -48.33],
    [-12.97, -38.5],
    [-3.73, -38.52],
    [-15.6, -56.1],
    [-20.47, -54.62],
    [-22.91, -43.17],
    [-23.55, -46.63],
    [-25.43, -49.27],
    [-30.03, -51.23],
  ];
  let phi = -0.44,
    theta = 0.18,
    drag = false,
    px = 0,
    py = 0,
    released = 0,
    last = 0,
    visible = false,
    frame = 0,
    width = 0;
  // Visual settings from COBE's Default and CDN showcases.
  const showcase = {
    dark: 0,
    diffuse: 1.5,
    mapSamples: 16000,
    mapBrightness: 10,
    baseColor: [1, 1, 1],
    glowColor: [0.94, 0.93, 0.91],
    arcWidth: 0.5,
    arcHeight: 0.05,
    opacity: 0.7,
  };
  const designs = [
    {},
    {
      ...showcase,
      markerColor: [28 / 255, 74 / 255, 229 / 255],
      arcColor: [28 / 255, 74 / 255, 229 / 255],
      markerElevation: 0.01,
    },
    {
      ...showcase,
      markerColor: [0, 0, 0],
      arcColor: [0, 0, 0],
      markerElevation: 0.02,
    },
  ];
  const globe = createGlobe(canvas, {
    devicePixelRatio: Math.min(devicePixelRatio || 1, 2),
    width: canvas.clientWidth,
    height: canvas.clientWidth,
    phi,
    theta,
    dark: 0,
    diffuse: 1.2,
    scale: 0.93,
    mapSamples: 20000,
    mapBrightness: 6,
    baseColor: [0.88, 0.88, 0.88],
    markerColor: [0.38, 0.4, 0.44],
    glowColor: [0.96, 0.96, 0.96],
    arcColor: [0.64, 0.67, 0.72],
    arcWidth: 0.16,
    arcHeight: 0.12,
    markerElevation: 0.003,
    ...designs[design],
    markers: [
      {
        location: origin,
        size: 0.035,
        color:
          design === 1
            ? [28 / 255, 74 / 255, 229 / 255]
            : design === 2
              ? [0, 0, 0]
              : [0, 0.65, 0.32],
      },
      ...[...destinations, ...nationalPaths].map((location) => ({
        location,
        size: design === 1 ? 0.025 : design === 2 ? 0.012 : 0.014,
      })),
    ],
    arcs: [...destinations, ...nationalPaths].map((to) => ({
      from: origin,
      to,
    })),
  });
  function render(now) {
    frame = 0;
    if (!visible) return;
    const dt = Math.min(now - (last || now), 50);
    last = now;
    if (!drag && now - released > 1100) {
      const ease = reduced.matches ? 1 : 1 - Math.exp(-dt / 650);
      phi += (-0.44 - phi) * ease;
      theta += (0.18 - theta) * ease;
    }
    const state = { phi, theta };
    if (width !== canvas.clientWidth) {
      width = canvas.clientWidth;
      state.width = width;
      state.height = width;
    }
    globe.update(state);
    frame = requestAnimationFrame(render);
  }
  const observer = new IntersectionObserver(
    ([e]) => {
      visible = e.isIntersecting;
      if (visible && !frame) {
        last = 0;
        frame = requestAnimationFrame(render);
      }
    },
    { rootMargin: "100px" },
  );
  observer.observe(canvas);
  canvas.tabIndex = 0;
  canvas.setAttribute(
    "aria-label",
    "Globo interativo: Pontos e curvas mostram conexões confirmadas e destinos ilustrativos de expansão pelo Brasil. Arraste ou use as setas para girar; retorna à Paraíba ao soltar.",
  );
  listen("pointerdown", (e) => {
    drag = true;
    px = e.clientX;
    py = e.clientY;
    canvas.setPointerCapture(e.pointerId);
    canvas.classList.add("dragging");
  });
  listen("pointermove", (e) => {
    if (!drag) return;
    phi += (e.clientX - px) * 0.005;
    theta = Math.max(-0.9, Math.min(0.9, theta + (e.clientY - py) * 0.004));
    px = e.clientX;
    py = e.clientY;
  });
  function release() {
    drag = false;
    released = performance.now();
    canvas.classList.remove("dragging");
  }
  listen("pointerup", release);
  listen("pointercancel", release);
  listen("lostpointercapture", release);
  listen("keydown", (e) => {
    if (
      !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home"].includes(
        e.key,
      )
    )
      return;
    e.preventDefault();
    if (e.key === "Home") {
      phi = -0.44;
      theta = 0.18;
    } else {
      phi += e.key === "ArrowLeft" ? -0.12 : e.key === "ArrowRight" ? 0.12 : 0;
      theta = Math.max(
        -0.9,
        Math.min(
          0.9,
          theta +
            (e.key === "ArrowUp" ? 0.1 : e.key === "ArrowDown" ? -0.1 : 0),
        ),
      );
    }
    released = performance.now();
  });

  return () => {
    controller.abort();
    visible = false;
    cancelAnimationFrame(frame);
    observer.disconnect();
    globe.destroy();
  };
}
