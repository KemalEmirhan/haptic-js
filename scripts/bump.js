/**
 * Bump package.json version (patch | minor | major).
 * Usage: bun scripts/bump.js [patch|minor|major]
 */
import path from "node:path";

const pkgPath = path.join(import.meta.dir, "..", "package.json");
const pkg = await Bun.file(pkgPath).json();
const part = process.argv[2] ?? "patch";

const [major, minor, patch] = pkg.version.split(".").map(Number);
if (part === "major") {
  pkg.version = `${major + 1}.0.0`;
} else if (part === "minor") {
  pkg.version = `${major}.${minor + 1}.0`;
} else {
  pkg.version = `${major}.${minor}.${patch + 1}`;
}

await Bun.write(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
console.log("Version bumped to", pkg.version);
