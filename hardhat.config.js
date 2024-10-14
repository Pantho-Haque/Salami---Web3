require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig 31337 */
module.exports = {
  solidity: "0.8.27",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    // hardhat: {
    //   chainId: 31337, // Standard Hardhat local network chain ID
    //   accounts:["0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"]
    // },
    // Add any other networks (like testnets or mainnets) as needed
  },
};
