import React, { createContext, useState } from "react";
import sampleValues from "../../buildingDefaultData/buildingSampleValues";
import defaultValues from "../../buildingDefaultData/buildingDefaultValues";
import { useEffect } from "react";
import axios from "axios";

// import { fetchData } from "../../utils/fetchdata";
// Array sections enum for condition
const array_sections = ["equipments", "lights", "envelopes"];

const BuildingContext = createContext();
// Empty Context Object Schema
const empty_building_context = defaultValues;
// Data loaded from database
// Single source of truth to be pushed to DB or used to render data

function BuildingContextProvider(props) {
  const [buildings, setBuildings] = useState();
  const [value, setValue] = useState({
    buildings: buildings,
    methods: {
      add: addNewBuilding,
      remove: removeBuilding,
      update: updateBuildingDetailsSection,
      update_array: updateBuildingDetailsArraySection,
    },
  });
  useEffect(() => {
    async function fetchData() {
      await axios.get("http://localhost:5000/getAllBuildings").then((res) => {
        setBuildings(res.data.buildings);
        setValue({ ...value, buildings: res.data.buildings });
      });
    }
    if (buildings === undefined) {
      fetchData();
    }
  });
  console.log(value.buildings);

  // Following methods are to be passed with context
  // to update Context from nested child components

  // Add new Building to Buildings Array in Context
  // Pushed new building object into the buildings array in Context
  function addNewBuilding(new_building_name, curr_buildings) {
    // Empty building object
    var new_building = { ...empty_building_context.buildings[0] };

    // Add name to the building
    new_building.building_name = new_building_name;

    // Create new buildings array
    var updated_buildings = [...curr_buildings, new_building];

    // Set state for context to be updated
    setValue({ ...value, buildings: updated_buildings });
  }

  // Delete Building from Buildings Array in Context
  function removeBuilding(building_name, curr_buildings) {
    const index = curr_buildings.findIndex(
      (e) => e.building_name == building_name
    );
    if (index > -1) {
      curr_buildings.splice(index, 1);
    }
    const res = axios.delete(
      `http://localhost:5000/deleteABuilding/${building_name}`
    );
    console.log(res);
    // Set state for context to be updated
    setValue({ ...value, buildings: curr_buildings });
  }

  // Update a Building's Details in Context
  // Updates the buildings context with updated content
  function updateBuildingDetailsSection(
    building_name,
    section_name,
    new_content,
    curr_buildings
  ) {
    // Check new_content and create the is_complete field (true/false)

    // ..

    // new_new_content object should be ready

    // Map buildings and find the current building, update the section
    // Update context with new array of buildings
    var updated_buildings = curr_buildings.map((building) => {
      if (building.building_name === building_name) {
        building.building_details[section_name] = {
          ...building.building_details[section_name],
          ...new_content,
        };
        return building;
      }
      return building;
    });

    // Set state for context to be updated
    setValue({ ...value, buildings: updated_buildings });
  }

  // Update a Building's Details in Context
  // Updates the buildings context with updated content
  function updateBuildingDetailsArraySection(
    building_name,
    section_name,
    item_name,
    new_content,
    curr_buildings
  ) {
    console.log("inside context > update array");

    // Map buildings and find the current building, update the section
    // Update context with new array of buildings
    var updated_buildings = curr_buildings.map((building) => {
      console.log("a building: ", building);
      console.log("a building's name : ", building_name);
      console.log("a section's name : ", section_name);

      if (building.building_name === building_name) {
        console.log("matching building name: ", building.building_name);

        let building_details = { ...building.building_details };

        // if section is an array
        if (array_sections.includes(section_name)) {
          let item_updated = false;

          // find the item to update and update contents
          let new_building_array_section = building_details[section_name].map(
            (item) => {
              if (item.item_name === item_name) {
                item_updated = true;
                return { ...item, ...new_content };
              } else {
                return item;
              }
            }
          );

          console.log("the section to update", new_building_array_section);

          // if item doesnt exist, push into array
          if (!item_updated) {
            new_building_array_section.push(new_content);
          }

          // update building details object with the new array
          building_details[section_name] = new_building_array_section;

          // return building object with new building details
          return { ...building, building_details: building_details };
        } else {
          return building;
        }
      }
      return building;
    });

    // Set state for context to be updated
    setValue({ ...value, buildings: updated_buildings });
  }

  // Add new Item (Equipment, Lights, Envelopes) to Section Array
  function addNewItemToArraySection(
    building_name,
    section_name,
    item_name,
    new_content,
    curr_buildings
  ) {}

  return (
    <BuildingContext.Provider value={{ value, setValue }}>
      {props.children}
    </BuildingContext.Provider>
  );
}

export { BuildingContextProvider, BuildingContext };
