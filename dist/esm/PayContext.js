var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
/* eslint-disable no-unsafe-finally */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, createContext, useReducer, } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { usePortal } from './portal';
import { parseURL } from '@solana/pay';
import { Grid, Typography, Button, Box, CircularProgress, TextField, } from '@mui/material';
import { Cancel, Send } from '@mui/icons-material';
var PYUSDAddress = 'CXk2AMBfi3TwaEL2468s6zP8xq9NxTXjp9gjMgzeUynM';
var initialState = {
    chainId: process.env.solanaChainId || '',
    to: '',
    from: '',
    tokenAddress: '',
    tokenAmount: 0,
    payType: null,
    memo: '',
    fiatAmount: 0,
    hash: '',
    isPayingLoading: false,
    pay: function () { },
    decode: function (rawQRData) { },
};
var PayContext = createContext(initialState);
function reducer(state, action) {
    switch (action.type) {
        case 'initiate':
            return __assign({}, action.payload);
        case 'pay':
            return __assign(__assign({}, state), action.payload);
        case 'updateFields':
            return __assign(__assign({}, state), action.payload);
        case 'decode':
            return __assign(__assign({}, state), action.payload);
        default:
            throw new Error('Pay action type not valid');
    }
}
function PayProvider(_a) {
    var children = _a.children;
    var portal = usePortal();
    var _b = useReducer(reducer, initialState), state = _b[0], dispatch = _b[1];
    function reset() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                dispatch({
                    type: 'initiate',
                    payload: __assign({}, initialState),
                });
                return [2 /*return*/];
            });
        });
    }
    function pay() {
        return __awaiter(this, void 0, void 0, function () {
            var hash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!state)
                            return [2 /*return*/];
                        console.log('paying');
                        dispatch({
                            type: 'pay',
                            payload: __assign(__assign({}, state), { isPayingLoading: true }),
                        });
                        return [4 /*yield*/, portal.sendTokensOnSolana(state.to, state.tokenAddress, state.tokenAmount)];
                    case 1:
                        hash = _a.sent();
                        dispatch({
                            type: 'pay',
                            payload: __assign(__assign({}, state), { isPayingLoading: false, hash: hash }),
                        });
                        console.log('pay done');
                        return [2 /*return*/];
                }
            });
        });
    }
    function updateFields(updatedFields) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!state)
                    return [2 /*return*/];
                dispatch({
                    type: 'updateFields',
                    payload: __assign(__assign({}, state), updatedFields),
                });
                return [2 /*return*/];
            });
        });
    }
    function decode(rawQRData) {
        return __awaiter(this, void 0, void 0, function () {
            var payParams, _a, uen, phoneNumber, netsAccount;
            var _b;
            return __generator(this, function (_c) {
                console.log(rawQRData);
                //if it is a solana pay qrcode
                /*
                  solana:
                  GvHeR432g7MjN9uKyX3Dzg66TqwrEWgANLnnFZXMeyyj
                  ?
                  amount=1
                  &
                  spl-token=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v
                  &
                  reference=72FrP58fnrD24Fo48jKR2PoyjjaTcKQJHM9inPV6TFGn
                  &
                  label=Solana%20Pay
                */
                if (rawQRData.substring(0, 7) === 'solana:') {
                    try {
                        payParams = parseURL(rawQRData);
                        if (!isTransferRequestURL(payParams))
                            return [2 /*return*/];
                        dispatch({
                            type: 'decode',
                            payload: __assign(__assign({}, state), { to: payParams === null || payParams === void 0 ? void 0 : payParams.recipient.toString(), tokenAmount: Number(payParams === null || payParams === void 0 ? void 0 : payParams.amount), tokenAddress: ((_b = payParams === null || payParams === void 0 ? void 0 : payParams.splToken) === null || _b === void 0 ? void 0 : _b.toString()) || '', payType: 'SOLANA_PAY' }),
                        });
                    }
                    catch (error) {
                        console.error('invalid solana pay qr code: ', error);
                    }
                    finally {
                        console.log('solana pay');
                        return [2 /*return*/];
                    }
                }
                //if it is a Paynow qrcode
                if (rawQRData.toUpperCase().includes('PAYNOW') ||
                    rawQRData.toUpperCase().includes('SGQR') ||
                    rawQRData.toUpperCase().includes('SG.COM.NETS')) {
                    _a = extractPayNowInfo(rawQRData), uen = _a.uen, phoneNumber = _a.phoneNumber, netsAccount = _a.netsAccount;
                    console.log({ uen: uen, phoneNumber: phoneNumber, netsAccount: netsAccount });
                    dispatch({
                        type: 'decode',
                        payload: __assign(__assign({}, state), { to: '1VB5yxiXTpEzuN3U4JnK5HcMsWBWTVTcD8xsUbZJZX7', tokenAddress: PYUSDAddress, payType: 'RIPE_FIAT', uen: uen, phoneNumber: phoneNumber, netsAcc: netsAccount }),
                    });
                    console.log('fiat, ripe');
                    return [2 /*return*/];
                }
                //if it is a solana address, which is usually between 32-44 characters
                if (rawQRData.length >= 32 && rawQRData.length <= 44) {
                    dispatch({
                        type: 'decode',
                        payload: __assign(__assign({}, state), { to: rawQRData, tokenAddress: PYUSDAddress, payType: 'SOLANA_ADDRESS' }),
                    });
                    console.log('solana address');
                    return [2 /*return*/];
                }
                return [2 /*return*/];
            });
        });
    }
    function isTransferRequestURL(obj) {
        return typeof obj === 'object' && obj !== null && 'recipient' in obj;
    }
    //throw a few examples to ChatGPT to let it generate possible Regex patterns
    function extractPayNowInfo(payNowString) {
        // Regular expression to capture phone numbers (Singapore numbers usually start with +65)
        var phoneRegex = /\+65\d{8}/;
        // Updated UEN regex: Alphanumeric UEN which can be 9 digits followed by a letter or other similar formats
        var uenRegex = /\b\d{9}[A-Z]|\b\d{10}[A-Z]\b/;
        // Regular expression to capture NETS account numbers (typically 12 digits separated by spaces)
        var netsRegex = /\d{6}\s\d{4}\s\d{6}/;
        var phoneNumberMatch = payNowString.match(phoneRegex);
        var uenMatch = payNowString.match(uenRegex);
        var netsAccountMatch = payNowString.match(netsRegex);
        return {
            uen: uenMatch ? uenMatch[0] : undefined,
            phoneNumber: phoneNumberMatch ? phoneNumberMatch[0] : undefined,
            netsAccount: netsAccountMatch
                ? netsAccountMatch[0].replace(/\s/g, '')
                : undefined, // remove spaces in NETS accounts
        };
    }
    return (React.createElement(PayContext.Provider, { value: __assign(__assign({}, state), { pay: pay, decode: decode, reset: reset, updateFields: updateFields }) }, children));
}
function usePay() {
    var context = useContext(PayContext);
    if (context === undefined)
        throw new Error('Pay Context is outside of Provider');
    return context;
}
function PayUI(_a) {
    var payCrypto = _a.payCrypto;
    switch (payCrypto.payType) {
        case 'SOLANA_ADDRESS':
            return React.createElement(PayThroughSolanaTransfer, { payCrypto: payCrypto });
        case 'SOLANA_PAY':
            return React.createElement(PayThroughSolana_Pay, { payCrypto: payCrypto });
        case 'RIPE_FIAT':
            return React.createElement(PayThroughRipeFiat, { payCrypto: payCrypto });
        case null:
            return React.createElement(QRScanner, { decode: payCrypto.decode });
        default:
            return React.createElement(QRScanner, { decode: payCrypto.decode });
    }
}
function QRScanner(_a) {
    var decode = _a.decode;
    // @ts-expect-error unsure what type is expected
    function handleOnScan(result) {
        if (!decode)
            return;
        decode((result === null || result === void 0 ? void 0 : result[0].rawValue) || '');
    }
    return React.createElement(Scanner, { onScan: function (result) { return handleOnScan(result); } });
}
function PayThroughSolana_Pay(_a) {
    var _this = this;
    var payCrypto = _a.payCrypto;
    return (React.createElement(Box, { sx: { p: 3 } },
        React.createElement(Box, { display: "flex", justifyContent: "left", alignItems: "center", mb: 2 },
            React.createElement(Typography, { variant: "h5", align: "center", gutterBottom: true }, "Solana Pay Transaction Request"),
            React.createElement("img", { src: "/solanapay-logo.svg", alt: "solana pay logo", style: { marginLeft: '8px' } })),
        React.createElement(Grid, { container: true, spacing: 2 },
            React.createElement(Grid, { item: true, xs: 12 },
                React.createElement(Typography, { variant: "h6", gutterBottom: true }, "Send To Address:"),
                React.createElement(Typography, { variant: "body1", style: { wordBreak: 'break-all', overflowWrap: 'break-word' } }, payCrypto.to)),
            React.createElement(Grid, { item: true, xs: 12 },
                React.createElement(Typography, { variant: "h6", gutterBottom: true }, "Token:"),
                React.createElement(Typography, { variant: "body1", style: { wordBreak: 'break-all', overflowWrap: 'break-word' } },
                    React.createElement("img", { src: "/pyusd.png", alt: "PYUSD", style: { width: '24px', marginRight: '8px' } }),
                    'PYUSD',
                    " (",
                    payCrypto.tokenAddress,
                    ")")),
            React.createElement(Grid, { item: true, xs: 12 },
                React.createElement(Typography, { variant: "h6", gutterBottom: true }, "Token Amount:"),
                React.createElement(Typography, { variant: "body1" }, payCrypto.tokenAmount)),
            React.createElement(Grid, { item: true, xs: 12 },
                React.createElement(Typography, { variant: "h6", gutterBottom: true }, "Memo:"),
                React.createElement(Typography, { variant: "body1", style: { wordBreak: 'break-all', overflowWrap: 'break-word' } }, payCrypto.memo || 'No memo provided')),
            payCrypto.hash && (React.createElement(Grid, { item: true, xs: 12 },
                React.createElement(Typography, { variant: "h6", gutterBottom: true }, "Transaction Hash:"),
                React.createElement(Typography, { variant: "body1", style: { wordBreak: 'break-all', overflowWrap: 'break-word' } }, payCrypto.hash))),
            React.createElement(Grid, { item: true, xs: 12 },
                React.createElement(Box, { display: "flex", gap: 2 },
                    React.createElement(Button, { color: "inherit", variant: "contained", onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                payCrypto.pay();
                                return [2 /*return*/];
                            });
                        }); }, endIcon: payCrypto.isPayingLoading ? (React.createElement(CircularProgress, { size: 24, color: "inherit" })) : (React.createElement(Send, null)) }, payCrypto.isPayingLoading ? 'Paying' : 'Pay'),
                    React.createElement(Button, { color: "inherit", variant: "contained", onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (payCrypto.reset)
                                    payCrypto.reset();
                                return [2 /*return*/];
                            });
                        }); }, endIcon: React.createElement(Cancel, null) }, "Cancel"))))));
}
function PayThroughSolanaTransfer(_a) {
    var _this = this;
    var payCrypto = _a.payCrypto;
    return (React.createElement("div", null,
        React.createElement(Box, { sx: { p: 3 } },
            React.createElement(Typography, { variant: "h5", gutterBottom: true }, "Solana Address Transfer"),
            React.createElement(Grid, { container: true, spacing: 2 },
                React.createElement(Grid, { item: true, xs: 12 },
                    React.createElement(Typography, { variant: "h6", gutterBottom: true }, "Send To Address:"),
                    React.createElement(Typography, { variant: "body1", sx: { wordWrap: 'break-word' } }, payCrypto.to)),
                React.createElement(Grid, { item: true, xs: 12 },
                    React.createElement(Typography, { variant: "h6", gutterBottom: true }, "Token:"),
                    React.createElement(Typography, { variant: "body1", style: { wordBreak: 'break-all', overflowWrap: 'break-word' } },
                        React.createElement("img", { src: "/pyusd.png", alt: "PYUSD", style: { width: '24px', marginRight: '8px' } }),
                        'PYUSD',
                        " (",
                        payCrypto.tokenAddress,
                        ")")),
                React.createElement(Grid, { item: true, xs: 12 },
                    React.createElement(TextField, { label: "Token Amount", variant: "outlined", fullWidth: true, type: "number", name: "tokenAmount", value: payCrypto.tokenAmount, onChange: function (e) {
                            return payCrypto.updateFields &&
                                payCrypto.updateFields({
                                    tokenAmount: Number(e.target.value || 0),
                                    fiatAmount: payCrypto.fiatAmount,
                                    memo: payCrypto.memo,
                                });
                        } })),
                React.createElement(Grid, { item: true, xs: 12 },
                    React.createElement(TextField, { label: "Memo", variant: "outlined", fullWidth: true, name: "memo", value: payCrypto.memo, onChange: function (e) {
                            return payCrypto.updateFields &&
                                payCrypto.updateFields({
                                    memo: e.target.value,
                                    fiatAmount: payCrypto.fiatAmount,
                                    tokenAmount: payCrypto.tokenAmount,
                                });
                        } })),
                payCrypto.hash && (React.createElement(Grid, { item: true, xs: 12 },
                    React.createElement(Typography, { variant: "h6", gutterBottom: true }, "Transaction Hash:"),
                    React.createElement(Typography, { variant: "body1", style: { wordBreak: 'break-all', overflowWrap: 'break-word' } }, payCrypto.hash))),
                React.createElement(Grid, { item: true, xs: 12 },
                    React.createElement(Box, { display: "flex", gap: 2 },
                        React.createElement(Button, { color: "inherit", variant: "contained", onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    payCrypto.pay();
                                    return [2 /*return*/];
                                });
                            }); }, endIcon: payCrypto.isPayingLoading ? (React.createElement(CircularProgress, { size: 24, color: "inherit" })) : (React.createElement(Send, null)) }, payCrypto.isPayingLoading ? 'Paying' : 'Pay'),
                        React.createElement(Button, { color: "inherit", variant: "contained", onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    if (payCrypto.reset)
                                        payCrypto.reset();
                                    return [2 /*return*/];
                                });
                            }); }, endIcon: React.createElement(Cancel, null) }, "Cancel")))))));
}
function PayThroughRipeFiat(_a) {
    var _this = this;
    var payCrypto = _a.payCrypto;
    var SGD_USD_CONVERSION = 0.77;
    return (React.createElement("div", null,
        React.createElement(Box, { sx: { p: 3 } },
            React.createElement(Typography, { variant: "h5", gutterBottom: true }, "Pay Fiat using @Ripe"),
            React.createElement(Grid, { container: true, spacing: 2 }, !payCrypto.phoneNumber && !payCrypto.uen && !payCrypto.netsAcc ? (React.createElement(Grid, { item: true, xs: 12 },
                React.createElement(Typography, { variant: "body1", gutterBottom: true }, "No Phone Number, UEN and Nets account found"))) : (React.createElement(React.Fragment, null,
                payCrypto.phoneNumber && (React.createElement(Grid, { item: true, xs: 12 },
                    React.createElement(Typography, { variant: "h6", gutterBottom: true }, "Phone Number:"),
                    React.createElement(Typography, { variant: "body1", sx: { wordWrap: 'break-word' } }, payCrypto.phoneNumber))),
                payCrypto.uen && (React.createElement(Grid, { item: true, xs: 12 },
                    React.createElement(Typography, { variant: "h6", gutterBottom: true }, "UEN:"),
                    React.createElement(Typography, { variant: "body1", sx: { wordWrap: 'break-word' } }, payCrypto.uen))),
                payCrypto.netsAcc && (React.createElement(Grid, { item: true, xs: 12 },
                    React.createElement(Typography, { variant: "h6", gutterBottom: true }, "SG NETS Account:"),
                    React.createElement(Typography, { variant: "body1", sx: { wordWrap: 'break-word' } }, payCrypto.netsAcc))),
                React.createElement(Grid, { item: true, xs: 12 },
                    React.createElement(Typography, { variant: "h6", gutterBottom: true }, "Token:"),
                    React.createElement(Typography, { variant: "body1", style: { wordBreak: 'break-all', overflowWrap: 'break-word' } },
                        React.createElement("img", { src: "/pyusd.png", alt: "PYUSD", style: { width: '24px', marginRight: '8px' } }),
                        'PYUSD',
                        " (",
                        payCrypto.tokenAddress,
                        ")")),
                React.createElement(Grid, { item: true, xs: 6 },
                    React.createElement(TextField, { label: "Fiat Amount (SGD)", variant: "outlined", fullWidth: true, type: "number", name: "fiatAmount", value: payCrypto.fiatAmount, onChange: function (e) {
                            return payCrypto.updateFields &&
                                payCrypto.updateFields({
                                    fiatAmount: Number(e.target.value || 0),
                                    tokenAmount: Number(e.target.value || 0) * SGD_USD_CONVERSION,
                                    memo: payCrypto.memo,
                                });
                        } })),
                React.createElement(Grid, { item: true, xs: 6 },
                    React.createElement("div", { style: {
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
                        React.createElement("img", { src: "/pyusd.png", alt: "PYUSD", style: { width: '24px', marginRight: '8px' } }),
                        React.createElement(Typography, { variant: "body1", style: {
                                wordBreak: 'break-all',
                                overflowWrap: 'break-word',
                            } },
                            'PYUSD',
                            " ",
                            payCrypto.tokenAmount))),
                React.createElement(Grid, { item: true, xs: 12 },
                    React.createElement(TextField, { label: "Memo", variant: "outlined", fullWidth: true, name: "memo", value: payCrypto.memo, onChange: function (e) {
                            return payCrypto.updateFields &&
                                payCrypto.updateFields({
                                    memo: e.target.value,
                                    fiatAmount: payCrypto.fiatAmount,
                                    tokenAmount: payCrypto.tokenAmount,
                                });
                        } })),
                payCrypto.hash && (React.createElement(Grid, { item: true, xs: 12 },
                    React.createElement(Typography, { variant: "h6", gutterBottom: true }, "Transaction Hash:"),
                    React.createElement(Typography, { variant: "body1", style: {
                            wordBreak: 'break-all',
                            overflowWrap: 'break-word',
                        } }, payCrypto.hash))),
                React.createElement(Grid, { item: true, xs: 12 },
                    React.createElement(Box, { display: "flex", gap: 2 },
                        React.createElement(Button, { color: "inherit", variant: "contained", onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    payCrypto.pay();
                                    return [2 /*return*/];
                                });
                            }); }, endIcon: payCrypto.isPayingLoading ? (React.createElement(CircularProgress, { size: 24, color: "inherit" })) : (React.createElement(Send, null)) }, payCrypto.isPayingLoading ? 'Paying' : 'Pay'),
                        React.createElement(Button, { color: "inherit", variant: "contained", onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    if (payCrypto.reset)
                                        payCrypto.reset();
                                    return [2 /*return*/];
                                });
                            }); }, endIcon: React.createElement(Cancel, null) }, "Cancel")))))))));
}
export { PayProvider, usePay, PayUI };
