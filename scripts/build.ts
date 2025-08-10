import { $ } from "bun";

const isWatch = Bun.argv.includes("--watch");

async function cleanAndPrepareDist(): Promise<void> {
  await $`rm -rf dist`;
  await $`mkdir -p dist`;
}

async function copyStaticAssets(): Promise<void> {
  await $`cp manifest.json dist/manifest.json`;
  await $`cp -R icons dist/icons`;
}

async function buildScripts(): Promise<void> {
  if (isWatch) {
    // Watch mode keeps the process alive
    await $`bun build src/main.ts --outdir dist --format iife --target=browser --watch --sourcemap`;
  } else {
    await $`bun build src/main.ts --outdir dist --format iife --target=browser --minify`;
  }
}

async function run(): Promise<void> {
  await cleanAndPrepareDist();
  await copyStaticAssets();
  await buildScripts();
}

run().catch((err) => {
  console.error(err);
  throw err;
});
