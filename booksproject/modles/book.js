let mongoose = require("mongoose");
let joi = require("joi");

let schema_books = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      trim: true,
    },
    descripion: {
      type: String,
      require: true,
      trim: true,
    },
    cover: {
      type: String,
      default: "ghaith",
      trim: true,
      enum: ["hardcover", "sortcover"],
    },
    price:{
        type:Number,
        min:0,
        require:true
    },
    Author: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Authors",
    },
  },
  {
    timestamps: true,
  }
);
let Books = mongoose.model("books", schema_books);

function validatepostBooks(obj) {
  let schema = joi.object({
    title: joi.string().trim().required(),
    descripion: joi.string().trim().required(),
    auther: joi.string().required(),
    price: joi.number().required(),
    cover : joi.string().valid("hardcover", "sortcover")
  });
  return schema.validate(obj);
}
function validateputBooks(obj) {
  let schema = joi.object({
    title: joi.string().trim().required(),
    descripion: joi.string().trim().required(),
    auther: joi.string().required(),
    price: joi.number().required(),
    cover : joi.string().valid("hardcover", "sortcover")
  });
  return schema.validate(obj);
}
module.exports = {
    Books,
  validatepostBooks,
  validateputBooks,
};
