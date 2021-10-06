"use strict";
exports.__esModule = true;
exports.refreshReserveInstruction = void 0;
var web3_js_1 = require("@solana/web3.js");
var BufferLayout = require("buffer-layout");
var ids_1 = require("../ids");
var instructions_1 = require("./instructions");
/// Accrue interest and update market price of liquidity on a reserve.
///
/// Accounts expected by this instruction:
///
///   0. `[writable]` Reserve account.
///   1. `[]` Clock sysvar.
///   2. `[optional]` Reserve liquidity oracle account.
///                     Required if the reserve currency is not the lending market quote
///                     currency.
var refreshReserveInstruction = function (reserve) {
    var dataLayout = BufferLayout.struct([BufferLayout.u8('instruction')]);
    var data = Buffer.alloc(dataLayout.span);
    dataLayout.encode({ instruction: instructions_1.LendingInstruction.RefreshReserve }, data);
    var keys = [
        { pubkey: reserve.publicKey, isSigner: false, isWritable: true },
        { pubkey: web3_js_1.SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false },
    ];
    if (reserve.reserve.liquidity.oracleOption === 1) {
        keys.push({
            pubkey: reserve.reserve.liquidity.oraclePubkey,
            isSigner: false,
            isWritable: false
        });
    }
    return new web3_js_1.TransactionInstruction({
        keys: keys,
        programId: ids_1.LENDING_PROGRAM_ID,
        data: data
    });
};
exports.refreshReserveInstruction = refreshReserveInstruction;
