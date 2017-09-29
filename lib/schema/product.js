const joi = require("joi");

module.exports = joi.object({
  Name: joi.string().optional(),
  Phone: joi.string().optional(),
  City: joi.string().optional(),
  CountryCode: joi.string().optional(),
  Postcode: joi.string().optional(),
  Streetaddress: joi.string().optional(),
  Labels: joi.array().items(joi.string())
}).label('Product');
