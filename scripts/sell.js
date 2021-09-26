const chalk = require('chalk');
const hre = require('hardhat');
const { OpenSeaPort, Network } = require('opensea-js');

const TOKEN = '0x6cfdb8f0cb7f0799ced4950d8b3ce7d5eb99f834';
const OWNER = '0xcB46AAe3e534E98FEc550aE511bdeE78B9098687';
const NETWORK = Network.Main; //process.env.NETWORK === 'Rinkeby' ? Network.Rinkeby : Network.Main;
const DUTCH_AUCTION_START_AMOUNT = 7.7;
const DUTCH_AUCTION_END_AMOUNT = 0.5;
const DUTCH_AUCTION_START_TIME = 1632762000; // 27 september 2021, 5pm UTC
const DUTCH_AUCTION_END_TIME = DUTCH_AUCTION_START_TIME + 6 * 60 * 60;
const TOKEN_IDS = [
  82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 99, 111, 112, 113, 114, 115, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133,
  134, 135, 136, 137, 138, 141, 142, 143, 145, 146, 147, 148, 149, 150, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177,
  178, 181, 182, 183, 184, 185, 186, 187, 188, 190, 191, 192, 193, 195, 196, 197, 198, 199, 200, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233,
  234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265,
  266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297,
  298, 299, 300, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 355, 356, 357, 358, 359, 360, 361, 362,
  363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393,
  394, 395, 396, 397, 398, 399, 400, 402, 403, 404, 405, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426,
  427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457,
  458, 459, 460, 461, 462, 463, 464, 465, 466, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489,
  490, 491, 492, 493, 494, 495, 496, 497, 498, 499, 500,
];

const sleep = (s) => {
  return new Promise((resolve) => setTimeout(resolve, s * 1000));
};

const _pack = () => {
  const _assets = [];

  for (let i = 0; i < TOKEN_IDS.length; i++) {
    _assets.push({ tokenId: TOKEN_IDS[i], tokenAddress: TOKEN });
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
