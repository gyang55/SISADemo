import SelectElementOptions from '../../components/SelectElement'
<<<<<<< HEAD:src/pages/dataCollection/routes/General/FacilityInfoPage.js
import formData from '../../formData/facilityInfoData'
=======
>>>>>>> 652aefb08f4d55754da81a2464f1a20d3bd7069e:src/pages/dataCollection/manInputSubSections/General/FacilityInfoPage.js

function FacilityInfoPage(props) {

    let options = props.options
    return (
        <>
            <h4 id="title-detail"> Fuel Types</h4>
            <div id="title-line"></div>
            <div className="grid-container">
                {
                    options.map((title, options) => {
                        return (
                            <SelectElementOptions title={title} options={options} />
                        )
                    })
                }
            </div>
        </>
    )
}

export default FacilityInfoPage;
