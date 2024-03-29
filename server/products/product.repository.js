const db = require("../db");

module.exports = {
  getTotalProducts: async () => {
    try {
      const result = await db.query(`
      SELECT p.id, p.name, p.description, p.price, pc.name AS "categoryName", pi.name AS "imageName", pi.description AS "imageDescription"
      FROM product p
      LEFT JOIN product_category pc ON p.product_category_id = pc.id
      LEFT JOIN product_image pi ON p.product_image_id = pi.id
      ORDER BY p.id
      `);
      return result.rows;
    } catch (error) {
      throw Error(error);
    }
  },

  getProducts: async (limit, page) => {
    try {
      if (page <= 0) {
        throw new Error("page query number must be greater than 0");
      }

      const offset = limit * (page - 1);
      const result = await db.query(
        `
        SELECT p.id, p.name, p.description, p.price, pc.name AS "categoryName", pi.name AS "imageName", pi.description AS "imageDescription", pd.value AS "discountValue", dt.type AS "discountType"
        FROM product p
        LEFT JOIN product_category pc ON p.product_category_id = pc.id
        LEFT JOIN product_image pi ON p.product_image_id = pi.id
        LEFT JOIN product_discount pd ON p.id = pd.product_id
        LEFT JOIN discount_type dt ON dt.id = pd.discount_type_id
        ORDER BY p.id
      LIMIT $1 OFFSET $2
      `,
        [limit, offset]
      );
      return result.rows;
    } catch (error) {
      throw Error(error);
    }
  },
};
