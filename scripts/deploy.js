const { ethers, run, network } = require("hardhat");

const main = async () => {
  // 1.deploy
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying contract...");
  const simpleStorage = await SimpleStorageFactory.deploy();
  const contractAddress = await simpleStorage.getAddress();
  console.log(`Deployed to : ${contractAddress}`);

  // 2. to verify check whether it is a live network
  console.log("network.config:", network.config);
  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for block confs...");
    await simpleStorage.deploymentTransaction().wait(6);
    await verify(contractAddress, []);
    console.log(`Contract: ${contractAddress} verified`);
  }

  // 3. interact
  let currentValue = await simpleStorage.retrieve();
  console.log(`Current value: ${currentValue}`);
  console.log("Updating contract...");
  const transactionResponse = await simpleStorage.store(7);
  await transactionResponse.wait(); // returns transaction receipt
  currentValue = await simpleStorage.retrieve();
  console.log(`Current value: ${currentValue}`);
};

const verify = async (contractAddress, args) => {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      // for more args  - https://youtu.be/gyMwXuJrbJQ?t=32289 8:58:09
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!");
    } else {
      console.log(e);
    }
  }
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
