import InputField from '../components/InputField'
import envelopesData from "../formData/envelopesData"
import BottomNav from "../components/bottomNav/BottomNav_NewVer"
import UploadFile from '../components/fileUpload/FileUpload'
import { backBtn, addBtn, resetBtn, submitBtn, deleteBtn, saveBtn } from '../formData/bottomNavData'
import { useNavigate } from 'react-router-dom'


export default function Envelope(props) {

    const navigate = useNavigate()

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


    // // rebuild button array with predefined event handlers
    var newBackBtn = { ...backBtn, eventHandler: backHandler }
    var newAddBtn = { ...addBtn, eventHandler: addHandler }
    var newDeleteBtn = { ...deleteBtn, eventHandler: deleteHandler }
    var newResetBtn = { ...resetBtn, eventHandler: resetHandler }
    var newSubmitBtn = { ...submitBtn, eventHandler: submitHandler }
    var newSaveBtn = { ...saveBtn, eventHandler: saveHandler }

    // // build array to map through
    // const dashboardButtons = [submitBtn, addBtn, deleteBtn]
    var navButtons = [newBackBtn, newDeleteBtn, newResetBtn, newAddBtn, newSaveBtn]
    return (
        <>
            <div className='px-5' id={props.id}>
                <div className="bg-sisa-header">
                    <p className='text-3xl text-white px-2 border-radius-md'>{props.name}</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    {envelopesData.map((item, i) => { return <InputField key={i} title={item.title} id={item.id} /> })}
                </div>
            </div>
            <UploadFile />
            <div className='flex flex-row gap-10 mt-10 justify-end'>
                {
                    navButtons.map((button) => {
                        return (<BottomNav id={button.name} name={button.name} style={button.style} eventHandler={button.eventHandler} />)

                    })
                }
            </div>
        </>
    )
}

