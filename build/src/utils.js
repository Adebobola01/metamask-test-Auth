"use strict";

const getMetamask = async (state) => {
    try {
        const provider = await detectEthereumProvider();

        if (provider) {
            if (provider !== window.ethereum)
                console.error("Multiple wallets found");
            state.provider = provider;
            console.log("metamask is available");
            console.log(state.provider);
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
    } catch (error) {}
};
