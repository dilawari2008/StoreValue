import { task } from "hardhat/config";

task("block-number", "Prints the current block number").setAction(
  async (_taskArgs, hre) => {
    await hre.ethers.provider.getBlockNumber().then((blockNumber) => {
      console.log(`Current block number: ${blockNumber}`);
    });
  }
);

export default task;
