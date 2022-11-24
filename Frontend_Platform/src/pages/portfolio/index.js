import React, { useState, useEffect } from "react";
import BarChart from "./BarChart";
import BuildingTable from "../global/TemplateTable";
import ConsumptionTable from "../global/TemplateTable";
import BarChartStacked from "./BarChartStacked";
import PieChart from "../global/TemplatePiechart";
import "../../styles/portfolio.css";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../global/LoadingSpinner";
import NoBuildingsDiv from "../global/NoBuildingDiv";
import { getData } from "../../utils/HttpClient";

import { useLocation } from "react-router-dom";
import Graph from "../home/HistoricalDataHistogram";
/**
 * See HomePage.js for similar comments.
 *  Portfolio
 * @returns
 */

export const Portfolio = (props) => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState({
		consumption_table_data: [["No Consumption data to show", "-", "-", "-", "-", "-", "-"]],
		growth_table_data: [["No building data to show", "-", "-", "-", "-", "-", "-"]],
		pie_data: ["No data to show"],
		historical_data: ["No data to show"],
	});

	function BarchartRow() {
		return (
			<div className="flex bg-white rounded h-[32rem] w-full gap-5">
				<BarChart
					removeToken={props.removeToken}
					dataset={data.consumption_table_data}
					title="GHG Emissions Breakdown (tons CO2/yr)"
					columns={[0, 3]}
					label="GHG Emissions (Ton/yr)"
					color="#ad4501"
					yaxis="GHG Emissions ton CO2/yr"
				/>
				<BarChart
					removeToken={props.removeToken}
					dataset={data.consumption_table_data}
					title="Utility Cost Breakdown ($/yr)"
					columns={[0, 6]}
					label="Utility Cost ($/yr)"
					color="#204e8d"
					yaxis="Utility Cost $/yr"
				/>
			</div>
		);
	}

	function PiechartRow() {
		return (
			<div className="flex bg-white rounded h-[32rem] w-full gap-5">
				<PieChart
					removeToken={props.removeToken}
					widgetClassName="h-full w-full flex gap-5"
					containerClassName="h-full w-full pt-10 px-5"
					legendAlignment="start"
					chartTitle="Electricity Consumption (KWh/yr)"
					labelAttribute="site_name"
					dataAttribute="electric_consumption"
					dataset={data.pie_data}
				/>
				<PieChart
					removeToken={props.removeToken}
					widgetClassName="h-full w-full flex gap-5"
					containerClassName="h-full w-full pt-10 px-5"
					legendAlignment="start"
					chartTitle="Gas Consumption (GJ/yr)"
					labelAttribute="site_name"
					dataAttribute="natural_gas_consumption"
					dataset={data.pie_data}
				/>
			</div>
		);
	}

	function PortfolioContainer() {
		return (
			<div className="flex flex-col gap-10 h-full">
				<div className="bg-white flex flex-col rounded drop-shadow-md p-5 h-80">
					{/* <div className="widget-header">
            <h2>Your Building Details</h2>
          </div> */}
					<BuildingTable
						removeToken={props.removeToken}
						data={data.growth_table_data}
						skipRows={false}
						title={"Building Details"}
						filename={"your_building_details.csv"}
						headers={[
							"Site Name",
							"Site Address",
							"City",
							"Province",
							"Office Address",
							"Date of Last Audit",
							"Year of Construction",
						]}
					/>
				</div>
				<div className="bg-white flex flex-col rounded drop-shadow-md p-5 h-80">
					{/* <div className="widget-header">
            <h2>Buildings Consumption Data</h2>
          </div> */}
					<ConsumptionTable
						removeToken={props.removeToken}
						data={data.consumption_table_data}
						skipRows={false}
						addLocale={true}
						title={"Building Consumption Data"}
						filename={"building_consumption_data.csv"}
						headers={[
							"Site Name",
							"Natural Gas Consumption (GJ/yr)",
							"Electricity (KWh/yr)",
							"GHG (Tons/yr)",
							"Gas ($/yr)",
							"Electricity ($/yr)",
							"Total Cost ($/yr)",
						]}
					/>
				</div>

				<div className="inline-block h-[35rem] bg-white rounded drop-shadow-md px-5 pt-5 pb-10 w-full gap-5">
					<div>
						<PiechartRow />
					</div>
				</div>
				<div className="inline-block h-[35rem] bg-white rounded drop-shadow-md px-5 pt-5 pb-10 w-full gap-5">
					<div>
						<BarchartRow />
					</div>
				</div>
				<div className="bg-white rounded drop-shadow-md p-5">
					<BarChartStacked dataset={data.consumption_table_data} />
				</div>
				<div className="h-2/5 bg-white rounded drop-shadow-md p-5 w-full">
					<Graph removeToken={props.removeToken} dataset={data.historical_data} />
				</div>
			</div>
		);
	}

	function Display() {
		return (
			<div>
				{data["historical_data"]["gas"] !== undefined ? <PortfolioContainer /> : <NoBuildingsDiv />}
			</div>
		);
	}

	/* turn on spinner before getData request, after data is set, turn off spinner */
	let location = useLocation();

	useEffect(() => {
		setIsLoading(true);
		if (location.state === null) {
			getData("user", props.removeToken, navigate, "all_data", props.getCache, props.putCache, props.clearCacheData)
				.then((res) => {
					if (res.all_data.portfolio["consumption_table_data"].length === 0) {
						setIsLoading(false);
					} else {
						setData(res.all_data.portfolio);
						setIsLoading(false);
					}
				})
				.catch((err) => console.log(err));
		} else {
			setData(location.state.data);
			setIsLoading(false);
		}
	}, []);

	return (
		<div className="mb-16">
			<div className="title w-fit">
				<h1 className="text-4xl text-black font-mukta">Portfolio</h1>
			</div>
			{isLoading ? <LoadingSpinner /> : <Display />}
		</div>
	);
};
