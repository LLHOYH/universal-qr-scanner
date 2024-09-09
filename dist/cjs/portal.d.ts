import * as React from 'react';
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
    sendTokensOnSolana: (to: string, tokenMint: string, tokenAmount: number) => Promise<string>;
}
export declare const PortalProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare const usePortal: () => IPortalContext;
export {};
