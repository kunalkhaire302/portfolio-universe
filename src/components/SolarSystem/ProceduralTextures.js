// Procedural texture generation for planets using off-screen Canvas2D
// Generates realistic-looking planet textures without loading external images

const createCanvas = (width = 512, height = 256) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
};

// Simple noise function for texture generation
const noise2D = (x, y, seed = 0) => {
  const n = Math.sin(x * 127.1 + y * 311.7 + seed * 43758.5453) * 43758.5453;
  return n - Math.floor(n);
};

const fbm = (x, y, octaves = 4, seed = 0) => {
  let value = 0;
  let amplitude = 0.5;
  let frequency = 1;
  for (let i = 0; i < octaves; i++) {
    value += amplitude * noise2D(x * frequency, y * frequency, seed + i * 100);
    amplitude *= 0.5;
    frequency *= 2;
  }
  return value;
};

// Generate Mercury texture: dark rocky with craters
export const generateMercuryTexture = () => {
  const canvas = createCanvas();
  const ctx = canvas.getContext('2d');
  const { width, height } = canvas;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const nx = x / width * 8;
      const ny = y / height * 4;
      const n = fbm(nx, ny, 6, 1);

      // Create craters
      const crater = fbm(nx * 3, ny * 3, 3, 42);
      const craterDepth = crater > 0.65 ? (crater - 0.65) * 3 : 0;

      const base = 80 + n * 60 - craterDepth * 40;
      const r = Math.min(255, Math.max(0, base + 10));
      const g = Math.min(255, Math.max(0, base));
      const b = Math.min(255, Math.max(0, base - 10));

      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(x, y, 1, 1);
    }
  }
  return canvas;
};

// Generate Venus texture: thick yellow/orange atmosphere with clouds
export const generateVenusTexture = () => {
  const canvas = createCanvas();
  const ctx = canvas.getContext('2d');
  const { width, height } = canvas;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const nx = x / width * 6;
      const ny = y / height * 3;
      const cloud = fbm(nx + 0.5, ny, 5, 10);
      const swirl = fbm(nx * 2 + cloud * 0.5, ny * 2, 4, 20);

      const r = Math.min(255, 200 + swirl * 55);
      const g = Math.min(255, 160 + cloud * 60);
      const b = Math.min(255, 80 + cloud * 30);

      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(x, y, 1, 1);
    }
  }
  return canvas;
};

// Generate Earth texture: blue oceans, green/brown land, white clouds
export const generateEarthTexture = () => {
  const canvas = createCanvas();
  const ctx = canvas.getContext('2d');
  const { width, height } = canvas;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const nx = x / width * 8;
      const ny = y / height * 4;
      const land = fbm(nx, ny, 6, 3);
      const detail = fbm(nx * 4, ny * 4, 3, 7);

      let r, g, b;
      // Polar regions
      const lat = Math.abs(y / height - 0.5) * 2;
      if (lat > 0.85) {
        r = 240; g = 245; b = 250; // Ice caps
      } else if (land > 0.48) {
        // Land
        const greenness = detail * 0.5;
        r = Math.min(255, 60 + detail * 80 + (land - 0.48) * 200);
        g = Math.min(255, 100 + greenness * 100);
        b = Math.min(255, 40 + detail * 30);
      } else {
        // Ocean
        r = Math.min(255, 20 + detail * 30);
        g = Math.min(255, 60 + detail * 40);
        b = Math.min(255, 140 + detail * 60);
      }

      ctx.fillStyle = `rgb(${Math.floor(r)},${Math.floor(g)},${Math.floor(b)})`;
      ctx.fillRect(x, y, 1, 1);
    }
  }
  return canvas;
};

// Generate Earth cloud layer
export const generateEarthClouds = () => {
  const canvas = createCanvas();
  const ctx = canvas.getContext('2d');
  const { width, height } = canvas;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const nx = x / width * 6;
      const ny = y / height * 3;
      const cloud = fbm(nx, ny, 5, 99);
      const alpha = cloud > 0.45 ? Math.min(1, (cloud - 0.45) * 3.5) : 0;

      ctx.fillStyle = `rgba(255,255,255,${alpha * 0.7})`;
      ctx.fillRect(x, y, 1, 1);
    }
  }
  return canvas;
};

