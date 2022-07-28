"use strict";
import MyToken from "../contracts/MyToken.json" assert { type: "json" };
import MyTokenSale from "../contracts/MyTokenSale.json" assert { type: "json" };
import KycContract from "../contracts/KycContract.json" assert { type: "json" };

const userInput = document.querySelector("#kycAddress");
const whitelistBtn = document.querySelector(".whitelist--btn");

const state = {
    kycAddress: "0x123...",
};

const componentDidMount = async () => {
    try {
        const web3 = await new Web3(
            new Web3.providers.HttpProvider("http://localhost:7545")
        );

        state.accounts = await web3.eth.getAccounts();

        state.networkId = await web3.eth.net.getId();

        state.tokenInstance = await new web3.eth.Contract(
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
    } catch (error) {
        console.log(error);
    }
};
componentDidMount();

userInput.value = state.kycAddress;

const handleInputChange = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    state.kycAddress = value;
    console.log(state);
};
const handleKycWhitelisting = async function () {
    await state.kycInstance.methods
        .kycCompleted(state.kycAddress)
        .send({ from: state.accounts[0] });
    console.log(`KYC completed for address: ${state.kycAddress}`);
    alert(`KYC completed for address: ${state.kycAddress}`);
};

// userInput.addEventListener("change", handleInputChange);
// whitelistBtn.addEventListener("click", () => {
//     handleKycWhitelisting();
// });
