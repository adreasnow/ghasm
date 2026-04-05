FROM golang:1.26.1 AS build

WORKDIR /build

COPY go.mod go.sum  ./
COPY internal/ ./internal/
COPY cmd/ ./cmd/

RUN go build -ldflags="-s -w" -o exec ./cmd/validate-inputs

FROM alpine:latest
WORKDIR /action

COPY --from=build /build/exec ./
COPY validate-inputs/action.yaml ./

ENTRYPOINT ["/action"]