// Generate Earth night lights
export const generateEarthNight = () => {
  const canvas = createCanvas();
  const ctx = canvas.getContext('2d');
  const { width, height } = canvas;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const nx = x / width * 8;
      const ny = y / height * 4;
      const land = fbm(nx, ny, 6, 3);
      const cities = fbm(nx * 8, ny * 8, 3, 55);

      let r = 0, g = 0, b = 0;
      if (land > 0.48 && cities > 0.6) {
        const intensity = (cities - 0.6) * 5;
        r = Math.min(255, 255 * intensity);
        g = Math.min(255, 200 * intensity);
        b = Math.min(255, 100 * intensity);
      }

      ctx.fillStyle = `rgb(${Math.floor(r)},${Math.floor(g)},${Math.floor(b)})`;
      ctx.fillRect(x, y, 1, 1);
    }
  }
  return canvas;
};

// Generate Mars texture: red/orange rocky terrain
export const generateMarsTexture = () => {
  const canvas = createCanvas();
  const ctx = canvas.getContext('2d');
  const { width, height } = canvas;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const nx = x / width * 8;
      const ny = y / height * 4;
      const terrain = fbm(nx, ny, 6, 4);
      const dark = fbm(nx * 2, ny * 2, 4, 14);

      // Polar caps
      const lat = Math.abs(y / height - 0.5) * 2;
      let r, g, b;
      if (lat > 0.9) {
        r = 220; g = 215; b = 210;
      } else {
        r = Math.min(255, 160 + terrain * 60 - dark * 30);
        g = Math.min(255, 80 + terrain * 40 - dark * 20);
        b = Math.min(255, 50 + terrain * 20);
      }

      ctx.fillStyle = `rgb(${Math.floor(r)},${Math.floor(g)},${Math.floor(b)})`;
      ctx.fillRect(x, y, 1, 1);
    }
  }
  return canvas;
};

// Generate Jupiter texture: horizontal cloud bands
export const generateJupiterTexture = () => {
  const canvas = createCanvas();
  const ctx = canvas.getContext('2d');
  const { width, height } = canvas;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const nx = x / width * 10;
      const ny = y / height;
      const band = Math.sin(ny * Math.PI * 12) * 0.5 + 0.5;
      const turbulence = fbm(nx + band * 0.3, ny * 8, 5, 5);

      // Great Red Spot
      const dx = (x / width - 0.3);
      const dy = (y / height - 0.55);
      const spotDist = Math.sqrt(dx * dx * 4 + dy * dy * 16);
      const isSpot = spotDist < 0.08;

      let r, g, b;
      if (isSpot) {
        const spotN = fbm(nx * 4, ny * 4, 3, 88);
        r = Math.min(255, 180 + spotN * 50);
        g = Math.min(255, 80 + spotN * 30);
        b = Math.min(255, 60 + spotN * 20);
      } else {
        r = Math.min(255, 180 + band * 40 + turbulence * 30);
        g = Math.min(255, 140 + band * 50 + turbulence * 20);
        b = Math.min(255, 100 + band * 20 + turbulence * 10);
      }

      ctx.fillStyle = `rgb(${Math.floor(r)},${Math.floor(g)},${Math.floor(b)})`;
      ctx.fillRect(x, y, 1, 1);
    }
  }
  return canvas;
};

// Generate Saturn texture: gold/yellow bands
export const generateSaturnTexture = () => {
  const canvas = createCanvas();
  const ctx = canvas.getContext('2d');
  const { width, height } = canvas;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const nx = x / width * 8;
      const ny = y / height;
      const band = Math.sin(ny * Math.PI * 10) * 0.5 + 0.5;
      const n = fbm(nx + band * 0.2, ny * 6, 4, 6);

      const r = Math.min(255, 210 + band * 30 + n * 15);
      const g = Math.min(255, 185 + band * 25 + n * 10);
      const b = Math.min(255, 130 + band * 15 + n * 5);

      ctx.fillStyle = `rgb(${Math.floor(r)},${Math.floor(g)},${Math.floor(b)})`;
      ctx.fillRect(x, y, 1, 1);
    }
  }
  return canvas;
};

