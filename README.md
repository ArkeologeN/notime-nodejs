# notime-nodejs
notime.eu API integration wrapper in Node.js

##installation

Please run the following command:

`npm install notime-nodejs`


## How-To

Please use the following example to get started. You can also look at test inside `tests/lib` too.

```javascript
const NoTime = require('notime-nodejs');
const noTime = new NoTime({
  primaryKey: '<primary>',
  secondaryKey: '<seconday>',
  groupGuid: '<group_guid>'
});

const shipment = {
  ......
}

noTime
  .shipmentCreate(shipment)
  .then(response => {
    console.log(response);
    // You will have an object like this.
    /*
      { ResultCode: 0,
      ResultText: 'Success',
      ShipmentGuid: 'c7bb711c-3b6a-407e-af46-6787985a5c89',
      PickupReference: 'O1cCK4Ksi+VEY1XXQ9Ps8N3IkG+21yULyNZ9oJC+ODA=',
      DropoffReference: 'UvBBE7UpuLecA/DXHEdZpxsVUGxv6kiMkLAxuHjbI6g=',
      ProductsReferences: [],
      Reference: '2232_2017-09-29T14:17:35',
      GeneratedBarcode: 'c7bb711c3b6a407eaf46',
      ErrorString: null }
    */
  })
```


## license

The project is under MIT, but written solely for `NoTime` api integration.