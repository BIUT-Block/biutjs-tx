const tokenChainBlockModel = require('./model/tokenchain-block-model')
let tokenChainTransModel = require('./model/tokenchain-trans-model')
let txBlockModel = require('./model/transactionchain-block-model')
let txTransModel = require('./model/transactionchain-trans-model')

/**
 * tokenchain-block-model handler
 */
class _TokenBlockModelHandler {
  constructor () {
    this.model = JSON.parse(JSON.stringify(tokenChainBlockModel))
  }

  /**
   * get complete tokenchain-block-model model
   */
  getModel () {
    return this.model
  }

  /**
   * get height of block model
   */
  getHeight () {
    return this.model.Height
  }

  /**
   * set height of block model
   * @param {string} height
   */
  setHeight (height) {
    this.model.Height = height
  }

  /**
   * get parent hash of block
   */
  getParentHash () {
    return this.model.Parent_Hash
  }

  /**
   * set gas price of block
   * @param {string} gasprice
   */
  setGasPrice (gasprice) {
    this.model.GasPrice = gasprice
  }

  /**
   * get gas price of block
   */
  getGasPrice () {
    return this.model.GasPrice
  }

  /**
   * get size of block
   */
  getSize () {
    return this.model.Size
  }

  /**
   * set the model block size
   * @param {string} size
   */
  setSize (size) {
    this.model.Size = size
  }

  /**
   * set timestamp of block model
   * @param {string} timestamp
   */
  setTimeStamp (timestamp) {
    this.model.TimeStamp = timestamp
  }

  /**
   * get timestamp of block model
   */
  getTimeStamp () {
    return this.model.TimeStamp
  }
}

/**
 * Tokenchain transaction model
 */
class _TokenTxModelHandler {
  constructor () {
    this.model = JSON.parse(JSON.stringify(tokenChainTransModel))
  }

  /**
   * get complete model
   */
  getModel () {
    return this.model
  }

  /**
   * get height of block
   */
  getHeight () {
    return this.model.Height
  }

  /**
   * get Timestamp of model
   */
  getTimeStamp () {
    return this.model.getTimeStamp
  }

  /**
   * set Timestamp for block model
   * @param {string} timestamp
   */
  setTimeStamp (timestamp) {
    this.model.TimeStamp = timestamp
  }

  /**
   * set gas limit
   * @param {string} gaslimit
   */
  setGasLimit (gaslimit) {
    this.model.GasLimit = gaslimit
  }

  /**
   * get block gas price
   */
  getGasPrice () {
    return this.model.GasPrice
  }

  /**
   * set gas price
   * @param {string} gasprice
   */
  setGasPrice (gasprice) {
    this.model.GasPrice = gasprice
  }
}

/**
 * Transaction chain block model
 */
class _TxBlockModelHandler {
  constructor () {
    this.model = JSON.parse(JSON.stringify(txBlockModel))
  }

  /**
   * get complete model
   */
  getModel () {
    return this.model
  }

  /**
   * get height of block
   */
  getHeight () {
    return this.model.Height
  }

  /**
   * set Height of block
   * @param {string} height
   */
  setHeight (height) {
    this.model.Height = height
  }

  /**
   * set status of transaction chain
   * @param {string} status
   */
  setStatus (status) {
    this.model.Status = status
  }
}

/**
 * transaction chain transaction model
 */
class _TxTransModelHandler {
  constructor () {
    this.model = txTransModel
  }

  /**
   * transaction chain  transation information model
   */
  getModel () {
    return this.model
  }

  /**
   * set product information
   * @param {object} product
   */
  setProductInfo (product) {
    this.model.ProductInfo = product
  }

  /**
   * get product information
   */
  getProductInfo () {
    return this.model.ProductInfo
  }
}

/**
 * SEC Model handler: factory function to create for different model
 */
class SECModelHandler {
  /**
   * create instance for model handler
   * params.type: 'tokenchain-block' 'tokenchain-trans' 'transactionchain-block' 'transactionchain-trans'
   * @param {object} params
   */
  constructor (params) {
    this.params = params
    switch (this.params.type) {
      case 'tokenchain-block':
        this.handlerInstance = new _TokenBlockModelHandler()
        break
      case 'tokenchain-trans':
        this.handlerInstance = new _TokenTxModelHandler()
        break
      case 'transactionchain-block':
        this.handlerInstance = new _TxBlockModelHandler()
        break
      case 'transactionchain-trans':
        this.handlerInstance = new _TxTransModelHandler()
        break
    }
  }

  /**
   * get the instance of model handler
   */
  getInstance () {
    return this.handlerInstance
  }

  errorHandler (error) {
    console.log(error.message)
  }
}

module.exports = SECModelHandler
