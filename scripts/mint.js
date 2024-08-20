require("dotenv").config( );
const { encryptDataField } = require('@swisstronik/utils')


//sendShieldedTransaction from swisstronik documentation
const sendShieldedTransaction = async (signer, destination, data, value) => {
    const [encryptedData] = await encryptDataField(
        process.env.URL,
        data,
    );

    return await signer.sendTransaction({
        from: signer.address,
        to: destination,
        data: encryptedData,
        value,
    })
}


async function main() {
    const [signer] = await ethers.getSigners( );
    console.log("Contract deployer address:", signer.address);

    // Address of the deployed contract
    const tokenAddress = "0x3d1A14e0004a6f204742003fB57Dd297A3a6c668";
  
    // Create a contract instance
    const contractFactory = await ethers.getContractFactory("MyPERC20Token");
    const Token = contractFactory.attach(tokenAddress);

    const tx = await sendShieldedTransaction(signer, tokenAddress, Token.interface.encodeFunctionData("mint"), 0);
  
    // It should return a TransactionReceipt object
    console.log("Transaction hash: ", tx.hash);
  }
  
  // Using async/await pattern to handle errors properly
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });