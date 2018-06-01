### Usage
npm install --save secjs-tx

### Tokenchain transaction model

* [_TokenTxModelHandler](#_TokenTxModelHandler)
    * [.getModel()](#_TokenTxModelHandler+getModel)
    * [.getHeight()](#_TokenTxModelHandler+getHeight)
    * [.getTimeStamp()](#_TokenTxModelHandler+getTimeStamp)
    * [.setTimeStamp(timestamp)](#_TokenTxModelHandler+setTimeStamp)
    * [.setGasLimit(gaslimit)](#_TokenTxModelHandler+setGasLimit)
    * [.getGasPrice()](#_TokenTxModelHandler+getGasPrice)
    * [.setGasPrice(gasprice)](#_TokenTxModelHandler+setGasPrice)

<a name="_TokenTxModelHandler+getModel"></a>

### _TokenTxModelHandler.getModel()
get complete model

**Kind**: instance method of [<code>_TokenTxModelHandler</code>](#_TokenTxModelHandler)  
<a name="_TokenTxModelHandler+getHeight"></a>

### _TokenTxModelHandler.getHeight()
get height of block

**Kind**: instance method of [<code>_TokenTxModelHandler</code>](#_TokenTxModelHandler)  
<a name="_TokenTxModelHandler+getTimeStamp"></a>

### _TokenTxModelHandler.getTimeStamp()
get Timestamp of model

**Kind**: instance method of [<code>_TokenTxModelHandler</code>](#_TokenTxModelHandler)  
<a name="_TokenTxModelHandler+setTimeStamp"></a>

### _TokenTxModelHandler.setTimeStamp(timestamp)
set Timestamp for block model

**Kind**: instance method of [<code>_TokenTxModelHandler</code>](#_TokenTxModelHandler)  

| Param | Type |
| --- | --- |
| timestamp | <code>string</code> | 

<a name="_TokenTxModelHandler+setGasLimit"></a>

### _TokenTxModelHandler.setGasLimit(gaslimit)
set gas limit

**Kind**: instance method of [<code>_TokenTxModelHandler</code>](#_TokenTxModelHandler)  

| Param | Type |
| --- | --- |
| gaslimit | <code>string</code> | 

<a name="_TokenTxModelHandler+getGasPrice"></a>

### _TokenTxModelHandler.getGasPrice()
get block gas price

**Kind**: instance method of [<code>_TokenTxModelHandler</code>](#_TokenTxModelHandler)  
<a name="_TokenTxModelHandler+setGasPrice"></a>

### _TokenTxModelHandler.setGasPrice(gasprice)
set gas price

**Kind**: instance method of [<code>_TokenTxModelHandler</code>](#_TokenTxModelHandler)  

| Param | Type |
| --- | --- |
| gasprice | <code>string</code> | 

<a name="_TxBlockModelHandler"></a>

## _TxBlockModelHandler
Transaction chain block model

**Kind**: global class  

* [_TxBlockModelHandler](#_TxBlockModelHandler)
    * [.getModel()](#_TxBlockModelHandler+getModel)
    * [.getHeight()](#_TxBlockModelHandler+getHeight)
    * [.setHeight(height)](#_TxBlockModelHandler+setHeight)
    * [.setStatus(status)](#_TxBlockModelHandler+setStatus)

<a name="_TxBlockModelHandler+getModel"></a>

### _TxBlockModelHandler.getModel()
get complete model

**Kind**: instance method of [<code>_TxBlockModelHandler</code>](#_TxBlockModelHandler)  
<a name="_TxBlockModelHandler+getHeight"></a>

### _TxBlockModelHandler.getHeight()
get height of block

**Kind**: instance method of [<code>_TxBlockModelHandler</code>](#_TxBlockModelHandler)  
<a name="_TxBlockModelHandler+setHeight"></a>

### _TxBlockModelHandler.setHeight(height)
set Height of block

**Kind**: instance method of [<code>_TxBlockModelHandler</code>](#_TxBlockModelHandler)  

| Param | Type |
| --- | --- |
| height | <code>string</code> | 

<a name="_TxBlockModelHandler+setStatus"></a>

### _TxBlockModelHandler.setStatus(status)
set status of transaction chain

**Kind**: instance method of [<code>_TxBlockModelHandler</code>](#_TxBlockModelHandler)  

| Param | Type |
| --- | --- |
| status | <code>string</code> | 

<a name="_TxTransModelHandler"></a>

## _TxTransModelHandler
transaction chain transaction model

**Kind**: global class  

* [_TxTransModelHandler](#_TxTransModelHandler)
    * [.getModel()](#_TxTransModelHandler+getModel)
    * [.setProductInfo(product)](#_TxTransModelHandler+setProductInfo)
    * [.getProductInfo()](#_TxTransModelHandler+getProductInfo)

<a name="_TxTransModelHandler+getModel"></a>

### _TxTransModelHandler.getModel()
transaction chain  transation information model

**Kind**: instance method of [<code>_TxTransModelHandler</code>](#_TxTransModelHandler)  
<a name="_TxTransModelHandler+setProductInfo"></a>

### _TxTransModelHandler.setProductInfo(product)
set product information

**Kind**: instance method of [<code>_TxTransModelHandler</code>](#_TxTransModelHandler)  

| Param | Type |
| --- | --- |
| product | <code>object</code> | 

<a name="_TxTransModelHandler+getProductInfo"></a>

### _TxTransModelHandler.getProductInfo()
get product information

**Kind**: instance method of [<code>_TxTransModelHandler</code>](#_TxTransModelHandler)  
<a name="SECModelHandler"></a>

## SECModelHandler
SEC Model handler: factory function to create for different model

**Kind**: global class  

* [SECModelHandler](#SECModelHandler)
    * [new SECModelHandler(params)](#new_SECModelHandler_new)
    * [.getInstance()](#SECModelHandler+getInstance)

<a name="new_SECModelHandler_new"></a>

### new SECModelHandler(params)
create instance for model handler
params.type: 'tokenchain-block' 'tokenchain-trans' 'transactionchain-block' 'transactionchain-trans'


| Param | Type |
| --- | --- |
| params | <code>object</code> | 

<a name="SECModelHandler+getInstance"></a>

### secModelHandler.getInstance()
get the instance of model handler

**Kind**: instance method of [<code>SECModelHandler</code>](#SECModelHandler)