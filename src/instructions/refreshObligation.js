"use strict";
exports.__esModule = true;
exports.refreshObligationInstruction = void 0;
var web3_js_1 = require("@solana/web3.js");
var buffer_layout_1 = require("buffer-layout");
var ids_1 = require("../ids");
var instructions_1 = require("./instructions");
/// Refresh an obligation's accrued interest and collateral and liquidity prices. Requires
/// refreshed reserves, as all obligation collateral deposit reserves in order, followed by all
/// liquidity borrow reserves in order.
///
/// Accounts expected by this instruction:
///
///   0. `[writable]` Obligation account.
///   1. `[]` Clock sysvar.
///   .. `[]` Collateral deposit reserve accounts - refreshed, all, in order.
///   .. `[]` Liquidity borrow reserve accounts - refreshed, all, in order.
var refreshObligationInstruction = function (obligation, depositReserves, borrowReserves) {
    var dataLayout = buffer_layout_1["default"].struct([buffer_layout_1["default"].u8('instruction')]);
    var data = Buffer.alloc(dataLayout.span);
    dataLayout.encode({ instruction: instructions_1.LendingInstruction.RefreshObligation }, data);
    var keys = [
        { pubkey: obligation, isSigner: false, isWritable: true },
        { pubkey: web3_js_1.SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false },
    ];
    for (var _i = 0, depositReserves_1 = depositReserves; _i < depositReserves_1.length; _i++) {
        var depositReserve = depositReserves_1[_i];
        keys.push({ pubkey: depositReserve, isSigner: false, isWritable: false });
    }
    for (var _a = 0, borrowReserves_1 = borrowReserves; _a < borrowReserves_1.length; _a++) {
        var borrowReserve = borrowReserves_1[_a];
        keys.push({ pubkey: borrowReserve, isSigner: false, isWritable: false });
    }
    return new web3_js_1.TransactionInstruction({
        keys: keys,
        programId: ids_1.LENDING_PROGRAM_ID,
        data: data
    });
};
exports.refreshObligationInstruction = refreshObligationInstruction;
