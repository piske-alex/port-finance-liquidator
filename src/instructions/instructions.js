"use strict";
exports.__esModule = true;
exports.LendingInstruction = void 0;
var LendingInstruction;
(function (LendingInstruction) {
    LendingInstruction[LendingInstruction["InitLendingMarket"] = 0] = "InitLendingMarket";
    LendingInstruction[LendingInstruction["SetLendingMarketOwner"] = 1] = "SetLendingMarketOwner";
    LendingInstruction[LendingInstruction["InitReserve"] = 2] = "InitReserve";
    LendingInstruction[LendingInstruction["RefreshReserve"] = 3] = "RefreshReserve";
    LendingInstruction[LendingInstruction["DepositReserveLiquidity"] = 4] = "DepositReserveLiquidity";
    LendingInstruction[LendingInstruction["RedeemReserveCollateral"] = 5] = "RedeemReserveCollateral";
    LendingInstruction[LendingInstruction["InitObligation"] = 6] = "InitObligation";
    LendingInstruction[LendingInstruction["RefreshObligation"] = 7] = "RefreshObligation";
    LendingInstruction[LendingInstruction["DepositObligationCollateral"] = 8] = "DepositObligationCollateral";
    LendingInstruction[LendingInstruction["WithdrawObligationCollateral"] = 9] = "WithdrawObligationCollateral";
    LendingInstruction[LendingInstruction["BorrowObligationLiquidity"] = 10] = "BorrowObligationLiquidity";
    LendingInstruction[LendingInstruction["RepayObligationLiquidity"] = 11] = "RepayObligationLiquidity";
    LendingInstruction[LendingInstruction["LiquidateObligation"] = 12] = "LiquidateObligation";
})(LendingInstruction = exports.LendingInstruction || (exports.LendingInstruction = {}));
