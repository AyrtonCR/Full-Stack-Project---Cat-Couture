import styles from "./PaginationControls.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const PaginationControls = ({
  onPrev,
  onNext,
  currentPage = null,
  totalPages = null,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <div>
          <button aria-label="Previous page" onClick={onPrev}>
            <FontAwesomeIcon icon={faChevronLeft} size="2x" />
          </button>
        </div>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <div>
          <button aria-label="Next page" onClick={onNext}>
            <FontAwesomeIcon icon={faChevronRight} size="2x" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaginationControls;
