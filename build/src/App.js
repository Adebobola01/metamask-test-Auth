"use strict";
import MyToken from "./contracts/MyToken.json" assert { type: "json" };
import MyTokenSale from "./contracts/MyTokenSale.json" assert { type: "json" };
import KycContract from "./contracts/KycContract.json" assert { type: "json" };

const userInput = document.querySelector("form__input");
const selectWalletBtn = document.querySelector(".connect--button");
const connectText = document.querySelector(".connect--wallet__text");
const buyTokens = document.querySelector(".buy--tokens");
const form = document.querySelector(".form__container");
const backdrop = document.querySelector(".backdrop");
const walletContainer = document.querySelector(".wallet__container");
const connectWalletBtn = document.querySelector(".wallet__btn");

const state = {
    kycAddress: "0x123...",
    accounts: [],
};

const handleKycWhitelisting = async function () {
    try {
        await state.kycInstance.methods
            .SetKycCompleted(state.kycAddress)
            .send({ from: state.userAccount });
    } catch (error) {
        console.error(error.message);
    }
    console.log(`KYC completed for address: ${state.kycAddress}`);
    alert(`KYC completed for address: ${state.kycAddress}`);
};

const getContract = async () => {
    try {
        let web3 = new Web3(Web3.givenProvider);

        state.networkId = 5;

        state.tokenAddress = MyTokenSale.networks[state.networkId].address;

        state.myTokenInstance = await new web3.eth.Contract(
            MyToken.abi,
            MyToken.networks[state.networkId] &&
                MyToken.networks[state.networkId].address
        );
        state.tokenSaleInstance = await new web3.eth.Contract(
            MyTokenSale.abi,
            MyTokenSale.networks[state.networkId] &&
                MyTokenSale.networks[state.networkId].address
        );
        state.kycInstance = await new web3.eth.Contract(
            KycContract.abi,
            KycContract.networks[state.networkId] &&
                KycContract.networks[state.networkId].address
        );
        console.log(state.networkId);
    } catch (error) {
        console.error(error);
    }
};

window.addEventListener("DOMContentLoaded", () => {
    getMetamask(state);
});

const updateUserToken = async () => {
    const userToken = await state.myTokenInstance.methods
        .balanceOf(state.userAccount)
        .call();
    state.userToken = userToken / 1000000000000000000;
};

selectWalletBtn.addEventListener("click", () => {
    backdrop.style.display = "block";
    walletContainer.style.display = "block";
});

const getWalletfunction = async () => {
    state.accounts = await connectWallet(state.accounts);
    state.userAccount = state.accounts[0];
    await getContract();
};

connectWalletBtn.addEventListener("click", async () => {
    await getWalletfunction();
    console.log(state.myTokenInstance);
    backdrop.style.display = "none";
    walletContainer.style.display = "none";
    console.log(state);
    buyTokens.insertAdjacentHTML(
        "beforeend",
        `
        <p>You currently have <span class="addr">${state.userToken} BOB </span> Tokens</p>
        <p>To buy tokens send ether to this address: <span class="addr">${state.tokenAddress}</span></p >
    `
    );
    connectText.style.display = "none";
    form.style.display = "flex";
});

backdrop.addEventListener("click", () => {
    backdrop.style.display = "none";
    walletContainer.style.display = "none";
});

form.addEventListener("submit", () => {
    state.kycAddress = userInput.value;
    handleKycWhitelisting();
});
