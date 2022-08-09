"use strict";
import MyToken from "./contracts/MyToken.json" assert { type: "json" };
import MyTokenSale from "./contracts/MyTokenSale.json" assert { type: "json" };
import KycContract from "./contracts/KycContract.json" assert { type: "json" };
// import BN from "bn.js";

const userInput = document.querySelector(".form__input");
const appContainer = document.querySelector(".container");
const selectWalletBtn = document.querySelector(".connect--button");
const connectText = document.querySelector(".connect__wallet--text");
const buyTokens = document.querySelector(".buy--tokens");
const whitelistForm = document.querySelector(".whitelist__form");
const backdrop = document.querySelector(".backdrop");
const walletContainer = document.querySelector(".wallet__container");
const connectWalletBtn = document.querySelector(".wallet__btn");
const buyTokenBtn = document.querySelector(".buy__tokens--btn");
const etherUserInput = document.querySelector("#ether__amount");
const tokenUserInput = document.querySelector("#token__amount");
const buyTokenForm = document.querySelector(".buy__token--form");
const whitelistContainer = document.querySelector(".form__container");

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
    backdrop.classList.remove("hidden");
    walletContainer.classList.remove("hidden");
});

const getWalletfunction = async () => {
    state.accounts = await connectWallet(state.accounts);
    state.userAccount = state.accounts[0];
    await getContract();
};

connectWalletBtn.addEventListener("click", async () => {
    await getWalletfunction();
    // await updateUserToken();
    backdrop.classList.add("hidden");
    appContainer.classList.remove("hidden");
    walletContainer.classList.add("hidden");
    selectWalletBtn.classList.add("hidden");
    buyTokens.insertAdjacentHTML(
        "beforeend",
        `
        <p>You currently have <span class="addr">${state.userToken} BOB </span> Tokens</p>
        <p>To buy tokens send ether to this address: <span class="addr">${state.tokenAddress}</span></p >
    `
    );
    connectText.classList.add("hidden");
    whitelistContainer.classList.remove("hidden");
});

backdrop.addEventListener("click", () => {
    backdrop.classList.add("hidden");
    walletContainer.classList.add("hidden");
});

whitelistForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    state.kycAddress = userInput.value;
    await handleKycWhitelisting();
    userInput.value = "";
});

///////////////////////////
///////////
//BUY TOKENS
///////////////////////////
///////////

let currentUserInput;

const getValue = () => {
    if (currentUserInput === "token") {
        etherUserInput.value = "";
        etherUserInput.value = (parseFloat(tokenUserInput.value) * 0.1).toFixed(
            2
        );
    }
    if (currentUserInput === "ether") {
        tokenUserInput.value = "";
        tokenUserInput.value = (parseInt(etherUserInput.value) / 0.1).toFixed(
            2
        );
    }
};

// const txParams = {
//     to: "0x3427bfe887eEc6E1C1e0F2b485800B5A9A7c633F",
//     from: `${state.userAccount}`,
//     value: `${state.etherAmount}`,
//     chainId: "0x5",
// };

tokenUserInput.addEventListener("keydown", function () {
    currentUserInput = "token";
});
etherUserInput.addEventListener("keydown", function () {
    currentUserInput = "ether";
});

buyTokenForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(state.etherAmount);
    getValue();
    console.log(currentUserInput);
    state.etherAmount = parseFloat(etherUserInput.value).toString();
    console.log(state.etherAmount, state.userAccount);
});

buyTokenBtn.addEventListener("click", () => {
    sendTransaction(state.userAccount, state.etherAmount);
});
