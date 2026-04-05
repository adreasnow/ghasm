build-validate-inputs:
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-s -w" -o validate-inputs/exec ./cmd/validate-inputs

.PHONY: build
