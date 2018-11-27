const SECUtil = require('@sec-block/secjs-util')
const SECTokenTxModel = require('../model/tokenchain-trans-model')

const TX_VERSION = '0.1'

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
      self.tx[key] = tx[key]
    })

    // set this.txBuffer
    this.txBuffer = [
      Buffer.from(TX_VERSION),
      SECUtil.intToBuffer(this.tx.TimeStamp),
      Buffer.from(this.tx.TxFrom, 'hex'),
      Buffer.from(this.tx.TxTo, 'hex'),
      SECUtil.intToBuffer(this.tx.Value),
      Buffer.from(this.tx.GasLimit),
      Buffer.from(this.tx.GasUsedByTxn),
      Buffer.from(this.tx.GasPrice),
      Buffer.from(this.tx.Nonce, 'hex'),
      Buffer.from(this.tx.InputData),
      Buffer.from(JSON.stringify(this.tx.Signature))
    ]
    this.tx.TxHash = SECUtil.rlphash(this.txBuffer).toString('hex')
    this.tx.TxFee = parseInt(this.tx.GasUsedByTxn) * parseInt(this.tx.GasPrice)
    // this.TxReceiptStatus
    // this.TxHeight
  }

  _setTxFromBuffer (txBuffer) {
    // clear this.tx
    this.tx = SECTokenTxModel

    if (txBuffer.length !== 11) {
      throw new Error(`input txBuffer length(${txBuffer.length}) mismatch, its length should be: 11`)
    }

    // set this.tx
    this.tx = {
      Version: txBuffer[0].toString(),
      TimeStamp: SECUtil.bufferToInt(txBuffer[1]),
      TxFrom: txBuffer[2].toString('hex'),
      TxTo: txBuffer[3].toString('hex'),
      Value: SECUtil.bufferToInt(txBuffer[4]),
      GasLimit: txBuffer[5].toString(),
      GasUsedByTxn: txBuffer[6].toString(),
      GasPrice: txBuffer[7].toString(),
      Nonce: txBuffer[8].toString('hex'),
      InputData: txBuffer[9].toString(),
      Signature: JSON.parse(txBuffer[10].toString())
    }

    this.tx.TxHash = SECUtil.rlphash(txBuffer).toString('hex')
    this.tx.TxFee = parseInt(this.tx.GasUsedByTxn) * parseInt(this.tx.GasPrice)

    // set this.txBuffer
    this.txBuffer = txBuffer
  }

  // used for transaction signature
  _generateMsgHash () {
    if (this.txBuffer.length !== 11) {
      throw new Error(`_generateMsgHash: input txBuffer length(${this.txBuffer.length}) mismatch, its length should be: 11`)
    }

    // message used for sign does not include txVersion, Nonce and Signature
    let msgBuffer = this.txBuffer.slice(0, this.txBuffer.length - 1)
    msgBuffer = msgBuffer.splice(8, 1)
    msgBuffer = msgBuffer.splice(0, 1)
    let msgHash = SECUtil.rlphash(msgBuffer).toString('hex')
    return msgHash
  }

  getTxHash () {
    if (this.tx.TxHash !== '') {
      return this.tx.TxHash
    } else {
      throw Error('transaction hash not defined')
    }
  }

  verifySignature () {
    let msgHashString = this._generateMsgHash()
    let msgHashBuffer = Buffer.from(msgHashString, 'hex')

    try {
      let v = SECUtil.bufferToInt(this.tx.Signature.v)

      this._senderPubKey = SECUtil.ecrecover(msgHashBuffer, v, this.tx.Signature.r, this.tx.Signature.s)
    } catch (e) {
      return false
    }
    let _senderPubKeyBuffer = Buffer.from(this._senderPubKey, 'hex')
    let addressBuffer = SECUtil.publicToAddress(_senderPubKeyBuffer)
    let address = addressBuffer.toString('hex')
    if (address !== this.tx.TxFrom) {
      return false
    } else {
      return true
    }
  }
}

module.exports = SECTokenTx
