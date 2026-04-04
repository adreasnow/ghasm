# Makefile for building WebAssembly binary

build:
	GOOS=js GOARCH=wasm go build -o dist/main.wasm ./cmd

.PHONY: build
