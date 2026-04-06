build-validate-inputs:
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-s -w" -o validate-inputs/exec ./cmd/validate-inputs

build-validate-inputs-wasi:
  docker build --file=Dockerfile-wasi-build --output type=local,dest=validate-inputs-wasi/dist  .

.PHONY: build
