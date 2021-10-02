const chalk = require('chalk');
const { ethers } = require('hardhat');

const address = '0xc4eb058F66071e7F60a3043D0BCDC735Cf4dF2dD';
const Drop = require('../abi/Drop.json');
const Token = require('../abi/GSAT.json');

const BENEFICIARIES = [
  '0x8660f85c9ACDEfd36b9FA962FbcC0792FAd51Ab3',
  '0x86E578946D012B73c4B62070AF5c8c9e62D5a22A',
  '0x5234e7663251bcAf02d017e92dFa3D3e694430C6',
  '0xf1Bc12B4183280412a7d5de721bC91Fb1cE9fEAD',
  '0xF682d204cB48232A43e00A87E0F9bdF08C0fAAD1',
  '0xb445b423ec29746c7e2175baa88132890e81b6b5',
  '0x352a30b2b8d9c96Ac37ee8C6cf9aA2ea0abCe7F0',
  '0x32Cc2EC897F21a77A704e9a7313af6a640c47BB5',
  '0x8ff21a4289852a555d10FF3d1C60Fd8085883B4E',
  '0xbdF68eFA1905762B4FAf33362ab7AD1b2F847551',
  '0x132AfBbf99cF914ced6d39c86767FBbA2422eeb2',
  '0x42df0560E25A65E75600f7771A291Dd72aC92a80',
  '0xBd72D021d3cb334dEb3151Db905EE073b8eEE518',
  '0x9643CF35E7758526FF8E4d9556B2cE373FD362B1',
  '0xa682Cf1ee21F68baE2Ef57b19d84577437eaCF82',
  '0xAc9203F8A8856f50BeE340FE26a24a81a5011872',
  '0xC002fC1fB5011d56fD10d4Ec524929B5710f88c6',
  '0x5221dc2c8a9bE3e2c417de0Ecc78326bD5E3c34a',
  '0x3b72DeBc48EA394B753a567EC467e1d7F9532718',
  '0xdD97E26fd0042Ab3c2CEfb488894F50309864253',
  '0x501A1868f3681820BE5B34e42C4899bf3EFd6F44',
  '0x04ED0dFE041aA4a5f661F32e5B65B6a0697d7692',
  '0x78721086BaaEEE9B4a6B4A8B1bE6333c91b63Db4',
  '0xb1cfF89e8f21B54D76679ab26bBBe7fF7d9f4917',
  '0xE2f786E7b9b6EbD507AEDe686D216cc20deB5090',
  '0x0DeFF4B771d4d80822Cb6737EeE21e6a831F47D3',
  '0x5E881a2bCf7B31D37923E3D21C90FE92212dEAf0',
  '0xd1EF21064b0a41f21E34FC9E6F0E2c81665cE356',
  '0xBc11a3bc8BB9101573A9E0D6D26a5B67824426BA',
  '0x4E7932e035489ac4c9E5d4c849C4C93C623ccCb3',
  '0x0FBFb3551038E51236809e753947866f746B053C',
  '0x3fDcCcCc27f307B532Babad5481A2177b3693aDa',
  '0xf421615aa529822c6e0e588f089860e1a0608ecc',
  '0x8c07FaeD54a305A5Eeb24C6d7bE2231E7707d226',
  '0x7e49584d39d3b363a7d789515cea4a48a20bf466',
  '0x5f07ca45c86d528de8fef070ff36d881729ac730',
  '0xa432f1A6A53BC2F207127331B1cbe75f9a9ea8Dd',
  '0x47a4ed62364e4716c58fe19bb124a1f7f2dd89d4',
  '0xacd3c92b427F97921DA7b8e643982E7160Ee22De',
  '0x8C18EE3BbF568FF335E660B68cA8A2D19A690117',
  '0x0fdEEeBdcEfD1d3bce95240b1B0c59F233D308B4',
  '0x6bdA9330fFCb77eD451Af0AeA0eAcA2bEEb38F17',
  '0x7C17e3dE8732Ef529758b85B23608C57B03B380B',
  '0x742a4d87b49F7E2fFeA7bae861240Db184f9A543',
  '0x2E3179c194EF3aBFaee73C38B45ef8c65b2137b1',
  '0xd6Fc309e23145bf561018814D9cEC7bC213000aD',
  '0xf5a42683d4458ba74a0829e1e6e04612422F9bA1',
  '0xEE3600Bb29C2c4D1C7F6ad06f2B95E0f451870Cf',
  '0x7c23B4Bd17c51F19DF4C717FDE6CF32031034419',
  '0xA3e807F7bd671f0978d311836a7408017110174B',
  '0xf0fc21E8F66737Fb6f6Ce2b056BB460Fc295383e',
  '0xe9e162e9921ac5e2ed16797ba055df69d67159cd',
  '0x26147cbE12f2b9949b5C279Cd5572223c56FE63e',
  '0x4CDf6356951cA013d5d39283D8c3BF37525764d1',
  '0x09b087A70087F14077101288bf5BAd0667B006ad',
  '0x5FC28C9A205d6FcC8C85e9a138C625E895102665',
  '0xd42bF00c85436b0b9a78364c3eFA6Ed67B82c9eF',
  '0xD2B98CD24DE62b1575258C6dE347a080420E74FE',
  '0xa5b9a847fbf1dea4590c583ab5dc7bb3308161a3',
  '0x5CdcE2059cF60706D4D0B4f1262762B2626a57C7',
  '0x79C49531fd64c41C719E1e0101F5F738CB95CCf1',
  '0x69b40432b9ea5B26dbEC1Ad5eCF23AAeBa06CaAF',
  '0x08A433D3aE335E81Ab7C4c42c9daD713ffB651F6',
  '0x62c3b30218C4DdfF850564D45096a526DeCD1762',
  '0x9DeA4abA5aaD3Cbf01dfd5ef02BB14e00063625d',
  '0xA8Dae5332e826624e594AE227d16F334DD5F6581',
  '0xEFc22a9c9ac34c93cB7cb560F7D732Ca02E545b7',
  '0xe1bAbD4B732c22bf7ccc034573EB6f897aD086C7',
  '0xe50ADF15ab941055F523440D214260B2cD472374',
  '0x5240e7c63FbeDA1c17efAc00a96F37Cd4413EC8A',
  '0xc004a360209c05Ae6eB4e168954BFfB7E7F83D4b',
  '0x4B69511C0B077200771F73F3C7CD4ECD60C77707',
  '0xDf8698E28403d2cE5a3425eEc0a4C9205c5d73a6',
  '0x744e72e6F9fE3b953b592C19D087f966166A87F4',
  '0x82278c683b0Af1f39927E52ac49780738CdcCC46',
  '0x9b9513c6a4226f209433638de4b7b1060ededa08',
  '0xf6910d47fbb1f5518d60c721d4189936ecd5a1b6',
  '0xEf090F7E575D421C6B9dA4E9da9776beE771cafF',
  '0x4f389f9208633cA0924D8A7bDe6F4A6fDBA1B537',
  '0x3E56102d55a4550885FF5e0057456DEb19915882',
  '0x348f57D1aC394B3B9F07aDa5a9Cf34069D69065b',
  '0xD688fC15110b9596d8C13c3107F9a43BbEa6c68c',
  '0x86E578946D012B73c4B62070AF5c8c9e62D5a22A',
  '0xaB2AcebEdab6B46361512AF51a34D63a5F98418b',
  '0xE51B5763cac6013ae588Ce052Ec355b8Eb572A6e',
  '0x9BeaEcE9690130675357B94e5112855F7243E18b',
  '0x4d502f04E9a61b9800A0A066b178be74f0f1C9a1',
  '0x02d928491cc82d4321e77880008cb6ece0bdbb66',
  '0xfF6a533b78b32875eBD1A6de734FafEa90AEE923',
  '0x4EB06B6d1B44B236376272627b2775693617449c',
  '0x4112792E5133e000a69213fB2C8E82d4787B5950',
  '0x1CDf5FCA9803DE8592769178c26F56Fef8E9a8bb',
  '0x32084c6132b430a6B618680314285a64D23C7500',
  '0xFAeBff7794A986b8976cF8d6e363e774C4567B0F',
  '0xbaFf2Fd3997dE00830c4b2666E9c62e9971D50CA',
  '0xdfD15b03e9837Af0543f2318348d6dc02de197F2',
  '0xe6cF38b93a293FF2779B1a87FFf2717Ef8107197',
  '0x21ece124a7665A729430F9bFaD50613c9FCDe480',
  '0xed5622fb03af40106e9a0b2adcfed4d3ca2440b8',
  '0x44eef0439ea9076f24b9586b591a07cc6bcaa7a3',
  '0xC467b7950a5fad84Be975B338411213c24A2bAC4',
  '0x86a9f561D6160aC401CBbfbC46688302455ade52',
  '0x8b3ca8DC64D7d91db193426ed026E8EB7d99AdaB',
  '0xEb7DC72798eC3d5c967bE19ad5608A90ae2bD098',
  '0x9480F39303E49C764Fa8496Ef68FEB981fe55018',
  '0x1dc7af8739c02b757ac9b3ba92ab561de7e3af25',
  '0x165c4a5ab6b415ddcab716aefe1dda4719c8a0a1',
  '0x302cc78e45a4d5231f70848d34f40d8b1859c3dd',
  '0x530EF888151231fbd6975863F16fc282817B017a',
  '0x3413940203d889Cbb9B1f568BE485FB5ba4070Cc',
  '0x95C8ea03Ae8D5CDc5c315199E52bF32bbEEF439c',
  '0x818E4112D98EFceFE092B0f150eDeE515Ae0Ed77',
  '0xF7A8fe61aa0b9051F12f72695fB3ad7546097A01',
  '0xff40e1b6DBb4BA193dAD7a7Eec6837Ea97d15480',
  '0x3C49821ccA2bB4797809E3A94b7b6c7B82462298',
  '0x6dDDa7c4D28b6e8bb96F401eF48C73d63890ce53',
  '0x2b20DAC6998e51E1A140E0ead955117cc6F89430',
  '0x8cc6641bfd9fea44c6e66a984fce6e53771895e5',
  '0x3E354E4D627f1BAE82A2467697efF89471487025',
  '0x132AfBbf99cF914ced6d39c86767FBbA2422eeb2',
  '0x8660f85c9ACDEfd36b9FA962FbcC0792FAd51Ab3',
  '0x3aBfAE750d404C04e17593C576298390FB9E9433',
  '0xa318168be9d5ee4e131a71690964723b4b0e1716',
  '0x445c372fC4005Fe10dd09a1FcBD6be0433E23344',
  '0x605d1bfd25a360e70d65ae61b0da6e78e2edd0d7',
  '0x0710Fa4d0B6F98e3adA4c33471C97fA3200f2198',
  '0xE1732cE7A62b170c12fb9BD859E4b7956E3c3074',
  '0xfD53C8325B623Bd8639b7bCC65b275fEd37907D8',
  '0x500F4e355d586b79f270AC93FA1fD2FEE04FC0a5',
  '0xb562a5be43c8a4933bb57d754cb249cc4e464198',
  '0xA3A5dF2AE721a45Fa246e5AE42eAecd3Ac61048f',
  '0x0C0aB132F5a8d0988e88997cb2604F494052BDEF',
  '0x61800F3230A6954888032a5f0bC37a7611a719Ae',
  '0x0A9E0c347917ec9c2722718b69b1F30279721453',
  '0xB1051a5ebF9120BAB71f1cece694959af8fd4E1f',
  '0xC7bE5A69F0Da5672E3ECfaaf5529b5FE81D803A1',
  '0x270E171dC5a7A0f19cc4c0Bc5ad7a0eEB5B8147D',
  '0x3474E154a562236Fd93f782D5D4626B15A4460c3',
  '0xf9CC1beb56e5Ac90574eE8B9B0e473CaB746a72E',
  '0xFC6356d1A89555f5cC041BA9828d001842B0458D',
  '0x54E9d7ea6d226d6350F9141155F374318Db6BcEE',
  '0x6936af6D9DbE969630CBaa4C68DA8d4503A9296C',
  '0xD7769A7f3808282838b48a86a4C13353E35B15b3',
  '0x61AD2333E753161c1F875F80654070A46Ac36f86',
  '0x13e49cd3f314188032bed445a2f3de55f3669110',
  '0x1964aa364dfcce4043baa4084fb2ae763d5629d8',
  '0x9bccE9897f9B97b6D10C63E2C620987af4051A6f',
  '0x5e55B240bADA3a286724ef68EE6fE5c543D6465a',
  '0x29Ac25d705966859A33e7957d8c56C2c6736Ac0E',
  '0x506671C191C8F319a2D47E049DBb43db73ED3B71',
  '0x42Cb103D2c60f6FD4424086E7E849078Fa93b3EF',
  '0xD4a31E42f71973eEe39B8161AB5eFFB7F08CC639',
  '0x0Dd67314002e5D56E3A966b29FC4c09E343dc3D9',
  '0xFD7Bff94e27Dec7C9085ECDC19A3ea6ADC307C25',
  '0x6fCa99C517137Deb0519C4E65dF81B98492BAd1c',
  '0x9d72400a826854a09a0c504b308357d021A35904',
  '0x31A9D6CfAa3B12cAC5Fae49052Dcc10EC080CB35',
  '0x648C575C3AFF50D5B2756A6a9a00496D46559378',
  '0x4dC9fDCC9a72828b777Ea9D17BE30cc5D852a96c',
  '0xf5ED9BBc861792878Fa4F9bf0FbD6428bcc6100d',
  '0x8B5Ba95f952844C5c66cb53FBFe1749c70327D70',
  '0x22866a8a218437F1E373FFc4a1EBe35ebC430842',
  '0x3a25996cdd36c779b3847F64Cb660F4aFA2821c5',
  '0xe6cb7108865042b8CEAdc393F40cd63C65F94B9e',
  '0x63AF327b76913FAFC7BDB9b0497682b398980717',
  '0x2d363EB9505088f165fB8987539531476F9FD1e8',
  '0x6143045bf0C04b049128109D17b02ddDB25b99F3',
  '0xA43b4235B5B813A88d3Fe1bd965aC9fcC68C1c40',
  '0xa5c1F12aa41fDECeD32F6D41B37e15d50c5B50A3',
  '0xe9cdF9f3125ea5F034F11F6e65E44c5303C2Bd4e',
  '0x1924eb636F5b7949656BB3a089ea7715849bd724',
  '0x0D2C4E2f5b77aaec365CCEa015dC1BC2904b0699',
  '0x5234e7663251bcAf02d017e92dFa3D3e694430C6',
  '0x4565F5D4b54eFEdd724323f55896ffc8c8a7A262',
  '0xB3c6144c929652D6046c01282FA2F355D9864dB9',
  '0x41BCF22f7150c963f504d425DeD04Aad140ad780',
  '0x13A86Bc038727cc243A88706d2eA3aC7F97B6591',
  '0x6314436E9118D315ED665127e199c68Bb04bb7E4',
  '0xaf280abB98bcc9276457480C80be5041FC7c9311',
  '0x5360289e1B4542b2F497fca8B54a8d376c9Bf927',
  '0xfA0296e904cE1A4C427bab76D87d944E00e9F552',
  '0x8F1Ac49F7cC5Ad97ECD1C68338468A912dcB8b01',
  '0xaa58Af3e4e2d858ac0243eb23d95e9d3012B0257',
  '0x7eB3aE92Fc0b6e467a13e60A39Aa3D0638995aa9',
  '0xd62A2dacd4dA2968976B7B94f3a4203a618Ae900',
  '0x0751d473f9fb8573e0dFf64D75A1dA2C67E0069D',
  '0xade7A8F182A2bBAB6e7fdD8668b63dA4118A5167',
  '0xD93b5660F7C8D889cF9865a972cABCA5218a6D5f',
  '0xc68a38aF1bD0Ca302d427f926C217Ce788515B99',
  '0xBadC4c8fFf52DE5c40a2479AFb8bd729072642A4',
  '0x47506F6a1781158d173Cd9C59e26dE9C273287c0',
  '0xBc5BC3feEfDA80A050f09f5248367f3744778bEe',
  '0xB767E62c1fa72aAe807CfBfC890D7586172aaF31',
  '0xC792F633f3aCed05Cb8C1C9bD20BDa2743652A32',
  '0x7e4Fced02D70938f1F7C9041611226BA4A0FBCA3',
  '0x46390940cEc1cEC311d2ADC7157878742f5038e4',
  '0xAA7b1921511367d0a07D5CafC573B3F2c090535f',
  '0x8B9D59477894587560fF8983C3D36b801ea3eba6',
  '0xe6CaF898D70a0F0365AE8C6211aDE489025aA1bb',
  '0x828Ef9c164907A50d57BaF661a39e2Ac808BC35E',
  '0xEC991b6FeEBD67285601b0dfc4BEeF86a2AF991f',
  '0x6011F45Af72d7c517E5b661A1efD5eFEfe023d71',
  '0xEfcD425eEd1F6F1A26A555752eeE1E57D2010481',
  '0x5669cDAE4517e7ae740f6c5d29AC0A117203ecA5',
  '0x150Ac22B9B88191e29445aA631CB531e0dfB950C',
  '0x0f194e15F38B2277704eF8f2ac129967Dff82EE6',
  '0xd7C83d564979a1Ecc73A6C85eCeBc9a5269ffE69',
  '0x048893FB266286cCECeB790bb61F3A2684F7eFDf',
  '0xe7A1006eA1D26742a10F60f996C310daa013A898',
  '0x63c961927DC14DE00994F58005c498f020E2d0F7',
  '0xE0cF15EC73f416261b8C0C9d2e13Ba7D47aFd3AA',
  '0xBDf0F0E0Ab5A9922deB4A1F2fb9055658DF184aE',
  '0xe41379F11043b9dC32Ff9199A246B3A878aC8209',
  '0x8d317a24cBb8D31BE94ff816DBFEc25C4f988c41',
  '0xd0D9597369fC67b9EB2703D6e9ce5FAC0A77f33b',
  '0x26C9225f793fD7Ca398dC69702d9715Be3504bFc',
  '0xBEa87690BEb3a30b6a7b3A349b513e2c1Bb8d920',
  '0xfe936b60C12b64884c8AF5C46d7177A4D549bF48',
  '0xEEa066550a57b8B159E9dA60Bf4a2BA8854AC918',
  '0xB71CF10339d0D1A241F043eB249AFE751b13AC7A',
  '0x565Df4A062933497b4F442f3488fdB7755dCAc07',
  '0x5629a8da71c746b70c2efc74a551b24ada873ff4',
  '0x72171f5e53Cee18C8E3D37544d47300B578B5105',
  '0xB9893cb75f6ac67c33f425480B92f636054c6F71',
  '0xbF900BaaE2aE6be57d302B09B5a4b0515e5c6d76',
  '0x9d14Fda2A999D3d7cF3aB01f87237d2C254b7a22',
  '0xa3b11D1f06d71eaA9cD3d0142F08E7AcE9b474eC',
  '0xb6B4D68650255B91303c6c9D307C4921D4444E3A',
  '0xDe35747731622575149Ba5528044aD1549af0383',
  '0xf1Bc12B4183280412a7d5de721bC91Fb1cE9fEAD',
  '0xCeE94A62259A9573c31a1e752229169d92f7E7e8',
  '0xe17fE9DFD63caF350D0B00c3BDac93E2f3552f5F',
  '0xa76518628898D212A320e72B71d99fa6Bf314253',
  '0x327b6d337ec099ef8fcd148fcf8da0725758a579',
  '0xeee1cC37f96c883F95FF19948ea5b4Cf74f55467',
  '0x29e944bc984980f31f5c9b9c0da61f3f78988c64',
  '0xD0c8bbfBd8C9a45205B0AF1F99FDD5dcf261a633',
  '0x99dd1fcda2c460841ae86d07115235aa185f780f',
  '0x9B3962037c7Ac9753E6D12d47394b90cD7C41C47',
  '0xE8659Ade0E011D97EEFa99216d9799dd299D9469',
  '0x5f2Bf32572D4bE4646cce37C51ac54b04fec24eB',
  '0xDE308cdA6011ec24942373F58636ce416B0fe3A4',
  '0x25f435B8A8e815a0026FB4021a7166bDEfAC5D97',
  '0x564472124C4c483fC83E31CDA89045b77eEd9409',
  '0xc6C3a7AaE324Cc777e13C80F7db420BB59704b1C',
  '0x7C9eEc503d823AFB312A6C2825BCe653009739CD',
  '0x9544dD0E1b915089047b9eb81Ed586E285B465Fe',
  '0x80b53eb6d63067D4bBFa725b667F813BcDE7a6DD',
  '0x5c62CC8027c4293D14AF404F327Dbb2F8b7EaE12',
  '0x94F4bBb7272402d821B1096BFfdB1F470a7c3a80',
  '0x16E397096381Ea03a02c4435a8118B3603C55C79',
  '0xe0FEf11bDDAf8DfFAB787d1Ba4982296E96DC0bF',
  '0xb8e38D8fD38425734e69a7CBa63124a781f85ED8',
  '0x8408233D31B360793E95b9ec312Eb25221e24EbB',
  '0x208AE76eA689895c205707db4E532e9cDC864659',
  '0xf2Ec653fD963E837Ae11C5C9006845F75EBB611f',
  '0x1d6104E868cC1769fa20BBf0DD7B3B0cd6CAC048',
  '0x16d4c80363A1c298D7388CfA75675B057F1C49Ec',
  '0xb167F7411c3BD53f2B260332bF7d0ec5DADf140A',
  '0x9DDE556691f0bcCc7Bd526Ea2f9fde9cE2933177',
  '0x3e486DaE19407c7772030a0fC3Aa689ED92B8c49',
  '0xe952e49e5e068846f6e6fc93bf6ba6014e68e8f1',
  '0x30C12527D44e925f950E3525Dd83a6DfC43A832D',
  '0x00941b9102ec18ed251379561a83f84abb13a55d',
  '0xEc1fec800E31D5D81A274B22Ec2E62815b011F53',
  '0x646AacE7E9B39BF64f007DCdB3D9abF06D9EbC89',
  '0xbda7aC81461d885B107A7F3A77D72f0BA334C336',
  '0xA9f1492b7E6563c28A864E7DdB7f07f952FF3734',
  '0xDd50E694256a0527ED6C40FEc0DD04586667A1E6',
  '0xE77f003C189E5cc6C0f5f7Fc03EE8dD16A1A69cE',
  '0x0372D795b743F7A0c52951375c423d9C6B25bc5B',
  '0x5CE1a525F8f953502D365d3e813D582e220D0F30',
  '0x6a83713224ce7e5312663E1F8141013e700bBd25',
  '0x3a0491e718988c77394c12ef639c9bc424c536da',
  '0x58cf0C1ea187C9A1d52169238f01d5a23f67CfE7',
  '0xE82F8E68330f133815b075A6DFBd5A48B96E204e',
  '0xb26b98e243FEb28f2A629AdEd8d0961a3A191b4F',
  '0xB8e28a8b906E562D0877239674868A73dAf39dD1',
  '0x89ef5dE8dBE41dcb0034D98A89989e0cECF9c486',
  '0x4d80c405a3263314e609a1d04783f2e5b3bea6e7',
  '0x8c66c93601ac76e9aeaad6636da5f0c2e9d91c02',
  '0x14E8C2352867C6B10f5aeA73adCB24CC9b8ed640',
  '0x54002B10A71591637d0e06969334b548894F3BD3',
  '0x6A97df12876982B39c8295D668428A59D45BCf3f',
  '0xFB7C5b6b3f350608E538B78Cf48a464eada26577',
  '0x1d56297599a746270315c7642DE7C5Df5ed36B4D',
  '0xa220b76ea43722dc04344894c3b1f606049b46b7',
  '0xB2F13661eb385286aB330Ba0E7661A1636793186',
  '0x3967956fE932d9D238d3283620C9acCC5752e6E7',
  '0x91d42092e88eF6B2cBC22ee53A9fd80c6F0c254d',
  '0xA36873845FE40a48c512Da3a2fA1e6c5829b3488',
  '0x9c391dFDAe142E6F7eDf93A9F9dE164c7153b7aA',
  '0xC02A3b5B4f7Ee7525459F60F8a34708A1756C5f5',
  '0x3A224cF56e1E5382234972ba6A02E197a0Fe302B',
  '0xa5F0c698Ca7858b7ceE31613FF2C133E6E968485',
  '0x6044c0a8707670B5157BAEeEB0b9638C80aa0d13',
  '0x0ae18d347c7424413fc9f797d0422f636a6248fe',
  '0x9C4B7f921F42a6B707C799d639Cfd0b9911d985F',
  '0xb3a09BE4e9A1Ea1ab6Cf9b1D0961e6BEa50221Ce',
  '0xf6d11B69c00Eb552C1f8Afd1e1b4Ad317e34199e',
];

