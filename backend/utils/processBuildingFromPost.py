def buildingsGenerator(buildings):
    for building in buildings:
        yield building


def processBuilding(building):
    newBuilding = {}
    newBuilding['building_name'] = building['building_name']
    newBuilding['building_program'] = building['building_details']['facility']['building_program']
    newBuilding['sst'] = building['building_details']['facility']['sst']
    newBuilding['service_territory'] = building['building_details']['facility']['service_territory']
    newBuilding['bc_housing_operating_agreement'] = building['building_details']['facility'][
        'bc_housing_operating_agreement']
    newBuilding['ecap_done'] = building['building_details']['facility']['ecap_done']
    newBuilding['site_name'] = building['building_details']['project']['site_name']
    newBuilding['site_address'] = building['building_details']['project']['site_address']
    newBuilding['city'] = building['building_details']['project']['city']
    newBuilding['owner_organization'] = building['building_details']['project']['owner_organization']
    newBuilding['office_address'] = building['building_details']['project']['office_address']
    newBuilding['applicant_name'] = building['building_details']['project']['applicant_name']
    newBuilding['telephone'] = building['building_details']['project']['telephone']
    newBuilding['email'] = building['building_details']['project']['email']
    newBuilding['program_job'] = building['building_details']['project']['program_job']
    newBuilding['site_contact_name'] = building['building_details']['project']['site_contact_name']
    newBuilding['site_auditor'] = building['building_details']['project']['site_auditor']
    newBuilding['project_responsible_engineer'] = building['building_details']['project'][
        'project_responsible_engineer']
    newBuilding['email_of_responsible_engineer'] = building['building_details']['project'][
        'email_of_responsible_engineer']
    newBuilding['site_visit_date'] = building['building_details']['project']['site_visit_date']
    newBuilding['year_of_original_construction'] = building['building_details']['project'][
        'year_of_original_construction']
    newBuilding['year_of_last_remodel'] = building['building_details']['project']['year_of_last_remodel']
    newBuilding['number_of_floors'] = building['building_details']['project']['number_of_floors']
    newBuilding['envelope_condition'] = building['building_details']['project']['envelope_condition']
    newBuilding['building_type'] = building['building_details']['building']['building_type']
    newBuilding['total_floor_area_declared_by_applicant'] = building['building_details']['building'][
        'total_floor_area_declared_by_applicant']
    newBuilding['equiv_full_time_office_employee_fte'] = building['building_details']['building'][
        'equiv_full_time_office_employee_fte']
    newBuilding['residents_murb'] = building['building_details']['building']['residents_murb']
    newBuilding['num_elevators'] = building['building_details']['building']['num_elevators']
    # newBuilding['num_exterior_doors'] = building['building_details']['building']['num_exterior_doors']
    newBuilding['number_of_meter_groups'] = building['building_details']['building']['number_of_meter_groups']
    newBuilding['name_of_the_meters'] = building['building_details']['building']['name_of_the_meters']
    newBuilding['window_draftyness'] = building['building_details']['building']['window_draftyness']
    newBuilding['fuel_types_individual_suite_electric_meters'] = building['building_details']['fuel'][
        'fuel_types_individual_suite_electric_meters']
    newBuilding['fuel_types_dhw_primary_fuel'] = building['building_details']['fuel'][
        'fuel_types_dhw_primary_fuel']
    newBuilding['fuel_types_outdoor_air_ventilation_heated_by'] = building['building_details']['fuel'][
        'fuel_types_outdoor_air_ventilation_heated_by']
    newBuilding['fuel_types_sh_primary_fuel'] = building['building_details']['fuel'][
        'fuel_types_sh_primary_fuel']
    newBuilding['thermal_plant_space_heating_gas_avg_efficiency'] = building['building_details']['thermal'][
        'thermal_plant_space_heating_gas_avg_efficiency']
    newBuilding['thermal_plant_dhw_gas_avg_efficiency'] = building['building_details']['thermal'][
        'thermal_plant_dhw_gas_avg_efficiency']
    newBuilding['thermal_plant_gas_boiler_heating_control'] = building['building_details']['thermal'][
        'thermal_plant_gas_boiler_heating_control']
    newBuilding['thermal_plant_hhw_design_temp'] = building['building_details']['thermal'][
        'thermal_plant_hhw_design_temp']
    newBuilding['thermal_plant_observed_temp'] = building['building_details']['thermal'][
        'thermal_plant_observed_temp']
    newBuilding['thermal_plant_oat_reset'] = building['building_details']['thermal']['thermal_plant_oat_reset']
    newBuilding['thermal_plant_has_cooling'] = building['building_details']['thermal']['thermal_plant_has_cooling']
    newBuilding['building_has_oa_ventilation'] = building['building_details']['other'][
        'building_has_oa_ventilation']
    newBuilding['building_has_tenant_common_laundry'] = building['building_details']['other'][
        'building_has_tenant_common_laundry']
    newBuilding['building_has_central_commercial_laundry'] = building['building_details']['other'][
        'building_has_central_commercial_laundry']
    newBuilding['building_has_commercial_kitchen'] = building['building_details']['other'][
        'building_has_commercial_kitchen']
    newBuilding['electricty_paid_by_tenants'] = building['building_details']['other'][
        'electricty_paid_by_tenants']

    return newBuilding