// Generate Saturn ring texture
export const generateSaturnRingTexture = () => {
  const canvas = createCanvas(1024, 64);
  const ctx = canvas.getContext('2d');
  const { width, height } = canvas;

  for (let x = 0; x < width; x++) {
    const t = x / width;
    const n = fbm(t * 20, 0.5, 4, 77);

    // Create ring gaps
    const gap1 = Math.abs(t - 0.35) < 0.01 ? 0 : 1;
    const gap2 = Math.abs(t - 0.6) < 0.015 ? 0 : 1;
    const gap3 = Math.abs(t - 0.8) < 0.01 ? 0 : 1;

    const density = (0.3 + n * 0.5) * gap1 * gap2 * gap3;
    const r = Math.min(255, 200 + n * 40);
    const g = Math.min(255, 180 + n * 30);
    const b = Math.min(255, 140 + n * 20);

    for (let y = 0; y < height; y++) {
      ctx.fillStyle = `rgba(${Math.floor(r)},${Math.floor(g)},${Math.floor(b)},${density * 0.6})`;
      ctx.fillRect(x, y, 1, 1);
    }
  }
  return canvas;
};

// Generate Uranus texture: pale cyan atmosphere
export const generateUranusTexture = () => {
  const canvas = createCanvas();
  const ctx = canvas.getContext('2d');
  const { width, height } = canvas;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const nx = x / width * 6;
      const ny = y / height;
      const band = Math.sin(ny * Math.PI * 6) * 0.5 + 0.5;
      const n = fbm(nx, ny * 4, 3, 8);

      const r = Math.min(255, 150 + band * 20 + n * 15);
      const g = Math.min(255, 200 + band * 20 + n * 15);
      const b = Math.min(255, 210 + band * 15 + n * 10);

      ctx.fillStyle = `rgb(${Math.floor(r)},${Math.floor(g)},${Math.floor(b)})`;
      ctx.fillRect(x, y, 1, 1);
    }
  }
  return canvas;
};

// Generate Neptune texture: deep blue with storm patterns
export const generateNeptuneTexture = () => {
  const canvas = createCanvas();
  const ctx = canvas.getContext('2d');
  const { width, height } = canvas;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const nx = x / width * 8;
      const ny = y / height;
      const band = Math.sin(ny * Math.PI * 8) * 0.5 + 0.5;
      const storm = fbm(nx * 2, ny * 4, 5, 9);
      const n = fbm(nx, ny * 6, 4, 19);

      // Dark storm spot
      const dx = (x / width - 0.5);
      const dy = (y / height - 0.4);
      const stormDist = Math.sqrt(dx * dx * 6 + dy * dy * 20);
      const isStorm = stormDist < 0.06;

      let r, g, b;
      if (isStorm) {
        r = 30; g = 50; b = 120;
      } else {
        r = Math.min(255, 40 + band * 20 + n * 15);
        g = Math.min(255, 80 + band * 25 + storm * 15);
        b = Math.min(255, 180 + band * 30 + n * 20);
      }

      ctx.fillStyle = `rgb(${Math.floor(r)},${Math.floor(g)},${Math.floor(b)})`;
      ctx.fillRect(x, y, 1, 1);
    }
  }
  return canvas;
};

// Texture generator mapping
const textureGenerators = {
  Mercury: generateMercuryTexture,
  Venus: generateVenusTexture,
  Earth: generateEarthTexture,
  Mars: generateMarsTexture,
  Jupiter: generateJupiterTexture,
  Saturn: generateSaturnTexture,
  Uranus: generateUranusTexture,
  Neptune: generateNeptuneTexture,
};

// Cache generated textures
const textureCache = {};

export const getProceduralTexture = (planetName) => {
  if (textureCache[planetName]) return textureCache[planetName];
  const generator = textureGenerators[planetName];
  if (!generator) return null;
  const canvas = generator();
  textureCache[planetName] = canvas;
  return canvas;
};

export default getProceduralTexture;
