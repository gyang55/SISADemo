import React, { useEffect, useState } from "react";
import "../../styles/table.css";
import Fade from '@mui/material/Fade';
import { shouldSkipGeneratingVar, styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import AnimateHeight from 'react-animate-height';
import { NavLink } from "react-router-dom";

function TableRow(props){
    /*
        This Component creates a table row for the home page table. It gives the user an option to expand the data to show upgrades for their building.
     */

    // Style the hover tooltip
    const LightTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
      ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: theme.palette.common.white,
          color: 'rgba(0, 0, 0, 0.87)',
          boxShadow: theme.shadows[1],
          fontSize: 11,
        },
      }));

    // States:
    const [height, setHeight] = useState(0);
    const [tableData, setTableData] = useState([])
    const [expandedTableData, setExpandedTableData] = useState([])
    const [dataShown, setDataShown] = useState(false)
    const [order, setOrder] = useState("1DSC");

    // Pull data from props and set the table data
    useEffect(() => {
        setTableData(props.data);
        setExpandedTableData(props.data[9]);
    }, [props.data]);
    

    // Sorting function handles sorting for the expanded ecm table
    const sorting = (col) => {
    if (order.substring(1) === "ASC") {
      const sorted = [...expandedTableData].sort((a, b) =>
        a[col].localeCompare(b[col], "en", {
          numeric: true,
          sensitivity: "base",
        })
      );
      setExpandedTableData(sorted);
      setOrder(col + "DSC");
    }

    if (order.substring(1) === "DSC") {
      const sorted = [...expandedTableData].sort((a, b) =>
        b[col].localeCompare(a[col], "en", {
          numeric: true,
          sensitivity: "base",
        })
      );
      setExpandedTableData(sorted);
      setOrder(col + "ASC");
    }
  };

    // Generate ECM data from the expandedTableData
    const generateTableData = () => {
        return expandedTableData.map((building) => (
            <tr className="row">
            {building.map((data, index) => {
                // index 0 and 1 are not to be displayed, they are project number and building names
                if(index !== 0 && index !== 1) {
                    if([5,6,7].includes(index)) {
                        // these indices are monetary
                        return (
                            <td key={index} className="columnItem font-mukta align-middle">
                                {"$" + parseFloat(data).toLocaleString('en-US')} 
                            </td>
                        );
                    }
                    else return (
                        <td key={index} className="columnItem font-mukta align-middle">
                            {data}
                        </td>
                    );
                
                }
            })}
        </tr>
        ));
    };

    // Renders the table headers along with sorting icons
    const renderTableHeaderRow = () => {
        return props.headers.map((value, index) => {
          return (
            <th className="expanded-header sticky top-0" key={index}>
              <div className="flex justify-between items-center font-mukta ">
                {value}
                <span
                  className="material-symbols-outlined"
                  onClick={() => sorting(index + 2)}
                >
                  {order === index + 2 + "ASC" ? "expand_more" : "expand_less"}
                </span>
              </div>
            </th>
          );
        });
      };

    // Renders the expanded ECM table container
    function ExpandedData(){
        return(
            <>
            <div className="widget-header-expanded mt-3">
                <h2>Recommended Energy Solutions for <i>{tableData[1]}</i></h2>
            </div>
            <table id="expanded-ecm" className="items-center m-auto mb-5 ">
                <tr>
                   {renderTableHeaderRow()}
                </tr>
                {generateTableData()}
            </table>
            </>
        )
    }

    return(
        <>  {/* This renders the home page table row with an expanded ECM table inside */}
            <tr className="row columnItem font-mukta align-middle" style={height === 'auto' ? {borderBottom: "0.1px solid #ddd"}: {}}>
                {tableData.map((data, index) => {
                   if (index !== 0 && index !== 1 && index !== 9) {
                        if([4,5,6].includes(index)) {
                            return (
                                <td key={index} className="columnItem font-mukta align-middle">
                                    {"$" + parseFloat(data).toLocaleString('en-US')} 
                                </td>
                            );
                        }
                        else if(index === 7){
                            return (
                                <td key={index} className="columnItem font-mukta align-middle">
                                    {parseFloat(data).toLocaleString('en-US')} 
                                </td>
                            )
                        }
                        else if(index ===3){
                            return(
                                <td key={index} className="columnItem font-mukta align-middle">
                                    <LightTooltip title="View ECM report" TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} enterDelay={200} placement="bottom" arrow>
                                    <div className="inline-block pt-1">
                                        <a id="active-decal" href={`${process.env.REACT_APP_REPORT_URL}/${tableData[0]}/${localStorage.getItem("token")}`}>
                                        {/* <NavLink 
                                        id="active-decal" 
                                        to={`/report/${tableData[0]}`}
                                        > */}
                                            <div>
                                            <div className="float-right w-1/12 mr-2 mt-px">
                                                <svg  id="table-minus-sign" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                                                    <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                                                </svg>
                                            </div>
                                                <p className="float-right w-8/12">{data}</p>
                                            </div>
                                        </a>
                                        {/* </NavLink> */}
                                    </div>
                                    </LightTooltip>
                                </td>
                                
                            )
                        }
                        else return (
                            <td key={index} className="columnItem font-mukta align-middle">
                                {data}
                            </td>
                        );
                    } else if(index === 1) {
                        return (
                            <td key={index} className="font-mukta align-middle">
                                <LightTooltip title="Show upgrade data" TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} enterDelay={600} arrow>
                                <span id="table-decal-signs" className="mr-3 mt-0.5 float-left w-1/12" onClick={() => setHeight(height === 0 ? 'auto' : 0)}>
                                    {height !==0 ? <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                                </svg> : 
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                                </svg>}
                                        </span>
                                </LightTooltip>
                                <p className="float-left w-9/12">
                                    {data}
                                </p>
                            </td>
                        );
                    }
                })}
            </tr>
        {/* This is responsible for rendering the expanded table */}
        {expandedTableData ? 
            <td colspan="8" style={{paddingTop:0, paddingBottom: 0, paddingLeft: "1rem", paddingRight: "1rem"}}>
                <AnimateHeight
                    id="example-panel"
                    duration={500}
                    height={height}
                >
                    {<ExpandedData/>}
                </AnimateHeight>
            </td> : 
            <></>}
        </>
    )
}

export default TableRow;