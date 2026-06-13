"use client";

import { useEffect, useRef } from "react";

const palettes = {
  flow: {
    stops: [
      [0.04, 0.02, 0.075],
      [0.15, 0.07, 0.27],
      [0.38, 0.22, 0.62],
      [0.627, 0.408, 0.973],
      [0.878, 0.784, 1],
    ],
    trail: [0.78, 0.55, 1],
  },
  atmos: {
    stops: [
      [0.025, 0.045, 0.09],
      [0.08, 0.15, 0.27],
      [0.22, 0.4, 0.7],
      [0.416, 0.659, 1],
      [0.831, 0.91, 1],
    ],
    trail: [0.55, 0.78, 1],
  },
  vibe: {
    stops: [
      [0.08, 0.04, 0.02],
      [0.22, 0.11, 0.06],
      [0.62, 0.34, 0.18],
      [0.973, 0.627, 0.408],
      [1, 0.87, 0.74],
    ],
    trail: [1, 0.74, 0.55],
  },
};

const config = {
  dyeRes: 512,
  trailDissipation: 0.985,
  splatRadius: 0.06,
  splatIntensity: 0.55,
  meshSpeed: 0.08,
};

const vert = `
attribute vec2 aPosition;
varying vec2 vUv;
void main () {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

const fragMesh = `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uStops[5];

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  float a = hash(i), b = hash(i+vec2(1.,0.));
  float c = hash(i+vec2(0.,1.)), d = hash(i+vec2(1.,1.));
  vec2 u = f*f*(3.0-2.0*f);
  return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i=0;i<4;i++){ v += a*noise(p); p*=2.0; a*=0.5; }
  return v;
}

void main(){
  vec2 uv = vUv;
  float aspect = uResolution.x / uResolution.y;
  vec2 p = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);

  float t = uTime * 0.05;
  vec2 warp = vec2(
    fbm(p * 1.2 + vec2(t, -t*0.7)),
    fbm(p * 1.2 + vec2(-t*0.5, t*0.9))
  ) - 0.5;
  p += warp * 0.45;

  vec2 c0 = vec2(-0.55 + 0.10*sin(t*1.10), -0.30 + 0.08*cos(t*0.80));
  vec2 c1 = vec2( 0.55 + 0.12*cos(t*0.90),  0.20 + 0.10*sin(t*1.20));
  vec2 c2 = vec2(-0.20 + 0.15*sin(t*0.70),  0.40 + 0.07*cos(t*1.40));
  vec2 c3 = vec2( 0.30 + 0.09*cos(t*1.30), -0.45 + 0.11*sin(t*0.60));
  vec2 c4 = vec2( 0.00 + 0.18*sin(t*0.50),  0.00 + 0.14*cos(t*0.95));

  float w0 = 1.0 / (0.20 + dot(p-c0, p-c0) * 2.0);
  float w1 = 1.0 / (0.18 + dot(p-c1, p-c1) * 2.0);
  float w2 = 1.0 / (0.14 + dot(p-c2, p-c2) * 2.2);
  float w3 = 1.0 / (0.10 + dot(p-c3, p-c3) * 2.5);
  float w4 = 1.0 / (0.12 + dot(p-c4, p-c4) * 2.2);
  float ws = w0+w1+w2+w3+w4;

  vec3 col = (uStops[0]*w0 + uStops[1]*w1 + uStops[2]*w2 + uStops[3]*w3 + uStops[4]*w4) / ws;
  float vig = smoothstep(1.25, 0.45, length(p));
  col *= mix(0.88, 1.0, vig);

  gl_FragColor = vec4(col, 1.0);
}`;

const fragSplat = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTarget;
uniform vec2 uPoint;
uniform vec3 uColor;
uniform float uRadius;
uniform float uAspect;
uniform float uIntensity;
void main(){
  vec2 p = vUv - uPoint;
  p.x *= uAspect;
  float d = dot(p,p) / (uRadius*uRadius);
  float g = exp(-d) * uIntensity;
  vec3 base = texture2D(uTarget, vUv).rgb;
  gl_FragColor = vec4(base + uColor * g, 1.0);
}`;

const fragTrailStep = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uSource;
uniform float uDissipation;
uniform vec2 uTexel;
void main(){
  vec3 c = vec3(0.0);
  c += texture2D(uSource, vUv).rgb * 0.5;
  c += texture2D(uSource, vUv + vec2( uTexel.x, 0.0)).rgb * 0.125;
  c += texture2D(uSource, vUv + vec2(-uTexel.x, 0.0)).rgb * 0.125;
  c += texture2D(uSource, vUv + vec2(0.0,  uTexel.y)).rgb * 0.125;
  c += texture2D(uSource, vUv + vec2(0.0, -uTexel.y)).rgb * 0.125;
  gl_FragColor = vec4(c * uDissipation, 1.0);
}`;

const fragDisplay = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uMesh;
uniform sampler2D uTrail;
void main(){
  vec3 base = texture2D(uMesh, vUv).rgb;
  vec3 trail = texture2D(uTrail, vUv).rgb;
  vec3 col = base + trail * 1.15;
  col = col / (1.0 + col * 0.35);
  gl_FragColor = vec4(col, 1.0);
}`;

