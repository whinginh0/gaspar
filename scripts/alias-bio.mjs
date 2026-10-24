import { copyFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const outputDirectory = resolve(import.meta.dirname, "..", "dist");
const source = resolve(outputDirectory, "linktree", "index.html");
const destinationDirectory = resolve(outputDirectory, "bio");
const destination = resolve(destinationDirectory, "index.html");

await mkdir(destinationDirectory, { recursive: true });
await copyFile(source, destination);

console.log("Created production route: /bio/");
