const hre = require("hardhat");

async function main() {

  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const Items = await hre.ethers.getContractFactory("Items");
  const items = await Items.deploy();
  await items.deployed();
  console.log("Collection contracts:", items.address);

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });