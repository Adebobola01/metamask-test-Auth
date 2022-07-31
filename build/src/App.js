"use strict";
import MyToken from "./contracts/MyToken.json" assert { type: "json" };
import MyTokenSale from "./contracts/MyTokenSale.json" assert { type: "json" };
import KycContract from "./contracts/KycContract.json" assert { type: "json" };

const userInput = document.querySelector("#kycAddress");
const whitelistBtn = document.querySelector(".whitelist--btn");
const connectWalletBtn = document.querySelector(".connect--button");
const funcContainer = document.querySelector(".function--container");
const connectText = document.querySelector(".connect--wallet__text");
const buyTokens = document.querySelector(".buy--tokens");

const state = {
    kycAddress: "0x123...",
    accounts: [],
};

// const componentDidMount = async () => {
//     try {
//         //connect to provider
//         const web3 = await new Web3(
//             new Web3.providers.HttpProvider("http://localhost:7545")
//         );

//         // state.accounts = await web3.eth.getAccounts();
//         const accounts = await window.ethereum.request({
//             method: "eth_requestAccounts",
//         });
//         state.accounts = accounts;
//         state.UserAccount = accounts[0];
//         console.log(state.UserAccount);

//         state.networkId = await web3.eth.net.getId();

//         state.tokenInstance = await new web3.eth.Contract(
//             MyToken.abi,
//             MyToken.networks[state.networkId] &&
//                 MyToken.networks[state.networkId].address
//         );
//         state.tokenSaleInstance = await new web3.eth.Contract(
//             MyTokenSale.abi,
//             MyTokenSale.networks[state.networkId] &&
//                 MyTokenSale.networks[state.networkId].address
//         );
//         state.kycInstance = await new web3.eth.Contract(
//             KycContract.abi,
//             KycContract.networks[state.networkId] &&
//                 KycContract.networks[state.networkId].address
//         );
//     } catch (error) {
//         console.log(error);
//     }
// };

// componentDidMount();

userInput.value = state.kycAddress;

// const handleInputChange = (e) => {
//     const target = e.target;
//     const value = target.type === "checkbox" ? target.checked : target.value;
//     state.kycAddress = value;
//     console.log(state);
// };

// .send({ from: "0x4eFa9f6E4B1355baBB40e159d0E101358897D4C2" });

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

        state.networkId = 5777;

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
connectWalletBtn.addEventListener("click", async () => {
    state.accounts = await connectWallet(state.accounts);
    state.userAccount = state.accounts[0];
    console.log(state.userAccount);
    getContract();
    buyTokens.textContent = `To buy tokens send ether to this address: ${state.tokenAddress}`;
    connectText.style.display = "none";
    funcContainer.style.display = "block";
});
// userInput.addEventListener("change", handleInputChange);

whitelistBtn.addEventListener("click", () => {
    state.kycAddress = userInput.value;
    handleKycWhitelisting();
});

// const loginMeta = async () => {
//     state.accounts = await ethereum.request({
//         methods: "eth_requestAccounts",
//     });
// };

// const getAccount = async () => {
//     const accounts = await window.ethereum.request({
//         method: "eth_requestAccounts",
//     });
//     state.accounts = accounts;
//     state.UserAccount = accounts[0];
//     console.log(state.UserAccount);
// };
