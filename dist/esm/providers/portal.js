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
import * as React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import Portal from '@portal-hq/web';
import { Connection, PublicKey, Transaction, TransactionInstruction, } from '@solana/web3.js';
var pyusdThumb = '/pyusd.png';
var solanaThumb = '/solana.png';
var PortalContext = createContext({});
export var PortalProvider = function (_a) {
    var children = _a.children;
    var SOLANA_MEMO_PROGRAM_ID = 'MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr';
    var _b = useState(), portal = _b[0], setPortal = _b[1];
    useEffect(function () {
        var _a;
        setPortal(new Portal({
            apiKey: process.env.portalClientApiKey,
            autoApprove: true,
            rpcConfig: (_a = {},
                _a[process.env.solanaChainId] = process.env.solanaRpcUrl,
                _a),
        }));
    }, []);
    return (React.createElement(PortalContext.Provider, { value: {
            ready: Boolean(portal && portal.ready),
            getSolanaAddress: function () {
                return __awaiter(this, void 0, void 0, function () {
                    var walletExists, solAddress;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!portal || !(portal === null || portal === void 0 ? void 0 : portal.ready))
                                    throw new Error('Portal has not initialised');
                                return [4 /*yield*/, portal.doesWalletExist()];
                            case 1:
                                walletExists = _a.sent();
                                if (!!walletExists) return [3 /*break*/, 3];
                                return [4 /*yield*/, portal.createWallet()];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3: return [4 /*yield*/, portal.getSolanaAddress()];
                            case 4:
                                solAddress = _a.sent();
                                return [2 /*return*/, solAddress];
                        }
                    });
                });
            },
            getSolanaTokenBalances: function () {
                return __awaiter(this, void 0, void 0, function () {
                    var res, data, pyusdBalance;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fetch('/api/getSolanaAssets')];
                            case 1:
                                res = _a.sent();
                                return [4 /*yield*/, res.json()];
                            case 2:
                                data = _a.sent();
                                if (data.error)
                                    throw new Error(data.error);
                                pyusdBalance = data.tokenBalances.find(function (tb) {
                                    return tb.metadata.tokenMintAddress === process.env.pyusdMint;
                                }) || {
                                    balance: '0',
                                    decimals: 6,
                                    name: 'PayPal USD',
                                    rawBalance: '0',
                                    symbol: 'PYUSD',
                                    metadata: {
                                        tokenMintAddress: process.env.pyusdMint,
                                    },
                                };
                                return [2 /*return*/, [
                                        {
                                            balance: data.nativeBalance.balance,
                                            decimals: data.nativeBalance.decimals,
                                            name: data.nativeBalance.name,
                                            rawBalance: data.nativeBalance.rawBalance,
                                            symbol: data.nativeBalance.symbol,
                                            metadata: __assign({ tokenMintAddress: process.env.solMint, thumbnail: solanaThumb }, data.nativeBalance.metadata),
                                        },
                                        __assign({}, data.tokenBalances.map(function (tb) {
                                            if (tb.metadata.tokenMintAddress !== process.env.pyusdMint) {
                                                return __assign(__assign({}, tb), { metadata: __assign(__assign({}, tb.metadata), { thumbnail: pyusdThumb }) });
                                            }
                                        })[0]),
                                    ]];
                        }
                    });
                });
            },
            sendTokensOnSolanaWithMemo: function (to_1, tokenMint_1, tokenAmount_1) {
                return __awaiter(this, arguments, void 0, function (to, tokenMint, tokenAmount, memo) {
                    var res, data, transaction, memoInstruction, serializedTransaction, txnHash;
                    if (memo === void 0) { memo = 'no memo provided'; }
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!portal || !(portal === null || portal === void 0 ? void 0 : portal.ready))
                                    throw new Error('Portal has not initialised');
                                return [4 /*yield*/, fetch('/api/buildSolanaTransaction', {
                                        method: 'POST',
                                        body: JSON.stringify({
                                            to: to,
                                            token: tokenMint,
                                            amount: String(tokenAmount),
                                        }),
                                    })];
                            case 1:
                                res = _a.sent();
                                return [4 /*yield*/, res.json()];
                            case 2:
                                data = _a.sent();
                                if (data.error)
                                    throw new Error(data.error);
                                transaction = Transaction.from(Buffer.from(data.transaction, 'base64'));
                                memoInstruction = new TransactionInstruction({
                                    keys: [],
                                    programId: new PublicKey(SOLANA_MEMO_PROGRAM_ID),
                                    data: Buffer.from(memo),
                                });
                                transaction.add(memoInstruction);
                                serializedTransaction = transaction
                                    .serialize({
                                    requireAllSignatures: false,
                                    verifySignatures: false,
                                })
                                    .toString('base64');
                                return [4 /*yield*/, portal.request({
                                        chainId: process.env.solanaChainId,
                                        method: 'sol_signAndSendTransaction',
                                        params: serializedTransaction,
                                    })];
                            case 3:
                                txnHash = _a.sent();
                                return [2 /*return*/, txnHash];
                        }
                    });
                });
            },
            getAllTransactions: function () {
                return __awaiter(this, void 0, void 0, function () {
                    var address, connection, pubKey, transactionList, signatures, i, tx, error_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!portal || !(portal === null || portal === void 0 ? void 0 : portal.ready))
                                    throw new Error('Portal has not initialised');
                                return [4 /*yield*/, portal.getSolanaAddress()];
                            case 1:
                                address = _a.sent();
                                if (!process.env.solanaRpcUrl || !address)
                                    return [2 /*return*/];
                                connection = new Connection(process.env.solanaRpcUrl);
                                pubKey = new PublicKey(address);
                                transactionList = [];
                                _a.label = 2;
                            case 2:
                                _a.trys.push([2, 8, , 9]);
                                return [4 /*yield*/, connection.getSignaturesForAddress(pubKey)];
                            case 3:
                                signatures = _a.sent();
                                i = 0;
                                _a.label = 4;
                            case 4:
                                if (!(i < signatures.length)) return [3 /*break*/, 7];
                                return [4 /*yield*/, connection.getParsedTransaction(signatures[i].signature, {
                                        maxSupportedTransactionVersion: 0,
                                    })];
                            case 5:
                                tx = _a.sent();
                                transactionList.push(tx);
                                _a.label = 6;
                            case 6:
                                i++;
                                return [3 /*break*/, 4];
                            case 7:
                                // Filter out any null transactions
                                transactionList = transactionList.filter(function (tx) { return tx !== null; });
                                return [2 /*return*/, transactionList];
                            case 8:
                                error_1 = _a.sent();
                                console.error('Error fetching transactions:', error_1);
                                return [3 /*break*/, 9];
                            case 9: return [2 /*return*/, []];
                        }
                    });
                });
            },
        } }, children));
};
export var usePortal = function () { return useContext(PortalContext); };
