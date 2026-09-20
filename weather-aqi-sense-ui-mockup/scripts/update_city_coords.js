const fs = require("fs");
const path = require("path");

const centers = JSON.parse(fs.readFileSync(path.join(__dirname, "province_centers.json"), "utf8"));
const filePath = path.join(__dirname, "../lib/weather-data.ts");
let content = fs.readFileSync(filePath, "utf8");

let updatedCount = 0;
for (const key of Object.keys(centers)) {
  const item = centers[key];
  // Regex to find this city object in content:
  // "key": "key", ... "lat": oldLat, "lon": oldLon
  const regex = new RegExp(`("key":\\s*"${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[\\s\\S]*?"lat":\\s*)([0-9.]+)([\\s\\S]*?"lon":\\s*)([0-9.]+)`);
  if (regex.test(content)) {
    content = content.replace(regex, `$1${item.lat}$3${item.lon}`);
    updatedCount++;
  } else {
    console.log("Could not match regex for key:", key);
  }
}

console.log(`Updated ${updatedCount} cities in weather-data.ts`);
fs.writeFileSync(filePath, content, "utf8");
console.log("File saved successfully.");
