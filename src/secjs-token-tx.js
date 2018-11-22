const SECUtil = require('@sec-block/secjs-util')
const SECTokenTxModel = require('../model/tokenchain-trans-model')

const util = new SECUtil()

class SECTokenTx {
  /**
    * create a transaction chain tx with config
    * @param {*} config
    */
  constructor (tx = {}) {
    this.txBuffer = []
    this.tx = SECTokenTxModel

    if (Object.keys(tx).length !== 0) {
      this.setTx(tx)
    }
  }

  getTx () {
    return this.tx
  }

  getTxBuffer () {
    return this.txBuffer
  }

  setTx (tx) {
    if (!(Array.isArray(tx))) {
      // set tx from json data
      this._setTxFromJson(tx)
    } else {
      // set tx from txBuffer data
      this._setTxFromBuffer(tx)
    }
  }

  _setTxFromJson (tx) {
    let self = this

    // clear this.tx
    this.tx = SECTokenTxModel

    // set this.tx
    Object.keys(tx).forEach(function (key) {
      if (!(key in tx)) {
        throw new Error(`key: ${key} is not recognized`)
      }
      self.tx.key = tx.key
    })
    if (this.tx.TxHash === '') {
      let hashInfo = {
        Version: this.tx.Version,
        TimeStamp: this.tx.TimeStamp,
        TxFrom: this.tx.TxFrom,
        TxTo: this.tx.TxTo,
        Value: this.tx.Value,
        GasLimit: this.tx.GasLimit,
        GasUsedByTxn: this.tx.GasUsedByTxn,
        GasPrice: this.tx.GasPrice,
        Nonce: this.tx.Nonce,
        InputData: this.tx.InputData,
        Signature: this.tx.Signature
      }
      this.tx.TxHash = util.rlphash(hashInfo).toString('hex')
    }

    this.tx.TxFee = parseInt(this.tx.GasUsedByTxn) * parseInt(this.tx.GasPrice)

    // set this.txBuffer
    this.txBuffer = [
      Buffer.from(this.tx.TxHash, 'hex'),
      Buffer.from(this.tx.TxReceiptStatus),
      Buffer.from(this.tx.Version),
      util.intToBuffer(this.tx.TimeStamp),
      Buffer.from(this.tx.TxFrom, 'hex'),
      Buffer.from(this.tx.TxTo, 'hex'),
      util.intToBuffer(this.tx.Value),
      Buffer.from(this.tx.GasLimit),
      Buffer.from(this.tx.GasUsedByTxn),
      Buffer.from(this.tx.GasPrice),
      util.intToBuffer(this.tx.TxFee),
      Buffer.from(this.tx.Nonce, 'hex'),
      Buffer.from(this.tx.InputData),
      Buffer.from(this.tx.Signature)
    ]
    if ((this.tx.TxReceiptStatus !== '') || (this.tx.TxReceiptStatus !== 'Pending')) {
      throw new Error('Invalid or Wrong Transaction Status')
    }
  }

  _setTxFromBuffer (txBuffer) {
    // clear this.tx
    this.tx = SECTokenTxModel

    if (txBuffer.length !== 14) {
      throw new Error(`input txBuffer length(${txBuffer.length}) mismatch, its length should be: 14`)
    }

    // set this.tx
    // this.tx.TxHash = txBuffer[0].toString('hex')
    this.tx.TxReceiptStatus = txBuffer[1].toString()
    this.tx.Version = txBuffer[2].toString()
    this.tx.TimeStamp = util.bufferToInt(txBuffer[3])
    this.tx.TxFrom = txBuffer[4].toString('hex')
    this.tx.TxTo = txBuffer[5].toString('hex')
    this.tx.Value = util.bufferToInt(txBuffer[6])
    this.tx.GasLimit = txBuffer[7].toString()
    this.tx.GasUsedByTxn = txBuffer[8].toString()
    this.tx.GasPrice = txBuffer[9].toString()
    // this.tx.TxFee = util.bufferToInt(txBuffer[10])
    this.tx.TxFee = parseInt(this.tx.GasUsedByTxn) * parseInt(this.tx.GasPrice)
    this.tx.Nonce = txBuffer[11].toString('hex')
    this.tx.InputData = txBuffer[12].toString()
    this.tx.Signature = txBuffer[13].toString()

    if (txBuffer[0].length === 0) {
      let hashInfo = {
        Version: this.tx.Version,
        TimeStamp: this.tx.TimeStamp,
        TxFrom: this.tx.TxFrom,
        TxTo: this.tx.TxTo,
        Value: this.tx.Value,
        GasLimit: this.tx.GasLimit,
        GasUsedByTxn: this.tx.GasUsedByTxn,
        GasPrice: this.tx.GasPrice,
        Nonce: this.tx.Nonce,
        InputData: this.tx.InputData,
        Signature: this.tx.Signature
      }
      this.tx.TxHash = util.rlphash(hashInfo).toString('hex')
    } else {
      this.tx.TxHash = txBuffer[0].toString('hex')
    }

    if ((this.tx.TxReceiptStatus !== '') || (this.tx.TxReceiptStatus !== 'Pending')) {
      throw new Error('Invalid or Wrong Transaction Status')
    }
    // set this.txBuffer
    this.txBuffer = txBuffer
  }

  getTxHash () {
    return util.rlphash(this.txBuffer).toString('hex')
  }

  getTxFee () {
    return parseInt(this.GasUsedByTxn) * parseInt(this.GasPrice)
  }

}

module.exports = SECTokenTx
