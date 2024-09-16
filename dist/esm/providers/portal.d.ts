import * as React from 'react';
import { ParsedTransactionWithMeta } from '@solana/web3.js';
export interface ITokenBalance {
    balance: string;
    decimals: number;
    name: string;
    rawBalance: string;
    symbol: string;
    metadata: Record<string, unknown> & {
        tokenMintAddress: string;
    };
}
interface IPortalContext {
    ready: boolean;
    getSolanaAddress: () => Promise<string>;
    getSolanaTokenBalances: () => Promise<ITokenBalance[]>;
    sendTokensOnSolanaWithMemo: (to: string, tokenMint: string, tokenAmount: number, memo?: string) => Promise<string>;
    getAllTransactions: () => Promise<(ParsedTransactionWithMeta | null)[] | undefined>;
}
export declare const PortalProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare const usePortal: () => IPortalContext;
export {};
