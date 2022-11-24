// This is the DashBoard page
import Grid from '@mui/material/Grid'
import ItemCard from './components/ItemCard/ItemCard'
import BottomNav from './components/bottomNav/BottomNav_NewVer'
import { useState, useContext } from 'react'
import { BuildingContext } from './components/Context/context'
import { backBtn, addBtn, deleteBtn } from './formData/bottomNavData'
import { useNavigate } from 'react-router-dom'
import BasicModal from './components/modal/AddBuildingModal';

export default function DashBoardPage() {

    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
    const [openDelete, setOpenDelete] = useState(false);

    // required variables from context
    const { value } = useContext(BuildingContext)

    // buildings from context
    const buildings_list = value.buildings
    // setBuildingsList(buildings)
    console.log(value);
    console.log(buildings_list);

    const addNewBuilding = value.methods.add
    const removeBuilding = value.methods.remove

    // const changeNumOfBuilding = value.changeNumOfBuilding
    const [status, setStatus] = useState("Incomplete")

    const handleClose = () => {
        setOpenDelete(false);
    };

    function addBuildingName(building_name, curr_buildings) {
        console.log("add button clicked")
        addNewBuilding(building_name, curr_buildings)
        setOpen(false)
    }

    function removeBuildingByName(building_name, curr_buildings) {
        removeBuilding(building_name, curr_buildings)
        setOpenDelete(false);
    }
    // define event handlers
    function backHandler() {
        navigate(-1)
    }

    function addHandler(e) {
        setOpen(true)
    }

    function deleteHandler(building_name) {
        // changeNumOfBuilding(name)
        handleClose()
    }

    function deleteClickopen() {
        setOpenDelete(true);
    }


    // // rebuild button array with predefined event handlers
    var newBackBtn = { ...backBtn, eventHandler: backHandler }
    var newAddBtn = { ...addBtn, eventHandler: addHandler }
    var newDeleteBtn = { ...deleteBtn, eventHandler: deleteClickopen }
    // var submitBtn = { ...submitBtn, eventHandler: submitHandler }

    // // build array to map through
    var dashboardButtons = [newBackBtn, newDeleteBtn, newAddBtn]

    return (
        <>
            {buildings_list !== undefined && <>
                <div className="title w-fit">
                    <h1 className="text-4xl text-black font-mukta" id="page_title">Data Collection</h1>
                </div>
                <div className="flex flex-col gap-10 h-full">
                    <div className="bg-white flex flex-col rounded drop-shadow-md p-5 h-fit">
                        <Grid container
                            spacing={2}
                            columns={10}
                            direction="row"
                            justifyContent="space-around"
                            alignItems="center">
                            {
                                buildings_list.map((building, i) => {
                                    return (<Grid item xs={3} key={i} >
                                        <ItemCard
                                            title={building.building_name}
                                            status={building.is_complete}
                                            id={building.building_name.replaceAll(' ', '-')}
                                        />
                                    </Grid>)
                                })
                            }
                        </Grid>
                        < BasicModal open={open} handleClose={addBuildingName} />
                        <div className='flex flex-row gap-10 mt-10 justify-end'>
                            {
                                dashboardButtons.map((button, i) => {
                                    return (
                                        <BottomNav key={i} id={button.name} name={button.name} style={button.style} eventHandler={button.eventHandler} />
                                    )
                                })
                            }
                        </div>
                        < BasicModal open={openDelete} handleClose={removeBuildingByName} />
                        <div className='flex flex-row gap-10 mt-10 justify-end'>
                            {
                                dashboardButtons.map((button, i) => {

                                    // if (button.name === "DELETE") {
                                    //     return (
                                    //         <ButtonConfirmDialog key={i} open={openDelete} dialog={button.dialog} handleClose={deleteHandler} />
                                    //     )
                                    // }

                                })
                            }
                        </div>
                    </div>

                </div>
            </>}
        </>
    )
}


