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
import React, { useContext, createContext, useReducer, useEffect } from 'react';
import { usePortal } from './portal';
import { parseURL } from '@solana/pay';
import { encrypt, decrypt, extractPayNowInfo, isTransferRequestURL, isParsedInstruction, } from './utils/helperFunctions';
import { PayThroughSolana_Pay, PayThroughSolanaTransfer, PayThroughRipeFiat, QRScanner, } from './utils/payUI';
var PYUSDAddress = process.env.pyUsdMint || 'CXk2AMBfi3TwaEL2468s6zP8xq9NxTXjp9gjMgzeUynM';
var MemoPrefix = 'Ripe:';
var RIPE_ADDRESS = 'Cve1SAJDWSS3FSLU8pu5nLn8nsKZyGaKUystwWb9xpWy';
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
    getPaymentTransactions: function () { return Promise.resolve([]); },
};
var PayContext = createContext(initialState);
function reducer(state, action) {
    switch (action.type) {
        case 'initiate':
            return __assign({}, action.payload);
        case 'setPayer':
            return __assign(__assign({}, state), { from: action.payload.from });
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
    useEffect(function () {
        function setPayerAfterInitiate() {
            return __awaiter(this, void 0, void 0, function () {
                var address;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, portal.getSolanaAddress()];
                        case 1:
                            address = _a.sent();
                            dispatch({
                                type: 'setPayer',
                                payload: { from: address },
                            });
                            return [2 /*return*/];
                    }
                });
            });
        }
        if (!portal || !(portal === null || portal === void 0 ? void 0 : portal.ready))
            return;
        setPayerAfterInitiate();
    }, [portal]);
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
                        if (!state || !process.env.portalClientApiKey)
                            return [2 /*return*/];
                        dispatch({
                            type: 'pay',
                            payload: __assign(__assign({}, state), { isPayingLoading: true }),
                        });
                        return [4 /*yield*/, portal.sendTokensOnSolanaWithMemo(state.to, state.tokenAddress, state.tokenAmount, constructMemoWithEncryption(state.memo || 'no memo provided', process.env.portalClientApiKey))];
                    case 1:
                        hash = _a.sent();
                        dispatch({
                            type: 'pay',
                            payload: __assign(__assign({}, state), { isPayingLoading: false, hash: hash }),
                        });
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
            var _b, _c;
            return __generator(this, function (_d) {
                //if it is a solana pay qrcode
                if (rawQRData.substring(0, 7) === 'solana:') {
                    try {
                        payParams = parseURL(rawQRData);
                        if (!isTransferRequestURL(payParams))
                            return [2 /*return*/];
                        dispatch({
                            type: 'decode',
                            payload: __assign(__assign({}, state), { to: payParams === null || payParams === void 0 ? void 0 : payParams.recipient.toString(), tokenAmount: Number(payParams === null || payParams === void 0 ? void 0 : payParams.amount), tokenAddress: ((_b = payParams === null || payParams === void 0 ? void 0 : payParams.splToken) === null || _b === void 0 ? void 0 : _b.toString()) || '', memo: ((_c = payParams === null || payParams === void 0 ? void 0 : payParams.memo) === null || _c === void 0 ? void 0 : _c.toString()) || '', payType: 'SOLANA_PAY' }),
                        });
                    }
                    catch (error) {
                        console.error('invalid solana pay qr code: ', error);
                    }
                    finally {
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
                        payload: __assign(__assign({}, state), { tokenAddress: PYUSDAddress, payType: 'RIPE_FIAT', uen: uen, phoneNumber: phoneNumber, netsAcc: netsAccount, fiatCurrency: 'SGD', to: RIPE_ADDRESS }),
                    });
                    return [2 /*return*/];
                }
                //if it is a solana address, which is usually between 32-44 characters
                if (rawQRData.length >= 32 && rawQRData.length <= 44) {
                    dispatch({
                        type: 'decode',
                        payload: __assign(__assign({}, state), { to: rawQRData, tokenAddress: PYUSDAddress, payType: 'SOLANA_ADDRESS' }),
                    });
                    return [2 /*return*/];
                }
                return [2 /*return*/];
            });
        });
    }
    function getPaymentTransactions() {
        return __awaiter(this, void 0, void 0, function () {
            var paymentTransactions, transactions, i, tx, instructions, j, instruction, memoEncodedText, memoInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!process.env.portalClientApiKey)
                            return [2 /*return*/, []];
                        paymentTransactions = [];
                        return [4 /*yield*/, portal.getAllTransactions()];
                    case 1:
                        transactions = _a.sent();
                        if (!transactions || transactions.length === 0)
                            return [2 /*return*/, []];
                        for (i = 0; i < (transactions === null || transactions === void 0 ? void 0 : transactions.length); i++) {
                            tx = transactions[i];
                            if (!tx)
                                continue;
                            instructions = tx.transaction.message.instructions;
                            if (!instructions || instructions.length === 0)
                                continue;
                            for (j = 0; j < instructions.length; j++) {
                                instruction = instructions[j];
                                if (!isParsedInstruction(instruction))
                                    continue;
                                memoEncodedText = instruction.parsed;
                                memoInfo = destructureMemoWithDecryption(memoEncodedText, process.env.portalClientApiKey);
                                if (!memoInfo)
                                    continue;
                                if ('description' in memoInfo) {
                                    console.log(tx.transaction);
                                    console.log(tx.transaction.message.accountKeys.map(function (k) { return k.pubkey.toBase58(); }));
                                    paymentTransactions.push({
                                        memoInfo: memoInfo,
                                        transaction: tx,
                                    });
                                }
                            }
                        }
                        return [2 /*return*/, paymentTransactions];
                }
            });
        });
    }
    function constructMemoWithEncryption(description, apiKey) {
        var memoInfo = {
            description: description,
            payType: state.payType,
            to: state.to,
            from: state.from,
            tokenAddress: state.tokenAddress,
            tokenAmount: state.tokenAmount,
        };
        if (state.payType === 'RIPE_FIAT') {
            memoInfo.fiatInfo = {
                fiatAmount: state.fiatAmount,
                fiatCurrency: state.fiatCurrency,
                netsAcc: state.netsAcc,
                uen: state.uen,
                phoneNumber: state.phoneNumber,
            };
        }
        return MemoPrefix + encrypt(JSON.stringify(memoInfo), apiKey);
    }
    function destructureMemoWithDecryption(memo, apiKey) {
        try {
            if (!memo || typeof memo !== 'string')
                return null;
            if (!memo.startsWith(MemoPrefix))
                throw new Error('This is not a payment transaction initiated by Ripe');
            var memoInfo = JSON.parse(decrypt(memo.substring(5), apiKey));
            if (!(memoInfo === null || memoInfo === void 0 ? void 0 : memoInfo.description) || !(memoInfo === null || memoInfo === void 0 ? void 0 : memoInfo.payType))
                throw new Error('This is not a payment transaction initiated by Ripe');
            return memoInfo;
        }
        catch (error) {
            console.error(error);
        }
        return null;
    }
    return (React.createElement(PayContext.Provider, { value: __assign(__assign({}, state), { pay: pay, decode: decode, reset: reset, updateFields: updateFields, getPaymentTransactions: getPaymentTransactions }) }, children));
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
export { PayProvider, usePay, PayUI };
