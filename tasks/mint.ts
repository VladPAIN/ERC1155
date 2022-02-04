import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";
import "@nomiclabs/hardhat-web3";

task("mint", "Mint")
    .addParam("to", "Address")
    .addParam("id", "Token id")
    .addParam("amount", "Amount")
    .setAction(async (args) => {

        const items = await hre.ethers.getContractAt("Items", process.env.ITEMS_ADDRESS);
        await (await items.mintNFT(args.to, args.id, args.amount)).wait()
        console.log("You are mint NFT");
 
    });

export default  {};