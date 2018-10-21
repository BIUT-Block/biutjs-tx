const SECjsTX = require('../index')

let params = {
  type: 'tokenchain-tx'
}
let instanceHandler = new SECjsTX(params)
let tokenChainTxModel = instanceHandler.getInstance().getModel()

console.log(tokenChainTxModel)
