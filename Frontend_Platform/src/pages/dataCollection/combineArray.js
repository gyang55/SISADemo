function combineTwoArray(array1, array2) {
    let newArray = [];
    array1.map((item, i) => {
        array2.map((item2, j) => {
            if (item.id === item2.id) {
                var newObj = {}
                newObj.id = item.id
                newObj.title = item.title
                newObj.value = item2.value
                newArray.push(newObj)
            }
        })
    })
    return newArray;
}
