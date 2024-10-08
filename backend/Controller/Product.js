const formidable = require('formidable');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const ProductModel = require("../models/Product");
const { log } = require('console');
const { validationResult } = require('express-validator');

class Product {
  async create(req, res) {
    const form = new formidable.IncomingForm({ multiples: true });

    form.parse(req, async (err, fields, files) => {
        if (!err) {

            const parsedData = JSON.parse(fields.data);

            const errors = [];

            if (parsedData.title.trim().length === 0) {
                errors.push({ msg: 'The title field cannot be left blank!' });
            }

            if (parseInt(parsedData.price) < 1) {
                errors.push({ msg: 'The price must be above $1' });
            }

            if (parseInt(parsedData.discount) < 0) {
                errors.push({ msg: 'The discount mustn\'t be negative !' });
            }

            if (parseInt(parsedData.stock) < 0) {
                errors.push({ msg: 'The stock mustn\'t be negative !' });
            }

            if (parsedData.category.trim().length === 0) {
                errors.push({ msg: 'The category field cannot be left blank!' });
            }

            if (fields.description.length === 0) {
                errors.push({ msg: 'The description field cannot be left blank!' })
            }

            if (errors.length === 0) {
                if (!files['image1']) {
                    errors.push({ msg: 'Image 1 is required!' });
                }
                if (!files['image2']) {
                    errors.push({ msg: 'Image 2 is required!' });
                }
                if (!files['image3']) {
                    errors.push({ msg: 'Image 3 is required!' });
                }

                if (errors.length === 0) {

                    const images = {};

                    for (let i = 1; i <= Object.keys(files).length; i++) {
                        const mimeType = files[`image${i}`][0].mimetype;
                        const extension = mimeType.split('/')[1].toLowerCase();
                        if (extension === 'jpeg' || extension === 'jpg' || extension === 'png') {
                            const imageName = uuidv4() + `.${extension}`;
                            const __dirname = path.resolve();
                            const newPath = __dirname + `/../client/public/images/${imageName}`;
                            images[`image${i}`] = imageName;
                            fs.copyFile(files[`image${i}`][0].filepath, newPath, (err) => {
                                if (!err) {

                                }
                            })
                        } else {
                            const error = {};
                            error['msg'] = `image${i} has invalid ${extension} type!`;
                            errors.push(error);
                        }
                    }
                    if (errors.length === 0) {
                        try {
                          const response = await ProductModel.create({
                            title : parsedData.title,
                            price : parseInt(parsedData.price),
                            discount:parseInt(parsedData.discount),
                            stock: parseInt(parsedData.stock),
                            category: parsedData.category,
                            colors:parsedData.colors,
                            sizes:JSON.parse(fields.sizes),
                            image1:images['image1'],
                            image2:images['image2'],
                            image3:images['image3'],
                            description:fields.description
                          })
                          return res.status(201).json({msg: 'Product has created' , response});
                        } catch (error) {
                          console.log(error);
                          return res.status(500).json({ errors });
                        }
                        
                    } else {
                        return res.status(400).json({ errors });
                    }
                } else {
                    return res.status(400).json({ errors });
                }
            } else {
                return res.status(400).json({ errors });
            }
        } else {
            console.error("Error parsing form:", err);
        }
    });
}

async get(req, res) {
  const { page } = req.params;
  const perPage = 5;
  const skip = (page - 1) * perPage;
  try {
    const count = await ProductModel.find({}).countDocuments();
    const response = await ProductModel.find({})
      .skip(skip)
      .limit(perPage)
      .sort({ updatedAt: -1 });
    return res.status(200).json({ products: response, perPage, count });
  } catch (error) {
    console.log(error.message);
  }
}



  async fetch(req, res) {
    const { id } = req.params;
    try {
      const product = await ProductModel.findOne({ _id: id });
      console.log(product);
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ error: error.message });
      console.log(error.message);
    }
  }

  async updateProduct(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      try {
        const {
          _id,
          title,
          price,
          discount,
          stock,
          colors,
          sizes,
          description,
          category,
        } = req.body;
        const response = await ProductModel.updateOne(
          { _id },
          {
            $set: {
              title,
              price,
              discount,
              stock,
              category,
              colors,
              sizes,
              description,
            },
          }
        );
        return res.status(200).json({ msg: "Product has updated", response });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ errors: error });
      }
    } else {
      return res.status(400).json({ errors: errors.array() });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      const product = await ProductModel.findByIdAndDelete(id);
      if (product) {
        // Delete associated images
        const __dirname = path.resolve();
        ['image1', 'image2', 'image3'].forEach((image) => {
          if (product[image]) {
            const imagePath = __dirname + `/../client/public/images/${product[image]}`;
            fs.unlink(imagePath, (err) => {
              if (err) console.error(`Error deleting ${image}:`, err);
            });
          }
        });
        return res.status(200).json({ msg: 'Product has been deleted' });
      } else {
        return res.status(404).json({ errors: [{ msg: 'Product not found' }] });
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      return res.status(500).json({ errors: [{ msg: error.message }] });
    }
  }

}

module.exports = new Product();
