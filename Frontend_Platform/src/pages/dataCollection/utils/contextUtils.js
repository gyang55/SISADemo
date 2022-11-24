export function addItemToList(old_item_list, new_item) {
    old_item_list.push(new_item)
}

export function updateBuildingDetailsSection(user_building_details, updated_subSection) {
    return { ...user_building_details, updated_subSection }
}



