const SECUtil = require('@sec-tx/secjs-util')
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
    this.tx.TxReceiptStatus = txBuffer[1].toString('hex')
    this.tx.Version = txBuffer[2].toString('hex')
    this.tx.TimeStamp = this.util.BufferToInt(txBuffer[3])
    this.tx.SellerAddress = txBuffer[4].toString('hex')
    this.tx.BuyerAddress = txBuffer[5].toString('hex')
    this.tx.ShareHash = txBuffer[6].toString('hex')
    this.tx.ShareTimeStamp = this.util.BufferToInt(txBuffer[7])
    this.tx.ProductInfo = JSON.parse(txBuffer[8].toString())
    this.tx.SharedTimes = this.util.BufferToInt(txBuffer[9])
    this.tx.Status = txBuffer[10].toString('hex')
    this.tx.InputData = txBuffer[11].toString()
  }

  /**
    * assign value to tx
    */
  _generateTx () {
    this.tx.TxHash = this.util.rlphash(this.txBuffer).toString('hex')
    this._generateTxBuffer()
  }

  _generateTxBuffer () {
    this.txBuffer = [
      Buffer.from(this.tx.TxHash, 'hex'),
      Buffer.from(this.tx.TxReceiptStatus, 'hex'),
      Buffer.from(this.tx.Version, 'hex'),
      this.util.intToBuffer(this.tx.TimeStamp),
      Buffer.from(this.tx.SellerAddress, 'hex'),
      Buffer.from(this.tx.BuyerAddress, 'hex'),
      Buffer.from(this.tx.ShareHash, 'hex'),
      this.util.intToBuffer(this.tx.ShareTimeStamp),
      Buffer.from(JSON.stringify(this.tx.ProductInfo)),
      this.util.intToBuffer(this.tx.SharedTimes),
      Buffer.from(this.tx.Status, 'hex'),
      Buffer.from(this.tx.InputData),
    ]
  }
}

module.exports = SECTransactionTx
