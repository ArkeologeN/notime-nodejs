const joi = require("joi");

module.exports = joi.object({
  Name: joi.string().required(),
  Phone: joi.string().required(),
  City: joi.string().required(),
  CountryCode: joi.string().valid(['CH', 'DE', 'FR', 'AT']).required(),
  Postcode: joi.string().required(),
  Streetaddress: joi.string().required(),
  Labels: joi.array().items(joi.string())
});
