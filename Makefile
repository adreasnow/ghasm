build-validate-inputs:
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-s -w" -o validate-inputs/exec ./cmd/validate-inputs

build-validate-inputs-wasi:
	PATH="/opt/homebrew/opt/go@1.25/bin:/opt/homebrew/bin:$PATH" GOOS=wasip2 GOARCH=wasm tinygo build -o validate-inputs-wasi/dist/main.wasm ./cmd/validate-inputs
	npx @bytecodealliance/jco transpile validate-inputs-wasi/dist/main.wasm -o validate-inputs-wasi/dist/ --name action
	rm -rf validate-inputs-wasi/dist/main.wasm


.PHONY: build
