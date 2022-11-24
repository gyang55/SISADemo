// import * as React from 'react';
// import Grid from '@mui/material/Grid'
// import Container from '@mui/material/Container'
// import InputField from "../../components/InputField.js"
// import gasData from "../../formData/gasData"
// import { useLocation, useNavigate } from "react-router-dom"
// import { useContext } from "react"
// import { useState } from 'react'
// import BottomNav from "../../components/bottomNav/BottomNav_NewVer"
// import { backBtn, addBtn, resetBtn, submitBtn, deleteBtn, saveBtn } from '../../formData/bottomNavData.js'
// import UploadFile from '../../components/fileUpload/FileUpload.js'

// import { BuildingContext } from '../../components/Context/context'

// import ButtonConfirmDialog from '../../components/buttonConfirmDialog/ButtonConfirmDialog.js'
// import * as XLSX from "xlsx"

// var data = []

// export default function GasData(props) {
//     const navigate = useNavigate()
//     const [gasDataFromImages, setGasDataFromImages] = useState([...gasData])

//     const [openSave, setOpenSave] = React.useState(false);
//     const [openReset, setOpenReset] = React.useState(false);

//     const [message_start, setStartMessage] = useState('')
//     const [message_end, setEndMessage] = useState('')
//     const [message_consumption, setConsumptionMessage] = useState('')
//     const [message_demand, setDemandMessage] = useState('')
//     const [message_cost, setCostMessage] = useState('')
//     const handleStartChange = event => {
//         setStartMessage(event.target.value)
//     }
//     const handleEndChange = event => {
//         setEndMessage(event.target.value)
//     }
//     const handleConsumptionChange = event => {
//         setConsumptionMessage(event.target.value)
//     }
//     const handleDemandChange = event => {
//         setDemandMessage(event.target.value)
//     }
//     const handleCostChange = event => {
//         setCostMessage(event.target.value)
//     }

//     function saveData() {
//         var obj = {StartDate: message_start, EndDate: message_end, Consumption: message_consumption, Demand: message_demand, Cost: message_cost}
//         data.push(obj)
//         setStartMessage('')
//         setEndMessage('')
//         setConsumptionMessage('')
//         setDemandMessage('')
//         setCostMessage('')
//     }

//     // The code to display xlsx
//     const [items, setItems] = useState([]);
//     const readExcel = (file) => {
//         const promise = new Promise((resolve, reject) => {
//             const fileReader = new FileReader();
//             fileReader.readAsArrayBuffer(file);

//             fileReader.onload = (e) => {
//                 const bufferArray = e.target.result;

//                 const wb = XLSX.read(bufferArray, { type: "buffer" });

//                 const wsname = wb.SheetNames[0];

//                 const ws = wb.Sheets[wsname];

//                 data = XLSX.utils.sheet_to_json(ws);

//                 resolve(data);
//             };

//             fileReader.onerror = (error) => {
//                 reject(error);
//             };
//         });

//         promise.then((d) => {
//             setItems(d);
//         });
//     };

//     console.log(data)

//     const handleClose = () => {
//         setOpenSave(false);
//         setOpenReset(false);
//     };


//     // // define event handlers
//     function backHandler() {
//         navigate(-1)
//     }

//     function addHandler() {
//         console.log("add");
//     }

//     function resetHandler() {
//         console.log("reset");

//     }

//     function resetClickopen() {
//         setOpenReset(true);

//     }

//     function submitHandler() {
//         console.log("submi");
//     }

//     function deleteHandler() {
//         console.log("delete");
//     }

//     function saveHandler() {
//         const sectionObj = {}
//         var is_complete = true
//         gasDataFromImages.map((item) => {
//             if (item.value == '') is_complete = false
//             sectionObj[item.id] = item.value
//         })
//         sectionObj['is_complete'] = is_complete
//         console.log(sectionObj);
//         value.changeSection(sectionObj)
//     }

//     function saveClickopen() {
//         setOpenSave(true);
//     }


//     // // rebuild button array with predefined event handlers
//     var newBackBtn = { ...backBtn, eventHandler: backHandler }
//     var newResetBtn = { ...resetBtn, eventHandler: resetClickopen }
//     var newSaveBtn = { ...saveBtn, eventHandler: saveClickopen }

