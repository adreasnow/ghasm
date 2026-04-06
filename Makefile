build-validate-inputs:
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-s -w" -o validate-inputs/exec ./cmd/validate-inputs-bin

build-gh-test-wasi1:
	CGO_ENABLED=0 GOOS=wasip1 GOARCH=wasm go build -ldflags="-s -w" -o gh-test-wasi1/dist/main.wasm ./cmd/gh-test

build-validate-inputs-wasi1:
	CGO_ENABLED=0 GOOS=wasip1 GOARCH=wasm go build -ldflags="-s -w" -o validate-inputs-wasi2/dist/main.wasm ./cmd/validate-inputs

build-validate-inputs-wasi2:
	docker build --file=validate-inputs-wasi/Dockerfile --output type=local,dest=validate-inputs-wasi/dist  .

build-validate-inputs-docker:
	docker build --file=validate-inputs-docker/Dockerfile --platform=linux/amd64 -t ghcr.io/adreasnow/ghasm/validate-inputs:1.0.2 .
	docker push ghcr.io/adreasnow/ghasm/validate-inputs:1.0.1

build-gh-test-docker:
	docker build --file=gh-test-docker/Dockerfile --platform=linux/amd64 -t ghcr.io/adreasnow/ghasm/gh-test:1.0.0 -t ghcr.io/adreasnow/ghasm/gh-test:1.0 -t ghcr.io/adreasnow/ghasm/gh-test:1 -t ghcr.io/adreasnow/ghasm/gh-test:main .
	docker push ghcr.io/adreasnow/ghasm/gh-test:1.0.0
	docker push ghcr.io/adreasnow/ghasm/gh-test:1.0
	docker push ghcr.io/adreasnow/ghasm/gh-test:1
	docker push ghcr.io/adreasnow/ghasm/gh-test:main

.PHONY: build
