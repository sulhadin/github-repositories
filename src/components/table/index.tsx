import React, { ReactElement, useRef } from "react";
import "./table.css";

interface TableColumn<T> {
  key: keyof T;
  label: string;
  render: (item: T) => React.ReactNode;
  sortable?: boolean;
  sortedAs?: boolean;
}

interface TableProps<T> {
  data?: T[];
  columns: TableColumn<T>[];
  onSorting: (columnKey: keyof T, isAscending: boolean) => void;
  isLoading?: boolean;
}

/**
 * Represents a data table component.
 *
 * @param {Object} props - The table component props.
 * @param {Array<Object>} props.data - The data to be displayed in the table.
 * @param {Array<Object>} props.columns - The columns configuration for the table.
 * @param {Function} props.onSorting - The callback function triggered when sorting is applied.
 * @param {boolean} props.isLoading - Indicates whether the table is in loading state.
 * @returns {ReactElement} The table component.
 */
const Table = <T,>({
  data,
  columns,
  onSorting,
  isLoading,
}: TableProps<T>): ReactElement => {
  const sortedColumnRef = useRef<keyof T | null>(null);
  const isAscendingRef = useRef<boolean | null>(null);

  // Helper function to determine sorting direction
  const getSortDirection = (columnKey: keyof T, sortedAs?: boolean) => {
    if (sortedAs !== undefined) {
      return <span className="ml-1">{sortedAs ? <>▲</> : <>▼</>}</span>;
    }

    if (
      sortedColumnRef.current !== null &&
      columnKey === sortedColumnRef.current
    ) {
      return (
        <span className="ml-1">{isAscendingRef.current ? <>▲</> : <>▼</>}</span>
      );
    }

    return null;
  };

  const handleSorting = (columnKey: keyof T) => {
    if (sortedColumnRef.current === columnKey) {
      // Toggle sorting direction if the same column is clicked
      isAscendingRef.current = !isAscendingRef.current;
    } else {
      // Set sorting to ascending by default when clicking a new column
      sortedColumnRef.current = columnKey;
      isAscendingRef.current = true;
    }
    onSorting(columnKey, isAscendingRef.current);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>Data is null or undefined</p>;
  }

  if (data.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key.toString()}
                onClick={() => column.sortable && handleSorting(column.key)}
                className={`${
                  column.sortable ? "cursor-pointer bg-gray-50" : ""
                }`}
              >
                {column.label}
                {getSortDirection(column.key, column.sortedAs)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.key.toString()}>{column.render(item)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
