import { readFile } from "node:fs/promises";

const wasmBytes = await readFile(new URL("./main.wasm", import.meta.url));

await import("./wasm_exec.js");

const go = new Go();
go.env = Object.fromEntries(
  Object.entries(process.env).filter(
    ([k]) => k.startsWith("GITHUB_") || k === "PATH",
  ),
);
WebAssembly.instantiate(wasmBytes, go.importObject).then((result) => {
  go.run(result.instance);
});
