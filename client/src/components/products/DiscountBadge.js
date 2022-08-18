import styles from "./DiscountBadge.module.css";

const DiscountBadge = ({ discountType, discountValue, className }) => {
  return (
    <div
      className={`${className || ""} ${styles.discountBadge}`}
      data-testid="badge"
    >
      {discountType === "percentage off" && <>{discountValue} % off</>}
      {discountType === "fixed amount off" && <>$ {discountValue} off</>}
    </div>
  );
};

export default DiscountBadge;
