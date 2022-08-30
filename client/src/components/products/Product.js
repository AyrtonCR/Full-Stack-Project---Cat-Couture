import styles from "./Product.module.css";
import DiscountBadge from "./DiscountBadge";

const Product = ({
  name,
  id,
  description,
  price,
  imageName,
  imageDescription,
  discountType,
  discountValue,
}) => {
  return (
    <li className={styles.product} key={id}>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <div className={styles.borderPositioner}>
            {discountValue && discountType && (
              <DiscountBadge
                className={styles.badge}
                discountValue={discountValue}
                discountType={discountType}
              />
            )}

            {imageName ? (
              <img
                src={`./img/${imageName}`}
                alt={imageDescription}
                className={styles.productImage}
              ></img>
            ) : (
              <img
                src="./img/cat-photo-default.jpg"
                alt="Default product cat"
                className="product-image"
              />
            )}
          </div>
        </div>
        <div className={styles.productInfoContainer}>
          <h3 className={styles.productInfo}>{name}</h3>
          <p className={styles.productInfo}>Price {price}</p>
          <p data-testid="product-description" className={styles.productInfo}>
            {description}
          </p>

          <div className={styles.addToCartButtonContainer}>
            <button className={styles.button}>Add to Cart</button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Product;
