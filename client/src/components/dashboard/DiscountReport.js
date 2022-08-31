import dStyles from "./DashboardPage.module.css";
const DiscountsReport = ({ reportData, className }) => {
  return (
    <div className={className}>
      <div className={dStyles.categoriesContainer}>
        <h3 className={dStyles.subTitle}>Discounts Report</h3>
        <div className={dStyles.categoriesGridContainer}>
          <div className={dStyles.categoriesGrid}>
            <div className={dStyles.categoriesItem}>
              {reportData.map((discount, index) => (
                <li className={dStyles.singleItem} key={index}>
                  <p className={dStyles.itemNumber}>{discount.totalProducts}</p>
                  <p className={dStyles.itemText}>
                    Items have{" "}
                    <span className={dStyles.wordHighlighter2}>
                      {discount.discountType || "no discount"}
                    </span>
                  </p>
                </li>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountsReport;
