require("@nomiclabs/hardhat-waffle");
require('solidity-coverage');
require("dotenv").config()
require("@nomiclabs/hardhat-web3");
require("@nomiclabs/hardhat-ethers");
const { PRIVATE_KEY, API_URL } = process.env;
const contractAddress = "0x93770071FB366778F95942e58b41357A1C171131";
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 task("balance", "Prints an account's balance")
    .setAction(async () => {
      const provider = new ethers.providers.JsonRpcProvider(API_URL) 
      const signer = new ethers.Wallet(PRIVATE_KEY, provider)
      const myContract = await ethers.getContractAt('charityContract', contractAddress, signer)
      const out = await myContract.balanceOf()
      console.log(out)
    });

 task("invest", "Invest some money")
    .addParam("sum", "Amount of money to invest")
    .setAction(async (taskArgs) => {
      const provider = new ethers.providers.JsonRpcProvider(API_URL) 
      const signer = new ethers.Wallet(PRIVATE_KEY, provider)
      const myContract = await ethers.getContractAt('charityContract', contractAddress, signer)
      const out = await myContract.invest({value :  web3.utils.toWei(taskArgs.sum)})
      console.log(out)
    });

 task("transfer", "Transfer amount of money to address")
    .addParam("account", "The account's address")
    .addParam("sum", "Amount of money to invest")
    .setAction(async (taskArgs) => {
      const provider = new ethers.providers.JsonRpcProvider(API_URL) 
      const signer = new ethers.Wallet(PRIVATE_KEY, provider)
      const myContract = await ethers.getContractAt('charityContract', contractAddress, signer)
      const out = await myContract.sendMoney(taskArgs.account, taskArgs.sum*(10**18));
      console.log(out)
    });

 task("investors", "Prints a list of all investors")
    .setAction(async () => {
      const provider = new ethers.providers.JsonRpcProvider(API_URL) 
      const signer = new ethers.Wallet(PRIVATE_KEY, provider)
      const myContract = await ethers.getContractAt('charityContract', contractAddress, signer)
      const out = await myContract.showInvestors();
      console.log(out)
    });

 task("targetSum", "Prints a sum of investments by address")
    .addParam("account", "The account's address")
    .setAction(async (taskArgs) => {
      const provider = new ethers.providers.JsonRpcProvider(API_URL) 
      const signer = new ethers.Wallet(PRIVATE_KEY, provider)
      const myContract = await ethers.getContractAt('charityContract', contractAddress, signer)
      const out = await myContract.showAllInvestementsByAddress(taskArgs.account);
      console.log(out)
    });



//console.log(process.env);
//console.log(API_URL)
module.exports = {
  solidity: "0.8.5",
  networks: {
    rinkeby: {
      url: API_URL,
      accounts: [PRIVATE_KEY]
    },
  }
};
