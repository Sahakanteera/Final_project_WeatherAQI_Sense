const fs = require("fs");
const path = require("path");

const geo = JSON.parse(fs.readFileSync(path.join(__dirname, "../public/thailand-provinces.geojson"), "utf8"));
const code = fs.readFileSync(path.join(__dirname, "../lib/weather-data.ts"), "utf8");

const startIdx = code.indexOf("export const DEMO_CITIES: City[] = [");
if (startIdx === -1) {
  console.log("Could not find start");
  process.exit(1);
}
const arrayStr = code.slice(startIdx + "export const DEMO_CITIES: City[] = ".length);
// Find matching closing bracket
let depth = 0;
let endIdx = 0;
for (let i = 0; i < arrayStr.length; i++) {
  if (arrayStr[i] === '[') depth++;
  else if (arrayStr[i] === ']') {
    depth--;
    if (depth === 0) {
      endIdx = i + 1;
      break;
    }
  }
}
const cities = eval(arrayStr.slice(0, endIdx));

console.log("Total cities:", cities.length);
console.log("Total geo features:", geo.features.length);

function getBBox(coords) {
  let minX = 180, maxX = -180, minY = 90, maxY = -90;
  function traverse(pt) {
    if (typeof pt[0] === "number") {
      if (pt[0] < minX) minX = pt[0];
      if (pt[0] > maxX) maxX = pt[0];
      if (pt[1] < minY) minY = pt[1];
      if (pt[1] > maxY) maxY = pt[1];
    } else {
      pt.forEach(traverse);
    }
  }
  traverse(coords);
  return { minX, maxX, minY, maxY };
}

function getCenter(coords) {
  let sumX = 0, sumY = 0, count = 0;
  function traverse(pt) {
    if (typeof pt[0] === "number") {
      sumX += pt[0];
      sumY += pt[1];
      count++;
    } else {
      pt.forEach(traverse);
    }
  }
  traverse(coords);
  return { lon: sumX / count, lat: sumY / count };
}

function pointInPoly(pt, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][0], yi = poly[i][1];
    const xj = poly[j][0], yj = poly[j][1];
    const intersect = ((yi > pt[1]) !== (yj > pt[1])) &&
      (pt[0] < (xj - xi) * (pt[1] - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

function isInsideFeature(lat, lon, geom) {
  const pt = [lon, lat];
  if (geom.type === "Polygon") {
    return pointInPoly(pt, geom.coordinates[0]);
  } else if (geom.type === "MultiPolygon") {
    return geom.coordinates.some(poly => pointInPoly(pt, poly[0]));
  }
  return false;
}

const mismatches = [];
geo.features.forEach(f => {
  const name = f.properties.name;
  const norm = name.toLowerCase().replace(/[^a-z]/g, "");
  const city = cities.find(c => {
    const cNorm = c.en.toLowerCase().replace(/[^a-z]/g, "");
    const kNorm = c.key.toLowerCase().replace(/[^a-z]/g, "");
    return cNorm === norm || kNorm === norm || cNorm.includes(norm) || norm.includes(cNorm);
  });
  if (!city) {
    console.log("No city for:", name);
    return;
  }
  const inside = isInsideFeature(city.lat, city.lon, f.geometry);
  const bbox = getBBox(f.geometry.coordinates);
  const inBbox = (city.lon >= bbox.minX && city.lon <= bbox.maxX && city.lat >= bbox.minY && city.lat <= bbox.maxY);
  if (!inside) {
    mismatches.push({
      name,
      th: city.th,
      key: city.key,
      lat: city.lat,
      lon: city.lon,
      inBbox,
      bbox,
      featureCenter: getCenter(f.geometry.coordinates)
    });
  }
});

console.log("Total mismatches (not inside polygon):", mismatches.length);
mismatches.forEach(m => {
  console.log(`- ${m.name} (${m.th}): city=[${m.lat}, ${m.lon}] inBbox=${m.inBbox} center=[${m.featureCenter.lat.toFixed(4)}, ${m.featureCenter.lon.toFixed(4)}]`);
});
