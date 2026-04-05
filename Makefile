# Makefile for building WebAssembly binary

build-validate-inputs:
	GOOS=js GOARCH=wasm go build -o validate-inputs/dist/main.wasm ./cmd/validate-inputs
	cp "$(shell go env GOROOT)/lib/wasm/wasm_exec.js" validate-inputs/dist

.PHONY: build
