# dApp

This [React App project with TypeScript](https://create-react-app.dev/docs/adding-typescript/), was developed using [Visual Code](https://code.visualstudio.com/download) and using [Firefox React Developer Tools](https://addons.mozilla.org/en-GB/firefox/addon/react-devtools/)

Install the node 20.2.0 version.
```bash
nvm install 20.2.0
```
Note:nvm install node, "node" is an alias for the latest version.

List installed versions.
```bash
nvm ls
```

![image](https://github.com/gcp-development/smart-contract-dapp/assets/76512851/8c308535-aa61-416e-8d5c-f1f372f92e33)

To create a similar project.
```bash
nvm use 20.2.0
npx create-react-app dapp --template typescript
cd dapp
npm i -D prettier eslint-config-prettier eslint-plugin-prettier
npm i @polkadot/api @polkadot/extension-dapp @polkadot/extension-inject @polkadot/ui-util @polkadot/api-contract
```

To run the project.
```bash
npm start
```

References:<br>
[Using a node version manager](https://npm.github.io/installation-setup-docs/installing/using-a-node-version-manager.html)<br>
[npm Docs](https://docs.npmjs.com/)<br>
[polkadot.js](https://polkadot.js.org/docs/)<br>
