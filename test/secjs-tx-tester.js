const test = require('tape')
const SECjsTx = require('../index')

let params = {
  type: ''
}

test('token chain block tester ', (t) => {
  params.type = 'tokenchain-block'
  let instance = new SECjsTx(params).getInstance()
  t.ok(instance)
  let model = instance.getModel()
  instance.setHeight('123')
  t.same(model.Height, '123')
  t.same(instance.getHeight(), '123')
  instance.setTimeStamp('20180513000000')
  t.same(model.TimeStamp, '20180513000000')
  t.same(instance.getTimeStamp(), '20180513000000')
  t.end()
})
