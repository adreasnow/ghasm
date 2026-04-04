import { readFile } from "node:fs/promises";

const wasmBytes = await readFile(new URL("./main.wasm", import.meta.url));

await import("./wasm_exec.js");

const go = new Go();
go.env = { ...process.env };
WebAssembly.instantiate(wasmBytes, go.importObject).then((result) => {
  go.run(result.instance);
});
