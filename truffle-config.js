const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config({ path: "./.env" });
const AccountIndex = 0;

module.exports = {
    contracts_build_directory: "./build/src/contracts",
    networks: {
        // development: {
        //     host: "127.0.0.1",
        //     port: 7545,
        //     network_id: "5777",
        // },
        ganache_local: {
            provider: function () {
                return new HDWalletProvider(
                    process.env.MNEMONIC,
                    "http://127.0.0.1:7545",
                    AccountIndex
                );
            },
            network_id: 5777,
        },
        infura_goerli: {
            provider: function () {
                return new HDWalletProvider(
                    process.env.MNEMONIC,
                    "https://goerli.infura.io/v3/4aeec6b6ca0d4862a23b09736a624b59",
                    AccountIndex
                );
            },
            network_id: 5,
        },
    },
    mocha: {},
    compilers: {
        solc: {
            version: "^0.8.0",
        },
    },
    db: {
        enabled: false,
    },
};
