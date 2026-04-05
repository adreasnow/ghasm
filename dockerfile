FROM golang:1.26.1 AS build

WORKDIR /build

COPY go.mod go.sum  ./
COPY internal/ ./internal/
COPY cmd/ ./cmd/

ENV CGO_ENABLED=0 GOOS=linux GOARCH=amd64
RUN go build -ldflags="-s -w" -o exec ./cmd/validate-inputs

FROM alpine:latest
LABEL org.opencontainers.image.source=https://github.com/adreasnow/ghasm

WORKDIR /action

COPY --from=build /build/exec ./
COPY validate-inputs/action.yaml ./

ENTRYPOINT ["/action"]
