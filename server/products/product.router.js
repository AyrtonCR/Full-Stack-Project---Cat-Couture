const express = require("express");
const Joi = require("joi");
const router = express.Router();
const queryParamValidationMiddleware = require("../middleware/queryParamValidationMiddleware");
const productRepository = require("./product.repository");

const queryParamsSchema = Joi.object().keys({
  page: Joi.number().integer().min(1).max(10),
  limit: Joi.number().integer().min(10).max(10),
});

router.get(
  "/",
  queryParamValidationMiddleware(queryParamsSchema),
  async (req, res, next) => {
    try {
      const { limit, page } = req.query;

      const safeLimit = limit ? parseInt(limit) : 10;
      const safePage = parseInt(page) ? parseInt(page) : 1;
      const totalProducts = await productRepository.getTotalProducts();
      const products = await productRepository.getProducts(safeLimit, safePage);

      const responseResults = {
        products,
        currentPage: safePage,
        totalPages: Math.ceil(totalProducts.length / safeLimit),
        itemsPerPage: safeLimit,
        totalItems: totalProducts.length,
      };

      return res.json(responseResults);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