function compile(gl, type, src) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return null;
  return shader;
}

function createProgram(gl, vs, fs) {
  const vertex = compile(gl, gl.VERTEX_SHADER, vs);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, fs);
  if (!vertex || !fragment) return null;
  const prog = gl.createProgram();
  gl.attachShader(prog, vertex);
  gl.attachShader(prog, fragment);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  return prog;
}

function getUniforms(gl, prog) {
  const uniforms = {};
  const count = gl.getProgramParameter(prog, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < count; i += 1) {
    const info = gl.getActiveUniform(prog, i);
    const base = info.name.replace(/\[0\]$/, "");
    uniforms[base] = gl.getUniformLocation(prog, info.name);
    if (info.size > 1) {
      for (let j = 0; j < info.size; j += 1) {
        uniforms[`${base}[${j}]`] = gl.getUniformLocation(prog, `${base}[${j}]`);
      }
    }
  }
  return uniforms;
}

function createFBO(gl, width, height, internal, format, type, filter) {
  gl.activeTexture(gl.TEXTURE0);
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, internal, width, height, 0, format, type, null);

  const fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
  gl.viewport(0, 0, width, height);
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  return {
    texture,
    fbo,
    width,
    height,
    texelX: 1 / width,
    texelY: 1 / height,
    attach(id) {
      gl.activeTexture(gl.TEXTURE0 + id);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      return id;
    },
  };
}

function createDoubleFBO(gl, width, height, internal, format, type, filter) {
  let read = createFBO(gl, width, height, internal, format, type, filter);
  let write = createFBO(gl, width, height, internal, format, type, filter);
  return {
    get read() {
      return read;
    },
    get write() {
      return write;
    },
    swap() {
      const next = read;
      read = write;
      write = next;
    },
  };
}

function pickFormats(gl) {
  const isWebGL2 = typeof WebGL2RenderingContext !== "undefined" && gl instanceof WebGL2RenderingContext;
  if (isWebGL2) {
    gl.getExtension("EXT_color_buffer_float");
    gl.getExtension("OES_texture_float_linear");
    return {
      rgba: { internal: gl.RGBA16F, format: gl.RGBA, type: gl.HALF_FLOAT },
      filter: gl.LINEAR,
    };
  }

  const halfExt = gl.getExtension("OES_texture_half_float");
  gl.getExtension("OES_texture_half_float_linear");
  if (!halfExt) return null;
  return {
    rgba: { internal: gl.RGBA, format: gl.RGBA, type: halfExt.HALF_FLOAT_OES },
    filter: gl.LINEAR,
  };
}

