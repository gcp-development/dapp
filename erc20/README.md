# ERC-20 Token Standard

It's assumed that these software are installed and running:

<ul>
  <li><a href="https://www.rust-lang.org/tools/install" target="_blank">Rust</a></li>
  <li><a href="https://rust-lang.github.io/rustup/installation/index.html#installing-nightly" target="_blank">nightly</a></li>
  <li><a href="https://crates.io/crates/cargo-contract" target="_blank">cargo contract</a></li>
</ul>

This project was developed using the [Intellij Community](https://www.jetbrains.com/idea/download/#section=linux) with the [Rust plugin](https://www.jetbrains.com/rust/).

<hr>

## Table of Contents<br>
- [Environment](https://github.com/gcp-development/smart-contract-dapp/blob/main/erc20/README.md#environment)
- [Test cases](https://github.com/gcp-development/smart-contract-dapp/blob/main/erc20/README.md#test-cases)
- [Build](https://github.com/gcp-development/smart-contract-dapp/blob/main/erc20/README.md#build)
- [Deploy via command-line]
- [Deploy via browser]

<hr>

### Environment

[ink! CLI version](https://use.ink/getting-started/setup#ink-cli).

```bash
cargo contract --version
```

![image](https://github.com/gcp-development/erc20/assets/76512851/97773ed9-ea13-4fdc-b011-b860e7617993)

The current [toolchain](https://rust-lang.github.io/rustup-components-history/) setup is as follows:

```bash
rustup toolchain install nightly-2023-02-09
```

```bash
rustup component add rust-src --toolchain nightly-2023-02-09-x86_64-unknown-linux-gnu
```

```bash
rustup override set nightly-2023-02-09
```

Note: There is a current [bug](https://github.com/paritytech/cargo-contract/issues/1058) in cargo-contract, building contracts with rust nightly 1.70.0 or higher. That's why we have to use the rustc [v1.69.0](https://blog.rust-lang.org/2023/04/20/Rust-1.69.0.html).

The directory will be assigned with a Rust toolchain with [rustup override](https://rust-lang.github.io/rustup/overrides.html#directory-overrides).

```bash
rustup show
```

![image](https://github.com/gcp-development/smart-contract-dapp/assets/76512851/1708fa72-5b6b-42ad-b618-f1e0a5613185)

Note:The nightly-2023-02-09 is set by the [rust-toolchain.toml](https://github.com/gcp-development/erc20/blob/main/rust-toolchain.toml) file.

<hr>

### Test cases

Run the test cases for the  contract
```bash
cargo test
```

![image](https://github.com/gcp-development/smart-contract-dapp/assets/76512851/4e92c092-1d00-4ff8-827f-50e0ca5fa786)

<hr>

### Build

Build the contract
```bash
cargo contract build
```

![image](https://github.com/gcp-development/smart-contract-dapp/assets/76512851/402b61c4-5e79-4ede-99a3-2672beac5fb9)

In the target folder we should have these files:
```bash
target
  └─ ink
    └─ erc20.contract
    └─ erc20.wasm
    └─ metadata.json
```
A Wasm binary(erc20.wasm), a metadata file (metadata.json/which contains the contract's [ABI](https://use.ink/basics/metadata#abi)) and the contract file(erc20.contract/which we will deploy to our chain).

![image](https://github.com/gcp-development/smart-contract-dapp/assets/76512851/a2fcd86f-4e6f-48b7-8c57-5aac8993b53b)

<hr>

References:<br/>
[ERC-20 implementation](https://github.com/paritytech/ink-examples/tree/main/erc20)<br/>
