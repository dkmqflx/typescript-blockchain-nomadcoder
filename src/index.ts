import * as CryptoJS from 'crypto-js';

class Block {
  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;

  static caculateBlockHash = (index: number, previousHash: string, timestamp: number, data: string): string =>
    CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

  static validateStructure = (aBlock: Block): boolean =>
    typeof aBlock.index === 'number' &&
    typeof aBlock.hash === 'string' &&
    typeof aBlock.previousHash === 'string' &&
    typeof aBlock.data === 'string' &&
    typeof aBlock.timestamp === 'number';

  constructor(index: number, hash: string, previousHash: string, data: string, timestamp: number) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = timestamp;
  }
}

const genesisBlock: Block = new Block(0, '2dsf0afasodf', '', 'hello', 1234);

let blockchain: Block[] = [genesisBlock]; // array

const getBlockchain = (): Block[] => blockchain;

const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
  const previousBlock: Block = getLatestBlock();
  const newIndex: number = previousBlock.index + 1;
  const newTimeStamp: number = getNewTimeStamp();
  const newHash: string = Block.caculateBlockHash(newIndex, previousBlock.hash, newTimeStamp, data);
  const newBlock: Block = new Block(newIndex, newHash, previousBlock.hash, data, newTimeStamp);

  addBlock(newBlock);

  return newBlock;
};

const getHashForBlock = (aBlock: Block): string =>
  Block.caculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);

const isBlockValid = (cadidateBlock: Block, previousBlock: Block): boolean => {
  if (!Block.validateStructure(cadidateBlock)) {
    return false; // block 구조 점검
  } else if (previousBlock.index + 1 !== cadidateBlock.index) {
    return false;
  } else if (previousBlock.hash !== cadidateBlock.previousHash) {
    return false;
  } else if (getHashForBlock(cadidateBlock) !== cadidateBlock.hash) {
    return false; // 계산한 hash가 다른 hash 값을 갖고 있는지 확인
  } else {
    return true;
  }
};

const addBlock = (cadidateBlock: Block): void => {
  if (isBlockValid(cadidateBlock, getLatestBlock())) {
    blockchain.push(cadidateBlock);
  }
};

createNewBlock('second block');
createNewBlock('third block');
createNewBlock('fourth block');

console.log(blockchain);
