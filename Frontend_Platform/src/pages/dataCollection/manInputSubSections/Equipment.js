import InputField from '../components/InputField'

export default function Equipment(props) {

    return (
        <>
            <h4 id="title-detail"> Equipment { } </h4>
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

