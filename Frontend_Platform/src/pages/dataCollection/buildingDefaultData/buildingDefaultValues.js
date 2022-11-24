/**
 * Building Context, with empty values
 */

const buildingContext =
{
  user_id: '',
  buildings: [
    {
      building_name: '',
      building_details: {
        facility: {
          building_program: '',
          sst: '',
          service_territory: '',
          bc_housing_operating_agreement: '',
          ecap_done: '',
          is_complete: false
        },
        project: {
          site_name: '',
          site_address: '',
          city: '',
          owner_organization: '',
          office_address: '',
          applicant_name: '',
          telephone: '',
          email: '',
          program_job: '',
          site_contact_name: '',
          site_auditor: '',
          project_responsible_engineer: '',
          email_of_responsible_engineer: '',
          site_visit_date: '',
          year_of_original_construction: '',
          envelope_condition: '',
          number_of_floors: 0,
          year_of_last_remodel: '',
          is_complete: false
        },
        building: {
          building_type: '',
          total_floor_area_declared_by_applicant: 0,
          equiv_full_time_office_employee_fte: 0,
          residents_murb: 0,
          num_elevators: 0,
          num_exterior_doors: 0,
          percent_men_women: 0,
          number_of_meter_groups: 0,
          name_of_the_meters: '',
          window_draftyness: '',
          is_complete: false
        },
        fuel: {
          fuel_types_individual_suite_electric_meters: '',
          fuel_types_dhw_primary_fuel: '',
          fuel_types_outdoor_air_ventilation_heated_by: '',
          fuel_types_sh_primary_fuel: '',
          is_complete: false
        },
        thermal: {
          thermal_plant_space_heating_gas_avg_efficiency: 0,
          thermal_plant_dhw_gas_avg_efficiency: 0,
          thermal_plant_gas_boiler_heating_control: '',
          thermal_plant_hhw_design_temp: 0,
          thermal_plant_observed_temp: 0,
          thermal_plant_oat_reset: '',
          thermal_plant_has_cooling: '',
          is_complete: false
        },
        other: {
          building_has_oa_ventilation: '',
          building_has_tenant_common_laundry: '',
          building_has_central_commercial_laundry: '',
          building_has_commercial_kitchen: '',
          electricty_paid_by_tenants: '',
          is_complete: false
        },
        equipments: [
          {
            item_name: '',
            item_details: {
              equipment: '',
              equipment_type: '',
              equipment_name: '',
              fuel: '',
              equipment_year: 0,
              quantity: 0,
              air_flow: 0,
              percent_oa: 0,
              tweaking_param: 0,
              end_use: '',
              hours_of_operation_per_year: 0,
              meter_nonres: ''
            },
            is_complete: false
          }
        ],
        lights: [
          {
            item_name: '',
            item_details: {
              space_description: '',
              watt_per_lamp: 0,
              num_fixtures: 0,
              space_type: '',
              lamp_per_fixture: 0,
              light_hours_per_day: 0,
              technology: ''
            },
            is_complete: false
          }
        ],
        envelopes: [
          {
            item_name: '',
            item_details: {
              envelope_type: '',
              description: ''
            },
            is_complete: false
          }
        ]
      },
      consumption_details: {
        gas_bills: [
          {
            start_date: "",
            end_date: "",
            consumption: "",
            demand: "",
            cost: "",
            is_complete: false
          }
        ],
        electricity_bills: [

        ]
      }
    }
  ]
}

export default buildingContext


