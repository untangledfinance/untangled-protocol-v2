require('solidity-coverage');
require('@nomiclabs/hardhat-web3');
require('@nomiclabs/hardhat-ethers');
require('hardhat-contract-sizer');
require('hardhat-deploy');
require('@openzeppelin/hardhat-upgrades');
require('@nomicfoundation/hardhat-chai-matchers');
require('hardhat-abi-exporter');

require('dotenv').config();

const MNEMONIC = process.env.MNEMONIC;
const PRIVATEKEY = process.env.PRIVATEKEY;

const accounts = [PRIVATEKEY];
module.exports = {
    solidity: {
        compilers: [
            {
                version: '0.8.19',
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
        ],
        overrides: {
            'contracts/protocol/pool/SecuritizationPool.sol': {
                version: '0.8.19',
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
        },
    },
    defaultNetwork: 'hardhat',
    namedAccounts: {
        deployer: 0,
    },
    networks: {
        hardhat: {
            blockGasLimit: 12500000,
            saveDeployments: true,
            allowUnlimitedContractSize: false,
            accounts: {
                mnemonic: MNEMONIC,
            },
        },
        celo: {
            saveDeployments: true,
            accounts,
            loggingEnabled: true,
            url: `https://forno.celo.org`,
            cusdToken: '0x765DE816845861e75A25fCA122bb6898B8B1282a',
            usdcToken: '0xef4229c8c3250c675f21bcefa42f58efbff6002a',
        },
        alfajores: {
            saveDeployments: true,
            accounts: accounts,
            loggingEnabled: true,
            url: `https://alfajores-forno.celo-testnet.org`,
            cusdToken: '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1',
            usdcToken: '',
        },
        rinkeby: {
            saveDeployments: true,
            accounts,
            loggingEnabled: true,
            url: `https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161`,
        },
    },
    etherscan: {
        apiKey: '',
        customChains: [
            {
                network: 'alfajores',
                chainId: 44787,
                urls: {
                    apiURL: 'https://api-alfajores.celoscan.io/api',
                    browserURL: 'https://api-alfajores.celoscan.io',
                },
            },
        ],
    },
    mocha: {
        timeout: 200000,
    },
    paths: {
        sources: './contracts',
        tests: './test',
        artifacts: './artifacts',
        cache: './cache',
    },
    contractSizer: {
        alphaSort: true,
        runOnCompile: true,
        disambiguatePaths: false,
    },

    abiExporter: [
        {
            path: './abi/json',
            format: 'json',
        },
        {
            path: './abi/minimal',
            format: 'minimal',
        },
    ],
};
