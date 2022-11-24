import React, { useEffect, useState } from "react";
import "../../styles/table.css";
import "../../styles/index.css";
import PropTypes from "prop-types";

import DownloadCSV from "../global/DownloadCSV";

/**
 * Takes in an API endpoint on the backend as a string.
 * Takes in an 'option' to determine if component renders the Building or Year table.
 * The data returned by this endpoint must be an array of arrays, with each inner array representing a table row.
 * This component also takes in an array for the main Header row for both Building and Year tables.
 * However, the Building table also has two secondary rows which are hardcoded here in JS, in the future, this could instead
 * be pulled from the back-end and separated from the main data, depending on the SQL query.
 */

function Table(props) {
  const [tableData, setTableData] = useState([]);
  const [order, setOrder] = useState("0DSC");

  let portfolioTotalsRow = [
    "Total Portfolio Upgrade Costs Incurred",
    "$0",
    "$0",
    "$0",
    "$0",
    "$0",
    "$0",
    "$0",
    "$0",
    "$0",
  ];

  const yearsRow = ["Years"];
  const today = new Date();
  const thisYear = today.getFullYear();
  const timeline = 9;
  for (let i = thisYear; i < thisYear + timeline; i++) {
    yearsRow.push(i);
  }

  useEffect(() => {
    let res = props.dataset;
    // Replace any null and NaN values with empty string, then set the tableData state with response
    const data = res.map((row) =>
      row.map((cell) => {
        if (cell === "NaN") {
          return "";
        }
        return cell;
      })
    );
    setTableData(data);
  }, [props.dataset]);

  // Renders the primary header with the sorting buttons/symbols
  const renderTableHeaderRow = () => {
    return props.headers.map((value, index) => {
      return (
        <th className="sticky top-0" key={index}>
          <div className="flex justify-between items-center font-mukta ">
            {value}

            {/* This span tag renders a Material UI icon (determined by className),  
                            the expand_more determines the type of icon*/}
            <span
              className="material-symbols-outlined"
              onClick={() => sorting(index)}
            >
              {/* Render the up or down icon when activating sort */}
              {order === index + "ASC" ? "expand_more" : "expand_less"}
            </span>
          </div>
        </th>
      );
    });
  };

  // Renders a fixed row, a second header which is only used by the Building table
  const renderYearHeader = () => {
    return yearsRow.map((cell) => {
      return (
        <td className="columnItem font-mukta align-middle bg-teal-600">
          {cell}
        </td>
      );
    });
  };

  // Renders a fixed row with placeholder data for the initial installation cost total since database is not ready
  // This is only used by the Building table
  const renderPortfolioHeader = () => {
    return portfolioTotalsRow.map((cell) => {
      return (
        <td className="columnItem font-mukta align-middle bg-blue-300">
          {cell}
        </td>
      );
    });
  };

  // Renders the main data values, only these values will be affected by column sorting
  // Used by both Building and Year tables
  const renderTableDataRows = () => {
    let nullData = [["No data to show", "", "", "", "", "", "", "", "", ""]]
    return nullData.map((row) => (
      // The key attribute for tr must be a unique value for React to track the tr
      // The primary key of the data is not suitable if it isn't unique
      <tr key={tableData.indexOf(row)} className="row">
        {row.map((data, index) => {
          if (index == 0) {
            return (
              <td key={index} className="columnItem font-mukta align-middle">
                <div className="">{data}</div>
              </td>
            );
          } else if (data !== "NaN") {
            return (
              <td
                key={index}
                // className="columnItem font-mukta align-middle"
              >
                {/* <div className="grid grid-rows-2 gap-2"> */}
                <div className="mt-2">{data[0]}</div>
                <div className="mt-2">{data === "" ? "" : "$" + data[1]}</div>
                {/* </div> */}
              </td>
            );
          }
        })}
      </tr>
    ));
  };

  //This function handles the sorting of each column, takes column index and state to determine which column to sort
  const sorting = (col) => {
    if (order.substring(1) === "ASC") {
      const sorted = [...tableData].sort((a, b) =>
        a[col].localeCompare(b[col], "en", {
          numeric: true,
          sensitivity: "base",
        })
      );
      setTableData(sorted);
      setOrder(col + "DSC");
    }

    if (order.substring(1) === "DSC") {
      const sorted = [...tableData].sort((a, b) =>
        b[col].localeCompare(a[col], "en", {
          numeric: true,
          sensitivity: "base",
        })
      );
      setTableData(sorted);
      setOrder(col + "ASC");
    }
  };

  // Table-Analysis.js will render either the building or year table depending on props.option
  if (props.option == "building") {
    return (
      <table
        id="portfolio"
        className={"text-sm w-full overflow-auto h-72"}
      >
        <thead>
          <tr>
            <th colSpan={"100%"} className="table-title">
              <div className="flex justify-between items-center font-mukta">
                <p className="">{props.title}</p>
                <DownloadCSV
                  headers={props.headers}
                  data={[yearsRow].concat([portfolioTotalsRow], tableData)}
                  filename={props.filename}
                />
              </div>
            </th>
          </tr>
        </thead>

        <thead>
          <tr>{renderTableHeaderRow()}</tr>
          <tr>{/*Render the Asset and Years header */ renderYearHeader()} </tr>
          <tr>
            {
              /*Render the Portfolio upgrade capital expenses row*/ renderPortfolioHeader()
            }
          </tr>
        </thead>
        <tbody>{renderTableDataRows()}</tbody>
      </table>
    );
  }
  return (
    <table
      id="portfolio"
      className={"rounded-lg text-sm w-full overflow-auto block"}
    >
      <thead>
        <tr>{renderTableHeaderRow()}</tr>
      </thead>
      <tbody>{renderTableDataRows()}</tbody>
    </table>
  );
}

Table.propTypes = {
  dataset: PropTypes.array.isRequired,
  headers: PropTypes.array.isRequired,
};

export default Table;
