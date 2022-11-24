import { useEffect, useState } from "react";
import InputField from "../../components/InputField.js";


function ProInfoPage() {

    let ProInfodata = [
        {
            title: 'Site name',
            type: "text"
        },
        {
            title: 'Site address',
            type: "text"
        },
        {
            title: 'City',
            type: "text"
        },
        {
            title: 'Owner(/Organization)',
            type: "text"
        },
        {
            title: 'Office address',
            type: "text"
        },
        {
            title: 'Applicant name',
            type: "text"
        },
        {
            title: 'Telephone',
            type: "text"
        },
        {
            title: 'Email',
            type: "text"
        },
        {
            title: 'Program job',
            type: "text"
        },
        {
            title: 'Site contact name',
            type: "text"
        },
        {
            title: 'Site auditor(s)',
            type: "text"
        },
        {
            title: 'Project responsible engineer',
            type: "text"
        },
        {
            title: 'Email of responsible engineer',
            type: "text"
        },
        {
            title: 'Envelope condition',
            type: "text"
        },
        {
            title: 'Year of original construction',
            type: "number"
        },
        {
            title: 'Number of floors',
            type: "number"
        },
        {
            title: 'Year of last remodel',
            type: "number"
        },
        {
            title: 'Site visit date',
            type: "date"
        }
    ]

    
    return (
        <div className='px-5'>
            <h4 className='text-3xl py-5'> Project Information</h4>
            <div className='border-t-black border-2'></div>
            {/* <div className="grid-container"> */}
            <div className="grid grid-cols-3 gap-3">
                {
                    ProInfodata.map( (item) => {
                        return <InputField title={item.title} />
                    }          
                        )
                   
                }
            </div>

        </div>

    )
}

export default ProInfoPage;