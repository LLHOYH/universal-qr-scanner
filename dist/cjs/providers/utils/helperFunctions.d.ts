import { TransferRequestURL } from '@solana/pay';
import { ParsedInstruction, ParsedTransactionWithMeta } from '@solana/web3.js';
declare function encrypt(data: string, apiKey: string): string;
declare function decrypt(data: string, apiKey: string): string;
declare function extractPayNowInfo(payNowString: string): {
    uen?: string;
    phoneNumber?: string;
    netsAccount?: string;
};
declare function isTransferRequestURL(obj: unknown): obj is TransferRequestURL;
declare function isParsedInstruction(obj: unknown): obj is ParsedInstruction;
declare function getRecipientAddress(tx: ParsedTransactionWithMeta): string;
declare const getTransactionAmount: (tx: ParsedTransactionWithMeta) => string;
export { encrypt, decrypt, extractPayNowInfo, isTransferRequestURL, isParsedInstruction, getRecipientAddress, getTransactionAmount, };
