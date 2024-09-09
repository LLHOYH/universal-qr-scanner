import React from 'react';
interface PaymentInfo {
    chainId: string;
    to: string;
    from: string;
    tokenAddress: string;
    tokenAmount: number;
    payType: 'SOLANA_ADDRESS' | 'SOLANA_PAY' | 'RIPE_FIAT' | null;
    memo?: string;
    hash: string;
    pay: () => void;
    decode: (rawQRData: string) => void;
    reset?: () => void;
    updateFields?: ({ tokenAmount, memo, fiatAmount, }: {
        tokenAmount?: number;
        memo?: string;
        fiatAmount?: number;
    }) => void;
}
interface FiatInfo {
    fiatAmount?: number;
    fiatCurrency?: 'SGD' | 'PESO' | 'IDR' | 'BHT';
    netsAcc?: string;
    uen?: string;
    phoneNumber?: string;
}
interface PaymentUIState extends PaymentInfo, FiatInfo {
    isPayingLoading: boolean;
}
declare function PayProvider({ children }: {
    children: React.ReactNode;
}): React.JSX.Element;
declare function usePay(): PaymentUIState;
declare function PayUI({ payCrypto }: {
    payCrypto: PaymentUIState;
}): React.JSX.Element;
export { PayProvider, usePay, PayUI };
