export function findBuilding(value, buildingName) {
    let result = {}
    value.buildings.forEach((building, i) => {
        if (building.building_name === buildingName)
            result = building
    })
    return result
}