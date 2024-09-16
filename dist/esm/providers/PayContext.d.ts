import React from 'react';
import { ParsedTransactionWithMeta } from '@solana/web3.js';
type PayType = 'SOLANA_ADDRESS' | 'SOLANA_PAY' | 'RIPE_FIAT' | null;
export interface PaymentInfo {
    chainId: string;
    to: string;
    from: string;
    tokenAddress: string;
    tokenAmount: number;
    payType: PayType;
    memo: string;
    hash: string;
    pay: () => void;
    decode: (rawQRData: string) => void;
    reset?: () => void;
    updateFields?: ({ tokenAmount, memo, fiatAmount, }: {
        tokenAmount?: number;
        memo?: string;
        fiatAmount?: number;
    }) => void;
    getPaymentTransactions: () => Promise<PaymentTransaction[]>;
}
export interface FiatInfo {
    fiatAmount?: number;
    fiatCurrency?: 'SGD' | 'PESO' | 'IDR' | 'BHT';
    netsAcc?: string;
    uen?: string;
    phoneNumber?: string;
}
export interface MemoInfo {
    description: string;
    payType: PayType;
    from: string;
    to: string;
    tokenAddress: string;
    tokenAmount: string | number;
    fiatInfo?: FiatInfo;
}
export interface PaymentUIState extends PaymentInfo, FiatInfo {
    isPayingLoading: boolean;
}
export interface PaymentTransaction {
    memoInfo: MemoInfo;
    transaction: ParsedTransactionWithMeta;
}
declare function PayProvider({ children }: {
    children: React.ReactNode;
}): React.JSX.Element;
declare function usePay(): PaymentUIState;
declare function PayUI({ payCrypto }: {
    payCrypto: PaymentUIState;
}): React.JSX.Element;
export { PayProvider, usePay, PayUI };
