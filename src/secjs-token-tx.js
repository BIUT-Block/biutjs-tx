const SECUtil = require('@sec-block/secjs-util')
const SECTokenTxModel = require('../model/tokenchain-trans-model')

const TX_VERSION = 0.1

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
    try {
      if (!(Array.isArray(tx))) {
        // set tx from json data
        this._setTxFromJson(tx)
      } else {
        // set tx from txBuffer data
        this._setTxFromBuffer(tx)
      }
    } catch (err) {
      throw Error(`Error ${err} occurs when set transaction object`)
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

    // calculate transaction hash
    let hashInfo = {
      Version: TX_VERSION,

      // from client
      TimeStamp: this.tx.TimeStamp,
      TxFrom: this.tx.TxFrom,
      TxTo: this.tx.TxTo,
      Value: this.tx.Value,
      InputData: this.tx.InputData,
      Signature: this.tx.Signature,

      // from main process
      GasLimit: this.tx.GasLimit,
      GasUsedByTxn: this.tx.GasUsedByTxn,
      GasPrice: this.tx.GasPrice,
      Nonce: this.tx.Nonce
    }
    this.tx.TxHash = SECUtil.rlphash(hashInfo).toString('hex')
    this.tx.TxFee = parseInt(this.tx.GasUsedByTxn) * parseInt(this.tx.GasPrice)

    // set this.txBuffer
    this.txBuffer = [
      Buffer.from(this.tx.TxHash, 'hex'),
      Buffer.from(this.tx.TxReceiptStatus),
      Buffer.from(this.tx.Version),
      SECUtil.intToBuffer(this.tx.TimeStamp),
      Buffer.from(this.tx.TxFrom, 'hex'),
      Buffer.from(this.tx.TxTo, 'hex'),
      SECUtil.intToBuffer(this.tx.Value),
      Buffer.from(this.tx.GasLimit),
      Buffer.from(this.tx.GasUsedByTxn),
      Buffer.from(this.tx.GasPrice),
      SECUtil.intToBuffer(this.tx.TxFee),
      Buffer.from(this.tx.Nonce, 'hex'),
      Buffer.from(this.tx.InputData),
      Buffer.from(this.tx.Signature)
    ]
  }

  _setTxFromBuffer (txBuffer) {
    // clear this.tx
    this.tx = SECTokenTxModel

    if (txBuffer.length !== 14) {
      throw new Error(`input txBuffer length(${txBuffer.length}) mismatch, its length should be: 14`)
    }

    // set this.tx
    this.tx.TxHash = txBuffer[0].toString('hex')
    this.tx.TxReceiptStatus = txBuffer[1].toString()
    this.tx.Version = txBuffer[2].toString()
    this.tx.TimeStamp = SECUtil.bufferToInt(txBuffer[3])
    this.tx.TxFrom = txBuffer[4].toString('hex')
    this.tx.TxTo = txBuffer[5].toString('hex')
    this.tx.Value = SECUtil.bufferToInt(txBuffer[6])
    this.tx.GasLimit = txBuffer[7].toString()
    this.tx.GasUsedByTxn = txBuffer[8].toString()
    this.tx.GasPrice = txBuffer[9].toString()
    this.tx.TxFee = SECUtil.bufferToInt(txBuffer[10])
    this.tx.Nonce = txBuffer[11].toString('hex')
    this.tx.InputData = txBuffer[12].toString()
    this.tx.Signature = txBuffer[13].toString()

    // set this.txBuffer
    this.txBuffer = txBuffer
  }

  getTxHash () {
    if (this.tx.TxHash !== '') {
      return this.tx.TxHash
    } else {
      throw Error('transaction hash not defined')
    }
  }
}

module.exports = SECTokenTx
