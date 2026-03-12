var crypto = require('crypto');

var SPKI_PREFIX_HEX = '302a300506032b6570032100',
    MAX_AUTH_MESSAGE_LENGTH = 400,
    NONCE_CACHE_TTL_MS = 5 * 60 * 1000,
    usedNonces = {};

function cleanupNonceCache() {
    var now = Date.now();
    Object.keys(usedNonces).forEach(function(key) {
        if((now - usedNonces[key]) > NONCE_CACHE_TTL_MS) {
            delete usedNonces[key];
        }
    });
}

function decodeBase58(input) {
    var alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
        base = alphabet.length,
        bytes = [0],
        i,
        j,
        carry,
        value;

    for(i = 0; i < input.length; i += 1) {
        value = alphabet.indexOf(input[i]);
        if(value < 0) {
            throw new Error('Invalid base58 character');
        }

        for(j = 0; j < bytes.length; j += 1) {
            bytes[j] *= base;
        }

        bytes[0] += value;
        carry = 0;

        for(j = 0; j < bytes.length; j += 1) {
            bytes[j] += carry;
            carry = bytes[j] >> 8;
            bytes[j] &= 0xff;
        }

        while(carry > 0) {
            bytes.push(carry & 0xff);
            carry >>= 8;
        }
    }

    for(i = 0; i < input.length && input[i] === '1'; i += 1) {
        bytes.push(0);
    }

    return Buffer.from(bytes.reverse());
}

function parseNonce(message) {
    var match = message.match(/Nonce:\s*([^\n\r]+)/);
    return match ? match[1].trim() : '';
}

function verifyWalletProof(walletAddress, authMessage, authSignatureBase64) {
    var publicKeyRaw,
        signatureBuffer,
        publicKeyDer,
        keyObject,
        nonce,
        verified;

    cleanupNonceCache();

    if(!walletAddress || !authMessage || !authSignatureBase64) {
        return false;
    }

    if(authMessage.length > MAX_AUTH_MESSAGE_LENGTH) {
        return false;
    }

    if(authMessage.indexOf('PumpQuest Login') !== 0 || authMessage.indexOf('Wallet: ' + walletAddress) === -1) {
        return false;
    }

    nonce = parseNonce(authMessage);
    if(!nonce || nonce.length < 8) {
        return false;
    }

    if(usedNonces[walletAddress + ':' + nonce]) {
        return false;
    }

    try {
        publicKeyRaw = decodeBase58(walletAddress);
        signatureBuffer = Buffer.from(authSignatureBase64, 'base64');
    } catch (e) {
        return false;
    }

    if(publicKeyRaw.length !== 32 || signatureBuffer.length !== 64) {
        return false;
    }

    publicKeyDer = Buffer.concat([Buffer.from(SPKI_PREFIX_HEX, 'hex'), publicKeyRaw]);
    keyObject = crypto.createPublicKey({ key: publicKeyDer, format: 'der', type: 'spki' });

    verified = crypto.verify(null, Buffer.from(authMessage, 'utf8'), keyObject, signatureBuffer);

    if(verified) {
        usedNonces[walletAddress + ':' + nonce] = Date.now();
    }

    return verified;
}

module.exports = {
    verifyWalletProof: verifyWalletProof
};
