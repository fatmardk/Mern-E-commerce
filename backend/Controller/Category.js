const { validationResult } = require("express-validator");
const CategoryModel = require("../models/Category");

class Category {
  async create(req, res) {
    const errors = validationResult(req);
    const { name } = req.body;

    if (!errors.isEmpty()) { // Hataları doğru kontrol edin
      return res.status(401).json({ errors: errors.array() });
    }

    try {
      const exist = await CategoryModel.findOne({ name });
      if (!exist) {
        await CategoryModel.create({ name });
        return res.status(201).json({ message: 'Your category has created successfully' });
      } else {
        return res.status(400).json({ errors: [{ msg: `${name} Category already exists` }] });
      }
    } catch (err) {
      return res.status(500).json({ errors: [{ msg: 'Server error' }] });
    }
  }
  async categories(req,res){
    const page = req.params.page;
    const perPage = 3;
    const skip = (page - 1 )* perPage;
    try {
      const count = await CategoryModel.find({}).countDocuments();
      const response = await CategoryModel.find({}).skip(skip).limit(perPage).sort({updatedAt: -1})
      return res.status(200).json({categories:response, perPage, count})
    } catch (error) {
      console.log(error.message);
    }
  }

  async fetchCategory(req,res){
    const {id} = req.params;
    try {
      const response = await CategoryModel.findOne({_id:id})
      console.log(response);
      return res.status(200).json({category:response})
    } catch (error) {
      console.log(error.message);
    }
  }
  async updateCategory (req,res){
    const {id} = req.params;
    const {name}=req.body;
    const errors = validationResult(req);
    if(errors.isEmpty()){
      const exist = await CategoryModel.findOne({ name });
      if(!exist){
        const response = await CategoryModel.updateOne({_id:id}, {$set:{name}})
        return res.status(201).json({ message: 'Your category has updated successfully' });

      }else{
        return res.status(400).json({ msg: `${name} category is already exist` });
      }
    }else{
      return res.status(400).json({ errors: errors.array() });
    }
  }
  async deleteCategory(req, res) {
    const { id } = req.params;
    
    try {
      // Kategoriyi veritabanından silme işlemi
      const response = await CategoryModel.deleteOne({ _id: id });
      
      if (response.deletedCount > 0) {
        return res.status(200).json({ message: 'Category has been deleted successfully' });
      } else {
        return res.status(404).json({ msg: 'Category not found' });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ msg: 'Internal Server Error' });
    }
  }
  
}

module.exports = new Category();
