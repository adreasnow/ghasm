FROM --platform=$BUILDPLATFORM golang:1.26.1 AS build

WORKDIR /build

COPY go.mod go.sum  ./
COPY internal/ ./internal/
COPY cmd/ ./cmd/

ARG TARGETOS
ARG TARGETARCH

RUN --mount=type=cache,id=gomod,target=/go/pkg/mod,sharing=locked \
    --mount=type=cache,id=gobuild,target=/root/.cache/go-build,sharing=locked \
    GOOS=${TARGETOS} GOARCH=${TARGETARCH} \
    CGO_ENABLED=0 \
    go build \
    -ldflags="-s -w" \
    -o exec \
    ./cmd/gh-test

FROM --platform=$BUILDPLATFORM alpine:latest
LABEL org.opencontainers.image.source=https://github.com/adreasnow/ghasm

WORKDIR /action

COPY --from=build /build/exec ./

ENTRYPOINT ["/action/exec"]
