# Portal-Sol-Pay-Package

This project is a npm package that provides React Components and Contexts for Solana Chain QR Payment services, that is built on top of Portal wallet and other service partners.

NPM:
```
npm i portal-sol-pay-package
yarn add portal-sol-pay-package
```

We provide a QR scanner for you to integrate into your wallet, that helps your wallet do payment and transfer:
- via solana pay
- to real life merchant
- to solana Address


# Tech
Supports Next.js

# Get Starter
Include a next.config.mjs in your root
```
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    portalClientApiKey: process.env.PORTAL_CLIENT_API_KEY,
    solanaChainId: 'solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1',
    solMint: 'So11111111111111111111111111111111111111112',
    pyUsdMint: 'CXk2AMBfi3TwaEL2468s6zP8xq9NxTXjp9gjMgzeUynM',
    solanaRpcUrl: 'https://api.devnet.solana.com',
    pyUsdMainnet: '2b1kV6DkPAnxd5ixfnxCpjxmKwqjjaYmCZfHsFu24GXo',
  },
};

export default nextConfig;
```

create a 'PORTAL_CLIENT_API_KEY' in .env

Wrap ```PortalProvider``` and ```PayProvider``` around your project root. This will allow you to use the functions provided by portal-sol-pay-package.
```
import { PortalProvider, PayProvider } from 'portal-sol-pay-package';

    <PortalProvider>
      <PayProvider>
        {children}
      </PayProvider>
    </PortalProvider>
```

Last, on your page, import the Scanner UI that we provide, you are all set to see payment functions in your wallet
```
import { usePay, PayUI } from 'portal-sol-pay-package';
import React from 'react';

const Scan = () => {
  const payCrypto = usePay();

  return (
    <div>
      <PayUI payCrypto={payCrypto} />
    </div>
  );
};

export default Scan;
```


