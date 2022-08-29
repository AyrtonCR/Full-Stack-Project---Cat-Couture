import styles from "./PaginationControls.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const PaginationControls = ({
  page,
  setPage,
  currentPage,
  totalPages,
  // onPrev,
  // onNext,
  itemsPerPage,
  totalItems,
}) => {
  const prevDisabled = page > 1 ? false : true;
  const nextDisabled = page < totalPages ? false : true;

  const onPrev = () => {
    if (!prevDisabled) {
      setPage(page - 1);
    }
  };

  const onNext = () => {
    if (!nextDisabled) {
      setPage(page + 1);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <div>
          <button
            aria-label="Previous page"
            onClick={onPrev}
            disabled={prevDisabled}
          >
            <FontAwesomeIcon icon={faChevronLeft} size="2x" />
          </button>
        </div>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <div>
          <button
            aria-label="Next page"
            onClick={onNext}
            disabled={nextDisabled}
          >
            <FontAwesomeIcon icon={faChevronRight} size="2x" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaginationControls;
