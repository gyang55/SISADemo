import React, { useState, useEffect } from "react";
import "../../styles/verticalTable.css"
function VerticalTable(props){
    const [tableValues, setTableValues] = useState([]);

    useEffect(() => {
        setTableValues(props.data);
    }, [tableValues]);

    return(
        <div>
            <div class="widget-header"><h2>{props.title}</h2></div>
            <table id="description">
                <tbody>
                {tableValues.map((field, index) =>
                <tr>
                    <td>{props.headers[index]}</td>
                    <td>{field}</td>
                </tr>)
                }
                </tbody>
            </table>
        </div>
    );
}
  
export default VerticalTable;