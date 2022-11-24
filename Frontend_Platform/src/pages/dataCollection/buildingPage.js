import Grid from '@mui/material/Grid'
import ItemCard from './components/ItemCard/ItemCard'
import BottomNav from './components/bottomNav/BottomNav_NewVer'

import { useState, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { backBtn, resetBtn, submitBtn } from './formData/bottomNavData'
// import { backHandler, addHandler, deleteHandler, submitHandler, resetHandler, saveHandler, deleteClickopen, submitClickopen, resetClickopen, saveClickopen } from './formData/eventHandlerFunction';
import { useNavigate } from 'react-router-dom'
import { AllData, EnergyData } from '../dataCollection/formData/AllFormData'
import { BuildingContext } from './components/Context/context'
import ButtonConfirmDialog from './components/buttonConfirmDialog/ButtonConfirmDialog'
import axios from "axios";

export default function BuildingPage(props) {
    const navigate = useNavigate()
    // sx={{ mt: 5, mx: 0, px: 0 }}
    // let [navBtnData, setNavBtnData] = useState([backBtn[0], resetBtn[0], submitBtn])
    const buildingPageData = AllData['buildingPageData']
    const energyPageData = EnergyData['energyPageData']
    const [openSubmit, setOpenSumbmit] = useState(false);
    const [openReset, setOpenReset] = useState(false);

    const location = useLocation()

    const buildingName = location.state.buildingName
    const buildingContext = useContext(BuildingContext)
    const buildings = buildingContext.value.buildings

    const defaultBuliding = buildings.filter((building) => {
        return building.building_name === buildingName
    })

    // const updateBuildingSectionArray = buildingContext.value.buildings
    // console.log('updateBuildingSectionArray')
    // console.log(updateBuildingSectionArray)

    const handleClose = () => {
        setOpenSumbmit(false);
        setOpenReset(false);
    };

    // define event handlers
    function backHandler() {
        navigate(-1)
    }


    function resetHandler() {
        console.log("reset");
        handleClose()
    }
    function resetClickopen() {
        setOpenReset(true);
    }

    function saveHandler() {
        axios
            .post("http://localhost:5000/register", {
                buildings: buildings,
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        handleClose()
    }

    function submitClickopen() {
        setOpenSumbmit(true);
    }

    // // rebuild button array with predefined event handlers
    var newBackBtn = { ...backBtn, eventHandler: backHandler }
    var newResetBtn = { ...resetBtn, eventHandler: resetClickopen }
    var newSubmitBtn = { ...submitBtn, eventHandler: submitClickopen }

    // // build array to map through
    // const dashboardButtons = [submitBtn, addBtn, deleteBtn]
    var navButtons = [newBackBtn, newSubmitBtn]

    return (
        <>
            <div className="title w-fit">
                <h1 className="text-4xl text-black font-mukta">{buildingName}</h1>
            </div>
            <div className="flex flex-col gap-10 h-fit">
                <div className="bg-white flex flex-col rounded drop-shadow-md p-5 h-fit">
                    <div className="bg-sisa-header rounded w-full p-2 mb-5">
                        <p className='text-2xl text-white px-3 m-2 border-radius-md'>Building Details</p>
                    </div>
                    <Grid container
                        spacing={2}
                        columns={10}
                        direction="row"
                        justifyContent="space-around"
                        alignItems="center">
                        {
                            buildingPageData.map((building, i) => {
                                let id = 'building-' + i

                                return (<Grid item xs={3} key={id} >
                                    <ItemCard title={building}
                                        status={building.is_complete}
                                    />
                                </Grid>)
                            })
                        }
                    </Grid>
                </div>
            </div>
            <div className="flex flex-col gap-10 h-fit my-4">
                <div className="bg-white flex flex-col rounded drop-shadow-md p-5 h-fit">
                    <h3 className="text-2xl text-white font-mukta bg-sisa-header rounded">Energy Details</h3>
                    <Grid container
                        spacing={2}
                        columns={10}
                        direction="row"
                        justifyContent="space-around"
                        alignItems="center">
                        {
                            energyPageData.map((building, i) => {
                                let id = 'energy-' + i

                                return (<Grid item xs={3} key={id} >
                                    <ItemCard title={building}
                                        status={building.is_complete}
                                    />
                                </Grid>)
                            })
                        }
                    </Grid>
                </div>
                <div className='flex flex-row gap-10 mt-10 justify-end'>
                    {
                        navButtons.map((button) => {
                            return (<BottomNav id={button.name} name={button.name} style={button.style} eventHandler={button.eventHandler} />)
                        })
                    }
                </div>
                <div className='flex flex-row gap-10 mt-10 justify-end'>
                    {
                        navButtons.map((button) => {

                            if (button.name === "RESET") {
                                return (
                                    <ButtonConfirmDialog open={openReset} dialog={button.dialog} handleClose={resetHandler} />

                                )
                            } else if (button.name === "SUBMIT") {
                                return (
                                    <ButtonConfirmDialog open={openSubmit} dialog={button.dialog} handleClose={saveHandler} />
                                )
                            } else {
                                return (null)
                            }

                        })
                    }
                </div>
            </div>
        </>
    )
}
