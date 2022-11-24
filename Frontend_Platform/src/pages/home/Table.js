import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../../styles/table.css";
import TableRow from "./TableRow.js"
import DownloadCSV from "../global/DownloadCSV";

function Table(props) {
  const portfolioSums = [0, 0, 0, 0, 0]; // 5 fields: Audit Date (ignore), Status (ignore), Incentive, Net Cost After Incentive, Annualized Cost Savings, GHG Savings Opportunity (Ton Of CO2), ROI
  const [tableData, setTableData] = useState([
    [0, "No data to show", "-", "-", "-", "-", "-", "-", "-"],
  ]);

  const [order, setOrder] = useState("1DSC");

  for (var i = 0; i < tableData.length; i++) {
    portfolioSums[0] +=
      tableData[i][4] !== "" ? parseFloat(tableData[i][4]) : 0; // Incentive
    portfolioSums[1] +=
      tableData[i][5] !== "" ? parseFloat(tableData[i][5]) : 0; // Net Cost
    portfolioSums[2] +=
      tableData[i][6] !== "" ? parseFloat(tableData[i][6]) : 0; // Annualized Cost Savings
    portfolioSums[3] +=
      tableData[i][7] !== "" ? parseFloat(tableData[i][7]) : 0; // GHG Savings Opportunity
    portfolioSums[4] +=
      tableData[i][8] !== "" ? parseFloat(tableData[i][8]) : 0; // ROI
  }

  const portfolioSumsRow = ["Portfolio", "", ""].concat(portfolioSums);

  const handleDate = (date) => {
    // Return just the year given a datetime value.
    return date.split(" ")[3]; // Year is 3rd index of datetime (Fri, Jul 15 2022 00:00:00 GMT)
  };

  // removes project number from api response data (the first value)
  const parseCSV = (tableData) => {
    return tableData.map((row) => row.slice(1));
  };

  useEffect(() => {
    if (props.dataset.length !== 0) {
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

      for (var i = 0; i < data.length; i++) {
        try {
          data[i][8] = (
            (parseFloat(data[i][6]) / parseFloat(data[i][5])) *
            100
          ).toFixed(2); // Calculate ROI = Annualized Cost Savings / Net Cost After Incentive * 100
          if (data[i][8] === "NaN") {
            data[i][8] = "0.00";
          } // In case resultant ROI is NaN, replace with 0.
        } catch (e) {
          continue;
        }
        try {
          data[i][2] = handleDate(data[i][2]); // Get just the year from datetime value
        } catch (e) {
          continue;
        }
      }
      setTableData(data);
    }
  }, [props.dataset]);

  const generateTableData = () => {
    /* generates table rows with expandable contents */
    return tableData.map((building) => ( 
        <TableRow data={building} headers={["Upgrade Description", 
                                            "Lifetime GHG Reduction (tons/yr)", 
                                            "Simple Payback (yrs)", 
                                            "First Year Utility Savings ($)", 
                                            "Capital Cost ($)", "Incentive ($)"]}/>
    ));
};

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

  const renderTableHeaderRow = () => {
    return props.headers.map((value, index) => {
      return (
        <th className="" key={index}>
          <div className="flex justify-between items-center font-mukta ">
            {value}

            {/* This span tag renders a Material UI icon (determined by className),  
                            the expand_more determines the type of icon*/}
            <span
              className="material-symbols-outlined"
              onClick={() => sorting(index + 1)}
            >
              {/* Render the up or down icon when activating sort */}
              {order === index + 1 + "ASC" ? "expand_more" : "expand_less"}
            </span>
          </div>
        </th>
      );
    });
  };

  return (
    <>
      <table id="portfolio-plus" className="overflow-auto text-sm h-full">
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
        <thead>
          <tr>
            <th colSpan={"100%"} className="table-title">
              <div className="flex justify-between items-center font-mukta">
                <p className="">{props.title}</p>
                <DownloadCSV
                  headers={props.headers}
                  data={[portfolioSumsRow].concat(parseCSV(tableData))}
                  filename={props.filename}
                />
              </div>
            </th>
          </tr>
        </thead>
        <thead>
          <tr>{renderTableHeaderRow()}</tr>
        </thead>
        <tbody>
          <tr className="total-row">
            <td className="columnItem font-mukta">Portfolio</td>
            <td className="columnItem font-mukta"></td>
            <td className="columnItem font-mukta"></td>
            <td className="columnItem font-mukta">
              {"$" +
                (Math.round(portfolioSums[0] / 100) * 100).toLocaleString(
                  "en-US"
                )}
            </td>
            <td className="columnItem font-mukta">
              {"$" +
                (Math.round(portfolioSums[1] / 100) * 100).toLocaleString(
                  "en-US"
                )}
            </td>
            <td className="columnItem font-mukta">
              {"$" +
                (Math.round(portfolioSums[2] / 100) * 100).toLocaleString(
                  "en-US"
                )}
            </td>
            <td className="columnItem font-mukta">
              {(Math.round(portfolioSums[3])).toLocaleString(
                "en-US"
              )}
            </td>
            <td className="columnItem font-mukta">
              {((portfolioSums[2] / portfolioSums[1]) * 100).toFixed(2)}
            </td>
          </tr>
          {generateTableData()}
        </tbody>
      </table>
    </>
  );
}

Table.propTypes = {
  dataset: PropTypes.array.isRequired,
  headers: PropTypes.array.isRequired,
};

export default Table;
