"use strict";
exports.__esModule = true;
exports.ReserveParser = exports.isReserve = exports.ReserveLayout = void 0;
var BufferLayout = require("buffer-layout");
var Layout = require("./layout");
var lastUpdate_1 = require("./lastUpdate");
exports.ReserveLayout = BufferLayout.struct([
    BufferLayout.u8('version'),
    lastUpdate_1.LastUpdateLayout,
    Layout.publicKey('lendingMarket'),
    BufferLayout.struct([
        Layout.publicKey('mintPubkey'),
        BufferLayout.u8('mintDecimals'),
        Layout.publicKey('supplyPubkey'),
        Layout.publicKey('feeReceiver'),
        // TODO: replace u32 option with generic equivalent
        BufferLayout.u32('oracleOption'),
        Layout.publicKey('oraclePubkey'),
        Layout.uint64('availableAmount'),
        Layout.uint128('borrowedAmountWads'),
        Layout.uint128('cumulativeBorrowRateWads'),
        Layout.uint128('marketPrice'),
    ], 'liquidity'),
    BufferLayout.struct([
        Layout.publicKey('mintPubkey'),
        Layout.uint64('mintTotalSupply'),
        Layout.publicKey('supplyPubkey'),
    ], 'collateral'),
    BufferLayout.struct([
        BufferLayout.u8('optimalUtilizationRate'),
        BufferLayout.u8('loanToValueRatio'),
        BufferLayout.u8('liquidationBonus'),
        BufferLayout.u8('liquidationThreshold'),
        BufferLayout.u8('minBorrowRate'),
        BufferLayout.u8('optimalBorrowRate'),
        BufferLayout.u8('maxBorrowRate'),
        BufferLayout.struct([Layout.uint64('borrowFeeWad'), BufferLayout.u8('hostFeePercentage')], 'fees'),
    ], 'config'),
    BufferLayout.blob(8, 'padding1'),
    BufferLayout.u8('deposit_staking_pool_option'),
    Layout.publicKey('deposit_staking_pool'),
    BufferLayout.blob(215, 'padding2'),
]);
var isReserve = function (info) {
    return info.data.length === exports.ReserveLayout.span;
};
exports.isReserve = isReserve;
var ReserveParser = function (pubkey, info) {
    var buffer = Buffer.from(info.data);
    var reserve = exports.ReserveLayout.decode(buffer);
    if (reserve.lastUpdate.slot.isZero()) {
        return;
    }
    return {
        publicKey: pubkey,
        reserve: reserve
    };
};
exports.ReserveParser = ReserveParser;
