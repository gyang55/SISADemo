import { useEffect, useState } from "react";
import InputField from "../../components/InputField.js";


function ThermalPage() {

    let ThermalData = [
        {
            title: 'Space heating gas Avg Efficiency (%)',
            type: 'number'
        },
        {
            title: 'DHW gas Avg Efficiency (%)',
            type: 'number'
        },
        {
            title: 'Gas Boiler Heating Control',
            type: 'text'
        },
        {
            title: 'HWY design temp',
            type: 'number'
        },
        {
            title: 'Observed temp',
            type: 'number'
        },
        {
            title: 'OAT rest',
            type: "text"
        },
        {
            title: 'Has cooling?',
            type: "text"
        }
    ]

    
    return (
        <div className='px-5'>
            <h4 className='text-3xl py-5'> Thermal Plant</h4>
            <div className='border-t-black border-2'></div>
            {/* <div className="grid-container"> */}
            <div className="grid grid-cols-3 gap-3">
                {
                    ThermalData.map( (item) => {
                        return <InputField title={item.title} />
                    }          
                        )
                   
                }
            </div>

        </div>

    )
}

export default ThermalPage;