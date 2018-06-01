const SECjsTX = require('../index')

let params = {
  type: 'tokenchain-block'
}
let instanceHandler = new SECjsTX(params)
let tokenChainBlockModel = instanceHandler.getInstance().getModel()

console.log(tokenChainBlockModel)