export function ProductHeroShader({ brand = "flow" }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return undefined;

    const palette = palettes[brand] || palettes.flow;
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "width:100%;height:100%;display:block;";
    el.textContent = "";
    el.classList.remove("is-ready", "p-hero-shader-fallback");
    el.appendChild(canvas);

    let gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      preserveDrawingBuffer: false,
    });
    if (!gl) {
      gl = canvas.getContext("webgl", {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        preserveDrawingBuffer: false,
      });
    }

    if (!gl) {
      el.classList.add("p-hero-shader-fallback", "is-ready");
      return () => canvas.remove();
    }

    const fmt = pickFormats(gl);
    const pMesh = createProgram(gl, vert, fragMesh);
    const pSplat = createProgram(gl, vert, fragSplat);
    const pStep = createProgram(gl, vert, fragTrailStep);
    const pDisplay = createProgram(gl, vert, fragDisplay);

    if (!fmt || !pMesh || !pSplat || !pStep || !pDisplay) {
      el.classList.add("p-hero-shader-fallback", "is-ready");
      return () => canvas.remove();
    }

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const uMesh = getUniforms(gl, pMesh);
    const uSplat = getUniforms(gl, pSplat);
    const uStep = getUniforms(gl, pStep);
    const uDisplay = getUniforms(gl, pDisplay);

    function bindQuad(prog) {
      gl.useProgram(prog);
      const loc = gl.getAttribLocation(prog, "aPosition");
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    }

    let trail;
    let mesh;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.75);

    function makeBuffers() {
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const width = Math.max(1, Math.floor(el.clientWidth * dpr));
      const height = Math.max(1, Math.floor(el.clientHeight * dpr));
      canvas.width = width;
      canvas.height = height;

      trail = createDoubleFBO(
        gl,
        config.dyeRes,
        config.dyeRes,
        fmt.rgba.internal,
        fmt.rgba.format,
        fmt.rgba.type,
        fmt.filter,
      );
      mesh = createFBO(
        gl,
        Math.min(width, 1280),
        Math.min(height, 800),
        fmt.rgba.internal,
        fmt.rgba.format,
        fmt.rgba.type,
        fmt.filter,
      );
    }

    const pointer = { x: 0.2, y: 0.5, prevX: 0.2, prevY: 0.5, vx: 0, vy: 0, moved: false, active: false };

    function onMove(event) {
      const rect = el.getBoundingClientRect();
      const source = event.touches ? event.touches[0] : event;
      const x = (source.clientX - rect.left) / rect.width;
      const y = 1 - (source.clientY - rect.top) / rect.height;
      pointer.prevX = pointer.x;
      pointer.prevY = pointer.y;
      pointer.x = x;
      pointer.y = y;
      pointer.vx = pointer.x - pointer.prevX;
      pointer.vy = pointer.y - pointer.prevY;
      pointer.moved = true;
      pointer.active = x >= 0 && x <= 1 && y >= 0 && y <= 1;
    }

    function onLeave() {
      pointer.active = false;
    }

    function splat(x, y, color, intensity, radius) {
      gl.viewport(0, 0, trail.read.width, trail.read.height);
      gl.bindFramebuffer(gl.FRAMEBUFFER, trail.write.fbo);
      bindQuad(pSplat);
      gl.uniform1i(uSplat.uTarget, trail.read.attach(0));
      gl.uniform2f(uSplat.uPoint, x, y);
      gl.uniform3f(uSplat.uColor, color[0], color[1], color[2]);
      gl.uniform1f(uSplat.uRadius, radius);
      gl.uniform1f(uSplat.uAspect, canvas.width / canvas.height);
      gl.uniform1f(uSplat.uIntensity, intensity);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      trail.swap();
    }

    function seedAmbient() {
      for (let i = 0; i < 4; i += 1) {
        splat(0.15 + Math.random() * 0.7, 0.2 + Math.random() * 0.6, palette.trail, 0.18, 0.1);
      }
    }

    makeBuffers();
    seedAmbient();

    let stopped = false;
    let raf = 0;
    let startedAt = performance.now();
    let lastAmbient = startedAt;

    function frame(now) {
      if (stopped) return;
      const elapsed = (now - startedAt) / 1000;

      gl.bindFramebuffer(gl.FRAMEBUFFER, mesh.fbo);
      gl.viewport(0, 0, mesh.width, mesh.height);
      bindQuad(pMesh);
      gl.uniform1f(uMesh.uTime, elapsed * (config.meshSpeed / 0.05));
      gl.uniform2f(uMesh.uResolution, mesh.width, mesh.height);
      for (let i = 0; i < 5; i += 1) {
        const stop = palette.stops[i];
        gl.uniform3f(uMesh[`uStops[${i}]`], stop[0], stop[1], stop[2]);
      }
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      gl.viewport(0, 0, trail.read.width, trail.read.height);
      gl.bindFramebuffer(gl.FRAMEBUFFER, trail.write.fbo);
      bindQuad(pStep);
      gl.uniform1i(uStep.uSource, trail.read.attach(0));
      gl.uniform1f(uStep.uDissipation, config.trailDissipation);
      gl.uniform2f(uStep.uTexel, trail.read.texelX, trail.read.texelY);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      trail.swap();

      if (pointer.moved && pointer.active) {
        const speed = Math.min(1, Math.hypot(pointer.vx, pointer.vy) * 60);
        const intensity = config.splatIntensity * (0.45 + 0.65 * speed);
        const steps = Math.max(1, Math.min(6, Math.floor(speed * 6)));
        for (let i = 1; i <= steps; i += 1) {
          const f = i / steps;
          splat(
            pointer.prevX + (pointer.x - pointer.prevX) * f,
            pointer.prevY + (pointer.y - pointer.prevY) * f,
            palette.trail,
            intensity / steps + 0.1,
            config.splatRadius,
          );
        }
        pointer.moved = false;
      }

      if (now - lastAmbient > 2200) {
        lastAmbient = now;
        splat(0.15 + Math.random() * 0.7, 0.25 + Math.random() * 0.55, palette.trail, 0.1, 0.1);
      }

      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas.width, canvas.height);
      bindQuad(pDisplay);
      gl.uniform1i(uDisplay.uMesh, mesh.attach(0));
      gl.uniform1i(uDisplay.uTrail, trail.read.attach(1));
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      raf = requestAnimationFrame(frame);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(frame);
    requestAnimationFrame(() => el.classList.add("is-ready"));

    let resizeObserver;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        makeBuffers();
        seedAmbient();
      });
      resizeObserver.observe(el);
    }

    let intersectionObserver;
    if (typeof IntersectionObserver !== "undefined") {
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          const visible = entries.some((entry) => entry.isIntersecting);
          if (visible && !raf) raf = requestAnimationFrame(frame);
          if (!visible && raf) {
            cancelAnimationFrame(raf);
            raf = 0;
          }
        },
        { threshold: 0.01 },
      );
      intersectionObserver.observe(el);
    }

    return () => {
      stopped = true;
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      canvas.remove();
    };
  }, [brand]);

  return <div ref={mountRef} className="p-hero-shader" data-brand={brand} aria-hidden="true" />;
}
