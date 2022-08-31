import dStyles from "./DashboardPage.module.css";
const CategoriesReport = ({ reportData, className }) => {
  return (
    <div className={className}>
      <div className={dStyles.categoriesContainer}>
        <h3 className={dStyles.subTitle}>Categories Report</h3>
        <div className={dStyles.categoriesGridContainer}>
          <div className={dStyles.categoriesGrid}>
            <div className={dStyles.categoriesItem}>
              {reportData.map((category, index) => (
                <li className={dStyles.singleItem} key={index}>
                  <p className={dStyles.itemNumber}>
                    {category.discountedProducts}
                  </p>
                  <p className={dStyles.itemText}>
                    Discounted{" "}
                    <span className={dStyles.wordHighlighter}>
                      {category.categoryName}
                    </span>{" "}
                    out of{" "}
                    <span className={dStyles.wordHighlighter2}>
                      {category.totalProducts}
                    </span>
                    .
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

export default CategoriesReport;
