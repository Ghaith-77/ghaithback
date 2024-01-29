let mongoose = require("mongoose");
let joi = require("joi");

let schema_authors = mongoose.Schema(
  {
    firstname: {
      type: String,
      require: true,
      trim: true,
    },
    lastname: {
      type: String,
      require: true,
      trim: true,
    },
    nashunality: {
      type: String,
      require: true,
      trim: true,
    },
    img: {
      type: String,
      default: "ghaith",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
let authe = mongoose.model("auth", schema_authors);

module.exports = {
  authe,
  validatepostauther,
  validateputauthers
};


function validatepostauther(obj) {
  let schema = joi.object({
    firstname: joi.string().trim().min(2).max(20).required(),
    lastname: joi.string().trim().min(3).max(10).required(),
    nashunality: joi.string().trim().min(3).max(10).required(),
    img: joi.string().trim().min(3).max(10),
  });
  return schema.validate(obj);
}



function validateputauthers(obj) {
  let schema = joi.object({
    firstname: joi.string().trim().min(2).max(20),
    lastname: joi.string().trim().min(3).max(10),
  });
  return schema.validate(obj);
}

