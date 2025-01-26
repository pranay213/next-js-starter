"use client";

import moment from "moment";
import React from "react";
import Appbutton from "../Appbutton/Appbutton";

interface Action {
  label?: string;
  className?: string;
  onClick?: (row: Record<string, any>) => void;
}

interface Header {
  key: string;
  label: string;
}

interface CustomTableProps {
  headers: Header[];
  data: Array<Record<string, any>>;
  actions?: Action[];
}

const CustomTable: React.FC<CustomTableProps> = ({
  headers,
  data,
  actions,
}) => {
  return (
    <div className="container mx-auto p-4">
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            {headers.map((header, index) => (
              <th
                key={index}
                className="border border-gray-300 px-4 py-2 text-center"
              >
                {header.label}
              </th>
            ))}
            {actions && (
              <th className="border border-gray-300 px-4 py-2 text-center">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`${
                rowIndex % 2 === 0 ? "bg-blue-50" : "bg-purple-100"
              } transform text-center transition-all duration-200 hover:bg-purple-400 hover:text-[#fff]`}
            >
              {headers.map((header, colIndex) => (
                <td
                  key={`${rowIndex}-${colIndex}`}
                  className="border border-gray-300 px-4 py-2"
                >
                  {header.key.toLowerCase() === "logo" && row[header.key] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={row[header.key]}
                      alt="logo"
                      className="mx-auto h-12 w-12 rounded-full object-cover"
                    />
                  ) : header.key.toLowerCase() === "createdat" ? (
                    // Format createdAt
                    row[header.key] ? (
                      moment(row[header.key]).format("hh:mm A")
                    ) : (
                      ""
                    )
                  ) : header.key.toLowerCase() === "status" ? (
                    // Show status as Active or In-Active
                    row[header.key] ? (
                      "Active"
                    ) : (
                      "In-Active"
                    )
                  ) : (
                    row[header.key]
                  )}
                </td>
              ))}

              {actions && (
                <td className="flex justify-center space-x-2 border border-gray-300 px-4 py-2">
                  {actions.map((action) => (
                    <Appbutton
                      key={action.label}
                      label={action.label || ""}
                      onClick={() => action.onClick?.(row)}
                    />
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
