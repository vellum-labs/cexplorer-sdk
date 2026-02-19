import { Settings } from "lucide-react";
import type { CSSProperties, FC, ReactNode } from "react";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../navigationMenu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";

/**
 * Props for the TableSettingsDropdown component
 */
export type TableSettingsDropdownProps = {
  /**
   * Current number of rows to display per page
   */
  rows: number;
  /**
   * Whether to show the rows selector
   * @default true
   */
  visibleRows?: boolean;
  /**
   * Callback function to update the number of rows
   * @param rows - New number of rows to display
   */
  setRows: (rows: number) => void;
  /**
   * Array of column visibility toggle options
   * Each option controls whether a specific column is visible in the table
   */
  columnsOptions: {
    /**
     * Display label for the column toggle
     */
    label: ReactNode;
    /**
     * Whether this column is currently visible
     */
    isVisible: boolean;
    /**
     * Callback when the column toggle is clicked
     */
    onClick?: any;
  }[];
  /**
   * Custom content to replace the default settings icon
   */
  customContent?: ReactNode;
  /**
   * Custom inline styles for the dropdown panel
   */
  customStyles?: CSSProperties;
  /**
   * Custom row options for the rows per page selector
   * @default [10, 20, 30, 40, 50]
   */
  rowOptions?: number[];
  rowsLabel?: string;
};

/**
 * TableSettingsDropdown provides controls for table configuration.
 *
 * A dropdown menu component for managing table settings including rows per page
 * and column visibility. Features a settings icon trigger with a dropdown containing
 * row count selector and column visibility toggles.
 *
 * **Common Use Cases:**
 * - Data table configuration
 * - Column visibility management
 * - Rows per page selection
 * - Table view customization
 * - User preferences for table display
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * const [rows, setRows] = useState(10);
 * const [columns, setColumns] = useState([
 *   { label: "Name", isVisible: true, onClick: () => toggleColumn("name") },
 *   { label: "Email", isVisible: true, onClick: () => toggleColumn("email") },
 *   { label: "Status", isVisible: false, onClick: () => toggleColumn("status") },
 * ]);
 *
 * <TableSettingsDropdown
 *   rows={rows}
 *   setRows={setRows}
 *   columnsOptions={columns}
 * />
 *
 * // Without rows selector
 * <TableSettingsDropdown
 *   rows={10}
 *   setRows={setRows}
 *   visibleRows={false}
 *   columnsOptions={columns}
 * />
 *
 * // With custom trigger content
 * <TableSettingsDropdown
 *   rows={rows}
 *   setRows={setRows}
 *   columnsOptions={columns}
 *   customContent={
 *     <button className="custom-button">Settings</button>
 *   }
 * />
 *
 * // With custom dropdown styles
 * <TableSettingsDropdown
 *   rows={rows}
 *   setRows={setRows}
 *   columnsOptions={columns}
 *   customStyles={{ width: "200px", maxHeight: "400px" }}
 * />
 * ```
 *
 * @param {TableSettingsDropdownProps} props - Component props
 * @param {number} props.rows - Current rows per page
 * @param {(rows: number) => void} props.setRows - Rows update callback
 * @param {Array} props.columnsOptions - Column visibility options
 * @param {boolean} [props.visibleRows=true] - Show rows selector
 * @param {ReactNode} [props.customContent] - Custom trigger content
 * @param {CSSProperties} [props.customStyles] - Custom dropdown styles
 * @param {number[]} [props.rowOptions=[10, 20, 30, 40, 50]] - Custom row options
 * @returns {JSX.Element} Table settings dropdown with rows and column controls
 */
export const TableSettingsDropdown: FC<TableSettingsDropdownProps> = ({
  columnsOptions,
  rows,
  setRows,
  visibleRows = true,
  customContent,
  customStyles,
  rowOptions = [10, 20, 30, 40, 50],
  rowsLabel = "Rows:",
}) => {
  columnsOptions = columnsOptions.filter(
    item => typeof item.isVisible !== "undefined",
  );

  return (
    <NavigationMenu delayDuration={100}>
      <NavigationMenuList className=''>
        <NavigationMenuItem className=''>
          <NavigationMenuTrigger
            onPointerMove={e => e.preventDefault()}
            onPointerLeave={e => e.preventDefault()}
            //@ts-expect-error hideChevron is not a valid prop
            hideChevron
            className='!p-0'
          >
            {customContent ? (
              customContent
            ) : (
              <div className='flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-s border border-border'>
                <Settings size={22} />
              </div>
            )}
          </NavigationMenuTrigger>
          <NavigationMenuContent
            onPointerLeave={e => e.preventDefault()}
            className='z-20 grid w-[150px] rounded-s border-[1px] border-border bg-background text-text-sm font-medium'
            style={customStyles}
          >
            <div>
              <Select
                defaultValue={String(rows)}
                onValueChange={value => {
                  setRows(Number(value));
                }}
              >
                {visibleRows && (
                  <div className='flex h-14 w-full items-center justify-between border-b border-border px-1.5'>
                    <span>{rowsLabel}</span>
                    <SelectTrigger className='w-[60px]'>
                      <SelectValue
                        placeholder={
                          <div className='flex w-full items-center justify-between gap-1/2 uppercase'>
                            <span>{rows}</span>
                          </div>
                        }
                      />
                    </SelectTrigger>
                  </div>
                )}
                <SelectContent align='end'>
                  {rowOptions.map(i => (
                    <SelectItem
                      className='flex w-full cursor-pointer justify-between px-1'
                      key={i}
                      value={String(i)}
                    >
                      <span>{i}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {columnsOptions.map((option, index) => (
              <React.Fragment key={index}>
                <div
                  className={`first:rounded-tl-md first:rounded-tr-md last:rounded-bl-md last:rounded-br-md flex h-full cursor-pointer justify-between border-b-[1px] border-border p-1.5 last:border-b-0 hover:bg-darker`}
                  onClick={option.onClick}
                >
                  <span>{option.label}</span>
                  <span>{option.isVisible && "✓"}</span>
                </div>
              </React.Fragment>
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
