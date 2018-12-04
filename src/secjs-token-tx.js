const SECUtils = require('@sec-block/secjs-util')
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

    this.tx.TxHash = this._calculateTxHash()
    this.tx.TxFee = parseFloat(this.tx.GasPrice) * parseFloat(this.tx.GasUsedByTxn)
    this.tx.TxFee = this.tx.TxFee.toString()

    // set this.txBuffer
    this.txBuffer = [
      Buffer.from(this.tx.TxHash),
      Buffer.from(this.tx.TxReceiptStatus),
      Buffer.from(TX_VERSION),
      SECUtils.intToBuffer(this.tx.TimeStamp),
      Buffer.from(this.tx.TxFrom, 'hex'),
      Buffer.from(this.tx.TxTo, 'hex'),
      Buffer.from(this.tx.Value),
      Buffer.from(this.tx.GasLimit),
      Buffer.from(this.tx.GasUsedByTxn),
      Buffer.from(this.tx.GasPrice),
      Buffer.from(this.tx.TxFee),
      Buffer.from(this.tx.Nonce),
      Buffer.from(this.tx.InputData),
      Buffer.from(JSON.stringify(this.tx.Signature))
    ]
  }

  _setTxFromBuffer (txBuffer) {
    // clear this.tx
    this.tx = SECTokenTxModel

    if (txBuffer.length !== 14) {
      throw new Error(`input txBuffer length(${txBuffer.length}) mismatch, its length should be: 14`)
    }

    // set this.tx
    this.tx = {
      TxHash: txBuffer[0].toString(),
      TxReceiptStatus: txBuffer[1].toString(),
      Version: txBuffer[2].toString(),
      TimeStamp: SECUtils.bufferToInt(txBuffer[3]),
      TxFrom: txBuffer[4].toString('hex'),
      TxTo: txBuffer[5].toString('hex'),
      Value: txBuffer[6].toString(),
      GasLimit: txBuffer[7].toString(),
      GasUsedByTxn: txBuffer[8].toString(),
      GasPrice: txBuffer[9].toString(),
      TxFee: txBuffer[10].toString(),
      Nonce: txBuffer[11].toString(),
      InputData: txBuffer[12].toString(),
      Signature: JSON.parse(txBuffer[13].toString())
    }

    // set this.txBuffer
    this.txBuffer = txBuffer
  }

  _calculateTxHash () {
    let txHashBuffer = [
      Buffer.from(TX_VERSION),
      SECUtils.intToBuffer(this.tx.TimeStamp),
      Buffer.from(this.tx.TxFrom, 'hex'),
      Buffer.from(this.tx.TxTo, 'hex'),
      Buffer.from(this.tx.Value),
      Buffer.from(this.tx.GasLimit),
      Buffer.from(this.tx.GasUsedByTxn),
      Buffer.from(this.tx.GasPrice),
      Buffer.from(this.tx.Nonce),
      Buffer.from(this.tx.InputData),
      Buffer.from(JSON.stringify(this.tx.Signature))
    ]

    return SECUtils.rlphash(txHashBuffer).toString('hex')
  }

  getTxHash () {
    if (this.tx.TxHash !== '') {
      return this.tx.TxHash
    } else {
      throw Error('transaction hash not defined')
    }
  }

  verifySignature () {
    let msgHashBuffer = this._generateSignMsgHash()
    let signBuffer = this.tx.Signature
    signBuffer = {
      v: signBuffer.v,
      r: Buffer.from(signBuffer.r, 'hex'),
      s: Buffer.from(signBuffer.s, 'hex')
    }

    try {
      this._senderPubKey = SECUtils.ecrecover(msgHashBuffer, signBuffer.v, signBuffer.r, signBuffer.s)
    } catch (e) {
      return false
    }
    let _senderPubKeyBuffer = Buffer.from(this._senderPubKey, 'hex')
    let addressBuffer = SECUtils.publicToAddress(_senderPubKeyBuffer)
    let address = addressBuffer.toString('hex')
    if (address !== this.tx.TxFrom) {
      return false
    } else {
      return true
    }
  }

  // used for transaction signature
  _generateSignMsgHash () {
    if (this.txBuffer.length !== 14) {
      throw new Error(`_generateSignMsgHash: input txBuffer length(${this.txBuffer.length}) mismatch, its length should be: 14`)
    }

    // message used for sign does not include txVersion, Nonce and Signature
    let msgBuffer = [
      this.txBuffer[3], // TimeStamp
      this.txBuffer[4], // From
      this.txBuffer[5], // To
      this.txBuffer[6], // Value
      this.txBuffer[7], // GasLimit
      this.txBuffer[8], // GasUsedByTxn
      this.txBuffer[9], // GasPrice
      // this.txBuffer[11], // Nonce
      this.txBuffer[12] // InputData
    ]

    let msgHash = SECUtils.rlphash(msgBuffer).toString('hex')
    msgHash = Buffer.from(msgHash, 'hex')
    return msgHash
  }

  // calculate signature for a transaction
  signTx (privKey) {
    let msgHashBuffer = this._generateSignMsgHash()
    let txSignature = SECUtils.ecsign(msgHashBuffer, Buffer.from(privKey, 'hex'))

    txSignature = {
      v: txSignature.v,
      r: txSignature.r.toString('hex'),
      s: txSignature.s.toString('hex')
    }

    return txSignature
  }
}

module.exports = SECTokenTx
