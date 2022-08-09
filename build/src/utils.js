"use strict";

var web3 = new Web3(Web3.givenProvider);

const getMetamask = async (state) => {
    try {
        const provider = await detectEthereumProvider();

        if (provider) {
            if (provider !== window.ethereum)
                console.error("Multiple wallets found");
            state.provider = provider;
            console.log("metamask is available");
        } else {
            console.error("Metamask not installed");
        }
    } catch (error) {
        console.error(error);
    }
};

const connectWallet = async () => {
    try {
        if (window.ethereum) {
            return ethereum.request({ method: "eth_requestAccounts" });
        }
    } catch (error) {
        console.error(error);
    }
};

const sendTransaction = async (_from, _value) => {
    try {
        const weiValue = web3.utils.toWei(_value, "ether");
        // const hexValue = web3.utils.numberToHex(weiValue);
        console.log(weiValue, weiValue);
        await ethereum.request({
            method: "eth_sendTransaction",
            params: [
                {
                    to: "0x68e1ed9635C5A681c21d9902Dfbf0c0AA144D2Fe",
                    from: _from,
                    value: weiValue,
                    chainId: "0x5",
                },
            ],
        });
    } catch (error) {
        console.error(error);
    }
};
