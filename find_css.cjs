const fs = require("fs");
const css = fs.readFileSync("public/index-e955e3dc.css", "utf8");
const matches = css.match(/[^{}]+saved-theme[^{}]*\{[^}]*\}/g) || [];
console.log(matches.slice(0, 10).join("\n---\n"));
