# SimpleBank
Bank Negara Decentralized Application (Cryptocurrency Laundering Detection)

## Dependencies
- NPM v6.13.4
- Truffle v5.1.6
- Node v11.15.0
- Web3.js v1.2.1
- Python v3.8.1
- Solidity v0.5.8
- Ganache IDE
- Metamask


## Step 1. Clone the project
` $ git clone https://github.com/maisarah714/SimpleBank.git `

## Step 2. Install dependencies
```
$ cd SimpleBank
$ truffle compile
```
## Step 3. Open Remix
- http://remix.ethereum.org
- Open SimpleBank/contracts/SimpleBank.sol
- Copy all the coding and paste in Remix
- Use compiler v0.5.8 and compile
- Change environment to Web3Provider and change the Web3 Provider Endpoint to http://localhost:7545
- Deploy the smart contract
- Copy the ABI in Solidity Compiler tab and paste in index.js
  - line 15: var abi = web3.eth.contract(paste ABI code here);
- Copy the address of the deployed contract in Deploy & Run Transaction tab, and paste in index.js
  - line 173: var SimpleBank = abi.at('paste account address here');

## Step 4. Start Ganache
Open the Ganache GUI client that you downloaded and installed. Make sure the RPC Server is in HTTP://127.0.0.1:7545

## Step 5. Compile & Deploy The Bank Smart Contract
`$ truffle migrate --reset`
You must migrate the smart contract each time your restart ganache.

## Step 6. Configure Metamask
- Install Metamask in your browser
- Connect metamask to your local Etherum blockchain provided by Ganache.
    - Networks > Custom RPC > New RPC Url: HTTP://127.0.0.1:7545
- Import an account provided by ganache.
    - Import Account > Paste private key of one of accounts in Ganache

## Step 7. Run the Front End Application
Run using python

`$ python3 -m http.server 3000`

Visit this URL in your browser: http://127.0.0.1:3000
