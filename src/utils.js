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
exports.parseTokenAccountData = exports.scaleToNormalNumber = exports.wadToBN = exports.wadToNumber = exports.createUninitializedAccount = exports.createTokenAccount = exports.ACCOUNT_LAYOUT = exports.findLargestTokenAccountForOwner = exports.getParsedReservesMap = exports.getAllObligations = exports.getUnixTs = exports.sleep = exports.notify = exports.WAD = exports.TEN = exports.ZERO = exports.STAKING_PROGRAM_ID = void 0;
var web3_js_1 = require("@solana/web3.js");
var axios_1 = require("axios");
var obligation_1 = require("./layouts/obligation");
var buffer_layout_1 = require("buffer-layout");
var reserve_1 = require("./layouts/reserve");
var spl_token_1 = require("@solana/spl-token");
var ids_1 = require("./ids");
var bn_js_1 = require("bn.js");
exports.STAKING_PROGRAM_ID = new web3_js_1.PublicKey("stkarvwmSzv2BygN5e2LeTwimTczLWHCKPKGC2zVLiq");
exports.ZERO = new bn_js_1["default"](0);
exports.TEN = new bn_js_1["default"](10);
exports.WAD = exports.TEN.pow(new bn_js_1["default"](18));
function notify(content) {
    if (process.env.WEBHOOK_URL) {
        axios_1["default"].post(process.env.WEBHOOK_URL, { "text": content });
    }
    console.log(content);
}
exports.notify = notify;
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
exports.sleep = sleep;
var getUnixTs = function () {
    return new Date().getTime() / 1000;
};
exports.getUnixTs = getUnixTs;
function getAllObligations(connection, programId) {
    return __awaiter(this, void 0, void 0, function () {
        var rawObligationAccounts, parsedObligations, _i, rawObligationAccounts_1, rawObligationAccount, parsedObligation;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection.getProgramAccounts(programId, {
                        filters: [
                            {
                                dataSize: 916
                            },
                        ]
                    })];
                case 1:
                    rawObligationAccounts = _a.sent();
                    parsedObligations = [];
                    for (_i = 0, rawObligationAccounts_1 = rawObligationAccounts; _i < rawObligationAccounts_1.length; _i++) {
                        rawObligationAccount = rawObligationAccounts_1[_i];
                        parsedObligation = obligation_1.ObligationParser(rawObligationAccount.pubkey, rawObligationAccount.account);
                        if (parsedObligation === undefined) {
                            continue;
                        }
                        parsedObligations.push(parsedObligation);
                    }
                    return [2 /*return*/, parsedObligations];
            }
        });
    });
}
exports.getAllObligations = getAllObligations;
function getParsedReservesMap(connection, programId) {
    return __awaiter(this, void 0, void 0, function () {
        var allReserves, parsedReserves, _i, allReserves_1, reserve, parsedReserve;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection.getProgramAccounts(programId, {
                        filters: [
                            {
                                dataSize: 575
                            }
                        ]
                    })];
                case 1:
                    allReserves = _a.sent();
                    parsedReserves = new Map();
                    for (_i = 0, allReserves_1 = allReserves; _i < allReserves_1.length; _i++) {
                        reserve = allReserves_1[_i];
                        parsedReserve = reserve_1.ReserveParser(reserve.pubkey, reserve.account);
                        if (parsedReserve === undefined) {
                            continue;
                        }
                        parsedReserves.set(parsedReserve.publicKey.toBase58(), parsedReserve);
                    }
                    return [2 /*return*/, parsedReserves];
            }
        });
    });
}
exports.getParsedReservesMap = getParsedReservesMap;
function findLargestTokenAccountForOwner(connection, owner, mint) {
    return __awaiter(this, void 0, void 0, function () {
        var response, max, maxTokenAccount, maxPubkey, _i, _a, _b, pubkey, account, tokenAccount, transaction, aTokenAccountPubkey;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, connection.getTokenAccountsByOwner(owner.publicKey, { mint: mint }, connection.commitment)];
                case 1:
                    response = _c.sent();
                    max = -1;
                    maxTokenAccount = null;
                    maxPubkey = null;
                    for (_i = 0, _a = response.value; _i < _a.length; _i++) {
                        _b = _a[_i], pubkey = _b.pubkey, account = _b.account;
                        tokenAccount = parseTokenAccountData(account.data);
                        if (tokenAccount.amount > max) {
                            maxTokenAccount = tokenAccount;
                            max = tokenAccount.amount;
                            maxPubkey = pubkey;
                        }
                    }
                    if (!(maxPubkey && maxTokenAccount)) return [3 /*break*/, 2];
                    return [2 /*return*/, { publicKey: maxPubkey, tokenAccount: maxTokenAccount }];
                case 2:
                    console.log("creating new token account");
                    transaction = new web3_js_1.Transaction();
                    return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([
                            owner.publicKey.toBuffer(),
                            ids_1.TOKEN_PROGRAM_ID.toBuffer(),
                            mint.toBuffer(),
                        ], ids_1.ATOKEN_PROGRAM_ID)];
                case 3:
                    aTokenAccountPubkey = (_c.sent())[0];
                    transaction.add(spl_token_1.Token.createAssociatedTokenAccountInstruction(ids_1.ATOKEN_PROGRAM_ID, ids_1.TOKEN_PROGRAM_ID, mint, aTokenAccountPubkey, owner.publicKey, owner.publicKey));
                    return [4 /*yield*/, connection.sendTransaction(transaction, [owner])];
                case 4:
                    _c.sent();
                    return [2 /*return*/, { publicKey: aTokenAccountPubkey, tokenAccount: { mint: mint, amount: 0, owner: owner.publicKey } }];
            }
        });
    });
}
exports.findLargestTokenAccountForOwner = findLargestTokenAccountForOwner;
exports.ACCOUNT_LAYOUT = buffer_layout_1.struct([
    buffer_layout_1.blob(32, 'mint'),
    buffer_layout_1.blob(32, 'owner'),
    buffer_layout_1.nu64('amount'),
    buffer_layout_1.blob(93)
]);
function createTokenAccount(instructions, payer, accountRentExempt, mint, owner, signers) {
    var account = createUninitializedAccount(instructions, payer, accountRentExempt, signers);
    instructions.push(spl_token_1.Token.createInitAccountInstruction(new web3_js_1.PublicKey(ids_1.TOKEN_PROGRAM_ID), mint, account, owner));
    return account;
}
exports.createTokenAccount = createTokenAccount;
function createUninitializedAccount(instructions, payer, amount, signers) {
    var account = new web3_js_1.Account();
    instructions.push(web3_js_1.SystemProgram.createAccount({
        fromPubkey: payer,
        newAccountPubkey: account.publicKey,
        lamports: amount,
        space: spl_token_1.AccountLayout.span,
        programId: new web3_js_1.PublicKey(ids_1.TOKEN_PROGRAM_ID)
    }));
    signers.push(account);
    return account.publicKey;
}
exports.createUninitializedAccount = createUninitializedAccount;
function wadToNumber(wad, precision) {
    if (precision === void 0) { precision = 4; }
    return wad.div(exports.WAD.div(exports.TEN.pow(new bn_js_1["default"](precision)))).toNumber() / Math.pow(10, precision);
}
exports.wadToNumber = wadToNumber;
function wadToBN(wad) {
    return wad.div(exports.WAD);
}
exports.wadToBN = wadToBN;
function scaleToNormalNumber(lamport, scaleDecimal, precision) {
    if (precision === void 0) { precision = 4; }
    if (scaleDecimal < precision) {
        throw new Error("Scale decimal " + scaleDecimal + " is smaller than " + precision);
    }
    return lamport.div(exports.TEN.pow(new bn_js_1["default"](scaleDecimal - precision))).toNumber() / Math.pow(10, precision);
}
exports.scaleToNormalNumber = scaleToNormalNumber;
function parseTokenAccountData(data) {
    var _a = exports.ACCOUNT_LAYOUT.decode(data), mint = _a.mint, owner = _a.owner, amount = _a.amount;
    return {
        mint: new web3_js_1.PublicKey(mint),
        owner: new web3_js_1.PublicKey(owner),
        amount: amount
    };
}
exports.parseTokenAccountData = parseTokenAccountData;
