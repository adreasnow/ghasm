# GHASM (GHA WASM)

This is a repo for experiemnting with different was of publishing go-based GitHub Actions

## Approaches Tried

| Approach                | Stability | Works           | Speed       | Type hints | Versioning | Building | Writing  |
| ----------------------- | --------- | --------------- | ----------- | ---------- | ---------- | -------- | -------- |
| Bin in Action Dir       | high      | yes             | fast        | yes        | simple     | easy     | moderate |
| Bin in Action Dir (LFS) | -         | no              | -           | yes        | simple     | easy     | moderate |
| OCI Artifacts           | none      | no              | fast        | yes        | simple     | easy     | simple   |
| Docker - Direct         | high      | yes             | fast + pull | no         | moderate   | easy     | simple   |
| Docker - In Action      | high      | yes             | fast + pull | yes        | complex    | easy     | simple   |
| WASM                    | preview   | yes (sandboxed) | fast        | yes        | simple     | annoying | complex  |
| WASI                    | preview   | questionably    | crawls      | yes        | simple     | annoying | complex  |

### Binary in Action Dir

[validate-inputs-bin](./validate-inputs-bin)
[\_test-validate-inputs-bin.yaml](.github/workflows/_test-validate-inputs-bin.yaml)

The binary is stored next to the `action.yaml` file and is called using a `run` step.

This does work however inputs are not automatically converted to env vars, which means they need to be manually added in action.yaml. I'm not sure if there's an API for this instead.

This breaks down if you want to use LFS to store your binaries (which you should), as action checkouts do not evaluate LFS objects.

### OCI artifacts (immutable actions)

The idea is that an action is published to ghcr and a repo calls it with `using: oci://ghcr.io...`

Would have been perfect but GitHub shelved the beta and

### Docker containers

[validate-inputs-docker](./validate-inputs-docker)
[\_test-validate-inputs-docker.yaml](.github/workflows/_test-validate-inputs-docker.yaml)
[\_test-validate-inputs-docker-direct.yaml](.github/workflows/_test-validate-inputs-docker-direct.yaml)

The most straightforward approach. Go binary is built/published in a docker container and set as the entrypoint

There are two main ways to use this:

- Customers reference the docker container directly with `uses: docker://ghcr.io...`
  - This is the most seamless approach, however there's no action.yaml file, so there's no input validation or anyhting in the process
- Customers reference an action in a repo, which specifies `using: docker` and `image: docker://ghcr.io...`
  - This means an `action.yaml` file is used, however versions need to be managed
    - In the github repo as tags
    - On the docker containers as tags
    - In the `action.yaml` files that reference the versioned docker images

### WASI/WASM

[validate-inputs-wasi1](./validate-inputs-wasi1)
[validate-inputs-wasi2](./validate-inputs-wasi2)
[\_test-validate-inputs-wasi1.yaml](.github/workflows/_test-validate-inputs-wasi1.yaml)

- WASI preview 1
  - Really cool in principle and could be used for completely sandboxed actions but given WASI's inability to make network calls, makes it a no-go.

- ## WASI preview 2 - requires tinygo as compiler, and jco as post transpiler
  - Really painful to build, doesn't seem to run properly
