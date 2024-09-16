import React from 'react';
import { PaymentUIState } from '../PayContext';
declare function QRScanner({ decode }: {
    decode?: (rawQRData: string) => void;
}): React.JSX.Element;
declare function PayThroughSolana_Pay({ payCrypto }: {
    payCrypto: PaymentUIState;
}): React.JSX.Element;
declare function PayThroughSolanaTransfer({ payCrypto, }: {
    payCrypto: PaymentUIState;
}): React.JSX.Element;
declare function PayThroughRipeFiat({ payCrypto }: {
    payCrypto: PaymentUIState;
}): React.JSX.Element;
export { PayThroughSolana_Pay, PayThroughSolanaTransfer, PayThroughRipeFiat, QRScanner, };
