import crypto from 'crypto';
function encrypt(data, apiKey) {
    // Use the API key to create a key for encryption
    var key = crypto.createHash('sha256').update(apiKey).digest();
    // Create an initialization vector
    var iv = crypto.randomBytes(16);
    // Create cipher
    var cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    // Encrypt the data
    var encryptedData = cipher.update(data, 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    // Create a signature
    var hmac = crypto.createHmac('sha256', key);
    hmac.update(encryptedData);
    var signature = hmac.digest('hex');
    // Combine IV, encrypted data, and signature
    return iv.toString('hex') + ':' + encryptedData + ':' + signature;
}
function decrypt(data, apiKey) {
    // Split the encrypted memo into its components
    var _a = data.split(':'), ivHex = _a[0], encryptedData = _a[1], signature = _a[2];
    // Use the API key to recreate the encryption key
    var key = crypto.createHash('sha256').update(apiKey).digest();
    // Verify the signature
    var hmac = crypto.createHmac('sha256', key);
    hmac.update(encryptedData);
    var computedSignature = hmac.digest('hex');
    if (computedSignature !== signature) {
        throw new Error('Signature verification failed. The data may have been tampered with.');
    }
    // Recreate the IV
    var iv = Buffer.from(ivHex, 'hex');
    // Create decipher
    var decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    // Decrypt the data
    var decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
    decryptedData += decipher.final('utf8');
    // Parse the JSON data
    return decryptedData;
}
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
function isTransferRequestURL(obj) {
    return typeof obj === 'object' && obj !== null && 'recipient' in obj;
}
function isParsedInstruction(obj) {
    return (typeof obj === 'object' &&
        obj !== null &&
        'program' in obj &&
        'parsed' in obj);
}
function getRecipientAddress(tx) {
    var instructions = tx.transaction.message.instructions;
    // Look for a token transfer instruction
    var transferInstruction = instructions.find(function (ix) {
        return 'parsed' in ix &&
            ix.program === 'spl-token' &&
            ix.parsed.type === 'transfer';
    });
    if (transferInstruction && 'parsed' in transferInstruction) {
        return transferInstruction.parsed.info.destination;
    }
    // If we can't find a token transfer instruction, look for a system transfer
    var systemTransferInstruction = instructions.find(function (ix) {
        return 'parsed' in ix &&
            ix.program === 'system' &&
            ix.parsed.type === 'transfer';
    });
    if (systemTransferInstruction && 'parsed' in systemTransferInstruction) {
        return systemTransferInstruction.parsed.info.destination;
    }
    return 'Recipient address not found';
}
var getTransactionAmount = function (tx) {
    if (!tx.meta || !tx.meta.preTokenBalances || !tx.meta.postTokenBalances) {
        return 'N/A';
    }
    // Find the token account that changed
    var preBalances = tx.meta.preTokenBalances;
    var postBalances = tx.meta.postTokenBalances;
    var _loop_1 = function (i) {
        var preBalance = preBalances[i];
        var postBalance = postBalances.find(function (b) { return b.accountIndex === preBalance.accountIndex; });
        if (preBalance && postBalance) {
            var preAmount = preBalance.uiTokenAmount.uiAmount;
            var postAmount = postBalance.uiTokenAmount.uiAmount;
            if (preAmount !== null && postAmount !== null) {
                var difference = Math.abs(postAmount - preAmount);
                if (difference > 0) {
                    return { value: difference.toString() };
                }
            }
        }
    };
    for (var i = 0; i < preBalances.length; i++) {
        var state_1 = _loop_1(i);
        if (typeof state_1 === "object")
            return state_1.value;
    }
    return 'N/A';
};
export { encrypt, decrypt, extractPayNowInfo, isTransferRequestURL, isParsedInstruction, getRecipientAddress, getTransactionAmount, };
