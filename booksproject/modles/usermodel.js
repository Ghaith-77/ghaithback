let mongoose = require("mongoose");
let joi = require("joi");
let jPC = require("joi-password-complexity")
let schema_user = mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
    },
    password: {
      type: String,
      require: true,
      trim: true,
      minlength: 3,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
let usermodel = mongoose.model("user", schema_user);

module.exports = {
  usermodel,
  validatePutusers,
  validateLoginusers,
  validateRegisterusers,
  validateresetPasssword
};
function validateLoginusers(obj) {
  let schema = joi.object({
    email: joi.string().trim().required(),
    password: joi.string().trim().required(),
  });
  return schema.validate(obj);
}

function validateresetPasssword(obj) {
  let schema = joi.object({
    password: joi.string().trim().required(),
  });
  return schema.validate(obj);
}
function validateRegisterusers(obj) {
  let schema = joi.object({
    username: joi.string().trim().required(),
    email: joi.string().trim().required(),
    password: jPC().required(),
  });
  return schema.validate(obj);
}
function validatePutusers(obj) {
  let schema = joi.object({
    username: joi.string().trim(),
    email: joi.string().trim(),
    password: joi.string(),
  });
  return schema.validate(obj);
}
