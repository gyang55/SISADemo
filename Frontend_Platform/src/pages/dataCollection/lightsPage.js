import Light from "./subSections/Light";
import BottomNav from "./components/bottomNav/BottomNav_NewVer"
import { BuildingContext } from './components/Context/context'
import { useContext } from 'react'
import { backBtn, addBtn, resetBtn, submitBtn, deleteBtn, saveBtn } from './formData/bottomNavData'
import { useLocation, useNavigate } from 'react-router-dom'


export default function LightsPage() {

    const navigate = useNavigate()
    const { state } = useLocation()
    const { value } = useContext(BuildingContext)

    function findBuilding(buildingName) {
        let result = {}
        value.buildings.forEach((building, i) => {
            if (building.building_name === buildingName)
                result = building
        })
        return result
    }

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

    function saveHandler() {
        console.log("save");
    }

    // rebuild button array with predefined event handlers
    var newBackBtn = { ...backBtn, eventHandler: backHandler }
    var newAddBtn = { ...addBtn, eventHandler: addHandler }
    var newDeleteBtn = { ...deleteBtn, eventHandler: deleteHandler }
    var newResetBtn = { ...resetBtn, eventHandler: resetHandler }
    var newSaveBtn = { ...saveBtn, eventHandler: saveHandler }

    // build array to map through
    var navButtons = [newBackBtn, newResetBtn, newAddBtn]

    const curr_building = findBuilding(state.buildingName)
    console.log(curr_building)

    return (
        <>
            <div className="title w-fit">
                <h1 className="text-4xl text-black font-mukta">{state.buildingName + ' > ' + state.subSection}</h1>
            </div>
            <div className="flex flex-col gap-10 h-full">
                <div className="bg-white flex flex-col rounded drop-shadow-md p-5 h-fit">
                    <div>
                        {
                            curr_building.building_details.lights.map((light, i) => {
                                return <Light key={i} id={light.item_name.replaceAll(' ', '-')} name={light.item_name} />
                            })
                        }
                    </div>
                    <div className='flex flex-row gap-10 mt-10 justify-end'>
                        {
                            navButtons.map((button, i) => {
                                return <BottomNav key={i} id={button.name} name={button.name} style={button.style} eventHandler={button.eventHandler} />
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