//     // // build array to map through
//     // const dashboardButtons = [submitBtn, addBtn, deleteBtn]
//     var navButtons = [newBackBtn, newSaveBtn]

//     return (
//         <>
//             <div className='title w-fit'>
//                 <h1 className="text-4xl text-black font-mukta" id="page_title">Gas Data</h1>
//             </div>
//             <Container maxWidth='100%' sx={{ bgcolor: '#FFFFFF', mx: 0, px: 0, py: 5, boxShadow: 3, borderRadius: 2 }}>

//                 <div>
//                     <h3>Start Date</h3>
//                     <input className='rounded-sm outline-none border p-2 m-1 text-gray-500'
//                         type="text"
//                         id="startDate"
//                         name="message_start"
//                         onChange={handleStartChange}
//                         value={message_start}
//                     />
//                     <h3>End Date</h3>
//                     <input className='rounded-sm outline-none border p-2 m-1 text-gray-500'
//                         type="text"
//                         id="endDate"
//                         name="message_end"
//                         onChange={handleEndChange}
//                         value={message_end}
//                     />
//                     <h3>Consumption kWh</h3>
//                     <input className='rounded-sm outline-none border p-2 m-1 text-gray-500'
//                         type="text"
//                         id="consumption"
//                         name="message_consumption"
//                         onChange={handleConsumptionChange}
//                         value={message_consumption}
//                     />
//                     <h3>Demand kW</h3>
//                     <input className='rounded-sm outline-none border p-2 m-1 text-gray-500'
//                         type="text"
//                         id="demand"
//                         name="message_demand"
//                         onChange={handleDemandChange}
//                         value={message_demand}
//                     />
//                     <h3>Cost</h3>
//                     <input className='rounded-sm outline-none border p-2 m-1 text-gray-500'
//                         type="text"
//                         id="cost"
//                         name="message_cost"
//                         onChange={handleCostChange}
//                         value={message_cost}
//                     />
//                 </div>
//                 <button style={{width:120, height:50}} onClick={saveData}>Save to List</button>

//                 {/* <Grid container
//                     spacing={2}
//                     columns={10}
//                     direction="row"
//                     justifyContent="center"
//                     alignItems="center">
//                     {gasData.map((item, i) => {
//                         return (<Grid
//                             key={item.title}
//                             item xs={3}>
//                             <InputField
//                                 title={item.title}
//                                 onChange={handleChange}
//                                 value={message}
//                                 id={i} /></Grid>)
//                     })}
//                 </Grid> */}

//                 <div className='flex flex-row gap-10 mt-10 justify-end'>
//                     {
//                         navButtons.map((button) => {
//                             return (<BottomNav id={button.name}
//                                 name={button.name}
//                                 style={button.style}
//                                 eventHandler={button.eventHandler} />)

//                         })
//                     }
//                 </div>

//                 <div>
//                     <label className="block mb-2 text-sm font-mukta text-gray-900 dark:text-white" for="inputExcel">
//                         <p>Upload XLSX file to auto-fill</p>
//                         <input
//                             className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
//                             aria-describedby="inputFile_help"
//                             id="inputFile"
//                             type="file"
//                             onChange={(e) => {
//                                 const file = e.target.files[0];
//                                 readExcel(file);
//                             }} />
//                     </label>

//                     <br /><br />
//                     <div className="bg-white flex flex-col rounded drop-shadow-md p-5 h-80">
//                         <h3>Summary of the Data</h3>
//                         <table class="table container">
//                             <thead>
//                                 <tr>
//                                     <th scope="col">Start Date</th>
//                                     <th scope="col">End Date</th>
//                                     <th scope="col">Consumption kWh</th>
//                                     <th scope="col">Demand kW</th>
//                                     <th scope="col">Cost</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {items.map((d) => (
//                                     <tr>
//                                         <td className="text-center">{d.StartDate}</td>
//                                         <td className="text-center">{d.EndDate}</td>
//                                         <td className="text-center">{d.Consumption}</td>
//                                         <td className="text-center">{d.Demand}</td>
//                                         <td className="text-center">{d.Cost}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>


