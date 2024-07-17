const express = require('express');

const router = express.Router();

const categoryValidation = require("../validations/categoryValidation");
const Authorization = require("../services/Authorization");
const Category = require("../Controller/Category");

// Authorization middleware should be after validation
router.post("/create-category", [categoryValidation, Authorization.authorized], Category.create);
router.get("/categories/:page",Authorization.authorized,Category.categories);

module.exports = router;
