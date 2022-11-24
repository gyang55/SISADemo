import React, { useState } from "react";
import "../../styles/report-tab.css";
import VerticalTable from "./VerticalTable"
import RecommendedEnergyTable from "../global/TemplateTable"
import PieChart from "../global/TemplatePiechart";
import BarChart from "./BarChart-Report";
import ReactSwitch from 'react-switch';

// Google Map render
import Map from "../report/Map";

const ReportTabs = (props) => {
    const [activeTab, setActiveTab] = useState(0);

    const toggleTab = (index) => {
        setActiveTab(index);
    }
    const [checked, setChecked] = useState(false); //  For toggle-switch: initially set checked boolean to false (show GHG Emissions and Utility Cost bar charts)
    const address = props.data.report_summary_participant_table_data[2];
    const city = props.data.report_summary_participant_table_data[3];
    const province = props.data.report_summary_participant_table_data[4];
    const country = "Canada";
    const participantAddress = address + ", " + city + ", " + province + ", " + country; 


    const handleChange = val => { // Handle toggle-switch onChange -> checked value swaps between true or false
      setChecked(val)
      // False (default switch behavior) (show GHG Emissions and Utility Cost pie charts)
      // True (show GHG Emissions and Utility Cost bar charts)
    }
    return (
        <div>
            <ul className="flex report-tabs" >
                <div className={activeTab === 0 ? "tabs active-tab" : "tabs" }
                onClick = {() => toggleTab(0)}> Summary </div>
                <div className={activeTab === 1 ? "tabs active-tab" : "tabs" } 
                onClick = {() => toggleTab(1)}>
                    <span>Building&nbsp;Description</span>
                </div>
                <div className={activeTab === 2 ? "tabs active-tab" : "tabs" } 
                onClick = {() => toggleTab(2)}>
                    Energy&nbsp;Consumption
                </div>
                <div className={activeTab === 3 ? "tabs active-tab" : "tabs" } 
                onClick = {() => toggleTab(3)}>
                    Upgrades
                </div>
                <div className={activeTab === 4 ? "tabs active-tab" : "tabs" } 
                onClick = {() => toggleTab(4)}>
                    Envelope
                </div>
                <div className={activeTab === 5 ? "tabs active-tab" : "tabs" } 
                onClick = {() => toggleTab(5)}>
                    <span>Equipment</span>
                </div>
                <div className={activeTab === 6 ? "tabs active-tab" : "tabs" } 
                onClick = {() => toggleTab(6)}>
                    Lights
                </div>
                <div className={activeTab === 7 ? "tabs active-tab" : "tabs" } 
                onClick = {() => toggleTab(7)}>
                    Plumbing
                </div>
                <div className={activeTab === 8 ? "tabs active-tab" : "tabs" } 
                onClick = {() => toggleTab(8)}>
                    Contact&nbsp;&&nbsp;Terms
                </div>
            </ul>

            <div className="tab-contents">
                <div className={activeTab === 0 ? "content active-content" : "content"}>
                    
                    
                    {/*Map object */}
                    <div className="flex h-[30rem] bg-white rounded drop-shadow-md p-5 w-full gap-5">
                        
                        <div className="h-96 w-1/2">
                        <VerticalTable  title={"Participant"}
                                data={props.data.report_summary_participant_table_data} 
                                headers={["Applicant name", "Site name", "Site Address",
                                "City", "Province", "Site contact name",
                                "Office address", "Telephone", "Email"]}>
                        </VerticalTable> 
                        </div>
                        
                        <Map title={"Building Location"} address={participantAddress}/>
                        
                    </div>
                    {/* <h2>Summary Details</h2>    */}
                    <div className="mt-10" style={{ display: checked ? "none" : "block" }}>
                        {/*-- When toggle-switch is OFF (default), show GHG Emissions and Utility Cost PIE charts. Otherwise, hide this section--*/}  
                        <div class="widget-header flex justify-between items-center font-mukta">
                            <h2>GHG emissions and Cost breakdowns</h2>
                            <ReactSwitch checked={checked} onChange={handleChange}/>
                        </div>
                        <div className="flex bg-white rounded h-[32rem] w-full gap-5">
                            <PieChart
                                removeToken={props.removeToken}
                                widgetClassName="h-full w-full flex gap-5"
                                containerClassName="h-full w-full pt-10 px-5"
                                legendAlignment="start"
                                chartTitle="GHG Emissions (Ton CO2e/year)"
                                labelAttribute="0"      // labelAttribute="category"
                                dataAttribute="2"       // dataAttribute="energy_gj_per_year"
                                dataset={props.data.report_gas_breakdown}
                            />
                            <PieChart
                                removeToken={props.removeToken}
                                widgetClassName="h-full w-full flex gap-5"
                                containerClassName="h-full w-full pt-10 px-5"
                                legendAlignment="start"
                                chartTitle="Utility Cost"
                                labelAttribute="0"      // labelAttribute="category"
                                dataAttribute="3"       // dataAttribute="energy_kwh_per_year"                    
                                dataset={props.data.report_electrical_breakdown}
                            />
                        </div>
                    </div>
                    <div className="mt-10" style={{ display: checked ? "block" : "none"}}>
                        {/*-- When toggle-switch is ON, show GHG Emissions and Utility Cost BAR charts. Otherwise, hide this section. --*/}
                        <div class="widget-header flex justify-between items-center font-mukta">
                            <h2>GHG emissions and Cost breakdowns</h2>
                            <ReactSwitch checked={checked} onChange={handleChange}/>
                        </div>
                        <div className="flex bg-white rounded h-[32rem] w-full gap-5">
                            <BarChart
                                removeToken={props.removeToken}
                                dataset={props.data.report_gas_breakdown}
                                title="GHG Emissions (Ton CO2e/year)"
                                columns={["0", "2"]}        // labelAttribute="category", dataAttribute="energy_gj_per_year"
                                label="GHG Emissions (Ton CO2e/year)"
                                color="#ad4501"
                                yaxis="Ton CO2e/year"
                            />
                            <BarChart
                                removeToken={props.removeToken}
                                dataset={props.data.report_electrical_breakdown}
                                title="Utility Cost"
                                columns={["0", "3"]}        // labelAttribute="category", dataAttribute="energy_kwh_per_year"  
                                label="Utility Cost ($/yr)"
                                color="#6495ED"
                                yaxis="Cost / year ($)"
                            />
                        </div>
                    </div>
                    <br></br>
                    <div className="mt-5">
                    <RecommendedEnergyTable 
                        removeToken={props.removeToken}
                        data={props.data.report_summary_rec_energy_solutions_data}
                        skipRows={false}
                        title={"Recommended Energy Solutions"}
                        filename={"recommended_energy_solutions.csv"}
                        headers={[
                            "Description",
                            "Lifetime GHG Reduction (t/year)",
                            "Simple Payback (years)",
                            "First Year Utility Savings ($)",
                            "Capital Cost ($)", 
                            "Incentive ($)",
                        ]}    
                    />
                    </div>
                </div>
                <div className={activeTab === 1 ? "content active-content" : "content"}>
                    {/* <br /> */}
                    <VerticalTable  title={"Building Profile"}
                                data={props.data.building_profile_data} 
                                headers={["Project Number", "Facility Use", "Building Type", "Year of Constuction", 
                                        "Year of Last Remodel", "Number of Floors", "Total Floor Area (sqft)", 
                                        "Envelope Condition", "Full Time Employees", "Number of Residents", 
                                        "Number of Suites", "Occupancy", "Space Heating Primary Fuel", 
                                        "Domestic Hot Water Primary Fuel", "Outdoor Air Ventilation Heated By", 
                                        "Electric Meters for Individual Suites"]}>
                    </VerticalTable> 
                </div>
                <div className={activeTab === 2 ? "content active-content" : "content"}>
                    <h2>Energy Consumption Details</h2>
                    <br />
                    <p>This contains the components for the energy consumption</p> 
                    
                </div>
                <div className={activeTab === 3 ? "content active-content" : "content"}>
                    <h2>Upgrades Details</h2>
                    <br />
                    <p>This contains the components for upgrades</p> 
                </div>
                <div className={activeTab === 4 ? "content active-content" : "content"}>
                    <h2>Envelope Details</h2>
                    <br />
                    <p>This contains the components for Envelope</p> 
                </div>
                <div className={activeTab === 5 ? "content active-content" : "content"}>
                    <h2>Equipment Details</h2>
                    <br />
                    <p>This contains the components for Equipment</p> 
                </div>
                <div className={activeTab === 6 ? "content active-content" : "content"}>
                    <h2>Lights Details</h2>
                    <br />
                    <p>This contains the components for Lights</p> 
                </div>
                <div className={activeTab === 7 ? "content active-content" : "content"}>
                    <h2>Plumbing Details</h2>
                    <br />
                    <p>This contains the components for Plumbing</p> 
                </div>
                <div className={activeTab === 8 ? "content active-content" : "content"}>
                    <h2>Contact & Terms Details</h2>
                    <br />
                    <p>This contains the components for Contact & Terms</p> 
                </div>

            </div>

        </div>
    );
}

export default ReportTabs;