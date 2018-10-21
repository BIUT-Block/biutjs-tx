/**
 * define of transaction model
 */

let transactionchainTransModel = {
  TxHash: '',
  TxReceiptStatus: '',
  Version: '',
  TimeStamp: '',
  SellerAddress: '',
  BuyerAddress: '',
  ShareHash: '',
  ShareTimeStamp: '',
  ProductInfo: {
    Name: '',
    Category: '',
    Brand: '',
    Manifactory: '',
    Seller: '',
    Buyer: '',
    SKU: '',
    EAN: '',
    Price: '',
    Currency: '',
    Description: ''
  },
  SharedTimes: 0,
  Status: '',
  InputData: '',
  TxHeight: ''
}

module.exports = transactionchainTransModel
