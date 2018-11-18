const SECUtil = require('@sec-block/secjs-util')
const SECTransactionTxModel = require('../model/transactionchain-trans-model')

const util = new SECUtil()

class SECTransactionTx {
  /**
    * create a transaction chain tx with config
    * @param {*} config
    */
  constructor (tx = {}) {
    this.txBuffer = []
    this.tx = SECTransactionTxModel

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
    this.tx = SECTransactionTxModel

    // set this.tx
    Object.keys(tx).forEach(function (key) {
      if (!(key in tx)) {
        throw new Error(`key: ${key} is not recognized`)
      }
      self.tx.key = tx.key
    })

    // set this.txBuffer
    this.txBuffer = [
      Buffer.from(this.tx.TxHash, 'hex'),
      Buffer.from(this.tx.TxReceiptStatus),
      Buffer.from(this.tx.Version),
      util.intToBuffer(this.tx.TimeStamp),
      Buffer.from(this.tx.SellerAddress),
      Buffer.from(this.tx.BuyerAddress),
      Buffer.from(this.tx.ShareHash),
      util.intToBuffer(this.tx.ShareTimeStamp),
      Buffer.from(JSON.stringify(this.tx.ProductInfo)),
      util.intToBuffer(this.tx.SharedTimes),
      Buffer.from(this.tx.Status),
      Buffer.from(this.tx.InputData)
    ]
  }

  _setTxFromBuffer (txBuffer) {
    // clear this.tx
    this.tx = SECTransactionTxModel

    if (txBuffer.length !== Object.keys(this.tx).length - 1) {
      throw new Error(`input txBuffer length(${txBuffer.length}) mismatch, its length should be: (${Object.keys(this.tx).length})`)
    }

    // set this.tx
    this.tx.TxHash = txBuffer[0].toString('hex')
    this.tx.TxReceiptStatus = txBuffer[1].toString()
    this.tx.Version = txBuffer[2].toString()
    this.tx.TimeStamp = util.bufferToInt(txBuffer[3])
    this.tx.SellerAddress = txBuffer[4].toString()
    this.tx.BuyerAddress = txBuffer[5].toString()
    this.tx.ShareHash = txBuffer[6].toString()
    this.tx.ShareTimeStamp = util.bufferToInt(txBuffer[7])
    this.tx.ProductInfo = JSON.parse(txBuffer[8].toString())
    this.tx.SharedTimes = util.bufferToInt(txBuffer[9])
    this.tx.Status = txBuffer[10].toString()
    this.tx.InputData = txBuffer[11].toString()

    // set this.txBuffer
    this.txBuffer = txBuffer
  }

  getTxHash () {
    return util.rlphash(this.txBuffer).toString('hex')
  }
}

module.exports = SECTransactionTx
