const HDWalletProvider = require("@truffle/hdwallet-provider");
const Mnemonic =
    "damage snake pole sorry stick noise tomato toy silver congress place step";
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
                    Mnemonic,
                    "http://127.0.0.1:7545",
                    AccountIndex
                );
            },
            network_id: 5777,
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
