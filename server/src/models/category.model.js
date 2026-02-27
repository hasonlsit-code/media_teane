const { Schema, default: mongoose } = require("mongoose");

const categoryModel = new Schema(
  {
    nameCategory: { type: String, require: true },
    imageCategory: { type: String, require: true },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model("category", categoryModel);
