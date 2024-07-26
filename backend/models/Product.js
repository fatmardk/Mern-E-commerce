const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required:true,
  },
  price: {
    type: Number,
    required:true,
  },
  discount: {
    type: Number,
    required:true,
  },
  stock: {
    type: Number,
    required:true,
  },
  category: {
    type: String,
    required:true,
  },
  colors: {
    type: [Map]
  },
  sizes: {
    type: [Map]
  },
  image1:{
    required:true,
    type: String
  },
  image2:{
    required:true,
    type: String
  },
  image3:{
    required:true,
    type: String
  },
  description:{
    required:true,
    type: Array
  },
  reviews: [{ type: mongoose.Types.ObjectId, ref: "review" }],
},{timestamps:true});

const ProductModel = mongoose.model('product', ProductSchema);

module.exports = ProductModel;