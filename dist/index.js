"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = require("crypto-js");
class Block {
    constructor(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
Block.caculateBlockHash = (index, previousHash, timestamp, data) => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
Block.validateStructure = (aBlock) => typeof aBlock.index === 'number' &&
    typeof aBlock.hash === 'string' &&
    typeof aBlock.previousHash === 'string' &&
    typeof aBlock.data === 'string' &&
    typeof aBlock.timestamp === 'number';
const genesisBlock = new Block(0, '2dsf0afasodf', '', 'hello', 1234);
let blockchain = [genesisBlock]; // array
const getBlockchain = () => blockchain;
const getLatestBlock = () => blockchain[blockchain.length - 1];
const getNewTimeStamp = () => Math.round(new Date().getTime() / 1000);
const createNewBlock = (data) => {
    const previousBlock = getLatestBlock();
    const newIndex = previousBlock.index + 1;
    const newTimeStamp = getNewTimeStamp();
    const newHash = Block.caculateBlockHash(newIndex, previousBlock.hash, newTimeStamp, data);
    const newBlock = new Block(newIndex, newHash, previousBlock.hash, data, newTimeStamp);
    addBlock(newBlock);
    return newBlock;
};
const getHashForBlock = (aBlock) => Block.caculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);
const isBlockValid = (cadidateBlock, previousBlock) => {
    if (!Block.validateStructure(cadidateBlock)) {
        return false; // block 구조 점검
    }
    else if (previousBlock.index + 1 !== cadidateBlock.index) {
        return false;
    }
    else if (previousBlock.hash !== cadidateBlock.previousHash) {
        return false;
    }
    else if (getHashForBlock(cadidateBlock) !== cadidateBlock.hash) {
        return false; // 계산한 hash가 다른 hash 값을 갖고 있는지 확인
    }
    else {
        return true;
    }
};
const addBlock = (cadidateBlock) => {
    if (isBlockValid(cadidateBlock, getLatestBlock())) {
        blockchain.push(cadidateBlock);
    }
};
createNewBlock('second block');
createNewBlock('third block');
createNewBlock('fourth block');
console.log(blockchain);
//# sourceMappingURL=index.js.map