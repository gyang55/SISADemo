export function getTitles(data, titles) {
    data.map((item) => {
        const arr = []
        arr.push(item.id)
        arr.push(item.title.toLowerCase())
        titles.push(arr)
        return titles
    })
}

export function getIndicesOfTitles(texts, titles, titleIndices) {
    const temp = texts.toLowerCase()
    titles.map((title) => {
        let start = temp.indexOf(title[1])
        if (start !== -1) {
            const arr = []
            arr.push(title[0])
            start += title[1].length
            arr.push(start)
            titleIndices.push(arr)
        }
        return titleIndices
    })
}

export function setInputFields(dataFromImages, setDataFromImages, values) {
    let arr = [...dataFromImages]

    if (values.length !== 0) {
        for (let x = 0; x < arr.length; x++) {
            for (let y = 0; y < values.length; y++) {
                if (arr[x]['title'].toLowerCase() === values[y][0]) {
                    arr[x]['value'] = values[y][1]
                }
            }
        }
        setDataFromImages(arr)
    }
}

export function processTexts(titleIndices, texts, values) {
    for (let index = 0; index < titleIndices.length; index++) {
        const tempString = texts.substring(titleIndices[index][1]).toLowerCase()
        const end = tempString.indexOf('\n')
        let value = tempString.substring(0, end)
        value = value.trim()
        const arr = []
        arr[0] = titleIndices[index][0]
        arr[1] = value
        values.push(arr)
    }
}