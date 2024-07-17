
const express = require('express');

const router = express.Router();

const categoryValidation = require("../validations/categoryValidation")

const Category = require ("../Controller/Category")

router.post("/create-category",categoryValidation,Category.create);






module.exports = router;