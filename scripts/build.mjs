import { build, context } from "esbuild";
import { mkdir, rm, cp } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, "..");
const distDir = resolve(projectRoot, "dist");
const isWatch = process.argv.includes("--watch");

async function cleanAndPrepareDist() {
  await rm(distDir, { recursive: true, force: true });
  await mkdir(distDir, { recursive: true });
}

async function copyStaticAssets() {
  const manifestSrc = resolve(projectRoot, "manifest.json");
  const manifestDest = resolve(distDir, "manifest.json");
  await cp(manifestSrc, manifestDest);

  const iconsSrc = resolve(projectRoot, "icons");
  const iconsDest = resolve(distDir, "icons");
  await cp(iconsSrc, iconsDest, { recursive: true });
}

async function buildScripts() {
  const options = {
    entryPoints: [resolve(projectRoot, "src/content.ts")],
    bundle: true,
    outfile: resolve(distDir, "content.js"),
    sourcemap: isWatch,
    minify: !isWatch,
    target: ["chrome120"],
    format: "iife",
    platform: "browser",
  };

  if (isWatch) {
    const ctx = await context(options);
    await ctx.watch();
    // keep process alive in watch mode
    console.log("Watching for changes...");
  } else {
    await build(options);
  }
}

async function run() {
  await cleanAndPrepareDist();
  await copyStaticAssets();
  await buildScripts();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
