const ProductModel = require("../models/Product");

class HomeProducts {
  async catProducts(req, res) {
    const { name, page = 1, keyword } = req.params; // Default page to 1 if not provided
    console.log(name, page);
    
    const perPage = 12; // You might want to make this configurable
    const skip = (page - 1) * perPage;
    const options = name
      ? { category: name }
      : keyword && { title: { $regex: `${keyword}`, $options: "i" } };

    try {
      const count = await ProductModel.find({
        ...options,
      })
        .where("stock")
        .gt(0)
        .countDocuments();
        
      const products = await ProductModel.find({ ...options })
        .where("stock")
        .gt(0)
        .skip(skip)
        .limit(perPage)
        .populate("reviews")
        .sort({ updatedAt: -1 });

      return res.status(200).json({ products, perPage, count });

    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ error: "An error occurred while fetching products." });
    }
  }
}

module.exports = new HomeProducts();
