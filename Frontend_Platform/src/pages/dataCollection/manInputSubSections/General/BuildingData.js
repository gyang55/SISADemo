// import './../App.css';
import { useState } from "react";
import InputField from "../../components/InputField.js";

function BuildingData() {
    let buildingData = [
        {
            title: 'Building type',
            type: "text"

        },
        {
            title: 'Total floor area (sqf)',
            type: "number"

        },
        {
            title: 'Equiv Full Time office Employees (FTE)',
            type: "number"

        },
        {
            title: 'Residents (MURB)',
            type: "number"

        },
        {
            title: 'Number of elevators',
            type: "number"
        },
        {
            title: 'Number of exterior doors',
            type: "number"

        },
        {
            title: '% Men-Women',
            type: "number"

        },
        {
            title: 'Number of meter groups',
            type: "number"
        },
        {
            title: 'Name of the meters',
            type: "text"
        },
        {
            title: 'Window draftyness',
            type: "text"
        }
    ]
    let [buildingElements, setBuildingElement] = useState(buildingData);

    return (

        <div className='px-5'>
            <h4 className='text-3xl py-5'> Building Data</h4>
            <div className='border-t-black border-2'></div>
            {/* <div className="grid-container"> */}
            <div className="grid grid-cols-3 gap-3">
                {
                    buildingElements.map(function (a, i) {
                        return (
                            <InputField buildingElements={a} i={i} />
                        )
                    })
                }
            </div>

        </div>



    )
}


export default BuildingData;