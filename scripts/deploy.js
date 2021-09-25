const chalk = require('chalk');
const { ethers } = require('hardhat');
const Batch = {
  Arkhe: 0,
  Drop: 1,
  A: 2,
  B: 3,
};

const PROXY_REGISTRY = {
  rinkeby: '0xf57b2c51ded3a29e6891aba85459d600256cf317',
  mainnet: '0xa5409ec958c83c3f309868babaca7c86dcb077c1',
};

const GSAT = require('../abi/GSAT.json');

const deploy = {
  token: async (ctx) => {
    const signers = await ethers.getSigners();
    const Token = new ethers.ContractFactory(GSAT.abi, GSAT.bytecode, signers[0]);
    ctx.token = await Token.deploy(PROXY_REGISTRY.mainnet);
    await ctx.token.deployed();
    console.log(`Token deployed at ${chalk.cyan(ctx.token.address)} and arkhe batch minted`);
    await (await ctx.token.mint(Batch.Drop)).wait();
    console.log('Token drop minted');
    await (await ctx.token.mint(Batch.A)).wait();
    console.log('Token batch A minted');
    await (await ctx.token.mint(Batch.B)).wait();
    console.log('Token batch B minted');
  },
};

const main = async () => {
  await deploy.token(this);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
