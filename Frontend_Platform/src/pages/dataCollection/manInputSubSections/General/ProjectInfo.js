// import './../App.css';
import { useState } from "react";
<<<<<<< HEAD:src/pages/dataCollection/routes/General/ProjectInfo.js
import projectInfodata from "../../formData/projectInfo.js";
=======
import projectInfodata from "../../formData/projectInfo";
>>>>>>> 652aefb08f4d55754da81a2464f1a20d3bd7069e:src/pages/dataCollection/manInputSubSections/General/ProjectInfo.js

import InputField from '../../components/InputField.js';

function Demo() {

    let [projectInfoElements, setProjectInfoElement] = useState(projectInfodata);

    return (

        <div className='px-5'>
            <h4 className='text-3xl py-5'> Project Information & Parameters</h4>
            <div className='border-t-black border-2'></div>
            {/* <div className="grid-container"> */}
            <div className="grid grid-cols-3 gap-3">
                {
                    projectInfoElements.map(function (a, i) {
                        return (
                            <InputField buildingElements={a} i={i} />
                        )
                    })
                }
            </div>

        </div>



    )
}


export default Demo;