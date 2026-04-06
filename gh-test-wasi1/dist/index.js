import { WASI } from "wasi";
import { readFile } from "fs/promises";
import { argv } from "process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const resolvPath = join(__dirname, "resolv.conf");
await readFile(resolvPath).catch(async () => {
  await import("fs/promises").then((fs) =>
    fs.writeFile(resolvPath, "nameserver 8.8.8.8\n"),
  );
});

const wasi = new WASI({
  version: "preview1",
  args: argv.slice(1),
  env: {
    ...process.env,
    RESOLV_CONF: "/etc/resolv.conf",
  },
  preopens: {
    "/": "/",
    "/etc": __dirname,
  },
  network: true,
});

const binary = await readFile(new URL("./main.wasm", import.meta.url));
const module = await WebAssembly.compile(binary);
const instance = await WebAssembly.instantiate(module, wasi.getImportObject());

wasi.start(instance);
