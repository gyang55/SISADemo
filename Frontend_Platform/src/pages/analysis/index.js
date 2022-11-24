import React, { useState, useEffect } from "react";
import LoadingSpinner from "../global/LoadingSpinner";
import { Slider } from "@material-ui/core";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import {
	Input,
	FormControl,
	InputAdornment,
	Checkbox,
	FormGroup,
	FormControlLabel,
	Typography,
	Button,
	Stack,
	Box,
	styled,
} from "@mui/material";
import "../../styles/filter-menu.css";
import MuiInput from "@mui/material/Input";
import BarChartStackedAnalysis from "./BarChartStacked";
import FilterTable from "../global/TemplateTable";
import Table from "./Table";
import { getData } from "../../utils/HttpClient";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

//general theme, styling for some mui elements
const theme = createTheme({
	palette: {
		primary: { main: "#03045e" },
		secondary: { main: "#03045e" },
	},
	typography: {
		Checkbox: { textTransform: "lower" },
	},
});

export const Analysis = (props) => {
	const InputSmall = styled(MuiInput)`
		width: 42px;
	`;
	const navigate = useNavigate();

	// States
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState({
		utility_ghg: [["No data to show"]],
		building_analysis: [["No data to show", "-", "-", "-", "-", "-", "-", "-", "-", "-"]],
		ecm_analysis_table: ["-", "No ECM data to show", "No ECM data to show", "No ECM data to show"],
		year_analysis: [["No data to show", "-", "-", "-", "-"]],
	});
	const [tableData, setTableData] = useState([["-", "No ECM Data to show", "-", "-", "-", "-", "-", "-", "-"]]);

	// handles the values for the max replacement cost filter
	const [replacementCost, setReplacementCost] = React.useState({
		amount: "",
	});

	// handles the values of the multi-select dropdowns
	const [buildingNames, setBuildingNames] = useState([]);
	const [provinceNames, setProvinceNames] = useState([]);

	// handles the checkbox field for consumption
	const [energyType, setEnergyType] = React.useState({
		electricity: false,
		water: false,
		gas: false,
	});
	const [value, setValue] = React.useState(0);
	const [years, setYears] = React.useState({ year: "" });

	// data fills the dropdown menus for provinces, and buildings
	const [buildingsFiltered, setBuildingsFiltered] = useState([]);

	const provinces = [
		{ value: "bc", label: "BC" },
		{ value: "ab", label: "AB" },
		{ value: "sa", label: "SA" },
		{ value: "mb", label: "MB" },
		{ value: "on", label: "ON" },
		{ value: "qc", label: "QC" },
		{ value: "nl", label: "NL" },
		{ value: "nb", label: "NB" },
		{ value: "ns", label: "NS" },
		{ value: "pei", label: "PEI" },
		{ value: "yt", label: "YT" },
		{ value: "nt", label: "NT" },
		{ value: "nu", label: "NU" },
	];

	const { electricity, water, gas } = energyType;

	// Handlers
	// handles user input in the replacement cost input field
	const handleReplacementChange = (prop) => (event) => {
		setReplacementCost({
			...replacementCost,
			[prop]: event.target.value,
		});
	};

	// handles user input in the simple payback input field
	const handleYearsChange = (prop) => (event) => {
		setYears({ ...years, [prop]: event.target.value });
	};

	// handles energy type checkbox
	const handleCheckBoxChange = (event) => {
		setEnergyType({
			...energyType,
			[event.target.name]: event.target.checked,
		});
	};

	const handleSliderChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleInputChange = (event) => {
		setValue(event.target.value === "" ? "" : Number(event.target.value));
	};

	const handleBlur = () => {
		if (value < 0) {
			setValue(0);
		} else if (value > 100) {
			setValue(100);
		}
	};

	function pushBuildingDropdownData(table) {
		let filteredData = [];
		filteredData.push({
			value: table[0][1],
			label: table[0][1],
		});
		for (let i = 1; i < table.length; i++) {
			if (table[i][1] !== table[i - 1][1]) {
				filteredData.push({
					value: table[i][1],
					label: table[i][1],
				});
			}
		}

		return filteredData;
	}
	let location = useLocation();
	// gets data
	useEffect(() => {
		/* at start of getData request, turn on spinner, when data is set turn off spinner */
		if (location.state === null) {
			getData("user", props.removeToken, navigate, "all_data", props.getCache, props.putCache, props.clearCache).then(
				(res) => {
					if (res.all_data.analysis["ecm_analysis_table"].length !== 0) {
						setData(res.all_data.analysis);
						setTableData(res.all_data.analysis.ecm_analysis_table);
						// Set the buildings filter data; could use a better implementation
						setBuildingsFiltered(pushBuildingDropdownData(res.all_data.analysis.ecm_analysis_table));
						setIsLoading(false);
					} else {
						setTableData([["-", "No ECM Data to show", "-", "-", "-", "-", "-", "-", "-"]]);
						setIsLoading(false);
					}
				}
			);
		} else {
			let ecmTable = location.state.data.ecm_analysis_table
			for (let index = 0; index < ecmTable.length; index++) {
				ecmTable[index][6] = ecmTable[index][6] <= 1 ? ecmTable[index][6]*100 : ecmTable[index][6];

			}
			setIsLoading(true);
			setData(location.state.data);
			setTableData(ecmTable);
			setBuildingsFiltered(pushBuildingDropdownData(ecmTable));
			setIsLoading(false);
		}
	}, []);

	const applyFilters = () => {
		let filtered = data.ecm_analysis_table; // applies filters to ecm table data.

		// building name
		if (buildingNames.length > 0) {
			let buildings = [];
			buildingNames.forEach((building) => {
				buildings.push(...filtered.filter((rows) => rows.includes(building["label"])));
			});
			filtered = buildings;
		}

		// region
		if (provinceNames.length > 0) {
			let buildings = [];
			provinceNames.forEach((region) => {
				buildings.push(...filtered.filter((rows) => rows.includes(region["label"])));
			});
			filtered = buildings;
		}

		// replacement cost
		if (replacementCost.amount > 0) {
			// !! index will change if SQL query is changed. index 4 is replacement cost currently
			filtered = [...filtered.filter((rows) => parseFloat(rows[4]) < parseFloat(replacementCost.amount))];
		}

		// IRR
		if (value) {
			filtered = [...filtered.filter((rows) => parseFloat(rows[6]) > parseFloat(value))];
		}

		// Simple Payback
		if (years.amount > 0) {
			// !! index will change if SQL query is changed. index 7 is simple payback (years) currently
			filtered = [...filtered.filter((rows) => parseFloat(rows[7]) < parseFloat(years.amount))];
		}

		// apply if filters are present
		// if (filtered.length > 0) {
		setTableData([...filtered]); // July 2022 fix: In case filters are applied but no rows are returned, still display empty table. E.g. No buildings match filter by province.
		// }
	};

	// reset state of all filter menu options
	const resetFilters = () => {
		setTableData(data.ecm_analysis_table);
		setBuildingNames([]);
		setProvinceNames([]);
		setValue(0);
		setReplacementCost({ amount: "" });
		setYears({ year: "", amount: "" });
		setEnergyType({ electricity: false, water: false, gas: false });
	};

	return (
		<div className="mb-16">
			<div className="title w-fit">
				<h1 className="text-4xl text-black font-mukta">Portfolio Filters</h1>
			</div>
			{isLoading ? (
				<LoadingSpinner />
			) : (
				<div className="flex flex-col gap-10 h-full">
					<MuiThemeProvider theme={theme}>
						<div className="">
							<div className="flex bg-white rounded drop-shadow-md">
								<div className="mx-6 py-4">
									<h3 className="font-mukta text-2xl mb-2">Filters</h3>
									<div className="flex grid grid-cols-3">
										<div className="">
											<div className="pb-4">
												<h3>Max Replacement Cost</h3>
												<FormControl sx={{ m: 1 }} variant="standard">
													<Input
														id="standard-adornment-amount"
														value={replacementCost.amount}
														onChange={handleReplacementChange("amount")}
														startAdornment={<InputAdornment position="start">$</InputAdornment>}
													/>
												</FormControl>
											</div>
											<div className="">
												<h3 className="p-4">IRR Over (%)</h3>
												<Box sx={{ width: "80%" }} className="bg-neutral-200 rounded-lg px-5 py-1">
													<div className="flex gap-3">
														<Slider
															size="small"
															aria-label="IRR Over"
															defaultValue={10}
															color="secondary"
															valueLabelDisplay="auto"
															step={0.1}
															min={0}
															max={20}
															onChange={handleSliderChange}
															value={typeof value === "number" ? value : 0}
														/>
														<InputSmall
															size="small"
															value={value}
															onChange={handleInputChange}
															onBlur={handleBlur}
															inputProps={{
																step: 10,
																min: 0,
																max: 100,
																type: "number",
																"aria-labelledby": "input-slider",
																style: { textAlign: "center" },
															}}
															disableUnderline
															sx={{ width: 60 }}
														/>
													</div>
												</Box>
											</div>
										</div>
										<div className="">
											<h3>Building Region</h3>
											<div className="w-10/12 mt-3">
												<Select
													isMulti
													name="colors"
													options={provinces}
													onChange={setProvinceNames}
													value={provinceNames}
													className="basic-multi-select"
													classNamePrefix="select"
													menuPortalTarget={document.body}
													styles={{
														menuPortal: (base) => ({ ...base, zIndex: 9999 }),
													}}
												/>
											</div>
											<h3 className="pt-8">Buildings</h3>
											<div className="w-10/12 mt-3">
												<Select
													isMulti
													name="colors"
													options={buildingsFiltered}
													onChange={setBuildingNames}
													value={buildingNames}
													className="basic-multi-select"
													classNamePrefix="select"
													menuPortalTarget={document.body}
													styles={{
														menuPortal: (base) => ({ ...base, zIndex: 9999 }),
													}}
												/>
											</div>
										</div>
										<div className="grid grid-cols-2 gap-5 ">
											<div className="">
												<h3 className="pb-2">Buildings</h3>
												<FormGroup column>
													<FormControlLabel
														sx={{ m: -1 }}
														control={
															<Checkbox
																checked={electricity}
																onChange={handleCheckBoxChange}
																name="electricity"
																style={{ color: "#03045e" }}
															/>
														}
														label={<Typography style={{ color: "#000000", textTransform: "none" }}>Electricity</Typography>}
													/>
													<FormControlLabel
														sx={{ m: -1 }}
														control={
															<Checkbox
																checked={water}
																onChange={handleCheckBoxChange}
																name="water"
																style={{ color: "#03045e" }}
															/>
														}
														label={<Typography style={{ color: "#000000", textTransform: "none" }}>Water</Typography>}
													/>
													<FormControlLabel
														sx={{ m: -1 }}
														control={
															<Checkbox
																checked={gas}
																onChange={handleCheckBoxChange}
																name="gas"
																style={{ color: "#03045e" }}
															/>
														}
														label={<Typography style={{ color: "#000000", textTransform: "none" }}>Gas</Typography>}
													/>
												</FormGroup>
											</div>
											<div className="">
												<h3 className="">Simple Payback</h3>
												<FormControl sx={{ m: 1, width: "70%" }} variant="standard">
													<Input
														id="standard-adornment-amount"
														value={years.amount}
														onChange={handleYearsChange("amount")}
														endAdornment={<InputAdornment position="end">years</InputAdornment>}
													/>
												</FormControl>
											</div>
											<div className=" col-span-2 justify-self-center self-center">
												<Stack spacing={3} direction="row">
													<Button
														style={{ backgroundColor: "#03045e", width: "60%" }}
														variant="contained"
														onClick={resetFilters}
													>
														<Typography style={{ color: "#FFFFFF", textTransform: "none" }}>Reset Filters</Typography>
													</Button>
													<Button
														style={{ backgroundColor: "#03045e", width: "60%" }}
														variant="contained"
														onClick={applyFilters}
													>
														<Typography style={{ color: "#FFFFFF", textTransform: "none" }}>Apply Changes</Typography>
													</Button>
												</Stack>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</MuiThemeProvider>
					<div>
						<div className="table-widget p-5 h-96">
							{/* <div className="widget-header">
                <h2>Available Upgrades</h2>
              </div> */}
							<FilterTable
								removeToken={props.removeToken}
								data={tableData}
								skipRows={true}
								title={"Available Upgrades"}
								filename={"available_upgrades.csv"}
								addLocale={true}
								headers={[
									"Site Name",
									"Province",
									"Description",
									"Proposed Cost to Install ($)",
									"Base Case Cost to Install ($)",
									"IRR (%)",
									"Simple Payback (yrs)",
									"NPV",
								]}
							/>
						</div>
					</div>
					<div className="table-widget">
						<BarChartStackedAnalysis dataset={[["No data to show"]]} />
					</div>

					<div>
						<div className="table-widget flex flex-col">
							{/* <div className="widget-header">
                <h2>Projected Total Incurred Costs After Upgrades</h2>
              </div> */}
							<Table
								removeToken={props.removeToken}
								dataset={data.building_analysis}
								option="building"
								title={"Projected Total Incurred Costs After Upgrades"}
								filename={"projected_incurred_costs.csv"}
								headers={["Site Name", "", "", "", "", "", "", "", "", ""]}
							/>
							{/* <span className="text-sm mt-3">*Note: projected upgrade costs are calculated with a 6% inflation rate.</span> */}
							{/* 
                    <Table
                        removeToken={props.removeToken}
                        dataset={data.year_analysis}
                        option="year"
                        headers={["Year", "Portfolio", "Building 1", "Building 2", "Building 3"]}/> */}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
