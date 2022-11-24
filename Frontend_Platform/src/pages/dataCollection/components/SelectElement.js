function SelectElementOptions(props) {

    return (
        <div className="grid-item">
            <label for="type-select" className="label-box">{props.title}</label>
            <div className="input-group">
                <select value="Choose from .." name={props.title} className="quantity-field">
                    <SelectOptions options={props.options} />
                </select>
            </div>
        </div>
    )
}

function SelectOptions(props) {
    props.options.map((option) => {
        return <option value={option}>{option}</option>
    })
}

export default SelectElementOptions 
