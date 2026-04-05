# Makefile for building WebAssembly binary

build-validate-inputs:
	GOOS=linux GOARCH=amd64 go build -o validate-inputs/ ./cmd/validate-inputs

.PHONY: build
