import InputField from '../components/InputField'
import equipmentData from "../formData/equipmentData"
import BottomNav from "../components/bottomNav/BottomNav_NewVer"
import UploadFile from '../components/fileUpload/FileUpload'
import { useContext, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { backBtn, addBtn, resetBtn, submitBtn, deleteBtn, saveBtn } from '../formData/bottomNavData'
import { useNavigate } from 'react-router-dom'
import { BuildingContext } from '../components/Context/context'


export default function Equipment(props) {

    const navigate = useNavigate()

    const { state } = useLocation()
    const building_name = state.buildingName
    const subsection = state.subSection

    console.log(building_name)
    console.log(subsection)

    const { value } = useContext(BuildingContext)
    const updateBuildingSection = value.methods.update
    const updateBuildingSectionArray = value.methods.update_array

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
        console.log("save")

        let curr_data = getCurrentData()
        let sub_section = subsection.toLowerCase().split(' ')[0]
        console.log('current section: ', subsection)
        console.log('item name: ', curr_data.item_name)
        updateBuildingSectionArray(building_name, sub_section, curr_data.item_name, curr_data, value.buildings)
    }

    function stateCheck(jsonObject) {

        for (const key in jsonObject) {
            if (key !== 'is_complete') {
                var value = jsonObject[key]
                if (value.trim().length == 0) {
                    return false
                }
            }
        }
        return true
    }

    // rebuild button array with predefined event handlers
    var newBackBtn = { ...backBtn, eventHandler: backHandler }
    var newAddBtn = { ...addBtn, eventHandler: addHandler }
    var newDeleteBtn = { ...deleteBtn, eventHandler: deleteHandler }
    var newResetBtn = { ...resetBtn, eventHandler: resetHandler }
    var newSaveBtn = { ...saveBtn, eventHandler: saveHandler }

    // build array to map through
    var navButtons = [newDeleteBtn, newResetBtn, newSaveBtn]

    // combine titles array and data array
    console.log(props)
    // console.log(equipmentData)

    const combined_data = [];
    for (const [key, value] of Object.entries(props.data)) {
        let title = equipmentData.find(item => item.id === key).title
        combined_data.push({
            title: title,
            id: key,
            value: value
        })
    }

    console.log(combined_data)

    // get currently displayed data
    const items_ref = useRef(null)

    // loops through the component, gets all input field values,
    // return an array with id, and value of each input field.
    function getCurrentData() {
        let parent_node = items_ref.current //read items_ref
        let item_name = parent_node.parentNode.childNodes[0].innerText

        let new_object = {
            item_name: item_name,
            item_details: {},
            is_complete: false
        }
        let new_object_details = {}
        console.log('item_name')
        console.log(item_name)
        parent_node.childNodes.forEach((node) => {
            new_object_details[node.id] = node.childNodes[1].value
        })

        new_object.is_complete = stateCheck(new_object_details)
        console.log('new_object.is_complete')
        console.log(new_object.is_complete)

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
                    <UploadFile />
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

