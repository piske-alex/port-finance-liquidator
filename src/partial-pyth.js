"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var web3_js_1 = require("@solana/web3.js");
var os_1 = require("os");
var utils_1 = require("./utils");
var refreshReserve_1 = require("./instructions/refreshReserve");
var refreshObligation_1 = require("./instructions/refreshObligation");
var liquidateObligation_1 = require("./instructions/liquidateObligation");
var spl_token_1 = require("@solana/spl-token");
var redeemReserveCollateral_1 = require("./instructions/redeemReserveCollateral");
var client_1 = require("@pythnetwork/client");
var bn_js_1 = require("bn.js");
var SOL_MINT = "So11111111111111111111111111111111111111112";
var DISPLAY_FIRST = 10;
var reserveLookUpTable = {
    "X9ByyhmtQH3Wjku9N5obPy54DbVjZV7Z99TPJZ2rwcs": "SOL",
    "DcENuKuYd6BWGhKfGr7eARxodqG12Bz1sN5WA8NwvLRx": "USDC",
    "4tqY9Hv7e8YhNQXuH75WKrZ7tTckbv2GfFVxmVcScW5s": "USDT",
    "DSw99gXoGzvc4N7cNGU7TJ9bCWFq96NU2Cczi1TabDx2": "PAI",
    "ZgS3sv1tJAor2rbGMFLeJwxsEGDiHkcrR2ZaNHZUpyF": "SRM",
    "DSST29PMCVkxo8cf5ht9LxrPoMc8jAZt98t6nuJywz8p": "BTC",
    "BnhsmYVvNjXK3TGDHLj1Yr1jBGCmD1gZMkAyCwoXsHwt": "MER",
    "9gDF5W94RowoDugxT8cM29cX8pKKQitTp2uYVrarBSQ7": "mSOL",
    "GRJyCEezbZQibAEfBKCRAg5YoTPP2UcRSTC7RfzoMypy": "pSOL"
};
function runPartialLiquidator() {
    return __awaiter(this, void 0, void 0, function () {
        var cluster, clusterUrl, checkInterval, connection, programId, keyPairPath, parsedReserveMap, wallets, unhealthyObligations, _i, unhealthyObligations_1, unhealthyObligation, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cluster = process.env.CLUSTER || 'devnet';
                    clusterUrl = process.env.CLUSTER_URL || "https://api.devnet.solana.com";
                    checkInterval = parseFloat(process.env.CHECK_INTERVAL || "1000.0");
                    connection = new web3_js_1.Connection(clusterUrl, 'singleGossip');
                    programId = new web3_js_1.PublicKey(process.env.PROGRAM_ID || "Port7uDYB3wk6GJAw4KT1WpTeMtSu9bTcChBHkX2LfR");
                    keyPairPath = process.env.KEYPAIR || os_1.homedir() + "/.config/solana/id.json";
                    //  const payer = new Account(JSON.parse(fs.readFileSync(keyPairPath, 'utf-8')))
                    console.log("Port liquidator launched on cluster=" + cluster);
                    return [4 /*yield*/, utils_1.getParsedReservesMap(connection, programId)];
                case 1:
                    parsedReserveMap = _a.sent();
                    wallets = new Map();
                    _a.label = 2;
                case 2:
                    if (!true) return [3 /*break*/, 9];
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, 6, 8]);
                    return [4 /*yield*/, getUnhealthyObligations(connection, programId, parsedReserveMap)];
                case 4:
                    unhealthyObligations = _a.sent();
                    console.log("Time: " + new Date() + " , we have " + unhealthyObligations.length + " accounts for liquidation");
                    for (_i = 0, unhealthyObligations_1 = unhealthyObligations; _i < unhealthyObligations_1.length; _i++) {
                        unhealthyObligation = unhealthyObligations_1[_i];
                        utils_1.notify("Liquidating obligation account " + unhealthyObligation.obligation.publicKey.toBase58() + " which is owned by " + unhealthyObligation.obligation.owner.toBase58() + " with risk factor: " + unhealthyObligation.riskFactor + "\n           which has borrowed " + unhealthyObligation.loanValue + " with liquidation borrowed value at " + unhealthyObligation.obligation.unhealthyBorrowValue + " ...");
                        // await liquidateAccount(connection, programId, payer, unhealthyObligation.obligation, parsedReserveMap, wallets);
                    }
                    return [3 /*break*/, 8];
                case 5:
                    e_1 = _a.sent();
                    utils_1.notify("unknown error: " + e_1);
                    console.error(e_1);
                    return [3 /*break*/, 8];
                case 6: return [4 /*yield*/, utils_1.sleep(checkInterval)];
                case 7:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 8: return [3 /*break*/, 2];
                case 9: return [2 /*return*/];
            }
        });
    });
}
function redeemRemainingCollaterals(parsedReserveMap, programId, connection, payer, wallets) {
    var _this = this;
    parsedReserveMap.forEach(function (reserve) { return __awaiter(_this, void 0, void 0, function () {
        var lendingMarket, lendingMarketAuthority, collateralWallet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    lendingMarket = parsedReserveMap.values().next().value.reserve.lendingMarket;
                    return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([lendingMarket.toBuffer()], programId)];
                case 1:
                    lendingMarketAuthority = (_a.sent())[0];
                    return [4 /*yield*/, utils_1.findLargestTokenAccountForOwner(connection, payer, reserve.reserve.collateral.mintPubkey)];
                case 2:
                    collateralWallet = _a.sent();
                    if (!(collateralWallet.tokenAccount.amount > 0)) return [3 /*break*/, 4];
                    return [4 /*yield*/, redeemCollateral(wallets, reserve, payer, collateralWallet, lendingMarketAuthority, connection)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); });
}
function readSymbolPrice(connection, reserve) {
    return __awaiter(this, void 0, void 0, function () {
        var pythData, parsedData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (reserve.reserve.liquidity.oracleOption === 0) {
                        return [2 /*return*/, reserve.reserve.liquidity.marketPrice.div(utils_1.TEN.pow(new bn_js_1["default"](8)))];
                    }
                    return [4 /*yield*/, connection.getAccountInfo(reserve.reserve.liquidity.oraclePubkey)];
                case 1:
                    pythData = _a.sent();
                    parsedData = client_1.parsePriceData(pythData === null || pythData === void 0 ? void 0 : pythData.data);
                    // we use a 10 ^ 10 scale.
                    return [2 /*return*/, new bn_js_1["default"](parsedData.price * Math.pow(10, 10))];
            }
        });
    });
}
function readTokenPrices(connection, allReserve) {
    return __awaiter(this, void 0, void 0, function () {
        var tokenToCurrentPrice, _i, _a, _b, _1, reserve, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    tokenToCurrentPrice = new Map();
                    _i = 0, _a = allReserve.entries();
                    _f.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    _b = _a[_i], _1 = _b[0], reserve = _b[1];
                    _d = (_c = tokenToCurrentPrice).set;
                    _e = [reserve.publicKey.toBase58()];
                    return [4 /*yield*/, readSymbolPrice(connection, reserve)];
                case 2:
                    _d.apply(_c, _e.concat([_f.sent()]));
                    _f.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, tokenToCurrentPrice];
            }
        });
    });
}
function getUnhealthyObligations(connection, programId, allReserve) {
    return __awaiter(this, void 0, void 0, function () {
        var obligations, tokenToCurrentPrice, sortedObligations;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, utils_1.getAllObligations(connection, programId)];
                case 1:
                    obligations = _a.sent();
                    return [4 /*yield*/, readTokenPrices(connection, allReserve)];
                case 2:
                    tokenToCurrentPrice = _a.sent();
                    sortedObligations = obligations
                        .filter(function (obligation) { return obligation.borrowedValue.gt(utils_1.ZERO); })
                        .map(function (obligation) { return generateEnrichedObligation(obligation, tokenToCurrentPrice, allReserve); })
                        .sort(function (obligation1, obligation2) {
                        return obligation2.riskFactor * 100 - obligation1.riskFactor * 100;
                    });
                    console.log("Total number of loans are: " + sortedObligations.length);
                    sortedObligations.slice(0, DISPLAY_FIRST).forEach(function (ob) { return console.log("Risk factor: " + ob.riskFactor.toFixed(4) + " borrowed amount: " + utils_1.scaleToNormalNumber(ob.loanValue, 10) + " deposit amount: " + utils_1.scaleToNormalNumber(ob.collateralValue, 10) + "\nborrowed asset names: [" + ob.borrowedAssetNames.toString() + "] deposited asset names: [" + ob.depositedAssetNames.toString() + "]\nobligation names: " + ob.obligation.publicKey.toBase58() + "\n"); });
                    tokenToCurrentPrice.forEach(function (price, token) {
                        console.log("name: " + reserveLookUpTable[token] + " price: " + utils_1.scaleToNormalNumber(price, 10));
                    });
                    console.log("\n");
                    return [2 /*return*/, sortedObligations.filter(function (obligation) { return obligation.riskFactor >= 1; })];
            }
        });
    });
}
function generateEnrichedObligation(obligation, tokenToCurrentPrice, allReserve) {
    var loanValue = utils_1.ZERO;
    var borrowedAssetNames = [];
    for (var _i = 0, _a = obligation.borrows; _i < _a.length; _i++) {
        var borrow = _a[_i];
        var reservePubKey = borrow.borrowReserve.toBase58();
        var reserve = allReserve.get(reservePubKey).reserve;
        var name_1 = reserveLookUpTable[reservePubKey];
        var tokenPriceWad = tokenToCurrentPrice.get(reservePubKey);
        var totalPriceWad = borrow.borrowedAmountWads.mul(tokenPriceWad).div(utils_1.WAD).div(utils_1.TEN.pow(new bn_js_1["default"](reserve.liquidity.mintDecimals)));
        loanValue = loanValue.add(totalPriceWad);
        borrowedAssetNames.push(name_1);
    }
    var collateralValue = utils_1.ZERO;
    var depositedAssetNames = [];
    for (var _b = 0, _c = obligation.deposits; _b < _c.length; _b++) {
        var deposit = _c[_b];
        var reservePubKey = deposit.depositReserve.toBase58();
        var name_2 = reserveLookUpTable[reservePubKey];
        var reserve = allReserve.get(reservePubKey).reserve;
        var totalSupply = reserve.liquidity.availableAmount.add(utils_1.wadToBN(reserve.liquidity.borrowedAmountWads));
        var collateralTotalSupply = reserve.collateral.mintTotalSupply;
        // In percentage
        var liquidationThreshold = reserve.config.liquidationThreshold;
        var tokenPriceWad = tokenToCurrentPrice.get(reservePubKey);
        var totalPriceWad = deposit.depositedAmount.mul(totalSupply).mul(tokenPriceWad).mul(new bn_js_1["default"](liquidationThreshold)).div(collateralTotalSupply).div(new bn_js_1["default"](100)).div(utils_1.TEN.pow(new bn_js_1["default"](reserve.liquidity.mintDecimals)));
        collateralValue = collateralValue.add(totalPriceWad);
        depositedAssetNames.push(name_2);
    }
    var riskFactor = (collateralValue === utils_1.ZERO || loanValue === utils_1.ZERO) ? 0 : utils_1.scaleToNormalNumber((loanValue.mul(utils_1.WAD).div(collateralValue)), 18);
    return {
        loanValue: loanValue,
        collateralValue: collateralValue,
        riskFactor: riskFactor,
        obligation: obligation,
        borrowedAssetNames: borrowedAssetNames,
        depositedAssetNames: depositedAssetNames
    };
}
function liquidateAccount(connection, programId, payer, obligation, parsedReserveMap, wallets) {
    return __awaiter(this, void 0, void 0, function () {
        var lendingMarket, lendingMarketAuthority, transaction, signers, toRefreshReserves, repayReserve, withdrawReserve, payerAccount, repayWallet, withdrawWallet, transferAuthority, _a, sig, tokenwallet;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    lendingMarket = parsedReserveMap.values().next().value.reserve.lendingMarket;
                    return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([lendingMarket.toBuffer()], programId)];
                case 1:
                    lendingMarketAuthority = (_b.sent())[0];
                    transaction = new web3_js_1.Transaction();
                    signers = [];
                    toRefreshReserves = new Set();
                    obligation.borrows.forEach(function (borrow) {
                        toRefreshReserves.add(borrow.borrowReserve.toBase58());
                    });
                    obligation.deposits.forEach(function (deposit) {
                        toRefreshReserves.add(deposit.depositReserve.toBase58());
                    });
                    toRefreshReserves.forEach(function (reserve) {
                        transaction.add(refreshReserve_1.refreshReserveInstruction(parsedReserveMap.get(reserve)));
                    });
                    repayReserve = parsedReserveMap.get(obligation.borrows[0].borrowReserve.toBase58());
                    withdrawReserve = parsedReserveMap.get(obligation.deposits[0].depositReserve.toBase58());
                    if (!repayReserve || !withdrawReserve) {
                        return [2 /*return*/];
                    }
                    if (repayReserve.reserve.liquidity.mintPubkey.toBase58() !== SOL_MINT && (!wallets.has(repayReserve.reserve.liquidity.mintPubkey.toBase58()) ||
                        !wallets.has(withdrawReserve.reserve.collateral.mintPubkey.toBase58()))) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, connection.getAccountInfo(payer.publicKey)];
                case 2:
                    payerAccount = _b.sent();
                    return [4 /*yield*/, utils_1.findLargestTokenAccountForOwner(connection, payer, repayReserve.reserve.liquidity.mintPubkey)];
                case 3:
                    repayWallet = _b.sent();
                    return [4 /*yield*/, utils_1.findLargestTokenAccountForOwner(connection, payer, withdrawReserve.reserve.collateral.mintPubkey)];
                case 4:
                    withdrawWallet = _b.sent();
                    signers.push(payer);
                    if (!(repayReserve.reserve.liquidity.mintPubkey.toBase58() !== SOL_MINT)) return [3 /*break*/, 6];
                    return [4 /*yield*/, liquidateByPayingToken(connection, transaction, signers, repayWallet.tokenAccount.amount, repayWallet.publicKey, withdrawWallet.publicKey, repayReserve, withdrawReserve, obligation, lendingMarket, lendingMarketAuthority, payer)];
                case 5:
                    _a = _b.sent();
                    return [3 /*break*/, 8];
                case 6: return [4 /*yield*/, liquidateByPayingSOL(connection, transaction, signers, payerAccount.lamports - 100000000, wallets.get(withdrawReserve.reserve.collateral.mintPubkey.toBase58()).publicKey, repayReserve, withdrawReserve, obligation, lendingMarket, lendingMarketAuthority, payer)];
                case 7:
                    _a = _b.sent();
                    _b.label = 8;
                case 8:
                    transferAuthority = _a;
                    signers.push(transferAuthority);
                    return [4 /*yield*/, connection.sendTransaction(transaction, signers)];
                case 9:
                    sig = _b.sent();
                    console.log("liqudiation transaction sent: " + sig + ".");
                    return [4 /*yield*/, utils_1.findLargestTokenAccountForOwner(connection, payer, withdrawReserve.reserve.collateral.mintPubkey)];
                case 10:
                    tokenwallet = _b.sent();
                    return [4 /*yield*/, redeemCollateral(wallets, withdrawReserve, payer, tokenwallet, lendingMarketAuthority, connection)];
                case 11:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function liquidateByPayingSOL(connection, transaction, signers, amount, withdrawWallet, repayReserve, withdrawReserve, obligation, lendingMarket, lendingMarketAuthority, payer) {
    var wrappedSOLTokenAccount = new web3_js_1.Account();
    transaction.add(web3_js_1.SystemProgram.createAccount({
        fromPubkey: payer.publicKey,
        newAccountPubkey: wrappedSOLTokenAccount.publicKey,
        lamports: amount,
        space: spl_token_1.AccountLayout.span,
        programId: new web3_js_1.PublicKey(spl_token_1.TOKEN_PROGRAM_ID)
    }), spl_token_1.Token.createInitAccountInstruction(new web3_js_1.PublicKey(spl_token_1.TOKEN_PROGRAM_ID), new web3_js_1.PublicKey(SOL_MINT), wrappedSOLTokenAccount.publicKey, payer.publicKey));
    var transferAuthority = liquidateByPayingToken(connection, transaction, signers, amount, wrappedSOLTokenAccount.publicKey, withdrawWallet, repayReserve, withdrawReserve, obligation, lendingMarket, lendingMarketAuthority, payer);
    transaction.add(spl_token_1.Token.createCloseAccountInstruction(spl_token_1.TOKEN_PROGRAM_ID, wrappedSOLTokenAccount.publicKey, payer.publicKey, payer.publicKey, []));
    signers.push(wrappedSOLTokenAccount);
    return transferAuthority;
}
function liquidateByPayingToken(connection, transaction, signers, amount, repayWallet, withdrawWallet, repayReserve, withdrawReserve, obligation, lendingMarket, lendingMarketAuthority, payer) {
    return __awaiter(this, void 0, void 0, function () {
        var transferAuthority, stakeAccounts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    transferAuthority = new web3_js_1.Account();
                    return [4 /*yield*/, connection.getProgramAccounts(utils_1.STAKING_PROGRAM_ID, {
                            filters: [
                                {
                                    dataSize: 213
                                },
                                {
                                    memcmp: {
                                        offset: 1 + 6,
                                        bytes: obligation.owner.toBase58()
                                    }
                                },
                                {
                                    memcmp: {
                                        offset: 1 + 6 + 32,
                                        bytes: withdrawReserve.reserve.deposit_staking_pool.toBase58()
                                    }
                                }
                            ]
                        })];
                case 1:
                    stakeAccounts = _a.sent();
                    transaction.add(refreshObligation_1.refreshObligationInstruction(obligation.publicKey, obligation.deposits.map(function (deposit) { return deposit.depositReserve; }), obligation.borrows.map(function (borrow) { return borrow.borrowReserve; })), spl_token_1.Token.createApproveInstruction(spl_token_1.TOKEN_PROGRAM_ID, repayWallet, transferAuthority.publicKey, payer.publicKey, [], amount), liquidateObligation_1.liquidateObligationInstruction(amount, repayWallet, withdrawWallet, repayReserve.publicKey, repayReserve.reserve.liquidity.supplyPubkey, withdrawReserve.publicKey, withdrawReserve.reserve.collateral.supplyPubkey, obligation.publicKey, lendingMarket, lendingMarketAuthority, transferAuthority.publicKey, withdrawReserve.reserve.deposit_staking_pool_option === 1 ? withdrawReserve.reserve.deposit_staking_pool : undefined, withdrawReserve.reserve.deposit_staking_pool_option === 1 ? stakeAccounts[0].pubkey : undefined));
                    return [2 /*return*/, transferAuthority];
            }
        });
    });
}
function redeemCollateral(wallets, withdrawReserve, payer, tokenwallet, lendingMarketAuthority, connection) {
    return __awaiter(this, void 0, void 0, function () {
        var transaction, transferAuthority, redeemSig;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    transaction = new web3_js_1.Transaction();
                    transferAuthority = new web3_js_1.Account();
                    if (tokenwallet.tokenAccount.amount === 0) {
                        return [2 /*return*/];
                    }
                    transaction.add(spl_token_1.Token.createApproveInstruction(spl_token_1.TOKEN_PROGRAM_ID, wallets.get(withdrawReserve.reserve.collateral.mintPubkey.toBase58()).publicKey, transferAuthority.publicKey, payer.publicKey, [], 1000000000000), refreshReserve_1.refreshReserveInstruction(withdrawReserve), redeemReserveCollateral_1.redeemReserveCollateralInstruction(tokenwallet.tokenAccount.amount, tokenwallet.publicKey, wallets.get(withdrawReserve.reserve.liquidity.mintPubkey.toBase58()).publicKey, withdrawReserve.publicKey, withdrawReserve.reserve.collateral.mintPubkey, withdrawReserve.reserve.liquidity.supplyPubkey, withdrawReserve.reserve.lendingMarket, lendingMarketAuthority, transferAuthority.publicKey));
                    return [4 /*yield*/, connection.sendTransaction(transaction, [payer, transferAuthority])];
                case 1:
                    redeemSig = _a.sent();
                    console.log("Redeem reserve collateral: " + redeemSig + ".");
                    return [2 /*return*/];
            }
        });
    });
}
function sellToken(tokenAccount) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
runPartialLiquidator();
