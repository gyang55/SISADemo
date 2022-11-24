def formatBuilding(building):
    return {
            "building_name": building.building_name,
            "building_details": {
                "facility": {
                    "building_program": building.building_program,
                    "sst": building.sst,
                    "service_territory": building.service_territory,
                    "bc_housing_operating_agreement": building.bc_housing_operating_agreement,
                    "ecap_done": building.ecap_done,
                },
                "project": {
                    "site_name": building.site_name,
                    "site_address": building.site_address,
                    "city": building.city,
                    "owner_organization": building.owner_organization,
                    "office_address": building.office_address,
                    "applicant_name": building.applicant_name,
                    "telephone": building.telephone,
                    "email": building.email,
                    "program_job": building.program_job,
                    "site_contact_name": building.site_contact_name,
                    "site_auditor": building.site_auditor,
                    "project_responsible_engineer": building.project_responsible_engineer,
                    "email_of_responsible_engineer": building.email_of_responsible_engineer,
                    "site_visit_date": building.site_visit_date,
                    "year_of_original_construction": building.year_of_original_construction,
                    "envelope_condition": building.envelope_condition,
                    "number_of_floors": building.number_of_floors,
                    "year_of_last_remodel": building.year_of_last_remodel,
                },
                "building": {
                    "building_type": "",
                    "total_floor_area_declared_by_applicant": building.total_floor_area_declared_by_applicant,
                    "equiv_full_time_office_employee_fte": building.total_floor_area_declared_by_applicant,
                    "residents_murb": building.residents_murb,
                    "num_elevators": building.num_elevators,
                    "percent_men_women": 0,
                    "number_of_meter_groups": building.number_of_meter_groups,
                    "name_of_the_meters": building.name_of_the_meters,
                    "window_draftyness": building.window_draftyness,
                },
                "fuel": {
                    "fuel_types_individual_suite_electric_meters": building.fuel_types_individual_suite_electric_meters,
                    "fuel_types_dhw_primary_fuel": building.fuel_types_dhw_primary_fuel,
                    "fuel_types_outdoor_air_ventilation_heated_by": building.fuel_types_outdoor_air_ventilation_heated_by,
                    "fuel_types_sh_primary_fuel": building.fuel_types_sh_primary_fuel,
                },
                "thermal": {
                    "thermal_plant_space_heating_gas_avg_efficiency": building.thermal_plant_space_heating_gas_avg_efficiency,
                    "thermal_plant_dhw_gas_avg_efficiency": building.thermal_plant_dhw_gas_avg_efficiency,
                    "thermal_plant_gas_boiler_heating_control": building.thermal_plant_gas_boiler_heating_control,
                    "thermal_plant_hhw_design_temp": building.thermal_plant_hhw_design_temp,
                    "thermal_plant_observed_temp": building.thermal_plant_observed_temp,
                    "thermal_plant_oat_reset": building.thermal_plant_oat_reset,
                    "thermal_plant_has_cooling": building.thermal_plant_has_cooling,
                },
                "other": {
                    "building_has_oa_ventilation": building.building_has_oa_ventilation,
                    "building_has_tenant_common_laundry": building.building_has_tenant_common_laundry,
                    "building_has_central_commercial_laundry": building.building_has_central_commercial_laundry,
                    "building_has_commercial_kitchen": building.building_has_commercial_kitchen,
                    "electricty_paid_by_tenants": building.electricty_paid_by_tenants,
                },
                "equipments": [
                    {
                        "item_name": "",
                        "item_details": {
                            "equipment": "",
                            "equipment_type": "",
                            "equipment_name": "",
                            "fuel": "",
                            "equipment_year": 0,
                            "quantity": 0,
                            "air_flow": 0,
                            "percent_oa": 0,
                            "tweaking_param": 0,
                            "end_use": "",
                            "hours_of_operation_per_year": 0,
                            "meter_nonres": ""
                        },

                    }
                ],
                "lights": [
                    {
                        "item_name": "",
                        "item_details": {
                            "space_description": "",
                            "watt_per_lamp": 0,
                            "num_fixtures": 0,
                            "space_type": "",
                            "lamp_per_fixture": 0,
                            "light_hours_per_day": 0,
                            "technology": ""
                        },
                    }
                ],
                "envelopes": [
                    {
                        "item_name": "",
                        "item_details": {
                            "envelope_type": "",
                            "description": ""
                        },
                    }
                ]
            },
            "consumption_details": {
                "gas_bills": [
                    {
                        "start_date": "",
                        "end_date": "",
                        "consumption": "",
                        "demand": "",
                        "cost": "",
                    }
                ],
                "electricity_bills": [

                ]
            },
        }


