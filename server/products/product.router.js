const express = require("express");
const Joi = require("joi");
const { Pool } = require("pg");
const router = express.Router();
const db = require("../db");
const queryParamValidationMiddleware = require("../middleware/queryParamValidationMiddleware");

const queryParamsSchema = Joi.object().keys({
  page: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(1),
});

const getAllProductsSQL = `
SELECT p.id, p.name, p.description, p.price, pc.name AS "categoryName", pi.name AS "imageName", pi.description AS "imageDescription"
FROM product p
LEFT JOIN product_category pc ON p.product_category_id = pc.id
LEFT JOIN product_image pi ON p.product_image_id = pi.id
ORDER BY p.id
`;

const getPagedProductsSQL = `
SELECT p.id, p.name, p.description, p.price, pc.name AS "categoryName", pi.name AS "imageName", pi.description AS "imageDescription"
FROM product p
LEFT JOIN product_category pc ON p.product_category_id = pc.id
LEFT JOIN product_image pi ON p.product_image_id = pi.id
ORDER BY p.id
LIMIT $1 OFFSET $2
`;

const getAllProducts = async () => {
  try {
    const result = await db.query(getAllProductsSQL);
    return result.rows;
  } catch (error) {
    throw Error(error);
  }
};

const getProducts = async (limit, page) => {
  try {
    if (page <= 0 || !page) {
      throw new Error("page number must be greater than 0");
    }
    const offset = limit * (page - 1);
    const result = await db.query(getPagedProductsSQL, [limit, offset]);
    return result.rows;
  } catch (error) {
    throw Error(error);
  }
};

router.get(
  "/",
  queryParamValidationMiddleware(queryParamsSchema),
  async (req, res, next) => {
    try {
      const { limit, page } = req.query;
      const safeLimit = limit ? parseInt(limit) : 10; // CHANGED FORM BOOLEAN TO NORMAL //
      const safePage = parseInt(page) ? parseInt(page) : 1; // CHANGED FORM BOOLEAN TO NORMAL //

      const allProducts = await getAllProducts();
      const products = await getProducts(safeLimit, safePage);
      const pages = [
        {
          currentPage: safePage,
          itemsPerPage: safeLimit,
          totalItems: allProducts.length,
          totalPages: Math.ceil(allProducts.length / safeLimit),
        },
      ];
      const responseResults = {
        products,
        pages,
      };

      return res.json(responseResults);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
