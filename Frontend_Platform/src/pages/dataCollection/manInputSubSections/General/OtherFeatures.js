// import './../App.css';
import { useEffect, useState } from "react";
import otherFeaturesdata from "../../formData/otherFeaturesData";

import InputField from '../../components/InputField';

function OtherFeatures() {

    let [otherFeaturesElements, setOtherFeaturesElement] = useState(otherFeaturesdata);



    return (

        <div className='px-5'>
            <h4 className='text-3xl py-5'> Other Features</h4>
            <div className='border-t-black border-2'></div>
            {/* <div className="grid-container"> */}
            <div className="grid grid-cols-3 gap-3">
                {
                    otherFeaturesElements.map(function (a, i) {
                        return (
                            <InputField buildingElements={a} i={i} />
                        )
                    })
                }
            </div>

        </div>



    )
}


export default OtherFeatures;