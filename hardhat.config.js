require('dotenv').config( );
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    swisstronik: {
      url: process.env.URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
