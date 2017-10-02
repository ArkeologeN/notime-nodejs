const joi = require("joi");

module.exports = joi.object({
  Reference: joi.string(),
  Name: joi.string(),
  UnitType: joi.number().valid([1, 2, 3, 4, 5, 6, 7, 8, 9, 99]),
  Quantity: joi.number().min(1),
  Fee: joi.number(),
  Type: joi.number(),
  Labels: joi.array().items(joi.string())
}).label('Product');
