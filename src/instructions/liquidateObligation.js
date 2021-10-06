"use strict";
exports.__esModule = true;
exports.liquidateObligationInstruction = void 0;
var web3_js_1 = require("@solana/web3.js");
var BufferLayout = require("buffer-layout");
var Layout = require("../layouts/layout");
var instructions_1 = require("./instructions");
var BN = require("bn.js");
var spl_token_1 = require("@solana/spl-token");
var ids_1 = require("../ids");
var utils_1 = require("../utils");
/// Repay borrowed liquidity to a reserve to receive collateral at a discount from an unhealthy
/// obligation. Requires a refreshed obligation and reserves.
///
/// Accounts expected by this instruction:
///
///   0. `[writable]` Source liquidity token account.
///                     Minted by repay reserve liquidity mint.
///                     $authority can transfer $liquidity_amount.
///   1. `[writable]` Destination collateral token account.
///                     Minted by withdraw reserve collateral mint.
///   2. `[writable]` Repay reserve account - refreshed.
///   3. `[writable]` Repay reserve liquidity supply SPL Token account.
///   4. `[]` Withdraw reserve account - refreshed.
///   5. `[writable]` Withdraw reserve collateral supply SPL Token account.
///   6. `[writable]` Obligation account - refreshed.
///   7. `[]` Lending market account.
///   8. `[]` Derived lending market authority.
///   9. `[signer]` User transfer authority ($authority).
///   10 `[]` Clock sysvar.
///   11 `[]` Token program id.
var liquidateObligationInstruction = function (liquidityAmount, sourceLiquidity, destinationCollateral, repayReserve, repayReserveLiquiditySupply, withdrawReserve, withdrawReserveCollateralSupply, obligation, lendingMarket, lendingMarketAuthority, transferAuthority, staking_pool, stake_account) {
    var dataLayout = BufferLayout.struct([
        BufferLayout.u8('instruction'),
        Layout.uint64('liquidityAmount'),
    ]);
    var data = Buffer.alloc(dataLayout.span);
    dataLayout.encode({
        instruction: instructions_1.LendingInstruction.LiquidateObligation,
        liquidityAmount: new BN(liquidityAmount)
    }, data);
    var keys = [
        { pubkey: sourceLiquidity, isSigner: false, isWritable: true },
        { pubkey: destinationCollateral, isSigner: false, isWritable: true },
        { pubkey: repayReserve, isSigner: false, isWritable: true },
        { pubkey: repayReserveLiquiditySupply, isSigner: false, isWritable: true },
        { pubkey: withdrawReserve, isSigner: false, isWritable: false },
        {
            pubkey: withdrawReserveCollateralSupply,
            isSigner: false,
            isWritable: true
        },
        { pubkey: obligation, isSigner: false, isWritable: true },
        { pubkey: lendingMarket, isSigner: false, isWritable: false },
        { pubkey: lendingMarketAuthority, isSigner: false, isWritable: false },
        { pubkey: transferAuthority, isSigner: true, isWritable: false },
        { pubkey: web3_js_1.SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false },
        { pubkey: spl_token_1.TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    ];
    if (staking_pool !== undefined && stake_account !== undefined) {
        keys.concat([
            { pubkey: stake_account, isSigner: false, isWritable: true },
            { pubkey: staking_pool, isSigner: false, isWritable: true },
            { pubkey: utils_1.STAKING_PROGRAM_ID, isSigner: false, isWritable: false },
        ]);
    }
    return new web3_js_1.TransactionInstruction({
        keys: keys,
        programId: ids_1.LENDING_PROGRAM_ID,
        data: data
    });
};
exports.liquidateObligationInstruction = liquidateObligationInstruction;
