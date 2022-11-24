import React, { useState, useEffect } from "react";
import { getData } from "../../utils/HttpClient";
import { useNavigate } from "react-router-dom";
import TabNavItem from "./TabNavItem";
import TabContent from "./TabContent";
import {
	validateStringName,
	validatePhone,
	validateAddress,
	validateEmail,
	validateOldPassword,
	validatePassword,
	validatePasswordMatches,
	validateCompanyName,
} from "../../utils/DataValidator";
import { TextField, Typography, Button } from "@mui/material";
import "../../styles/profile.css";
import { changeUserDetailsPost, changePasswordPost } from "../../utils/HttpClient";
import { useLocation } from "react-router-dom";
const Tabs = (props) => {
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState("tab1");
	const [data, setData] = useState([]);
	const [password, setPassword] = useState({
		old_password: "",
		new_password: "",
		new_password_confirm: "",
	});
	const [details, setDetails] = useState({
		email: data[1],
		first_name: data[2],
		last_name: data[3],
		phone: data[4],
		company: data[5],
		office_address: data[6],
		account_number: data[0],
	});

	const [errorMessage, setErrorMessage] = React.useState("");
	const [errorFirstName, setFirstNameErrorMessage] = React.useState("");
	const [errorLastName, setLastNameErrorMessage] = React.useState("");
	const [errorPhone, setPhoneErrorMessage] = React.useState("");
	const [errorCompany, setCompanyErrorMessage] = React.useState("");
	const [errorOffice, setOfficeErrorMessage] = React.useState("");
	const [errorOldPassword, setOldPasswordError] = React.useState("");
	const [passwordTypeError, setPasswordTypeError] = React.useState("");

	let location = useLocation();
	useEffect(() => {
		getData("profile-page", props.removeToken, navigate, "profile", props.getCache, props.putCache, props.clearCache)
			.then((res) => {
				for (var i = 0; i < res.user_data[0].length; i++) {
					if (res.user_data[0][i] == null) {
						res.user_data[0][i] = "No Entry";
					}
				}
				setData(res.user_data[0]);
				setDetails({
					email: res.user_data[0][1],
					first_name: res.user_data[0][2],
					last_name: res.user_data[0][3],
					phone: res.user_data[0][4],
					company: res.user_data[0][5],
					office_address: res.user_data[0][6],
					account_number: res.user_data[0][0],
				});
			})
			.catch((err) => console.log(err));
	}, []);

	const renderBanner = () => {
		return (
			<div id="backgroundBanner">
				<p>Sisa Premium Package</p>
				<a href={"https://www.sisaenergy.com/audit"}>learn more</a>
			</div>
		);
	};

	const renderTableDataRows = () => {
		return (
			<div>
				<p>Email: {data[1]}</p>
				<p>
					Name: {data[2]} {data[3]}{" "}
				</p>
				<p>Phone Number: {data[4]}</p>
				<p>Company: {data[5]}</p>
				<p>Office Address: {data[6]}</p>
			</div>
		);
	};

	function handleChange(event) {
		const value = event.target.value;
		setDetails({
			...details,
			[event.target.name]: value,
		});
	}

	function handlePasswordChange(event) {
		const value = event.target.value;
		setPassword({
			...password,
			[event.target.name]: value,
		});
	}

	function errorsPresent(details) {
		let count = 0;
		if (!validateStringName(details["first_name"])) {
			count++;
			setFirstNameErrorMessage("Invalid First Name");
		} else {
			setFirstNameErrorMessage("");
		}
		if (!validateStringName(details["last_name"])) {
			count++;
			setLastNameErrorMessage("Invalid Last Name");
		} else {
			setLastNameErrorMessage("");
		}
		if (!validatePhone(details["phone"])) {
			count++;
			setPhoneErrorMessage("Invalid Phone Number");
		} else {
			setPhoneErrorMessage("");
		}
		if (!validateCompanyName(details["company"])) {
			count++;
			setCompanyErrorMessage("Invalid Company Name");
		} else {
			setCompanyErrorMessage("");
		}
		if (!validateAddress(details["office_address"])) {
			count++;
			setOfficeErrorMessage("Invalid Office Address");
		} else {
			setOfficeErrorMessage("");
		}
		if (count !== 0) {
			return true;
		}
		return false;
	}

	const updateProfileDetails = (e) => {
		e.preventDefault();
		if (errorsPresent(details)) {
			console.log("Failed");
		} else {
			changeUserDetailsPost(details)
				.then((res) => {
					alert("Update Success");
					window.location.reload(false);
				})
				.catch((err) => console.log(err));
		}
	};

	const updatePassword = (e) => {
		e.preventDefault();
		changePasswordPost(password).then(res => {
			if(res.data.old_password_incorrect_error){
				setOldPasswordError(res.data.old_password_incorrect_error)
			} else if(res.data.match_new_passwords_error) {
				setOldPasswordError("")
				setPasswordTypeError(res.data.match_new_passwords_error)
			} else if(res.data.password_type_error) {
				setOldPasswordError("")
				setPasswordTypeError(res.data.password_type_error)
			} else if(!res.data.success){
				console.log(res.data);
			} else {
				setOldPasswordError("")
				setPasswordTypeError("")
				alert("Password Changed");
				window.location.reload(false)
			}
		}).catch(err => console.log(err))
		// }
	};

	return (
		<div className="mb-16">
			<div className="Tabs">
				<ul className="nav">
					<div>
						<TabNavItem
							item={
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									fill="currentColor"
									class="bi bi-person"
									viewBox="0 0 16 16"
								>
									<path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
								</svg>
							}
							title="⠀Account Overview"
							id="tab1"
							activeTab={activeTab}
							setActiveTab={setActiveTab}
						/>
					</div>
					<div>
						<TabNavItem
							item={
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									fill="currentColor"
									class="bi bi-cart"
									viewBox="0 0 16 16"
								>
									<path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
								</svg>
							}
							title="⠀Available Plans"
							id="tab2"
							activeTab={activeTab}
							setActiveTab={setActiveTab}
						/>
					</div>
					<div>
						<TabNavItem
							item={
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									fill="currentColor"
									class="bi bi-pencil"
									viewBox="0 0 16 16"
								>
									<path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
								</svg>
							}
							title="⠀Edit Profile"
							id="tab3"
							activeTab={activeTab}
							setActiveTab={setActiveTab}
						/>
					</div>
					<div>
						<TabNavItem
							item={
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="22"
									height="22"
									fill="currentColor"
									class="bi bi-key"
									viewBox="0 0 16 16"
								>
									<path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z" />
									<path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
								</svg>
							}
							title="⠀Change Password"
							id="tab4"
							activeTab={activeTab}
							setActiveTab={setActiveTab}
						/>
					</div>
					<div>
						<TabNavItem
							item={
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									fill="currentColor"
									class="bi bi-shield-lock"
									viewBox="0 0 16 16"
								>
									<path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z" />
									<path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415z" />
								</svg>
							}
							title="⠀Privacy Settings"
							id="tab5"
							activeTab={activeTab}
							setActiveTab={setActiveTab}
						/>
					</div>
				</ul>
			</div>
			<div className="bg-white rounded drop-shadow-md w-9/12">
				<div className="outlet">
					<TabContent id="tab1" activeTab={activeTab}>
						<div className="tabContainer">
							<div>
								<h2>
									Account Overview<hr></hr>
								</h2>
								<div className="grid grid-cols-3 ">
									<div className="col-span-2 tabContent">{renderTableDataRows()}</div>
									<div id="navButtonDisguised">
										<TabNavItem title="Edit Profile" id="tab3" activeTab={activeTab} setActiveTab={setActiveTab} />
									</div>
								</div>
							</div>
						</div>
					</TabContent>
					<TabContent id="tab2" activeTab={activeTab}>
						<div className="tabContainer">
							<h2>
								Available Plans<hr></hr>
							</h2>
							<div className="tabContent"></div>
						</div>
					</TabContent>
					<TabContent id="tab3" activeTab={activeTab}>
						<div className="tabContainer">
							<h2>
								Edit Profile<hr></hr>
							</h2>
							<div className="grid grid-cols-5">
								<div className="col-span-2">
									<div className="textFieldContainer">
										<span>Email</span>
										<TextField
											id="outlined"
											disabled
											helperText={errorMessage}
											placeholder={data[1]}
											name="email"
											onChange={handleChange}
										/>
									</div>
									<div className="textFieldContainer">
										<span>First Name</span>
										<TextField
											id="outlined"
											error={errorFirstName.length === 0 ? false : true}
											helperText={errorFirstName}
											placeholder={data[2]}
											name="first_name"
											onChange={handleChange}
										/>
									</div>
									<div className="textFieldContainer">
										<span>Last Name</span>
										<TextField
											id="outlined"
											error={errorLastName.length === 0 ? false : true}
											helperText={errorLastName}
											placeholder={data[3]}
											name="last_name"
											onChange={handleChange}
										/>
									</div>
								</div>
								<div className="col-span-2">
									<div className="textFieldContainer">
										<span>Phone</span>
										<TextField
											id="outlined"
											error={errorPhone.length === 0 ? false : true}
											helperText={errorPhone}
											name="phone"
											placeholder={data[4]}
											onChange={handleChange}
										/>
									</div>
									<div className="textFieldContainer">
										<span>Company</span>
										<TextField
											id="outlined"
											error={errorCompany.length === 0 ? false : true}
											helperText={errorCompany}
											placeholder={data[5]}
											name="company"
											onChange={handleChange}
										/>
									</div>
									<div className="textFieldContainer">
										<span>Office Address</span>
										<TextField
											id="outlined"
											error={errorOffice.length === 0 ? false : true}
											helperText={errorOffice}
											placeholder={data[6]}
											name="office_address"
											onChange={handleChange}
										/>
									</div>
								</div>
							</div>
							<hr></hr>
							<div className="grid grid-cols-6 mt-5 mb-3">
								<div className="col-start-6 mt-1">
									<Button onClick={() => window.location.reload(false)} sx={{ borderRadius: 28 }}>
										<Typography style={{ color: "#636363", textTransform: "none" }}>Cancel</Typography>
									</Button>
								</div>
								<div className="col-start-7">
									<Button
										color="primary"
										onClick={updateProfileDetails}
										sx={{ borderRadius: 28 }}
										style={{
											backgroundColor: "#03045e",
											width: 150,
											padding: 10,
										}}
										variant="contained"
									>
										<Typography style={{ color: "#FFFFFF", textTransform: "none" }}>Save Changes</Typography>
									</Button>
								</div>
							</div>
						</div>
					</TabContent>
					<TabContent id="tab4" activeTab={activeTab}>
						<div className="tabContainer">
							<h2>Change Password</h2>
							<hr></hr>
							<div className="grid grid-cols-5">
								<div className="col-span-2">
									<div className="textFieldContainer">
										<span>Old Password</span>
										<TextField
											id="outlined"
											error={errorOldPassword.length === 0 ? false : true}
											helperText={errorOldPassword}
											name="old_password"
											onChange={handlePasswordChange}
											type="password"
										/>
									</div>
									<div className="textFieldContainer">
										<span>New Password</span>
										<TextField
											id="outlined"
											error={passwordTypeError.length === 0 ? false : true}
											helperText={passwordTypeError}
											name="new_password"
											onChange={handlePasswordChange}
											type="password"
										/>
									</div>
									<div className="textFieldContainer">
										<span>Re-type New Password</span>
										<TextField
											id="outlined"
											// error={passwordMatches.length === 0 ? false : true}
											// helperText={passwordMatches}
											name="new_password_confirm"
											onChange={handlePasswordChange}
											type="password"
										/>
									</div>
								</div>
							</div>
							<hr></hr>
							<div className="grid grid-cols-6 mt-5 mb-3">
								<div className="col-start-6 mt-1">
									<Button onClick={() => window.location.reload(false)} sx={{ borderRadius: 28 }}>
										<Typography style={{ color: "#636363", textTransform: "none" }}>Cancel</Typography>
									</Button>
								</div>
								<div className="col-start-7">
									<Button
										color="primary"
										onClick={updatePassword}
										sx={{ borderRadius: 28 }}
										style={{
											backgroundColor: "#03045e",
											width: 150,
											padding: 10,
										}}
										variant="contained"
									>
										<Typography style={{ color: "#FFFFFF", textTransform: "none" }}>Save Changes</Typography>
									</Button>
								</div>
							</div>
						</div>
					</TabContent>
					<TabContent id="tab5" activeTab={activeTab}>
						<div className="tabContainer">
							<h2>
								Privacy Settings<hr></hr>
							</h2>
							<div className="tabContent"></div>
						</div>
					</TabContent>
				</div>
			</div>
			<div className="bg-white rounded drop-shadow-md mt-5 w-9/12">
				<div className="outlet">
					<TabContent id="tab1" activeTab={activeTab}>
						<div className="tabContainer">
							<h2>Your Plan</h2>
						</div>
						<div>{renderBanner()}</div>
						<div className="tabContainer">
							<p>Payment</p>
						</div>
					</TabContent>
				</div>
			</div>
		</div>
	);
};
export default Tabs;
