import ProjectInfo from '../dataCollection/subSections/General/ProjectInfo'
import { BuildingContext } from './components/Context/context'
import { useContext } from 'react'
import { backBtn, addBtn, resetBtn, submitBtn, deleteBtn, saveBtn } from './formData/bottomNavData'
import { useLocation, useNavigate } from 'react-router-dom'
import { findBuilding } from "./utils/findBuilding";
// using context consumer, determine data array length and
// decide how many times to show <Equipment /> components

// add function to create additional empty page to submit form to.
export default function ProjectInfoPage() {

    const navigate = useNavigate()
    const { state } = useLocation()
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

    const curr_building = findBuilding(value, state.buildingName)
    const projectLis = [curr_building.building_details.project]
    console.log(curr_building);

    return (
        <>
            <div className="title w-fit my-0">
                <h1 className="text-4xl text-black font-mukta">{state.buildingName + ' > ' + state.subSection}</h1>
            </div>
            <div className='grid grid-cols-6 relative'>
                <div className='col-span-5'>
                    <div className='h-700 overflow-auto'>
                        {
                            projectLis.map((project, i) => {
                                return (
                                    <div key={i}>
                                        <ProjectInfo
                                            project={project} />
                                    </div>)
                            })
                        }
                    </div>
                </div>
                <div className={`col-span-1 fixed`}>
                    {/* <div className='flex flex-col gap-10 mt-10 justify-start m-5'>
                        {
                            navButtons.map((button, i) => {
                                return (<BottomNav key={i} id={button.name} name={button.name} style={button.style} eventHandler={button.eventHandler} />)
                            })
                        }
                    </div> */}
                </div>

            </div>

        </>
    )
}

