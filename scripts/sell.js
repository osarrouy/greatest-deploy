const chalk = require('chalk');
const hre = require('hardhat');
const { OpenSeaPort, Network } = require('opensea-js');

const TOKEN = '0xf515de755a038282dd3ff6a388b1515d39c8ca8e';
const OWNER = '0x8873b045d40a458e46e356a96279ae1820a898ba';
const NETWORK = Network.Rinkeby; //process.env.NETWORK === 'Rinkeby' ? Network.Rinkeby : Network.Main;
const DUTCH_AUCTION_START_AMOUNT = 7.7;
const DUTCH_AUCTION_END_AMOUNT = 0.5;
const DUTCH_AUCTION_START_TIME = 1632762000; // 27 september 2021, 5pm UTC
const DUTCH_AUCTION_END_TIME = DUTCH_AUCTION_START_TIME + 6 * 60 * 60;

const sleep = (s) => {
  return new Promise((resolve) => setTimeout(resolve, s * 1000));
};

const _pack = () => {
  const _assets = [];

  _assets.push({ tokenId: 0, tokenAddress: TOKEN });

  for (let i = 151; i <= 152; i++) {
    _assets.push({ tokenId: i, tokenAddress: TOKEN });
  }

  return _assets;
};

const main = async () => {
  console.log(chalk.cyan('» Creating dutch auction ...'));
  console.log(`${chalk.cyan(`» Starts on ${new Date(DUTCH_AUCTION_START_TIME * 1000).toUTCString()} at ${DUTCH_AUCTION_START_AMOUNT} ETH`)}`);
  console.log(`${chalk.cyan(`» Ends on ${new Date(DUTCH_AUCTION_END_TIME * 1000).toUTCString()} at ${DUTCH_AUCTION_END_AMOUNT} ETH`)}`);

  const assets = _pack();
  const seaport = new OpenSeaPort(hre.web3.currentProvider, {
    networkName: NETWORK,
  });

  console.log(chalk.cyan('\n» Get ready to sign shit ...\n'));

  for (let i = 0; i < assets.length; i++) {
    process.stdout.write(`» Opening order for token ${assets[i].tokenId} ... `);
    try {
      await seaport.createFactorySellOrders({
        assets: [assets[i]],
        accountAddress: OWNER,
        listingTime: DUTCH_AUCTION_START_TIME,
        startAmount: DUTCH_AUCTION_START_AMOUNT,
        endAmount: DUTCH_AUCTION_END_AMOUNT,
        expirationTime: DUTCH_AUCTION_END_TIME,
      });

      console.log(chalk.green('OK'));
    } catch (e) {
      console.log(chalk.red('KO'));
    }

    await sleep(2);
  }

  console.log(chalk.green('\nDutch auction successfully opened !'));
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
