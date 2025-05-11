// Importando as dependências
const bip32 = require('bip32');
const bip39 = require("bip39");
const bitcoin = require("bitcoinjs-lib");

// Definir a rede (testnet)
const network = bitcoin.networks.testnet;
// Caso queira usar a rede principal, substitua por: bitcoin.networks.bitcoin

// Definir o caminho BIP32 corretamente
const path = "m/49'/1'/0'/0"; // Caminho para carteiras HD compatíveis com SegWit

// Criando a semente (seed) a partir do mnemonic
let mnemonic = bip39.generateMnemonic(); // Gere um novo mnemonic
const seed = bip39.mnemonicToSeedSync(mnemonic);

// Criando a raiz da carteira HD
let root = bip32.fromSeed(seed, network);

// Criando uma conta e derivando uma chave privada
let account = root.derivePath(path);
let node = account.derive(0).derive(0);

// Criando um endereço Bitcoin (corrigido)
let btAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address;

// Exibindo as informações da carteira
console.log("Carteira criada!");
console.log("Endereço: ", btAddress);
console.log("Chave privada: ", node.toWIF());
console.log("Seed: ", mnemonic);