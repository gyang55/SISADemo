import InputField from '../components/InputField'

export default function Envelope(props) {

    return (
        <>
            <h4 id="title-detail"> Envelope { } </h4>
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
