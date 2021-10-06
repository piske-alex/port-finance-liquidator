"use strict";
exports.__esModule = true;
exports.redeemReserveCollateralInstruction = void 0;
var web3_js_1 = require("@solana/web3.js");
var bn_js_1 = require("bn.js");
var BufferLayout = require("buffer-layout");
var Layout = require("../layouts/layout");
var instructions_1 = require("./instructions");
var spl_token_1 = require("@solana/spl-token");
var ids_1 = require("../ids");
/// Redeem collateral from a reserve in exchange for liquidity.
///
/// Accounts expected by this instruction:
///
///   0. `[writable]` Source collateral token account.
///                     $authority can transfer $collateral_amount.
///   1. `[writable]` Destination liquidity token account.
///   2. `[writable]` Reserve account.
///   3. `[writable]` Reserve collateral SPL Token mint.
///   4. `[writable]` Reserve liquidity supply SPL Token account.
///   5. `[]` Lending market account.
///   6. `[]` Derived lending market authority.
///   7. `[signer]` User transfer authority ($authority).
///   8. `[]` Clock sysvar.
///   9. `[]` Token program id.
var redeemReserveCollateralInstruction = function (collateralAmount, sourceCollateral, destinationLiquidity, reserve, reserveCollateralMint, reserveLiquiditySupply, lendingMarket, lendingMarketAuthority, transferAuthority) {
    var dataLayout = BufferLayout.struct([
        BufferLayout.u8('instruction'),
        Layout.uint64('collateralAmount'),
    ]);
    var data = Buffer.alloc(dataLayout.span);
    dataLayout.encode({
        instruction: instructions_1.LendingInstruction.RedeemReserveCollateral,
        collateralAmount: new bn_js_1["default"](collateralAmount)
    }, data);
    var keys = [
        { pubkey: sourceCollateral, isSigner: false, isWritable: true },
        { pubkey: destinationLiquidity, isSigner: false, isWritable: true },
        { pubkey: reserve, isSigner: false, isWritable: true },
        { pubkey: reserveCollateralMint, isSigner: false, isWritable: true },
        { pubkey: reserveLiquiditySupply, isSigner: false, isWritable: true },
        { pubkey: lendingMarket, isSigner: false, isWritable: false },
        { pubkey: lendingMarketAuthority, isSigner: false, isWritable: false },
        { pubkey: transferAuthority, isSigner: true, isWritable: false },
        { pubkey: web3_js_1.SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false },
        { pubkey: spl_token_1.TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    ];
    return new web3_js_1.TransactionInstruction({
        keys: keys,
        programId: ids_1.LENDING_PROGRAM_ID,
        data: data
    });
};
exports.redeemReserveCollateralInstruction = redeemReserveCollateralInstruction;
