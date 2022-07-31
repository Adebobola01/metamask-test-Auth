var MyToken = artifacts.require("MyToken");
var MyTokenSale = artifacts.require("MyTokenSale");
var KycContract = artifacts.require("KycContract");
require("dotenv").config({ path: "../.env" });

module.exports = async function (deployer) {
    let addr = await web3.eth.getAccounts();
    await deployer.deploy(MyToken, 1000000000000000000000000n);
    await deployer.deploy(KycContract);
    await deployer.deploy(
        MyTokenSale,
        parseInt(10),
        addr[0],
        MyToken.address,
        KycContract.address
    );
    let instance = await MyToken.deployed();

    await instance.transfer(MyTokenSale.address, 1000000000000000000000000n);
    console.log(await instance.balanceOf(MyTokenSale.address));
};
