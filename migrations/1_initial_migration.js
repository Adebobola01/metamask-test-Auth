var MyToken = artifacts.require("MyToken");
var MyTokenSale = artifacts.require("MyTokenSale");
var kycContract = artifacts.require("KycContract");

module.exports = async function (deployer) {
    await deployer.deploy(MyToken);
    let addr = await web3.eth.getAccounts();
    let instance = await MyToken.deployed();
    await deployer.deploy(kycContract);
    await deployer.deploy(
        MyTokenSale,
        10,
        addr[0],
        MyToken.address,
        kycContract.address
    );
    await instance.transfer(MyTokenSale.address, 1000000);
};
