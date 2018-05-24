let tokenchain_block_model = require('../model/tokenchain-block-model');
let tokenchain_trans_model = require('../model/tokenchain-trans-model');
let tx_block_model = require('../model/transactionchain-block-model');
let tx_trans_model = require('../model/transactionchain-trans-model');
let tx_pool_model = require('../model/transaction-pool-model');

class _TokenBlockModelHandler{
    constructor(){
        this.model = tokenchain_block_model;
    }

    getModel() {
        return this.model;
    }

    getHeight() {
        return this.model.Height;
    }

    setHeight(height) {
        this.model.Height = height;
    }

    getParentHash() {
        return this.model.Parent_Hash;
    }

    getSize() {
        return this.model.Size;
    }
}

class _TokenTxModelHandler{
    constructor(){
        this.model = tokenchain_trans_model;
    }

    getModel() {
        return this.model;
    }

    getHeight(){
        return this.model.Height;
    }

    getTimeStamp(){
        return this.model.getTimeStamp;
    }

    setTimeStamp(timestamp) {
        this.model.TimeStamp = timestamp;
    }

    setGasLimit(gaslimit){
        this.model.GasLimit = gaslimit;
    }

    getGasPrice(){
        return this.model.GasPrice;
    }
}

class _TxBlockModelHandler{
    constructor(){
        this.model = tx_trans_model;
    }

    getModel() {
        return this.model;
    }

    getHeight() {
        return this.model.Height;
    }

    setHeight(height) {
        this.model.Height = height;
    }

    setStatus(status){
        this.model.Status = status;
    }
}

class _TxTransModelHandler{
    constructor(){
        this.model = tx_trans_model;
    }

    getModel() {
        return this.model;
    }

    setProductInfo(product) {
        this.model.ProductInfo = product;
    }

    getProductInfo() {
        return this.model.ProductInfo;
    }
}

class SECModelHandler {
    constructor(params){
        this.params = params;
        switch (this.params.type){
            case 'tokenchain-block':
                this.handlerInstance = new _TokenBlockModelHandler();
                break;
            case 'tokenchain-trans':
                this.handlerInstance = new _TokenTxModelHandler();
                break;
            case 'transactionchain-block':
                this.handlerInstance = new _TxBlockModelHandler();
                break;
            case 'transactionchain-trans':

                break;
        }
    }

    getInstance(){
        return this.handlerInstance;
    }

    errorHandler(error) {
        console.log(error.message);
    }


}

module.exports = SECTransaction;