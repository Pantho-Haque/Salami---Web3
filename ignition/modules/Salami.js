// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("SalamiModule", (m) => {
  
  // Specify the Salami contract to deploy
  const salami = m.contract("Salami", []);

  // Add any post-deployment logic if needed here
  // For example: initialize contract state or perform any setup if necessary
  return { salami };
});
