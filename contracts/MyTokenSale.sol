// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "./Crowdsale.sol";
import "./KycContract.sol";

contract MyTokenSale is Crowdsale, KycContract {
    KycContract kyc;

    constructor (
        uint256 Rate,
        address payable Wallet,
        IERC20 Token,
        KycContract _kyc
    )
        Crowdsale(Rate, Wallet, Token)
    {
        kyc = _kyc;
    }

    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view override{
        super._preValidatePurchase(beneficiary, weiAmount);
        require(kycCompleted(msg.sender), "KYC not completed, Purchase not allowed");
    }
}