import InputField from '../../components/InputField'
import fuelData from "../../formData/fuelData"
import BottomNav from "../../components/bottomNav/BottomNav_NewVer"
import UploadFile from '../../components/fileUpload/FileUpload'
import { useContext, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { backBtn, addBtn, resetBtn, submitBtn, deleteBtn, saveBtn } from '../../formData/bottomNavData'
import { useNavigate } from 'react-router-dom'
import { BuildingContext } from '../../components/Context/context'

export default function FuelType(props) {

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
    var navButtons = [newBackBtn, newResetBtn, newSaveBtn]

    // console.log(equipmentData)

    const combined_data = [];
    for (const [key, value] of Object.entries(props.project)) {

        let title = fuelData.find(item => item.id === key)
        if (title != undefined) {
            combined_data.push({
                title: title.title,
                id: key,
                value: value
            })
        }
    }
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
                    <UploadFile building_name={building_name} data={fuelData} sub_section={subsection.toLowerCase().split(' ')[0]} />
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

