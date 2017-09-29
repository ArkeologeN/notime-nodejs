const request = require("request");
const Joi = require('joi');
const SchemaShipmentCreate = require('./schema/shipment_create');

class NoTime {
  constructor(opts) {
    this._opts = {
      primaryKey: "",
      secondaryKey: "",
      groupGuid: ""
    };
    this.checkIntegrity(opts, "primaryKey");
    this.checkIntegrity(opts, "secondaryKey");
    this.checkIntegrity(opts, "groupGuid");
    this._opts.primaryKey = opts.primaryKey;
    this._opts.secondaryKey = opts.secondaryKey;
    this._opts.groupGuid = opts.groupGuid;

    this.request = request.defaults({
      baseUrl: "https://v1.notimeapi.com/api",
      headers: {
        "content-type": "application/json",
        "Ocp-Apim-Subscription-Key": this._opts.primaryKey
      }
    });
  }

  checkIntegrity(opts, key) {
    if (!Object(opts).hasOwnProperty(key)) {
      throw new Error(`${key} is missing from arguments.`);
    }
  }

  shipmentCreate(payload) {
    payload.GroupGuid = this._opts.groupGuid;
    const {error, result} = Joi.validate(payload, SchemaShipmentCreate);
    return new Promise((resolve, reject) => {
      if (error) return reject(error);
      this.request.post(
        {
          url: `/shipment`,
          json: payload
        },
        (err, r, response) => {
          if (err) return reject(err);
          return resolve(response);
        }
      );
    });
  }
}

module.exports = NoTime;
