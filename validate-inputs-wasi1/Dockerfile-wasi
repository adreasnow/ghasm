FROM --platform=amd64 golang:1.25-bookworm AS build

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        cargo \
        golang \
        ca-certificates && \
    rm -rf /var/lib/apt/lists/*

ADD https://github.com/bytecodealliance/wasm-tools/releases/download/v1.246.2/wasm-tools-1.246.2-x86_64-linux.tar.gz wasm-tools.tar.gz
RUN tar -xzf wasm-tools.tar.gz && \
    cp wasm-tools*/wasm-tools /usr/local/bin/ && \
    chmod +x /usr/local/bin/wasm-tools

ADD https://github.com/tinygo-org/tinygo/releases/download/v0.40.1/tinygo_0.40.1_amd64.deb tinygo.deb
RUN dpkg -i tinygo.deb

WORKDIR /build

COPY go.mod go.sum  ./
COPY internal/ ./internal/
COPY cmd/ ./cmd/

RUN GOOS=wasip2 \
    GOARCH=wasm \
    tinygo build \
    -o main.wasm \
    ./cmd/validate-inputs

FROM node:25.9-alpine AS transpile

WORKDIR /transpile

COPY --from=build /build/main.wasm .

RUN npm install @bytecodealliance/jco @bytecodealliance/preview2-shim esbuild

RUN npx @bytecodealliance/jco \
  transpile \
  main.wasm \
  --name action \
  -o ./

RUN npx esbuild \
  action.js \
  --bundle \
  --platform=node \
  --format=esm \
  --outfile=/action.bundled.js

FROM scratch AS export-stage
COPY --from=transpile /action.bundled.js /action.bundled.js
COPY --from=transpile /transpile/action.core.wasm /action.core.wasm
