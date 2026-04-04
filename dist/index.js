if (typeof WebAssembly === "undefined") {
  throw new Error("WebAssembly is not supported in this environment");
}

// Check if Go constructor is available
if (typeof Go === "undefined") {
  throw new Error(
    "Go constructor not found. Make sure wasm_exec.js is included before this file.",
  );
}

// Create a Go instance
const go = new Go();

// Function to load the WebAssembly module
async function loadWasm() {
  try {
    // Use instantiateStreaming if available, otherwise fall back to instantiate
    let result;
    if (WebAssembly.instantiateStreaming) {
      result = await WebAssembly.instantiateStreaming(
        fetch("main.wasm"),
        go.importObject,
      );
    } else {
      // Fallback for environments that don't support streaming
      const response = await fetch("main.wasm");
      const bytes = await response.arrayBuffer();
      result = await WebAssembly.instantiate(bytes, go.importObject);
    }

    // Run the Go program
    const instance = go.run(result.instance);

    console.log("Go WebAssembly module loaded and running successfully");
    return instance;
  } catch (err) {
    console.error("Failed to load WebAssembly module:", err);
    throw err;
  }
}

// Export the load function for testing in CI/CD environments
if (typeof module !== "undefined" && module.exports) {
  module.exports = { loadWasm };
}

// In browser environments, start loading automatically
if (typeof window !== "undefined") {
  // Add cleanup handler for when the page unloads
  window.addEventListener("beforeunload", () => {
    // Clean up Go instance if possible
    // Note: Go instances don't typically have a stop method
    console.log("Shutting down Go WebAssembly module");
  });

  // Start loading the WebAssembly module
  loadWasm().catch((err) => {
    console.error("Error loading WebAssembly:", err);
    // In a CI/CD environment, we might want to exit with an error code
    if (typeof process !== "undefined") {
      process.exit(1);
    }
  });
} else {
  // In non-browser environments (like Node.js for testing), don't auto-start
  console.log("WebAssembly loader ready. Call loadWasm() to start.");
}

// For testing purposes, make the go instance available
if (typeof global !== "undefined") {
  global.goInstance = { loadWasm };
}
