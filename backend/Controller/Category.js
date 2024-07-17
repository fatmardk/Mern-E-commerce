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
        return res.status(201).json({ message: 'Category created successfully' });
      } else {
        return res.status(401).json({ errors: [{ msg: `${name} category already exists` }] });
      }
    } catch (err) {
      return res.status(500).json({ errors: [{ msg: 'Server error' }] });
    }
  }
}

module.exports = new Category();
