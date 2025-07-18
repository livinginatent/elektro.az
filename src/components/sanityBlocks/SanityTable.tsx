import React from "react";
import { cn } from "@/lib/utils";

interface TableRow {
  cells: string[];
  isHeader?: boolean;
}

interface TableProps {
  title?: string;
  rows: TableRow[];
  caption?: string;
  stripedRows?: boolean;
  compactTable?: boolean;
  className?: string;
}

export const SanityTable: React.FC<TableProps> = ({
  title,
  rows,
  caption,
  stripedRows = true,
  compactTable = false,
  className,
}) => {
  if (!rows || rows.length === 0) {
    return null;
  }

  const headerRows = rows.filter((row) => row.isHeader);
  const dataRows = rows.filter((row) => !row.isHeader);

  return (
    <div className={cn("my-8 overflow-x-auto", className)}>
      {title && (
        <h3 className="text-lg font-semibold text-slate-900 mb-4">{title}</h3>
      )}

      <div className="inline-block min-w-full overflow-hidden rounded-lg border border-slate-200 shadow-sm">
        <table className="min-w-full divide-y divide-slate-200">
          {/* Table Header */}
          {headerRows.length > 0 && (
            <thead className="bg-slate-50">
              {headerRows.map((row, rowIndex) => (
                <tr key={`header-${rowIndex}`}>
                  {row.cells.map((cell, cellIndex) => (
                    <th
                      key={`header-${rowIndex}-${cellIndex}`}
                      className={cn(
                        "text-left text-sm font-semibold text-slate-900",
                        compactTable ? "px-3 py-2" : "px-6 py-4"
                      )}
                    >
                      {cell}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
          )}

          {/* Table Body */}
          <tbody className="bg-white divide-y divide-slate-200">
            {dataRows.map((row, rowIndex) => (
              <tr
                key={`data-${rowIndex}`}
                className={cn(
                  "transition-colors hover:bg-slate-50",
                  stripedRows && rowIndex % 2 === 1 && "bg-slate-25"
                )}
              >
                {row.cells.map((cell, cellIndex) => (
                  <td
                    key={`data-${rowIndex}-${cellIndex}`}
                    className={cn(
                      "text-sm text-slate-700 whitespace-nowrap",
                      compactTable ? "px-3 py-2" : "px-6 py-4"
                    )}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {caption && (
        <p className="mt-3 text-sm text-slate-600 italic">{caption}</p>
      )}
    </div>
  );
};
