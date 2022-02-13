# Usage:


**npm run build** - to compile proj(or **npx hardhat compile**)

**npx hardhat run scripts/deploy.js --network [your_network]**  - deploying command, specified network - "rinkeby" !required .env file with defined "API_URL" and "PRIVATE_KEY"



## Tasks:

**npx hardhat balance** - to check balance of contract

**npx hardhat invest --sum [amount]** - to send amount of money in contract

**npx hardhat transfer --account [address] --sum [amount]** - transfer amount of money to another address !you should be owner of the contract

**npx hardhat investors** - list of all investors

**npx hardhat targetSum --account [address]** - prints sum of investement of specific address

## Test:

**npx hardhat test**


## An example of successfully deplyed contract:

https://rinkeby.etherscan.io/address/0x93770071fb366778f95942e58b41357a1c171131
