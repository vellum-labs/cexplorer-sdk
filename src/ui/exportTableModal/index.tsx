import type { TableColumns } from "@/types/tableTypes";
import type { FC } from "react";

import { Download } from "lucide-react";

import { convertJSONToCSV } from "@/utils/convertJSONToCSV";
import { getExportJSON } from "@/utils/getExportJSON";
import { useState } from "react";
import { Modal } from "../modal";

/**
 * Props for the ExportTableModal component
 */
export interface ExportTableModalProps {
  /**
   * Callback function to close the modal
   */
  onClose: () => void;
  /**
   * Table columns configuration for export
   */
  columns?: TableColumns<any>;
  /**
   * Array of table items/rows to export
   */
  items?: any[];
  /**
   * Current page number for export metadata
   */
  currentPage?: number;
  /**
   * Modal title text
   * @default "Export table"
   */
  title?: string;
  /**
   * CSV option label
   * @default "CSV"
   */
  csvLabel?: string;
  /**
   * CSV option description
   * @default "Great for easy viewing in spreadsheet tools."
   */
  csvDescription?: string;
  /**
   * JSON option label
   * @default "JSON"
   */
  jsonLabel?: string;
  /**
   * JSON option description
   * @default "Best for structured data and app integration."
   */
  jsonDescription?: string;
  /**
   * Cancel button label
   * @default "Cancel"
   */
  cancelLabel?: string;
  /**
   * Export button label
   * @default "Export"
   */
  exportLabel?: string;
}

/**
 * ExportTableModal provides a dialog for exporting table data in CSV or JSON format.
 *
 * A modal dialog that allows users to export table data to CSV or JSON files. Features
 * radio button selection for format choice and automatic file download. Handles data
 * transformation using utility functions for both CSV and JSON export.
 *
 * **Common Use Cases:**
 * - Exporting table data for offline analysis
 * - Downloading transaction lists
 * - Saving filtered data results
 * - Exporting blockchain data to spreadsheets
 * - Data backup and archival
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <ExportTableModal
 *   onClose={() => setShowExport(false)}
 *   columns={tableColumns}
 *   items={tableData}
 *   currentPage={1}
 * />
 *
 * // With table state
 * const [showExport, setShowExport] = useState(false);
 *
 * <button onClick={() => setShowExport(true)}>
 *   Export Data
 * </button>
 *
 * {showExport && (
 *   <ExportTableModal
 *     onClose={() => setShowExport(false)}
 *     columns={columns}
 *     items={filteredItems}
 *     currentPage={currentPage}
 *   />
 * )}
 *
 * // With transactions table
 * <ExportTableModal
 *   onClose={() => setIsOpen(false)}
 *   columns={transactionColumns}
 *   items={transactions}
 *   currentPage={page}
 * />
 * ```
 *
 * @param {ExportTableModalProps} props - Component props
 * @param {Function} props.onClose - Modal close callback
 * @param {TableColumns} [props.columns] - Table columns configuration
 * @param {Array} [props.items] - Table data items
 * @param {number} [props.currentPage] - Current page number
 * @returns {JSX.Element} Modal with CSV/JSON export options
 */
export const ExportTableModal: FC<ExportTableModalProps> = ({
  onClose,
  columns,
  items,
  currentPage,
  title = "Export table",
  csvLabel = "CSV",
  csvDescription = "Great for easy viewing in spreadsheet tools.",
  jsonLabel = "JSON",
  jsonDescription = "Best for structured data and app integration.",
  cancelLabel = "Cancel",
  exportLabel = "Export",
}) => {
  const [selectedItem, setSelectedItem] = useState<"csv" | "json">();

  const exportData = () => {
    if (!columns || !items) {
      return;
    }

    const json = getExportJSON(columns, items, currentPage ?? 1);

    if (!json) {
      return;
    }
    const link = document.createElement("a");

    if (selectedItem === "json") {
      const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
        JSON.stringify(json),
      )}`;
      link.href = jsonString;
      link.download = "table.json";
      link.click();
      return;
    }

    const csv: string = convertJSONToCSV(json);
    const csvString = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;
    link.href = csvString;
    link.download = "table.csv";
    link.click();
  };

  return (
    <Modal minWidth='95%' maxWidth='400px' maxHeight='95%' onClose={onClose}>
      <div className='flex flex-col gap-3'>
        <div className='flex h-full w-full flex-col gap-3'>
          <span className='text-text-lg font-semibold'>{title}</span>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex items-start gap-1/2'>
            <input
              type='radio'
              id='csv'
              className='my-[2px] h-[15px] w-[15px]'
              checked={selectedItem === "csv"}
              onChange={() => setSelectedItem("csv")}
            />
            <div className='flex h-full flex-col'>
              <span className='text-text-sm font-medium'>{csvLabel}</span>
              <span className='text-text-sm text-grayTextPrimary'>
                {csvDescription}
              </span>
            </div>
          </div>
          <div className='flex items-start gap-1/2'>
            <input
              type='radio'
              id='json'
              className='my-[2px] h-[15px] w-[15px]'
              checked={selectedItem === "json"}
              onChange={() => setSelectedItem("json")}
            />
            <div className='flex h-full flex-col'>
              <span className='text-text-sm font-medium'>{jsonLabel}</span>
              <span className='text-text-sm text-grayTextPrimary'>
                {jsonDescription}
              </span>
            </div>
          </div>
        </div>
        <div className='flex items-center justify-between gap-1.5'>
          <button
            className='flex h-[40px] w-full max-w-[170px] flex-1 cursor-pointer items-center justify-center rounded-s border border-border'
            onClick={onClose}
          >
            <span className='text-text-md font-semibold'>{cancelLabel}</span>
          </button>
          <button
            className={`flex h-[40px] w-full max-w-[170px] flex-1 items-center justify-center gap-1/2 rounded-s border border-border transition-all duration-100 ${selectedItem ? "cursor-pointer" : "text-grayTextPrimary"}`}
            disabled={!selectedItem}
            onClick={exportData}
          >
            <Download size={20} className='text-inherit' />
            <span className='text-text-sm font-medium'>{exportLabel}</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
