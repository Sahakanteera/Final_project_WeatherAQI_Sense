const fs = require("fs");
const path = require("path");

const code = fs.readFileSync(path.join(__dirname, "../lib/weather-data.ts"), "utf8");
const startIdx = code.indexOf("export const DEMO_CITIES: City[] = [");
const arrayStr = code.slice(startIdx + "export const DEMO_CITIES: City[] = ".length);
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

console.log("Total cities in DEMO_CITIES:", cities.length);
cities.forEach((c, idx) => {
  console.log(`${idx + 1}. key="${c.key}" th="${c.th}" en="${c.en}" lat=${c.lat} lon=${c.lon}`);
});
