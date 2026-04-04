#!/usr/bin/env node

const { readFileSync } = require("fs");
const { join, dirname } = require("path");

// Resolve paths relative to this script's location
const scriptDir = dirname(__filename);
const wasmExecPath = join(scriptDir, "wasm_exec.js");
const wasmPath = join(scriptDir, "main.wasm");

try {
  wasmExec = readFileSync(wasmExecPath, "utf8");
  const vm = require("vm");
  const script = new vm.Script(wasmExec);
  script.runInThisContext();

  wasmBuffer = readFileSync(wasmPath);
} catch (err) {
  console.error("Error: Failed to execute wasm_exec.js:", err.message);
  process.exit(1);
}

const go = new Go();
go.env = { ...process.env };

WebAssembly.instantiate(wasmBuffer, go.importObject);
go.run(result.instance);
