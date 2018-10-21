const SECUtil = require('@sec-block/secjs-util')
const SECTokenTxModel = require('../model/tokenchain-trans-model')

class SECTokenTx {
  /**
    * create a transaction chain tx with config
    * @param {*} config
    */
  constructor (config = {}) {
    this.config = config
    this.tx = SECTokenTxModel
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
    this.tx.TxFrom = txBuffer[4].toString('hex')
    this.tx.TxTo = txBuffer[5].toString('hex')
    this.tx.Value = txBuffer[6].toString()
    this.tx.GasLimit = txBuffer[7].toString()
    this.tx.GasUsedByTxn = txBuffer[8].toString()
    this.tx.GasPrice = txBuffer[9].toString()
    this.tx.TxFee = txBuffer[10].toString()
    this.tx.Nonce = txBuffer[11].toString('hex')
    this.tx.InputData = txBuffer[12].toString()
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
      Buffer.from(this.tx.TxFrom, 'hex'),
      Buffer.from(this.tx.TxTo, 'hex'),
      Buffer.from(this.tx.Value),
      Buffer.from(this.tx.GasLimit),
      Buffer.from(this.tx.GasUsedByTxn),
      Buffer.from(this.tx.GasPrice),
      Buffer.from(this.tx.TxFee),
      Buffer.from(this.tx.Nonce, 'hex'),
      Buffer.from(this.tx.InputData)
    ]
  }

  getTxHash() {
    return this.util.rlphash(this.txBuffer).toString('hex')
  }
}

module.exports = SECTokenTx
