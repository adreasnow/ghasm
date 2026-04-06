# GHASM (GHA WASM)

This is a repo for experiemnting with different was of publishing go-based GitHub Actions

## Approaches Tried

### Binary in action file

[validate-inputs-bin](./validate-inputs-bin)
[\_test-validate-inputs-bin.yaml](.github/workflows/_test-validate-inputs-bin.yaml)

The binary is stored next to the `action.yaml` file and is called using a `run` step.

This does work however inputs are not automatically converted to env vars, which means they need to be manually added in action.yaml. I'm not sure if there's an API for this instead.

This breaks down if you want to use LFS to store your binaries (which you should), as action checkouts do not evaluate LFS objects.

### OCI artifacts (immutable actions)

The idea is that an action is published to ghcr and a repo calls it with `using: oci://ghcr.io...`

Would have been perfect but GitHub shelved the beta and

### Docker containers

[validate-inputs-oci](./validate-inputs-oci)
[\_test-validate-inputs-oci.yaml](.github/workflows/_test-validate-inputs-oci.yaml)
[\_test-validate-inputs-oci-direct.yaml](.github/workflows/_test-validate-inputs-oci-direct.yaml)

The most straightforward approach. Go binary is built/published in a docker container and set as the entrypoint

There are two main ways to use this:

- Customers reference the docker container directly with `uses: docker://ghcr.io...`
  - This is the most seamless approach, however there's no action.yaml file, so there's no input validation or anyhting in the process
- Customers reference an action in a repo, which specifies `using: docker` and `image: docker://ghcr.io...`
  - This means an `action.yaml` file is used, however versions need to be managed
    - In the github repo as tags
    - On the docker containers as tags
    - In the `action.yaml` files that reference the versioned docker images

### ❌ WASI/WASM

[validate-inputs-wasi](./validate-inputs-wasi)
[\_test-validate-inputs-wasi.yaml](.github/workflows/_test-validate-inputs-wasi.yaml)

- WASI preview 1
  - Really cool in principle and could be used for completely sandboxed actions but given WASI's inability to make network calls, makes it a no-go.

- WASI preview 2 - requires tinygo as compiler, and jco as post transpiler
  -

###
