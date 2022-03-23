class Block {
    constructor(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
const genesisBlock = new Block(0, '2dsf0afasodf', '', 'hello', 1234);
let blockchain = [genesisBlock]; // array
console.log(blockchain);
//# sourceMappingURL=index.js.map