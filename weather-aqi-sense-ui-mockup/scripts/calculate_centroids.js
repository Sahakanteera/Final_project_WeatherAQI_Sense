const fs = require("fs");
const path = require("path");

const geo = JSON.parse(fs.readFileSync(path.join(__dirname, "../public/thailand-provinces.geojson"), "utf8"));
const code = fs.readFileSync(path.join(__dirname, "../lib/weather-data.ts"), "utf8");

const startIdx = code.indexOf("export const DEMO_CITIES: City[] = [");
const arrayStr = code.slice(startIdx + "export const DEMO_CITIES: City[] = ".length);
let depth = 0, endIdx = 0;
for(let i=0; i<arrayStr.length; i++) {
  if (arrayStr[i]==='[') depth++;
  else if(arrayStr[i]===']') {
    depth--;
    if(depth===0){ endIdx=i+1; break; }
  }
}
const cities = eval(arrayStr.slice(0, endIdx));

function matchCity(geoName, cities) {
  const norm = geoName.toLowerCase().replace(/[^a-z]/g, "");
  return cities.find((c) => {
    const cNorm = c.en.toLowerCase().replace(/[^a-z]/g, "");
    const kNorm = c.key.toLowerCase().replace(/[^a-z]/g, "");
    return cNorm === norm || kNorm === norm || cNorm.includes(norm) || norm.includes(cNorm);
  });
}

// Point in polygon
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

// Calculate polygon area and centroid
function getPolygonCentroid(pts) {
  let area = 0;
  let cx = 0;
  let cy = 0;
  const n = pts.length;
  for (let i = 0; i < n - 1; i++) {
    const x0 = pts[i][0];
    const y0 = pts[i][1];
    const x1 = pts[i+1][0];
    const y1 = pts[i+1][1];
    const a = x0 * y1 - x1 * y0;
    area += a;
    cx += (x0 + x1) * a;
    cy += (y0 + y1) * a;
  }
  area = area * 0.5;
  if (Math.abs(area) < 1e-9) {
    // fallback to average
    let sumX = 0, sumY = 0;
    pts.forEach(p => { sumX += p[0]; sumY += p[1]; });
    return { lon: sumX / n, lat: sumY / n, area: 0 };
  }
  cx = cx / (6 * area);
  cy = cy / (6 * area);
  return { lon: cx, lat: cy, area: Math.abs(area) };
}

function getBestCenter(feature) {
  const geom = feature.geometry;
  if (geom.type === "Polygon") {
    const pts = geom.coordinates[0];
    const centroid = getPolygonCentroid(pts);
    if (pointInPoly([centroid.lon, centroid.lat], pts)) {
      return centroid;
    }
    // If centroid is outside (e.g. C-shaped polygon), find a point inside
    // Midpoint of bounding box or internal scan
    return findInteriorPoint(pts);
  } else if (geom.type === "MultiPolygon") {
    // Find largest polygon by area
    let maxArea = -1;
    let bestPoly = null;
    geom.coordinates.forEach(poly => {
      const pts = poly[0];
      const c = getPolygonCentroid(pts);
      if (c.area > maxArea) {
        maxArea = c.area;
        bestPoly = pts;
      }
    });
    const centroid = getPolygonCentroid(bestPoly);
    if (pointInPoly([centroid.lon, centroid.lat], bestPoly)) {
      return centroid;
    }
    return findInteriorPoint(bestPoly);
  }
}

function findInteriorPoint(pts) {
  // Simple scanline or average of points inside
  let minX = 180, maxX = -180, minY = 90, maxY = -90;
  pts.forEach(p => {
    if (p[0] < minX) minX = p[0];
    if (p[0] > maxX) maxX = p[0];
    if (p[1] < minY) minY = p[1];
    if (p[1] > maxY) maxY = p[1];
  });
  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  if (pointInPoly([midX, midY], pts)) {
    return { lon: midX, lat: midY };
  }
  // Sample a grid of 20x20
  for (let step = 1; step < 20; step++) {
    for (let i = 1; i < 20; i++) {
      for (let j = 1; j < 20; j++) {
        const testX = minX + (maxX - minX) * (i / 20);
        const testY = minY + (maxY - minY) * (j / 20);
        if (pointInPoly([testX, testY], pts)) {
          return { lon: testX, lat: testY };
        }
      }
    }
  }
  return { lon: midX, lat: midY };
}

const provinceCenters = {};
let allInside = true;

geo.features.forEach(f => {
  const name = f.properties.name;
  const c = matchCity(name, cities);
  const center = getBestCenter(f);
  
  // Verify point in polygon
  let inside = false;
  if (f.geometry.type === "Polygon") {
    inside = pointInPoly([center.lon, center.lat], f.geometry.coordinates[0]);
  } else {
    inside = f.geometry.coordinates.some(poly => pointInPoly([center.lon, center.lat], poly[0]));
  }
  
  if (!inside) {
    console.log("NOT INSIDE:", name);
    allInside = false;
  }
  provinceCenters[c.key] = {
    key: c.key,
    name: name,
    th: c.th,
    lat: Number(center.lat.toFixed(4)),
    lon: Number(center.lon.toFixed(4))
  };
});

console.log("All 77 centers inside their polygons?", allInside);
console.log("Sisaket center:", provinceCenters["si sa ket"]);
console.log("Bangkok center:", provinceCenters["bangkok"]);
console.log("Satun center:", provinceCenters["satun"]);
console.log("Ranong center:", provinceCenters["ranong"]);

fs.writeFileSync(
  path.join(__dirname, "province_centers.json"),
  JSON.stringify(provinceCenters, null, 2),
  "utf8"
);
console.log("Saved province_centers.json");
