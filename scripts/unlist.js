const chalk = require('chalk');
const { ethers } = require('hardhat');
const { OpenSeaPort, Network } = require('opensea-js');
const { OrderSide } = require('opensea-js/lib/types');
const address = '0x6cfDB8f0CB7f0799cED4950d8B3ce7D5Eb99F834';
const david = '0xcb46aae3e534e98fec550ae511bdee78b9098687';

const IDS = [
  84, 85, 86, 87, 91, 92, 97, 111, 112, 113, 115, 121, 122, 124, 125, 126, 127, 128, 130, 132, 133, 134, 135, 136, 137, 138, 141, 142, 143, 145, 146, 147, 148,
  149, 150, 161, 162, 163, 164, 165, 166, 168, 169, 170, 172, 173, 175, 176, 177, 178, 181, 183, 184, 185, 186, 187, 188, 191, 192, 195, 196, 197, 198, 199,
  200, 222, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 246, 247, 248, 249, 251, 252, 253, 254,
  255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 280, 281, 282, 283, 284, 285, 286,
  287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 334, 335, 336, 337, 338, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351,
  352, 353, 355, 356, 357, 358, 359, 360, 361, 362, 363, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384,
  385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400, 402, 403, 404, 405, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417,
  418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448,
  449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 468, 469, 470, 471, 473, 474, 475, 476, 477, 478, 479, 480, 481,
  482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496, 497, 498, 194,
];

const unlist = async () => {
  const seaport = new OpenSeaPort(hre.web3.currentProvider, {
    networkName: Network.Main,
  });

  for (let i = 0; i < IDS.length; i++) {
    process.stdout.write(`» cancelling order for tokenId ${IDS[i]} ... `);
    try {
      const { orders, count } = await seaport.api.getOrders({
        asset_contract_address: address,
        token_id: IDS[i],
        side: OrderSide.Sell,
      });

      await seaport.cancelOrder({ order: orders[0], accountAddress: david });

      console.log(chalk.green('OK'));
    } catch (e) {
      console.log(chalk.red('KO'));
    }
  }
};

const main = async () => {
  await unlist();
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
