 # Decentralized Applications (dApps)(Work In progress)
 
## Motivation

The biggest revolution that decentralized peer-to-peer networks has given us (techy guys like myself) was a decentralized economy. By reducing the power and influence of centralized entities, such as big tech companies and governments. This allows for a more transparent, equitable, and democratic internet that promotes fair distribution of resources and opportunities. One of the most well known examples are the Decentralized autonomous organizations (DAOs) which operate on decentralized platforms and are governed by smart contracts. They enable collective decision-making and resource allocation based on community consensus, fostering collaboration, and shared ownership. Nevertheless, we must not make the mistake of assuming that nothing can go wrong. With the power of decentralization comes the responsibility of ensuring we are properly informed and not everyone is comfortable taking their commercial journey into their own hands.

<hr>

## Table of Contents<br>

<ul>
 <li><a href="https://github.com/gcp-development/smart-contract-dapp/tree/main#dapp-architecture" target="_self">dApp Architecture</a></li>
 <li><a href="" target="_self">Smoke Tests</a></li> 
 <li><a href="" target="_self">Conclusion</a></li>
</ul>

<hr>

## dApp Architecture

dApps (decentralized applications) are different from traditional applications built on the old Web2 world, as it can directly connect developers with users without the involvement of intermediaries to manage user data and code.

![image](https://github.com/gcp-development/dapp/assets/76512851/a42d5561-4a5b-4813-a373-585eb06d71c2)

We don’t require permission to build a dApp and no company can change the rules of the platform ([Polkadot Governance](https://wiki.polkadot.network/docs/learn-governance) & [Crust Network Governance](https://wiki.crust.network/docs/en/governanceGuide)). The Smart Contract of a dApp runs on a decentralized peer-to-peer network(Blockchain). The graphical user interface, (GUI) of a dApp runs, on a decentralized peer-to-peer network(IPFS), that sends API calls to the Smart Contract.

Components:

- Blockchain ([Parachain](https://polkadot.network/features/parachains/)), decentralized blockchain platform that establishes a peer-to-peer network that securely executes and verifies application code ([smart contract](https://wiki.polkadot.network/docs/build-smart-contracts)).
- IPFS ([Crust Storage](https://wiki.polkadot.network/docs/build-storage#crust-storage)), hypermedia and file sharing peer-to-peer network for storing and sharing data in a distributed file system. 
- Smart Contract [(ink!)](https://use.ink/), [application code](https://github.com/gcp-development/dapp/tree/main/smart-contract).
- Front-end [(React](https://react.dev/learn) + [polkadot.js)](https://polkadot.js.org/docs/), [graphical user interface(GUI)](https://github.com/gcp-development/dapp/tree/main/gui).
- Parachain pipeline, [Github workflow](https://github.com/gcp-development/dapp/blob/main/.github/workflows/parachain-pipeline.yml)
- IPFS pipeline, [Github workflow](https://github.com/gcp-development/dapp/blob/main/.github/workflows/ipfs-pipeline.yml)
  
![image](https://github.com/gcp-development/smart-contract-dapp/assets/76512851/aee2a746-3b0f-42d5-b0b1-22ecb7acfa5c)

<hr>

## Smoke Tests

[Contracts on Rococo](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frococo-contracts-rpc.polkadot.io#/contracts)

![image](https://github.com/gcp-development/smart-contract-dapp/assets/76512851/1f48efd0-4541-4d62-b7da-e07cf4c9ca20)

IPFS pipeline (CID)

![image](https://github.com/gcp-development/dapp/assets/76512851/6b06e98d-ee5b-4fc4-99ea-ff6c70446235)

Test the [React App](https://crustipfs.live/ipfs/QmfRfiyVWLcMfYheCjbw8mLwTvmrso3djtakYqW6iKAwez/?filename=build)

![image](https://github.com/gcp-development/dapp/assets/76512851/b37d6621-f0bd-464f-8e9a-59ebecc93652)


<hr>

## Conclusion

<hr>

References:<br>
[Polkadot.js](https://polkadot.js.org/docs/)<br>
[Rococo Network](https://substrate.io/developers/rococo-network/)<br>
[Crust Network](https://crust.network/)<br>
