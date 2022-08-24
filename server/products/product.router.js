const express = require("express");
const Joi = require("joi");
// const { Pool } = require("pg");
const router = express.Router();
const queryParamValidationMiddleware = require("../middleware/queryParamValidationMiddleware");
const productRepository = require("./product.repository");

const queryParamsSchema = Joi.object().keys({
  page: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(1),
});

router.get(
  "/",
  queryParamValidationMiddleware(queryParamsSchema),
  async (req, res, next) => {
    try {
      const { limit, page } = req.query;
      const safeLimit = limit ? parseInt(limit) : 10; // CHANGED FORM BOOLEAN TO NORMAL //
      const safePage = parseInt(page) ? parseInt(page) : 1; // CHANGED FORM BOOLEAN TO NORMAL //

      const allProducts = await productRepository.getAllProducts();
      const products = await productRepository.getProducts(safeLimit, safePage);

      const responseResults = {
        products,
        currentPage: safePage,
        totalPages: Math.ceil(allProducts.length / safeLimit),
        itemsPerPage: safeLimit,
        totalItems: allProducts.length,
      };

      return res.json(responseResults);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
