export interface PaginationItem {
  /** Unique key of the pagination item */
  key: string;
  /** Whether the pagination item is active */
  active: boolean;
  /** Value of the pagination item, can be a number or a string*/
  value: number | string;
}

/**
 * Generates a pagination array based on the total number of pages and the current active page.
 *
 * @param {number | undefined} total - The total number of pages.
 * @param {number | undefined} page - The current active page.
 * @param {number} len - The length of the pagination array.
 * @returns {PaginationItem[] | null} - The generated pagination array or null if total or page is undefined.
 *
 * @example
 * const paginationArray = generatePagination(10, 3);
 * console.log(paginationArray);
 * // Output:
 * // [
 * //   { key: '1', active: false, value: 1 },
 * //   { key: 'ellipsis1', active: false, value: '...' },
 * //   { key: '2', active: false, value: 2 },
 * //   { key: '3', active: true, value: 3 },
 * //   { key: '4', active: false, value: 4 },
 * //   { key: 'ellipsis2', active: false, value: '...' },
 * //   { key: '10', active: false, value: 10 }
 * // ]
 */
const generatePagination = (
  total?: number,
  page?: number,
  len = 5,
): PaginationItem[] | null => {
  if (!total || !page) {
    return null;
  }

  const result: PaginationItem[] = [];

  if (total <= 8) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    return Array.from({ length: total }, (_, i) => ({
      key: i.toString(),
      active: i + 1 === page,
      value: i + 1,
    }));
  }

  for (let i = 1; i <= total; i++) {
    const predicate1 = page < len && i <= len;
    const predicate2 = page > total - len + 1 && i >= total - len + 1;
    const predicate3 =
      page >= len &&
      page <= total - len + 1 &&
      i >= len - 1 &&
      i <= total - len;

    if (predicate1) {
      result.push({ key: i.toString(), active: i === page, value: i });

      if (result.length === len) {
        result.push({ key: "ellipsis1", active: false, value: "..." });
        result.push({ key: total.toString(), active: false, value: total });
      }
    }

    if (predicate2) {
      if (result.length === 0) {
        result.push({ key: "1", active: false, value: 1 });
        result.push({ key: "ellipsis1", active: false, value: "..." });
      }
      result.push({ key: i.toString(), active: i === page, value: i });
    }

    if (result.length === 0 && predicate3) {
      result.push({ key: "1", active: false, value: 1 });
      result.push({ key: "ellipsis1", active: false, value: "..." });
      result.push({
        key: (page - 1).toString(),
        active: false,
        value: page - 1,
      });
      result.push({ key: page.toString(), active: true, value: page });
      result.push({
        key: (page + 1).toString(),
        active: false,
        value: page + 1,
      });
      result.push({ key: "ellipsis2", active: false, value: "..." });
      result.push({ key: total.toString(), active: false, value: total });
    }
  }

  return result;
};

export default generatePagination;
//
// interface PaginationItem {
//   key: string;
//   active: boolean;
//   value: number | string;
// }
//
// const generatePagination = (total?: number, page?: number, len = 5): PaginationItem[] | null => {
//   if (!total || !page) {
//     return null;
//   }
//
//   const result: PaginationItem[] = [];
//
//   const addPageItem = (key: string, value: number | string, active = false) => {
//     result.push({ key, value, active });
//   };
//
//   const addEllipsisItem = (key: string) => {
//     addPageItem(key, '...', false);
//   };
//
//   const addPageRange = (start: number, end: number) => {
//     for (let i = start; i <= end; i++) {
//       addPageItem(i.toString(), i, i === page);
//     }
//   };
//
//   const addFirstPageItems = () => {
//     addPageRange(1, len);
//     if (total > len) {
//       addEllipsisItem('ellipsis1');
//       addPageItem(total.toString(), total, false);
//     }
//   };
//
//   const addLastPageItems = () => {
//     addPageItem('1', 1, false);
//     addEllipsisItem('ellipsis1');
//     addPageRange(total - len + 1, total);
//   };
//
//   const addMiddlePageItems = () => {
//     addPageItem('1', 1, false);
//     addEllipsisItem('ellipsis1');
//     addPageRange(page - 1, page + 1);
//     if (page + 1 < total) {
//       addEllipsisItem('ellipsis2');
//       addPageItem(total.toString(), total, false);
//     }
//   };
//
//   if (page < len) {
//     addFirstPageItems();
//   } else if (page > total - len + 1) {
//     addLastPageItems();
//   } else {
//     addMiddlePageItems();
//   }
//
//   return result;
// };
//
// export default generatePagination;
