"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.rustString = exports.uint128 = exports.uint64 = exports.publicKey = void 0;
var web3_js_1 = require("@solana/web3.js");
var BN = require("bn.js");
var BufferLayout = require("buffer-layout");
/**
 * Layout for a public key
 */
var publicKey = function (property) {
    if (property === void 0) { property = 'publicKey'; }
    var publicKeyLayout = BufferLayout.blob(32, property);
    var _decode = publicKeyLayout.decode.bind(publicKeyLayout);
    var _encode = publicKeyLayout.encode.bind(publicKeyLayout);
    publicKeyLayout.decode = function (buffer, offset) {
        var data = _decode(buffer, offset);
        return new web3_js_1.PublicKey(data);
    };
    publicKeyLayout.encode = function (key, buffer, offset) {
        return _encode(key.toBuffer(), buffer, offset);
    };
    return publicKeyLayout;
};
exports.publicKey = publicKey;
/**
 * Layout for a 64bit unsigned value
 */
var uint64 = function (property) {
    if (property === void 0) { property = 'uint64'; }
    var layout = BufferLayout.blob(8, property);
    var _decode = layout.decode.bind(layout);
    var _encode = layout.encode.bind(layout);
    layout.decode = function (buffer, offset) {
        var data = _decode(buffer, offset);
        return new BN(__spreadArray([], data).reverse()
            .map(function (i) { return ("00" + i.toString(16)).slice(-2); })
            .join(''), 16);
    };
    layout.encode = function (num, buffer, offset) {
        var a = num.toArray().reverse();
        var b = Buffer.from(a);
        if (b.length !== 8) {
            var zeroPad = Buffer.alloc(8);
            b.copy(zeroPad);
            b = zeroPad;
        }
        return _encode(b, buffer, offset);
    };
    return layout;
};
exports.uint64 = uint64;
// TODO: wrap in BN (what about decimals?)
var uint128 = function (property) {
    if (property === void 0) { property = 'uint128'; }
    var layout = BufferLayout.blob(16, property);
    var _decode = layout.decode.bind(layout);
    var _encode = layout.encode.bind(layout);
    layout.decode = function (buffer, offset) {
        var data = _decode(buffer, offset);
        return new BN(__spreadArray([], data).reverse()
            .map(function (i) { return ("00" + i.toString(16)).slice(-2); })
            .join(''), 16);
    };
    layout.encode = function (num, buffer, offset) {
        var a = num.toArray().reverse();
        var b = Buffer.from(a);
        if (b.length !== 16) {
            var zeroPad = Buffer.alloc(16);
            b.copy(zeroPad);
            b = zeroPad;
        }
        return _encode(b, buffer, offset);
    };
    return layout;
};
exports.uint128 = uint128;
/**
 * Layout for a Rust String type
 */
var rustString = function (property) {
    if (property === void 0) { property = 'string'; }
    var rsl = BufferLayout.struct([
        BufferLayout.u32('length'),
        BufferLayout.u32('lengthPadding'),
        BufferLayout.blob(BufferLayout.offset(BufferLayout.u32(), -8), 'chars'),
    ], property);
    var _decode = rsl.decode.bind(rsl);
    var _encode = rsl.encode.bind(rsl);
    rsl.decode = function (buffer, offset) {
        var data = _decode(buffer, offset);
        return data.chars.toString('utf8');
    };
    rsl.encode = function (str, buffer, offset) {
        var data = {
            chars: Buffer.from(str, 'utf8')
        };
        return _encode(data, buffer, offset);
    };
    return rsl;
};
exports.rustString = rustString;
