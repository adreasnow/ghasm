import { WASI } from "wasi";
import { readFile } from "fs/promises";
import { argv } from "process";

const wasi = new WASI({
  version: "preview1",
  args: argv.slice(1),
  env: process.env,
  preopens: {
    "/": "/",
  },
  network: true,
});

const binary = await readFile(new URL("./main.wasm", import.meta.url));
const module = await WebAssembly.compile(binary);
const instance = await WebAssembly.instantiate(module, wasi.getImportObject());

wasi.start(instance);
