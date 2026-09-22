import { connections } from "@trilha/people/connections";
import { peopleById } from "@trilha/people/directory";
import createGlobe from "./vendor/cobe-2.0.1.js";
export default function mountGlobe(canvas, design = 1) {
  const controller = new AbortController();
  const listen = (name, callback) =>
    canvas.addEventListener(name, callback, { signal: controller.signal });
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const origin = [-7.12, -34.86];
  // Use the same destinations for arcs, markers and city labels.
  const destinations = connections.map(({ location }) => location);
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
        size: 0.022,
        color:
          design === 1
            ? [28 / 255, 74 / 255, 229 / 255]
            : design === 2
              ? [0, 0, 0]
              : [0, 0.65, 0.32],
      },
      ...destinations.map((location) => ({
        location,
        size: design === 1 ? 0.015 : design === 2 ? 0.009 : 0.01,
      })),
    ],
    arcs: destinations.map((to) => ({
      from: origin,
      to,
    })),
  });
  const host = canvas.parentElement;
  const overlay = document.createElement('div');
  overlay.className = 'globe-people-overlay';
  host.append(overlay);
  let active = null;
  const popup = document.createElement('div');
  popup.className = 'globe-people-popup';
  popup.classList.remove('is-visible');
    popup.setAttribute('aria-hidden', 'true');
  overlay.append(popup);
  const places = [...connections, { name: 'João Pessoa', location: origin, people: [] }];
  const orbit = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  orbit.setAttribute('viewBox', '0 0 500 500');
  orbit.setAttribute('aria-hidden', 'true');
  orbit.classList.add('globe-word-orbit');
  orbit.innerHTML = `<defs><path id="trilha-orbit" d="M250,250 m-225,0 a225,225 0 1,1 450,0 a225,225 0 1,1 -450,0"/></defs><g class="globe-orbit-rotation"><text><textPath href="#trilha-orbit" textLength="1400" lengthAdjust="spacing">PATH SEEKERS · DE ESTUDANTES PARA ESTUDANTES · BUILD YOUR TRAIL · </textPath></text></g>`;
  overlay.prepend(orbit);
  const pins = places.map(connection => {
    const pin = document.createElement('button');
    pin.type = 'button';
    pin.className = 'globe-person-pin';
    pin.setAttribute('aria-label', `Pessoas conectadas a ${connection.name}`);
    pin.setAttribute('aria-expanded', 'false');
    const label = document.createElement('span');
    label.className = 'globe-place-label';
    label.textContent = connection.name;
    pin.append(label);
    overlay.append(pin);
    const show = () => {
      active = connection;
      pins.forEach(item => item.pin.setAttribute('aria-expanded', String(item.connection === connection)));
      popup.replaceChildren();
      if (!connection.people.length) { popup.classList.remove('is-visible');
    popup.setAttribute('aria-hidden', 'true'); return; }
      const title = document.createElement('strong');
      title.textContent = connection.name;
      popup.append(title);
      popup.style.setProperty('--face-count', String(connection.people.length));
      popup.classList.toggle('is-single', connection.people.length === 1);
      connection.people.forEach((id, index) => {
        const person = peopleById[id];
        const row = document.createElement('div');
        const photo = document.createElement('img');
        photo.src = person.photo.replace('/assets/pessoas/', '/community/pessoas/');
        photo.alt = person.name;
        row.className = 'globe-floating-person';
        row.style.setProperty('--face-angle', `${index * 360 / connection.people.length}deg`);
        row.append(photo);
        popup.append(row);
      });
      popup.classList.add('is-visible');
      popup.setAttribute('aria-hidden', 'false');
    };
    pin.addEventListener('pointerenter', show, { signal: controller.signal });
    pin.addEventListener('focus', show, { signal: controller.signal });
    pin.addEventListener('click', show, { signal: controller.signal });
    return { pin, connection };
  });
  function closePeople() {
    active = null;
    popup.classList.remove('is-visible');
    popup.setAttribute('aria-hidden', 'true');
    pins.forEach(({pin}) => pin.setAttribute('aria-expanded', 'false'));
  }
  host.addEventListener('pointerleave', closePeople, { signal: controller.signal });
  host.addEventListener('keydown', e => { if (e.key === 'Escape') closePeople(); }, { signal: controller.signal });
  host.addEventListener('focusout', e => { if (!host.contains(e.relatedTarget)) closePeople(); }, { signal: controller.signal });
  function positionPeople() {
    pins.forEach(({ pin, connection }) => {
      const lat = connection.location[0] * Math.PI / 180;
      const lon = connection.location[1] * Math.PI / 180 - Math.PI;
      const radius = .81;
      const x = -Math.cos(lat) * Math.cos(lon) * radius;
      const y = Math.sin(lat) * radius;
      const z = Math.cos(lat) * Math.sin(lon) * radius;
      const sx = Math.cos(phi) * x + Math.sin(phi) * z;
      const sy = Math.sin(phi) * Math.sin(theta) * x + Math.cos(theta) * y - Math.cos(phi) * Math.sin(theta) * z;
      const front = -Math.sin(phi) * Math.cos(theta) * x + Math.sin(theta) * y + Math.cos(phi) * Math.cos(theta) * z >= 0;
      pin.hidden = !front;
      pin.style.left = `${(sx * .93 + 1) * 50}%`;
      pin.style.top = `${(-sy * .93 + 1) * 50}%`;
      if (active === connection) {
        const pointX = (sx * .93 + 1) * canvas.clientWidth / 2;
        const pointY = (-sy * .93 + 1) * canvas.clientHeight / 2;
        const cardWidth = popup.offsetWidth;
        const cardHeight = popup.offsetHeight;
        popup.style.left = `${pointX - cardWidth / 2}px`;
        popup.style.top = `${pointY - cardHeight / 2}px`;
      }
      if (active === connection && !front) closePeople();
    });
  }
  function render(now) {
    frame = 0;
    if (!visible) return;
    const dt = Math.min(now - (last || now), 50);
    last = now;
    if (!drag && !active && now - released > 1100) {
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
    positionPeople();
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
    closePeople();
    drag = true;
    px = e.clientX;
    py = e.clientY;
    canvas.setPointerCapture(e.pointerId);
    canvas.classList.add("dragging");
  });
  listen("pointermove", (e) => {
    if (!drag) {
      closePeople();
      return;
    }
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
    overlay.remove();
    globe.destroy();
  };
}
