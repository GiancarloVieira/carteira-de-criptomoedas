//Author: Giancarlo Vieira de Castro
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');
const BIP32Factory = require('bip32').default;
const ecc = require('tiny-secp256k1');

const bip32 = BIP32Factory(ecc);

const network = bitcoin.networks.testnet; // Rede testnet
const path = `m/84'/1'/0'/0/0`;

let mnemonic = bip39.generateMnemonic(); // Gerar uma frase mnemônica
const seed = bip39.mnemonicToSeedSync(mnemonic); // Converter a mnemônica em uma seed

let root = bip32.fromSeed(seed, network);

let node = root.derivePath(path);

let btcAddress = bitcoin.payments.p2wpkh({
    pubkey: node.publicKey,
    network: network
}).address;

console.log("Carteira Gerada");
console.log("Endereço: ", btcAddress);
console.log("Chave Privada: ", node.toWIF());
console.log("Seed: ", mnemonic);