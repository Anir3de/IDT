import fs from "fs";
import path from "path";

const root = process.cwd();
const buildDir = path.join(root, "build");
const filesToCopy = ["index.html", "styles.css", "app.js", "site-content.js"];
const directoriesToCopy = ["media"];

fs.rmSync(buildDir, { recursive: true, force: true });
fs.mkdirSync(buildDir, { recursive: true });

for (const file of filesToCopy) {
  fs.copyFileSync(path.join(root, file), path.join(buildDir, file));
}

for (const directory of directoriesToCopy) {
  fs.cpSync(path.join(root, directory), path.join(buildDir, directory), { recursive: true });
}

console.log(`Static build created at ${buildDir}`);
