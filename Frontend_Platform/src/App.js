import React from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/index.css";
import { Home } from "./pages/home";
import { Sidebar } from "./pages/sidebar";
import { Portfolio } from "./pages/portfolio";
import { Analysis } from "./pages/analysis";
import { Profile } from "./pages/account";
import { Report } from "./pages/report"
import useCache from "./utils/UseCache";

import ProjectInfoPage from "./pages/dataCollection/ProjectInfroPage"
import FacilityInfoPage from "./pages/dataCollection/FacilityInfoPage"
import BuildingDataPage from "./pages/dataCollection/BuildingDataPage"
import FuelTypePage from "./pages/dataCollection/FuelTypePage"
import ThermalInfoPage from "./pages/dataCollection/ThermalInfoPage"
import OtherFeaturesInfoPage from "./pages/dataCollection/OtherFeaturesPage"
import LightsPage from "./pages/dataCollection/lightsPage"
import EnvelopesPage from "./pages/dataCollection/envelopesPage"
import EquipmentsPage from "./pages/dataCollection/equipmentsPage"
import DashBoardPage from "./pages/dataCollection/dashBoardPage"
import IndexPage from "./pages/dataCollection/index"
import BuildingPage from "./pages/dataCollection/buildingPage"
import GasDataInfoPage from "./pages/dataCollection/GasDataInfroPage"


function App() {
	const { getCache, clearCacheData, putCache } = useCache();
	return (
		<div className="">
			<div>
				<div className="">
					<div className="flex justify-center">
						<Sidebar
							clearCacheData={clearCacheData}
							getCache={getCache}
							putCache={putCache}
						/>
						<div className="ml-24 mt-5 w-3/5">

							<Routes>
								<Route
									path="/"
									element={
										<Home
											getCache={getCache}
											putCache={putCache}
											clearCacheData={clearCacheData}
										/>
									}
								/>
								<Route
									path="/"
									element={
										<Home

											getCache={getCache}
											putCache={putCache}
											clearCacheData={clearCacheData}
										/>
									}
								/>
								<Route
									path="/portfolio"
									element={
										<Portfolio
											getCache={getCache}
											putCache={putCache}
											clearCacheData={clearCacheData}
										/>
									}
								/>
								<Route
									path="/analysis"
									element={
										<Analysis
											getCache={getCache}
											putCache={putCache}
											clearCacheData={clearCacheData}
										/>
									}
								/>

								<Route path="/dataCollection" element={<IndexPage />} >
									<Route index element={<DashBoardPage />} />
									<Route path="buildingPage" element={<BuildingPage />} />
									<Route path="facility" element={<FacilityInfoPage />} />
									<Route path="project" element={<ProjectInfoPage />} />
									<Route path="building" element={<BuildingDataPage />} />
									<Route path="fuel" element={<FuelTypePage />} />
									<Route path="thermal" element={<ThermalInfoPage />} />
									<Route path="other" element={<OtherFeaturesInfoPage />} />
									<Route path="equipments" element={<EquipmentsPage />} />
									<Route path="lights" element={<LightsPage />} />
									<Route path="envelopes" element={<EnvelopesPage />} />
									<Route path="gas" element={<GasDataInfoPage />} />
								</Route>

								<Route
									path="/profile"
									element={
										<Profile
											getCache={getCache}
											putCache={putCache}
											clearCacheData={clearCacheData}
										/>
									}
								/>

								<Route
									path="/report/*"
									element={
										<Report
											getCache={getCache}
											putCache={putCache}
											clearCacheData={clearCacheData}
										/>
									}
								/>
							</Routes>
						</div>
					</div>
					)
				</div>

			</div>
		</div>
	);
}

export default App;
