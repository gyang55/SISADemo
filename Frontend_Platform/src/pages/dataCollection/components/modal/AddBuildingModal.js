
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import InputField from '../InputField';
import { useState, useContext } from 'react';
import { BuildingContext } from '../Context/context';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function BasicModal(props) {

    const [new_building_name, setNewBuildingName] = useState("")
    const handleClose = props.handleClose

    const { value } = useContext(BuildingContext)
    var curr_buildings = value.buildings
    return (
        <div>
            {/* <Button onClick={handleOpen}>Add New Building</Button> */}
            <Modal
                open={props.open}
            >
                <Box sx={style}>
                    {/* <InputField title='Building Name' id='new_building_name' onChangeFunction={newBName} /> */}
                    <div className="text-black font-bold h-16">Building name</div>
                    <input className='w-full rounded-lg bg-gray-200 h-12' onInput={(e) => {
                        setNewBuildingName(e.target.value)
                    }}></input>
                    <Button onClick={(e) => {
                        handleClose(new_building_name, curr_buildings)
                    }}>confirm</Button>
                </Box>
            </Modal>
        </div>
    );
}