const IDS = [
  83, 84, 85, 86, 87, 91, 92, 97, 111, 112, 113, 115, 121, 122, 124, 125, 126, 127, 128, 130, 132, 133, 134, 135, 136, 137, 138, 141, 142, 143, 145, 146, 147,
  148, 149, 150, 161, 162, 163, 164, 165, 166, 168, 169, 170, 172, 173, 175, 176, 177, 178, 181, 183, 184, 185, 186, 187, 188, 191, 192, 195, 196, 197, 198,
  199, 200, 222, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 246, 247, 248, 249, 251, 252, 253,
  254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 280, 281, 282, 283, 284, 285,
  286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 334, 335, 336, 337, 338, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350,
  351, 352, 353, 355, 356, 357, 358, 359, 360, 361, 362, 363, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383,
  384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400, 402, 403, 404, 405, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416,
  417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447,
  448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 468, 469, 470, 471, 473, 474, 475, 476, 477, 478, 479, 480,
  481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496, 497, 498, 194,
];

const approve = async () => {
  const signers = await ethers.getSigners();
  const owner = signers[0];
  const token = new ethers.Contract('0x6cfDB8f0CB7f0799cED4950d8B3ce7D5Eb99F834', Token.abi, owner);
  process.stdout.write('» approving token transfers ... ');
  const tx = await token.setApprovalForAll(address, true);
  await tx.wait();
  console.log(chalk.green('OK'));
};

const drop = async () => {
  let tx;

  const signers = await ethers.getSigners();
  const owner = signers[0];
  const drop = new ethers.Contract(address, Drop.abi, owner);

  process.stdout.write('» transferring one token as a test ... ');
  tx = await drop.transfer(IDS.slice(0, 1), BENEFICIARIES.slice(0, 1));
  await tx.wait();
  console.log(chalk.green('OK'));

  process.stdout.write('» transferring first batch of tokens... ');
  tx = await drop.transfer(IDS.slice(1, 100), BENEFICIARIES.slice(1, 100));
  await tx.wait();
  console.log(chalk.green('OK'));

  process.stdout.write('» transferring second batch of tokens... ');
  tx = await drop.transfer(IDS.slice(100, 200), BENEFICIARIES.slice(100, 200));
  await tx.wait();
  console.log(chalk.green('OK'));

  process.stdout.write('» transferring third batch of tokens... ');
  tx = await drop.transfer(IDS.slice(200, 300), BENEFICIARIES.slice(200, 300));
  await tx.wait();
  console.log(chalk.green('OK'));
};

const main = async () => {
  await approve();
  await drop();
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
