"use strict";
exports.__esModule = true;
exports.ObligationParser = exports.isObligation = exports.ObligationLiquidityLayout = exports.ObligationCollateralLayout = exports.ObligationLayout = void 0;
var BufferLayout = require("buffer-layout");
var Layout = require("./layout");
exports.ObligationLayout = BufferLayout.struct([
    BufferLayout.u8('version'),
    BufferLayout.struct([Layout.uint64('slot'), BufferLayout.u8('stale')], 'lastUpdate'),
    Layout.publicKey('lendingMarket'),
    Layout.publicKey('owner'),
    Layout.uint128('depositedValue'),
    Layout.uint128('borrowedValue'),
    Layout.uint128('allowedBorrowValue'),
    Layout.uint128('unhealthyBorrowValue'),
    BufferLayout.u8('depositsLen'),
    BufferLayout.u8('borrowsLen'),
    BufferLayout.blob(776, 'dataFlat'),
]);
exports.ObligationCollateralLayout = BufferLayout.struct([
    Layout.publicKey('depositReserve'),
    Layout.uint64('depositedAmount'),
    Layout.uint128('marketValue'),
]);
exports.ObligationLiquidityLayout = BufferLayout.struct([
    Layout.publicKey('borrowReserve'),
    Layout.uint128('cumulativeBorrowRateWads'),
    Layout.uint128('borrowedAmountWads'),
    Layout.uint128('marketValue'),
]);
var isObligation = function (info) {
    return info.data.length === exports.ObligationLayout.span;
};
exports.isObligation = isObligation;
var ObligationParser = function (pubkey, info) {
    var buffer = Buffer.from(info.data);
    var _a = exports.ObligationLayout.decode(buffer), version = _a.version, lastUpdate = _a.lastUpdate, lendingMarket = _a.lendingMarket, owner = _a.owner, depositedValue = _a.depositedValue, borrowedValue = _a.borrowedValue, allowedBorrowValue = _a.allowedBorrowValue, unhealthyBorrowValue = _a.unhealthyBorrowValue, depositsLen = _a.depositsLen, borrowsLen = _a.borrowsLen, dataFlat = _a.dataFlat;
    if (lastUpdate.slot.isZero()) {
        return;
    }
    var depositsBuffer = dataFlat.slice(0, depositsLen * exports.ObligationCollateralLayout.span);
    var deposits = BufferLayout.seq(exports.ObligationCollateralLayout, depositsLen).decode(depositsBuffer);
    var borrowsBuffer = dataFlat.slice(depositsBuffer.length, depositsBuffer.length + borrowsLen * exports.ObligationLiquidityLayout.span);
    var borrows = BufferLayout.seq(exports.ObligationLiquidityLayout, borrowsLen).decode(borrowsBuffer);
    return {
        publicKey: pubkey,
        version: version,
        lastUpdate: lastUpdate,
        lendingMarket: lendingMarket,
        owner: owner,
        depositedValue: depositedValue,
        borrowedValue: borrowedValue,
        allowedBorrowValue: allowedBorrowValue,
        unhealthyBorrowValue: unhealthyBorrowValue,
        deposits: deposits,
        borrows: borrows
    };
};
exports.ObligationParser = ObligationParser;
