import { ReactElement, useMemo } from "react";

import clsx from "clsx";
import generatePagination from "./helpers/buildPager";

import "./pagination.css";

type PagerProps = {
  page?: number;
  pageCount?: number;
  perPage?: number;
};

export type PaginationProps = {
  /** Class name for additional styling */
  className?: string;
  /** Callback function that is triggered when the page changes */
  onPageChange: (page: number) => void;
  /** Pagination configuration options */
  pagination: PagerProps;
};

/**
 * The `Pagination` component is used to create a pagination control with page navigation buttons.
 *
 * @example
 * <Pagination
 *   pagination={{
 *     page: 1,
 *     pageCount: 10,
 *     perPage: 10,
 *     totalCount: 100,
 *   }}
 *   onPageChange={(page) => console.log(page)}
 * />
 */
const Pagination = ({
  onPageChange,
  className,
  pagination,
}: PaginationProps): ReactElement => {
  const classes = clsx("pagination", className, "justify-end");

  // Usage example
  const total = pagination.pageCount;
  const page = Number(pagination.page);

  const paginationItems = useMemo(
    () => generatePagination(total, page),
    [total, page],
  );

  return (
    <div aria-label={`Group of pagination buttons`} className={classes}>
      <div className="buttons">
        <button
          className="arrow-button"
          onClick={() => onPageChange(page - 1)}
          disabled={pagination.page === 1}
        >
          ◀
        </button>
        {paginationItems?.map((d) => {
          if (typeof d.value === "number") {
            return (
              <button
                className={clsx({ "tw-bg-neutral-300": d.active })}
                key={d.key}
                onClick={() => onPageChange(Number(d.value))}
              >
                {d.value}
              </button>
            );
          }
          return (
            <span key={d.key} className="px-[8.5px] select-none">
              ...
            </span>
          );
        })}
        <button
          className="arrow-button"
          onClick={() => onPageChange(page + 1)}
          disabled={pagination.page === pagination.pageCount}
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default Pagination;
