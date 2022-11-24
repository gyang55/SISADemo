import InputField from '../components/InputField'

export default function Light(props) {

    return (
        <>
            <h4 id="title-detail"> Light { } </h4>
            <div id="title-line"></div>
            <div className="grid-container">
                {
                    props.map((title) => {
                        return (
                            <InputField title={title} />
                        )
                    })
                }
            </div>
        </>
    )
}
