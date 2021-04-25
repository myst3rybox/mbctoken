const MbcERC20 = artifacts.require("MbcERC20");

module.exports = function (deployer) {
  deployer.deploy(MbcERC20);
};