//                 <div className='flex flex-row gap-10 mt-10 justify-end'>
//                     {
//                         navButtons.map((button) => {

//                             if (button.name === "RESET") {
//                                 return (
//                                     <ButtonConfirmDialog open={openReset} dialog={button.dialog} handleClose={handleClose} />

//                                 )
//                             } else if (button.name === "SAVE") {
//                                 return (
//                                     <ButtonConfirmDialog open={openSave} dialog={button.dialog} handleClose={handleClose} />
//                                 )
//                             } else {
//                                 return (null)
//                             }

//                         })
//                     }

//                 </div>
//             </Container>
//         </>
//     )
// }

import InputField from '../../components/InputField'
import gasData from "../../formData/gasData"
import BottomNav from "../../components/bottomNav/BottomNav_NewVer"
import UploadFile from '../../components/fileUpload/FileUpload'
import { useContext, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { backBtn, addBtn, resetBtn, submitBtn, deleteBtn, saveBtn } from '../../formData/bottomNavData'
import { useNavigate } from 'react-router-dom'
import { BuildingContext } from '../../components/Context/context'

export default function GasDataInfo(props) {

    const navigate = useNavigate()

    const { state } = useLocation()
    const building_name = state.buildingName
    const subsection = state.subSection

    const { value } = useContext(BuildingContext)
    const updateBuildingSection = value.methods.update


    // define event handlers
    function backHandler() {
        navigate(-1)
    }

    function addHandler() {
        console.log("add");
    }

    function resetHandler() {
        console.log("reset");
    }

    function submitHandler() {
        console.log("submi");
    }

    function deleteHandler() {
        console.log("delete");
    }

    function saveHandler(e) {
        let curr_data = getCurrentData()
        let sub_section = subsection.toLowerCase().split(' ')[0]
        console.log('current section: ', subsection)
        console.log('item name: ', curr_data.item_name)
        updateBuildingSection(building_name, sub_section, curr_data.item_details, value.buildings)
    }

    // rebuild button array with predefined event handlers
    var newBackBtn = { ...backBtn, eventHandler: backHandler }
    var newResetBtn = { ...resetBtn, eventHandler: resetHandler }
    var newSaveBtn = { ...saveBtn, eventHandler: saveHandler }

    // build array to map through
    var navButtons = [newBackBtn, newSaveBtn]

    // console.log(equipmentData)

    const combined_data = [];
    props.project.map((eachGas) => {
        for (const [key, value] of Object.entries(eachGas)) {
            let title = gasData.find(item => item.id === key)
            if (title != undefined) {
                combined_data.push({
                    title: title.title,
                    id: key,
                    value: value
                })

            }
        }
    })


    // get currently displayed data
    const items_ref = useRef(null)

    // loops through the component, gets all input field values,
    // return an array with id, and value of each input field.
    function getCurrentData() {
        let parent_node = items_ref.current
        let item_name = parent_node.parentNode.childNodes[0].innerText
        console.log(item_name);
        let new_object = {
            item_name: item_name,
            item_details: {},
            is_complete: false
        }
        let new_object_details = {}
        parent_node.childNodes.forEach((node) => {
            new_object_details[node.id] = node.childNodes[1].value
        })

        new_object.item_details = new_object_details

        console.log(new_object)
        return new_object
    }


    return (
        <>
            <div className="bg-white drop-shadow-md rounded p-5 my-5 h-fit">
                <div >
                    <div className="bg-sisa-header rounded w-full">
                        <p className='text-3xl text-white px-2 my-2 border-radius-md'>{props.name}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-3" ref={items_ref}>
                        {combined_data.map((item, i) => {
                            return <InputField key={i} title={item.title} id={item.id} value={item.value}
                            />
                        })}
                    </div>
                    <UploadFile building_name={building_name} data={gasData} sub_section={subsection.toLowerCase().split(' ')[0]} />
                    <div className='flex flex-row gap-10 mt-10 justify-end'>
                        {
                            navButtons.map((button, i) => {
                                return (<BottomNav key={i} id={button.name} name={button.name} style={button.style} eventHandler={button.eventHandler} />)
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

