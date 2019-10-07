pragma solidity 0.5.11;
pragma experimental ABIEncoderV2;

import "../../src/exits/payment/routers/PaymentInFlightExitRouter.sol";

contract PaymentProcessInFlightExitAttacker {

    bool funded = false;
    PaymentInFlightExitRouter private router;
    uint160 private exitId;
    address private token;

    constructor(PaymentInFlightExitRouter _router, uint160 _exitId, address _token) public {
        router = _router;
        exitId = _exitId;
        token = _token;
    }

    function () external payable {
        if (funded) {
            router.processExit(exitId, 0, token);
        }
        funded = true;
    }
}
