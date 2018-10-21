const SECUtil = require('@sec-tx/secjs-util')
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
    this.tx.TxReceiptStatus = txBuffer[1].toString('hex')
    this.tx.Version = txBuffer[2].toString('hex')
    this.tx.TimeStamp = this.util.BufferToInt(txBuffer[3])
    this.tx.TxFrom = txBuffer[4].toString('hex')
    this.tx.TxTo = txBuffer[5].toString('hex')
    this.tx.Value = txBuffer[6].toString('hex')
    this.tx.GasLimit = txBuffer[7].toString('hex')
    this.tx.GasUsedByTxn = txBuffer[8].toString('hex')
    this.tx.GasPrice = txBuffer[9].toString('hex')
    this.tx.TxFee = txBuffer[10].toString('hex')
    this.tx.Nonce = txBuffer[11].toString('hex')
    this.tx.InputData = txBuffer[12].toString()
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
      Buffer.from(this.tx.TxFrom, 'hex'),
      Buffer.from(this.tx.TxTo, 'hex'),
      Buffer.from(this.tx.Value, 'hex'),
      Buffer.from(this.tx.GasLimit, 'hex'),
      Buffer.from(this.tx.GasUsedByTxn, 'hex'),
      Buffer.from(this.tx.GasPrice, 'hex'),
      Buffer.from(this.tx.TxFee, 'hex'),
      Buffer.from(this.tx.Nonce, 'hex'),
      Buffer.from(this.tx.InputData)
    ]
  }
}

module.exports = SECTokenTx
