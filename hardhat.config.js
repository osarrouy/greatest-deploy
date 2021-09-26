require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-web3');

module.exports = {
  networks: {
    frame: {
      url: 'http://localhost:1248',
      timeout: 1000000,
    },
  },
};
