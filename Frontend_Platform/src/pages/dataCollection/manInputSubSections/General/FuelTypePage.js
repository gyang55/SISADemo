import { useEffect, useState } from "react";
import InputField from "../../components/InputField.js";


function FuelTypePage() {

    let FuelData = [
        {
            title: 'Individual suite electric meters',
            type: "text"
        },
        {
            title: 'Domestic hot water primary fuel',
            type: "text"
        },
        {
            title: 'Outdoor air ventilation heated by',
            type: "text"
        },
        {
            title: 'Space heating primary fuel',
            type: "text"
        }
    ]

    
    return (
        <div className='px-5'>
            <h4 className='text-3xl py-5'> Fuel Types</h4>
            <div className='border-t-black border-2'></div>
            {/* <div className="grid-container"> */}
            <div className="grid grid-cols-3 gap-3">
                {
                    FuelData.map( (item) => {
                        return <InputField title={item.title} />
                    }          
                        )
                   
                }
            </div>

        </div>

    )
}

export default FuelTypePage;
