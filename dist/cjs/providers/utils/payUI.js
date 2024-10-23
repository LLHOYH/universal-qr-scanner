"use strict";
/* eslint-disable no-unsafe-finally */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayThroughSolana_Pay = PayThroughSolana_Pay;
exports.PayThroughSolanaTransfer = PayThroughSolanaTransfer;
exports.PayThroughRipeFiat = PayThroughRipeFiat;
exports.QRScanner = QRScanner;
var material_1 = require("@mui/material");
var icons_material_1 = require("@mui/icons-material");
var react_1 = __importDefault(require("react"));
var react_qr_scanner_1 = require("@yudiel/react-qr-scanner");
var link_1 = __importDefault(require("next/link"));
function QRScanner(_a) {
    var decode = _a.decode;
    // @ts-expect-error unsure what type is expected
    function handleOnScan(result) {
        if (!decode)
            return;
        decode((result === null || result === void 0 ? void 0 : result[0].rawValue) || '');
    }
    return (react_1.default.createElement(material_1.Box, { sx: {
            width: '100%',
            maxWidth: '580px',
            position: 'relative',
        } },
        react_1.default.createElement(react_qr_scanner_1.Scanner, { onScan: function (result) { return handleOnScan(result); } })));
}
function PayThroughSolana_Pay(_a) {
    var _this = this;
    var payCrypto = _a.payCrypto;
    return (react_1.default.createElement(material_1.Box, { sx: { p: 3, background: 'white', borderRadius: '20px' } },
        react_1.default.createElement(material_1.Box, { display: "flex", justifyContent: "left", alignItems: "center", mb: 2 },
            react_1.default.createElement(material_1.Typography, { variant: "h5", align: "center", gutterBottom: true }, "Solana Pay Transaction Request"),
            react_1.default.createElement("img", { src: "/solanapay-logo.svg", alt: "solana pay logo", style: { marginLeft: '16px', transform: 'translateY(-4px)' } })),
        react_1.default.createElement(material_1.Grid, { container: true, spacing: 2 },
            react_1.default.createElement(material_1.Grid, { item: true, xs: 12 },
                react_1.default.createElement(material_1.Typography, { variant: "h6", gutterBottom: true }, "Send To Address:"),
                react_1.default.createElement(material_1.Typography, { variant: "body1", style: { wordBreak: 'break-all', overflowWrap: 'break-word' } }, payCrypto.to)),
            react_1.default.createElement(material_1.Grid, { item: true, xs: 12 },
                react_1.default.createElement(material_1.Typography, { variant: "h6", gutterBottom: true }, "Token:"),
                react_1.default.createElement(material_1.Typography, { variant: "body1", style: {
                        wordBreak: 'break-all',
                        overflowWrap: 'break-word',
                    } },
                    react_1.default.createElement("img", { src: "/pyusd.png", alt: "PYUSD", style: {
                            width: '24px',
                            marginRight: '8px',
                            transform: 'translateY(5px)',
                        } }),
                    'PYUSD',
                    " (",
                    payCrypto.tokenAddress,
                    ")")),
            react_1.default.createElement(material_1.Grid, { item: true, xs: 12 },
                react_1.default.createElement(material_1.Typography, { variant: "h6", gutterBottom: true }, "Token Amount:"),
                react_1.default.createElement(material_1.Typography, { variant: "body1" }, payCrypto.tokenAmount)),
            react_1.default.createElement(material_1.Grid, { item: true, xs: 12 },
                react_1.default.createElement(material_1.Typography, { variant: "h6", gutterBottom: true }, "Memo:"),
                react_1.default.createElement(material_1.Typography, { variant: "body1", style: { wordBreak: 'break-all', overflowWrap: 'break-word' } }, payCrypto.memo || 'No memo provided')),
            payCrypto.hash && (react_1.default.createElement(material_1.Grid, { item: true, xs: 12 },
                react_1.default.createElement(material_1.Typography, { variant: "h6", gutterBottom: true }, "Transaction Hash:"),
                react_1.default.createElement(link_1.default, { href: "https://solscan.io/tx/".concat(payCrypto.hash), target: '_blank' }, payCrypto.hash))),
            react_1.default.createElement(material_1.Grid, { item: true, xs: 12 },
                react_1.default.createElement(material_1.Box, { display: "flex", gap: 2 },
                    !payCrypto.hash && (react_1.default.createElement(material_1.Button, { color: "inherit", variant: "contained", onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                payCrypto.pay();
                                return [2 /*return*/];
                            });
                        }); }, endIcon: payCrypto.isPayingLoading ? (react_1.default.createElement(material_1.CircularProgress, { size: 24, color: "inherit" })) : (react_1.default.createElement(icons_material_1.Send, null)) }, payCrypto.isPayingLoading ? 'Paying' : 'Pay')),
                    react_1.default.createElement(material_1.Button, { color: "inherit", variant: "contained", onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (payCrypto.reset)
                                    payCrypto.reset();
                                return [2 /*return*/];
                            });
                        }); }, endIcon: payCrypto.hash ? react_1.default.createElement(icons_material_1.Home, null) : react_1.default.createElement(icons_material_1.Cancel, null) }, payCrypto.hash ? 'Home' : 'Cancel'))))));
}
function PayThroughSolanaTransfer(_a) {
    var _this = this;
    var payCrypto = _a.payCrypto;
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(material_1.Box, { sx: { p: 3, background: 'white', borderRadius: '20px' } },
            react_1.default.createElement(material_1.Typography, { variant: "h5", gutterBottom: true }, "Solana Address Transfer"),
            react_1.default.createElement(material_1.Grid, { container: true, spacing: 2 },
                react_1.default.createElement(material_1.Grid, { item: true, xs: 12 },
                    react_1.default.createElement(material_1.Typography, { variant: "h6", gutterBottom: true }, "Send To Address:"),
                    react_1.default.createElement(material_1.Typography, { variant: "body1", sx: { wordWrap: 'break-word' } }, payCrypto.to)),
                react_1.default.createElement(material_1.Grid, { item: true, xs: 12 },
                    react_1.default.createElement(material_1.Typography, { variant: "h6", gutterBottom: true }, "Token:"),
                    react_1.default.createElement(material_1.Typography, { variant: "body1", style: { wordBreak: 'break-all', overflowWrap: 'break-word' } },
                        react_1.default.createElement("img", { src: "/pyusd.png", alt: "PYUSD", style: {
                                width: '24px',
                                marginRight: '8px',
                                transform: 'translateY(5px)',
                            } }),
                        'PYUSD',
                        " (",
                        payCrypto.tokenAddress,
                        ")")),
                react_1.default.createElement(material_1.Grid, { item: true, xs: 12, marginTop: '10px' },
                    react_1.default.createElement(material_1.TextField, { label: "Token Amount", variant: "outlined", fullWidth: true, type: "number", name: "tokenAmount", value: payCrypto.tokenAmount, onChange: function (e) {
                            return payCrypto.updateFields &&
                                payCrypto.updateFields({
                                    tokenAmount: Number(e.target.value || 0),
                                    fiatAmount: payCrypto.fiatAmount,
                                    memo: payCrypto.memo,
                                });
                        } })),
                react_1.default.createElement(material_1.Grid, { item: true, xs: 12 },
                    react_1.default.createElement(material_1.TextField, { label: "Memo", variant: "outlined", fullWidth: true, name: "memo", value: payCrypto.memo, onChange: function (e) {
                            return payCrypto.updateFields &&
                                payCrypto.updateFields({
                                    memo: e.target.value,
                                    fiatAmount: payCrypto.fiatAmount,
                                    tokenAmount: payCrypto.tokenAmount,
                                });
                        } })),
                payCrypto.hash && (react_1.default.createElement(material_1.Grid, { item: true, xs: 12 },
                    react_1.default.createElement(material_1.Typography, { variant: "h6", gutterBottom: true }, "Transaction Hash:"),
                    react_1.default.createElement(link_1.default, { href: "https://solscan.io/tx/".concat(payCrypto.hash), target: '_blank' }, payCrypto.hash))),
                react_1.default.createElement(material_1.Grid, { item: true, xs: 12 },
                    react_1.default.createElement(material_1.Box, { display: "flex", gap: 2 },
                        !payCrypto.hash && (react_1.default.createElement(material_1.Button, { color: "inherit", variant: "contained", onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    payCrypto.pay();
                                    return [2 /*return*/];
                                });
                            }); }, endIcon: payCrypto.isPayingLoading ? (react_1.default.createElement(material_1.CircularProgress, { size: 24, color: "inherit" })) : (react_1.default.createElement(icons_material_1.Send, null)) }, payCrypto.isPayingLoading ? 'Paying' : 'Pay')),
                        react_1.default.createElement(material_1.Button, { color: "inherit", variant: "contained", onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    if (payCrypto.reset)
                                        payCrypto.reset();
                                    return [2 /*return*/];
                                });
                            }); }, endIcon: payCrypto.hash ? react_1.default.createElement(icons_material_1.Home, null) : react_1.default.createElement(icons_material_1.Cancel, null) }, payCrypto.hash ? 'Home' : 'Cancel')))))));
}
function PayThroughRipeFiat(_a) {
    var _this = this;
    var payCrypto = _a.payCrypto;
    var SGD_USD_CONVERSION = 0.756;
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(material_1.Box, { sx: { p: 3, background: 'white', borderRadius: '20px' } },
            react_1.default.createElement(material_1.Typography, { variant: "h5", gutterBottom: true }, "Pay Fiat Using Ripe"),
            react_1.default.createElement(material_1.Grid, { container: true, spacing: 2 }, !payCrypto.phoneNumber && !payCrypto.uen && !payCrypto.netsAcc ? (react_1.default.createElement(material_1.Grid, { item: true, xs: 12 },
                react_1.default.createElement(material_1.Typography, { variant: "body1", gutterBottom: true }, "No Phone Number, UEN and Nets account found"))) : (react_1.default.createElement(react_1.default.Fragment, null,
                payCrypto.phoneNumber && (react_1.default.createElement(material_1.Grid, { item: true, xs: 12 },
                    react_1.default.createElement(material_1.Typography, { variant: "h6", gutterBottom: true }, "Phone Number:"),
                    react_1.default.createElement(material_1.Typography, { variant: "body1", sx: { wordWrap: 'break-word' } }, payCrypto.phoneNumber))),
                payCrypto.uen && (react_1.default.createElement(material_1.Grid, { item: true, xs: 12 },
                    react_1.default.createElement(material_1.Typography, { variant: "h6", gutterBottom: true }, "UEN:"),
                    react_1.default.createElement(material_1.Typography, { variant: "body1", sx: { wordWrap: 'break-word' } }, payCrypto.uen))),
                payCrypto.netsAcc && (react_1.default.createElement(material_1.Grid, { item: true, xs: 12 },
                    react_1.default.createElement(material_1.Typography, { variant: "h6", gutterBottom: true }, "SG NETS Account:"),
                    react_1.default.createElement(material_1.Typography, { variant: "body1", sx: { wordWrap: 'break-word' } }, payCrypto.netsAcc))),
                react_1.default.createElement(material_1.Grid, { item: true, xs: 12 },
                    react_1.default.createElement(material_1.Typography, { variant: "h6", gutterBottom: true }, "Token:"),
                    react_1.default.createElement(material_1.Typography, { variant: "body1", style: { wordBreak: 'break-all', overflowWrap: 'break-word' } },
                        react_1.default.createElement("img", { src: "/pyusd.png", alt: "PYUSD", style: {
                                width: '24px',
                                marginRight: '8px',
                                transform: 'translateY(5px)',
                            } }),
                        'PYUSD',
                        " (",
                        payCrypto.tokenAddress,
                        ")")),
                react_1.default.createElement(material_1.Grid, { item: true, xs: 6, marginTop: '10px' },
                    react_1.default.createElement(material_1.TextField, { label: "Fiat Amount (SGD)", variant: "outlined", fullWidth: true, name: "fiatAmount", value: payCrypto.fiatAmount, onChange: function (e) {
                            return payCrypto.updateFields &&
                                payCrypto.updateFields({
                                    fiatAmount: Number(e.target.value || 0),
                                    tokenAmount: Number(e.target.value || 0) * SGD_USD_CONVERSION,
                                    memo: payCrypto.memo,
                                });
                        } })),
                react_1.default.createElement(material_1.Grid, { item: true, xs: 6, marginTop: '10px' },
                    react_1.default.createElement("div", { style: {
                            display: 'flex',
                            alignItems: 'center',
                            border: '1px solid rgba(0, 0, 0, 0.23)', // Similar border to TextField
                            borderRadius: '4px', // Match TextField's border radius
                            padding: '16.5px 14px', // Padding matches the default padding of TextField
                            backgroundColor: '#fff', // TextField background color
                            fontSize: '16px', // Default font size for TextField
                            lineHeight: '1.5', // Adjust to match TextField's line height
                            height: '56px',
                        } },
                        react_1.default.createElement("img", { src: "/pyusd.png", alt: "PYUSD", style: { width: '24px', marginRight: '8px' } }),
                        react_1.default.createElement(material_1.Typography, { variant: "body1", style: {
                                wordBreak: 'break-all',
                                overflowWrap: 'break-word',
                            } },
                            'PYUSD',
                            " ",
                            payCrypto.tokenAmount))),
                react_1.default.createElement(material_1.Grid, { item: true, xs: 12 },
                    react_1.default.createElement(material_1.TextField, { label: "Memo", variant: "outlined", fullWidth: true, name: "memo", value: payCrypto.memo, onChange: function (e) {
                            return payCrypto.updateFields &&
                                payCrypto.updateFields({
                                    memo: e.target.value,
                                    fiatAmount: payCrypto.fiatAmount,
                                    tokenAmount: payCrypto.tokenAmount,
                                });
                        } })),
                payCrypto.hash && (react_1.default.createElement(material_1.Grid, { item: true, xs: 12 },
                    react_1.default.createElement(material_1.Typography, { variant: "h6", gutterBottom: true }, "Transaction Hash:"),
                    react_1.default.createElement(link_1.default, { href: "https://solscan.io/tx/".concat(payCrypto.hash), target: '_blank' }, payCrypto.hash))),
                react_1.default.createElement(material_1.Grid, { item: true, xs: 12 },
                    react_1.default.createElement(material_1.Box, { display: "flex", gap: 2 },
                        !payCrypto.hash && (react_1.default.createElement(material_1.Button, { color: "inherit", variant: "contained", onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    payCrypto.pay();
                                    return [2 /*return*/];
                                });
                            }); }, endIcon: payCrypto.isPayingLoading ? (react_1.default.createElement(material_1.CircularProgress, { size: 24, color: "inherit" })) : (react_1.default.createElement(icons_material_1.Send, null)) }, payCrypto.isPayingLoading ? 'Paying' : 'Pay')),
                        react_1.default.createElement(material_1.Button, { color: "inherit", variant: "contained", onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    if (payCrypto.reset)
                                        payCrypto.reset();
                                    return [2 /*return*/];
                                });
                            }); }, endIcon: payCrypto.hash ? react_1.default.createElement(icons_material_1.Home, null) : react_1.default.createElement(icons_material_1.Cancel, null) }, payCrypto.hash ? 'Home' : 'Cancel')))))))));
}
