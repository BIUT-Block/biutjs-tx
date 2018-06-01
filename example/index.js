const SECjsTX = require('..index')

let params = {
  type: 'tockenchain-block'
}
let instanceHandler = new SECjsTX(params)
let tokenChainBlockModel = instanceHandler.getModel()

console.log(tokenChainBlockModel)
