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

function matchCity(geoName, cities) {
  const norm = geoName.toLowerCase().replace(/[^a-z]/g, "");
  return cities.find((c) => {
    const cNorm = c.en.toLowerCase().replace(/[^a-z]/g, "");
    const kNorm = c.key.toLowerCase().replace(/[^a-z]/g, "");
    return cNorm === norm || kNorm === norm || cNorm.includes(norm) || norm.includes(cNorm);
  });
}

const deltas = [];
geo.features.forEach(f => {
  const c = matchCity(f.properties.name, cities);
  const center = getCenter(f.geometry.coordinates);
  const dLat = Math.abs(c.lat - center.lat);
  const dLon = Math.abs(c.lon - center.lon);
  const distKm = Math.sqrt(Math.pow(dLat * 111, 2) + Math.pow(dLon * 111 * Math.cos(c.lat * Math.PI / 180), 2));
  deltas.push({ name: f.properties.name, th: c.th, distKm, cityLat: c.lat, cityLon: c.lon, centerLat: center.lat, centerLon: center.lon });
});

deltas.sort((a, b) => b.distKm - a.distKm);
console.log("Top 20 farthest offsets from province center:");
deltas.slice(0, 20).forEach(d => {
  console.log(`${d.th} (${d.name}): offset = ${d.distKm.toFixed(1)} km | City=[${d.cityLat}, ${d.cityLon}] vs Center=[${d.centerLat.toFixed(4)}, ${d.centerLon.toFixed(4)}]`);
});
