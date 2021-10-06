"use strict";
exports.__esModule = true;
exports.LastUpdateLayout = void 0;
var BufferLayout = require("buffer-layout");
var Layout = require("./layout");
exports.LastUpdateLayout = BufferLayout.struct([Layout.uint64('slot'), BufferLayout.u8('stale')], 'lastUpdate');
