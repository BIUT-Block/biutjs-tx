const SECUtil = require('@sec-block/secjs-util')
const SECTransactionTxModel = require('../model/transactionchain-trans-model')

class SECTransactionTx {
  /**
    * create a transaction chain tx with config
    * @param {*} config
    */
  constructor (config = {}) {
    this.config = config
    this.tx = SECTransactionTxModel
    this.txBuffer = []
    this.util = new SECUtil()
    if (Object.keys(config).length !== 0) {
      this._generateTx()
    }
  }

  getTx () {
    return this.tx
  }

  getTxBuffer () {
    return this.txBuffer
  }

  setTx (tx) {
    this.tx = Object.assign({}, tx)
    this._generateTxBuffer()
  }

  setTxFromBuffer (txBuffer) {
    this.txBuffer = txBuffer.slice(0)
    this.tx.TxHash = txBuffer[0].toString('hex')
    this.tx.TxReceiptStatus = txBuffer[1].toString()
    this.tx.Version = txBuffer[2].toString()
    this.tx.TimeStamp = this.util.bufferToInt(txBuffer[3])
    this.tx.SellerAddress = txBuffer[4].toString()
    this.tx.BuyerAddress = txBuffer[5].toString()
    this.tx.ShareHash = txBuffer[6].toString()
    this.tx.ShareTimeStamp = this.util.bufferToInt(txBuffer[7])
    this.tx.ProductInfo = JSON.parse(txBuffer[8].toString())
    this.tx.SharedTimes = this.util.bufferToInt(txBuffer[9])
    this.tx.Status = txBuffer[10].toString()
    this.tx.InputData = txBuffer[11].toString()
  }

  /**
    * assign value to tx
    */
  _generateTx () {
    this.tx = this.config
    this._generateTxBuffer()
  }

  _generateTxBuffer () {
    this.txBuffer = [
      Buffer.from(this.tx.TxHash, 'hex'),
      Buffer.from(this.tx.TxReceiptStatus),
      Buffer.from(this.tx.Version),
      this.util.intToBuffer(this.tx.TimeStamp),
      Buffer.from(this.tx.SellerAddress),
      Buffer.from(this.tx.BuyerAddress),
      Buffer.from(this.tx.ShareHash),
      this.util.intToBuffer(this.tx.ShareTimeStamp),
      Buffer.from(JSON.stringify(this.tx.ProductInfo)),
      this.util.intToBuffer(this.tx.SharedTimes),
      Buffer.from(this.tx.Status),
      Buffer.from(this.tx.InputData),
    ]
  }
}

module.exports = SECTransactionTx
