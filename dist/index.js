await import("./wasm_exec.js");

const go = new Go();
go.env = { ...process.env };
WebAssembly.instantiateStreaming(fetch("./main.wasm"), go.importObject).then(
  (result) => {
    go.run(result.instance);
  },
);
