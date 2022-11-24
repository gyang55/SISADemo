import React, { useEffect, useState } from "react";
import PieChart from "../global/TemplatePiechart";
import Table from "./Table";
import { useNavigate } from "react-router-dom";
import { getData } from "../../utils/HttpClient";
import { useLocation } from "react-router-dom";
import LoadingSpinner from "../global/LoadingSpinner";
import NoBuildingsDiv from "../global/NoBuildingDiv";


/**
 * Home page is similar to portfolio page layout. Main body should be flex column with height to 100%.
 * Each graph/chart is enclosed in a parent flex div with padding, drop shadow, and rounded edges.
 * PieChart specifically, takes className styles as a prop instead of changed inside of the component. This is because different developers worked on it . . .
 */

export const Home = (props) => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState({
		piechart_home_gas: ["No data to show"],
		piechart_home_electric: ["No data to show"],
		table_data: [],
	});

	let location = useLocation();
	useEffect(() => {
		/* on load, turn on spinner awaiting getData response, then turn off spinner when data is set */
		setIsLoading(true);
		if (location.state === null) {
			getData(
				"home-page",
				props.removeToken,
				navigate,
				"piechart_home_electric",
				props.getCache,
				props.putCache,
				props.clearCache
			)
				.then((res) => {
					// if (res["piechart_home_gas"].length === 0) {
					// 	setIsLoading(false);
					// } else {
					// 	setData(res);
					// 	setIsLoading(false);
					// }
					if (res["piechart_home_gas"].length === 0 && res["piechart_home_electric"].length === 0) {
						res["piechart_home_gas"] = ["No data to show"]
						res["piechart_home_electric"] = ["No data to show"]
					} else if (res["piechart_home_electric"].length === 0) {
						res["piechart_home_electric"] = ["No data to show"]
					} else if (res["piechart_home_gas"].length === 0) {
						res["piechart_home_gas"] = ["No data to show"]
					}
					setData(res)
					setIsLoading(false)
				})
				.catch((err) => console.log(err));
		} else {
			if (location.state.data["piechart_home_gas"].length === 0 && location.state.data["piechart_home_electric"].length === 0) {
				location.state.data["piechart_home_gas"] = ["No data to show"]
				location.state.data["piechart_home_electric"] = ["No data to show"]
			} else if (location.state.data["piechart_home_electric"].length === 0) {
				location.state.data["piechart_home_electric"] = ["No data to show"]
			} else if (location.state.data["piechart_home_gas"].length === 0) {
				location.state.data["piechart_home_gas"] = ["No data to show"]
			}
			setData(location.state.data)
			setIsLoading(false)
		}
	}, []);

	/* Conditionally render hoomepage components based on presence of building data */
	function HomePageContainer() {
		return (
			<div className="h-full flex flex-col gap-10">
				
				<div className="bg-white flex flex-col rounded drop-shadow-md p-5">
					{/* <div className="widget-header">
            <h2>Your Properties</h2>
          </div> */}
					<Table
						id="grid-5"
						removeToken={props.removeToken}
						dataset={data.table_data}
						title={"Properties"}
						filename={"your_properties.csv"}
						headers={[
							"Site Name",
							"Audit date",
							"Status",
							"Incentive",
							"Net Cost After Incentive",
							"Annualized Cost Savings",
							"GHG savings (tons CO2)",
							"ROI",
						]}
					/>
				</div>
				<div className="flex h-[30rem] bg-white rounded drop-shadow-md p-5 w-full gap-5">
					<PieChart
						removeToken={props.removeToken}
						widgetClassName="h-full w-full flex gap-5"
						containerClassName="h-full w-full pt-10 px-5"
						chartTitle="Electrical Bills Breakdown (KWh per Building/yr)"
						labelAttribute="site_name"
						dataAttribute="consumption"
						dataset={data.piechart_home_electric}
					/>
					<PieChart
						removeToken={props.removeToken}
						widgetClassName="h-full w-full flex gap-5"
						containerClassName="h-full w-full pt-10 px-5"
						chartTitle="Gas Bills Breakdown (GJ per Building/yr)"
						labelAttribute="site_name"
						dataAttribute="consumption"
						dataset={data.piechart_home_gas}
					/>
				</div>
			</div>
		);
	}

	function Display() {
		return <div>{data["table_data"].length !== 0 ? <HomePageContainer /> : <NoBuildingsDiv />}</div>;
	}

	return (
		<div className="mb-16">
			<div className="title">
				<h1 className="text-4xl text-black font-mukta">Home</h1>
			</div>
			{isLoading ? <LoadingSpinner /> : <Display />}
		</div>
	);
};
