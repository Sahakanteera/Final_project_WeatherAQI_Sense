const fs = require("fs");
const path = require("path");

const geo = JSON.parse(fs.readFileSync(path.join(__dirname, "../public/thailand-provinces.geojson"), "utf8"));
const code = fs.readFileSync(path.join(__dirname, "../lib/weather-data.ts"), "utf8");

// Find Si Sa Ket in geojson
const sisaketFeature = geo.features.find(f => f.properties.name.toLowerCase().includes("saket"));
console.log("Feature properties:", sisaketFeature.properties);

// Bbox and coordinates of Sisaket
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

console.log("Sisaket BBox:", getBBox(sisaketFeature.geometry.coordinates));
console.log("Sisaket centroid:", getCenter(sisaketFeature.geometry.coordinates));

// Let's check what feature was hovered in the user screenshot!
// In the user screenshot, which province was highlighted in blue?
// Let's check all provinces in Isan and their BBox
geo.features.forEach(f => {
  const name = f.properties.name;
  const bbox = getBBox(f.geometry.coordinates);
  if (bbox.minY >= 14 && bbox.maxY <= 19 && bbox.minX >= 101 && bbox.maxX <= 106) {
    console.log(`${name}: bbox=[lat ${bbox.minY.toFixed(2)}..${bbox.maxY.toFixed(2)}, lon ${bbox.minX.toFixed(2)}..${bbox.maxX.toFixed(2)}] center=[${getCenter(f.geometry.coordinates).lat.toFixed(2)}, ${getCenter(f.geometry.coordinates).lon.toFixed(2)}]`);
  }
});
