const express = require('express');
const router = express.Router();

const Product = require("../Controller/Product");
const Authorization = require("../services/Authorization");
const productValidations = require("../validations/productValidations");
const { catProducts } = require('../Controller/HomeProducts');
const HomeProducts = require('../Controller/HomeProducts');

router.post('/create-product', [Authorization.authorized], Product.create);

router.get('/products/:page', Authorization.authorized, Product.get);

router.get('/product/:id', Product.fetch); 

router.put(
  "/product",
  [Authorization.authorized, productValidations],
  Product.updateProduct
);

router.delete('/delete/:id', Authorization.authorized, Product.delete); 

router.get('/cat-products/:name/:page', HomeProducts.catProducts)

module.exports = router;
