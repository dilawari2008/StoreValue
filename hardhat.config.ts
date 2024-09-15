// stuff imported here become tasks , they can be used as yarn hardhat <task name>
import "@nomicfoundation/hardhat-ethers"
import "@typechain/hardhat" // typechain task

import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";
import "@nomicfoundation/hardhat-verify"; // verify task
import "./tasks/block-number"; // block-number task
import "hardhat-gas-reporter";
import "solidity-coverage"; // coverage task

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "https://eth-sepolia";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key";
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "key";

module.exports = {
  defaultNetwork: "hardhat", // chainId: 31337
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
    },
    localhost: {
      // different fromt the default hardhat network
      url: "http://127.0.0.1:8545/",
      // accounts: hardhat provides these,
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  solidity: {
    compilers: [
      {
        version: "0.8.7",
      },
    ],
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    // outputFile: "gas-report.txt", -> enable gives in a file disable gives in terminal
    noColors: false,
    // coinmarketcap: COINMARKETCAP_API_KEY,
    // token: "MATIC", "BNB", "ETH" -> default
  },
};
