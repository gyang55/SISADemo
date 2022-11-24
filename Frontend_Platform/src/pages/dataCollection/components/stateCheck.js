// facilityInfo: {
//     building_program: '',
//     sst: '',
//     service_territory: '',
//     bc_housing_operating_agreement: '',
//     ecap_done: '',
//     is_complete: false
//   }


function stateCheck(jsonObject) {

    for (const key in jsonObject) {
        if (key !== 'is_complete') {
            var value = jsonObject[key]
            if (value.trim().length == 0) {
                return false
            }
        }
    }
    return true
}