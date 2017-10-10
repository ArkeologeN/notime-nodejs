const joi = require('joi');
const Point = require('./point');
const Product = require('./product');

const timeRegex = /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)Z$/;

module.exports = joi.object({
  GroupGuid: joi.string().required(),
  PickupDate: joi.string().regex(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/, 'YYYY-MM-DD').required(),
  PickupTimeFrom: joi.string().regex(timeRegex, 'HH:MM:SSZ').required(),
  PickupTimeTo: joi.string().regex(timeRegex, 'HH:MM:SSZ').required(),
  DropoffTimeFrom: joi.string().regex(timeRegex, 'HH:MM:SSZ').required(),
  DropoffTimeTo: joi.string().regex(timeRegex, 'HH:MM:SSZ').required(),
  PaymentType: joi.number().valid([1, 2, 3, 11, 12]).required(),
  Fee: joi.number().min(0).precision(2),
  Note: joi.string().allow('').optional(),
  ShipmentType: joi.number().required(),
  Labels: joi.array().items(joi.string()),
  Pickup: Point.label('Pickup').required(),
  Dropoff: Point.label('Dropoff').required()  ,
  Products: joi.array().items(Product).label('Products'),
  Reference: joi.string().required(),
  Parcels: joi.array() // TBD
});
