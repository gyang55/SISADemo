// This is the upload component with tesseract.js to read text from the uploaded image file
import { useContext } from 'react'
import { createWorker } from 'tesseract.js'
import Button from '@mui/material/Button'
import { BuildingContext } from '../Context/context.jsx'
import { getTitles, getIndicesOfTitles, setInputFields, processTexts } from '../../utils/processImageUtils';

function UploadFile(props) {

    // const [imageURL, setimageURL] = useState(null)
    // const [subSection, setSubSection] = useState(null)

    // const navigate = useNavigate
    // const buildingContext = useContext(BuildingContext)
    const { value } = useContext(BuildingContext)
    const updateBuildingSection = value.methods.update
    let titleIndices = []
    let titles = []
    let values = []
    function onChangeHandler(e) {
        console.log(e.target.files[0]);
        const imageURL = URL.createObjectURL(e.target.files[0])

        if (imageURL) {
            extractImageText(imageURL).then(text => {
                const sectionObj = {}
                getTitles(props.data, titles)
                getIndicesOfTitles(text, titles, titleIndices)
                processTexts(titleIndices, text, values)
                values.map((value) => {
                    sectionObj[value[0]] = value[1]
                })
                updateBuildingSection(props.building_name, props.sub_section, sectionObj, value.buildings)
            })
        }

    }

    async function extractImageText(imageURL) {
        const worker = createWorker({
            logger: m =>
                console.log('progress: ' + m.progress + '\nstatus: ' + m.status + '\njobID: ' + m.userJobId)
        })
        await worker.load()
        await worker.loadLanguage('eng')
        await worker.initialize('eng')
        const { data: { text } } = await worker.recognize(imageURL)
        await worker.terminate()
        document.getElementById('inputFile').value = ""

        return text
    }
    return (
        <>
            <div>
                <label className="block mb-2 text-sm font-mukta text-gray-900 dark:text-white" htmlFor="inputFile">
                    <p>Upload an image file to auto-fill</p>
                    <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        aria-describedby="inputFile_help"
                        id="inputFile"
                        type="file"
                        onChange={onChangeHandler} />
                    <Button className='text-md text-black text-left py-3 px-5'
                        onClick={(e) => e.preventDefault()}>Upload</Button>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG, etc.</p>
                </label>
            </div >
        </>
    )
}

export default UploadFile
