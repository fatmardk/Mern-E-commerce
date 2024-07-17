const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required:true,
    unique :true
  }
},{timestamps:true});

const CategoryModel = mongoose.model('Categorie', CategorySchema);

module.exports = CategoryModel;