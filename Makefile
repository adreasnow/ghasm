# Makefile for building WebAssembly binary

build:
	GOOS=js GOARCH=wasm go build -o dist/main.wasm ./cmd
	cp "$(shell go env GOROOT)/lib/wasm/wasm_exec.js" dist/

.PHONY: build
