const express = require('express');

const router = express.Router();

const categoryValidation = require("../validations/categoryValidation");
const Authorization = require("../services/Authorization");
const Category = require("../Controller/Category");

// Authorization middleware should be after validation
router.post("/create-category", [categoryValidation, Authorization.authorized], Category.create);
router.get("/categories/:page",Authorization.authorized,Category.categories);
router.get("/fetch-category/:id",Authorization.authorized,Category.fetchCategory);
router.put("/update-category/:id",[categoryValidation, Authorization.authorized],Category.updateCategory);
router.delete("/delete-category/:id",[categoryValidation, Authorization.authorized],Category.deleteCategory);
module.exports = router;
