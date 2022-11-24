import buildingData from "./buildingData"
import facilityData from "./facilityInfoData"
import fuelData from "./fuelData"
import otherFeaturesData from "./otherFeaturesData"
import projectInfoData from "./projectInfoData"
import thermalData from "./thermalData"
import equipmentData from "./equipmentData"
import envelopeData from "./envelopesData"
import lightsData from "./lightsData"
import gasData from "./gasData"


const buildingPageData = [
    'Project Info',
    'Facility Info',
    'Building Data',
    'Fuel Types',
    'Thermal Plant',
    'Other Features',
    'Equipments',
    'Lights',
    'Envelopes'
]

const energyPageData = [
    'Gas Data'
]


const AllData = {
    buildingData,
    projectInfoData,
    facilityData,
    fuelData,
    otherFeaturesData,
    thermalData,
    equipmentData,
    envelopeData,
    lightsData,
    buildingPageData
}

const EnergyData = {
    gasData,
    energyPageData
}

export {AllData, EnergyData}
