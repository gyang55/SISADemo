import React, { useState, useEffect, useCallback } from "react";
import { NavLink } from "react-router-dom";
import "../../styles/sidebar.css";
import logo from "../../Logo.png";
import Modal from "./GlobalLogoutModal";
import { useNavigate } from "react-router-dom";
import { getData } from "../../utils/HttpClient";
import { useIdleTimer } from "react-idle-timer";
/**
 * Sidebar position Sticky to stick to a set position (top). Set to flex col with footer underneath.
 */

export const Sidebar = (props) => {
	const IDLE_MINS = 10;
	const LOGOUT_MINS = 2;
	const [lockNavs, setLockNavs] = useState(true);
	const [firstName, setFirstName] = useState("");
	const [data, setData] = useState({});
	const [lastName, setLastName] = useState("");
	const [initials, setInitials] = useState("");
	const [logoutOpen, setLogoutOpen] = useState(false);
	const [idleOpen, setIdleOpen] = useState(false);
	const [timeVal, setTimeVal] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		setInterval(() => {
			setTimeVal(getRemainingTime());
		}, 1000);
	});

	useEffect(() => {
		getData("user", props.removeToken, navigate, "all_data", props.getCache, props.putCache, props.clearCacheData)
			.then((res) => {
				if (res.projects === null) {
					setLockNavs(true);
				} else {
					setLockNavs(false);
				}
				setFirstName(res.user.first_name);
				setLastName(res.user.last_name);
				setInitials(res.user.first_name.charAt(0) + res.user.last_name.charAt(0));
				setData(res.all_data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	/* Checks if user is privileged user */
	// function isMember() {
	//     return (accountTier === 15) ? true : false;
	// }

	/* locks content based on user privilege, useCallback is used to prevent flickering (state refresh bug) */
	const Subscribed = useCallback(() => {
		return (
			<div className="flex flex-col gap-4">
				<NavLink to="/" state={{ data: data.home }} className="navItemComponent">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="50"
						height="20"
						fill="currentColor"
						className="bi bi-house-door-fill"
						viewBox="0 0 16 16"
					>
						<path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z" />
					</svg>
					Home
				</NavLink>
				<NavLink
					to="/portfolio"
					state={{ data: data.portfolio }}
					className={lockNavs === false ? "navItemComponent" : "navItemComponentNoTier"}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="50"
						height="20"
						fill="currentColor"
						className="bi bi-speedometer"
						viewBox="0 0 16 16"
					>
						<path d="M8 2a.5.5 0 0 1 .5.5V4a.5.5 0 0 1-1 0V2.5A.5.5 0 0 1 8 2zM3.732 3.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 8a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 7.31A.91.91 0 1 0 8.85 8.569l3.434-4.297a.389.389 0 0 0-.029-.518z" />
						<path
							fillRule="evenodd"
							d="M6.664 15.889A8 8 0 1 1 9.336.11a8 8 0 0 1-2.672 15.78zm-4.665-4.283A11.945 11.945 0 0 1 8 10c2.186 0 4.236.585 6.001 1.606a7 7 0 1 0-12.002 0z"
						/>
					</svg>
					Portfolio
				</NavLink>
				<NavLink
					to="/analysis"
					state={{ data: data.analysis }}
					className={lockNavs === false ? "navItemComponent" : "navItemComponentNoTier"}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="50"
						height="20"
						fill="currentColor"
						className="bi bi-clipboard-data"
						viewBox="0 0 16 16"
					>
						<path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0V9z" />
						<path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
						<path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
					</svg>
					Analysis
				</NavLink>
				<NavLink to="/dataCollection" state={{ data: data.profile }} className="navItemComponent">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="50"
						height="20"
						fill="currentColor"
						className="bi bi-person-square"
						viewBox="0 0 16 16"
					>
						<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
						<path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z" />
					</svg>
					DataCollection
				</NavLink>
				<NavLink to="/profile" state={{ data: data.profile }} className="navItemComponent">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="50"
						height="20"
						fill="currentColor"
						className="bi bi-person-square"
						viewBox="0 0 16 16"
					>
						<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
						<path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z" />
					</svg>
					Account
				</NavLink>
			</div>
		);
	}, [lockNavs, data]);

	// handles logout
	const handleLogout = () => {
		props.removeToken();
		document.getElementById("root").style.filter = "blur(0px)";
		props.clearCacheData();
		navigate("/");
		navigate(0);
	};

	// set logout modal state to true and add blur to background
	const openLogoutModal = () => {
		document.getElementById("root").style.filter = "blur(5px)";
		setLogoutOpen(true);
	};

	// set logout modal state and idle modal state to false, add blur, reset idle timer when the modal is closed
	const closeModal = () => {
		document.getElementById("root").style.filter = "blur(0px)";
		setLogoutOpen(false);
		setIdleOpen(false);
		reset();
	};

	// set idle modal state to tru and add blur to background
	const openIdleModal = () => {
		document.getElementById("root").style.filter = "blur(5px)";
		setIdleOpen(true);
	};

	// react idle timer event. idle prompt while appear and trigger openIdleModal
	const onPrompt = () => {
		openIdleModal();
	};

	// react idle timer event. if user is still idle after idle prompt, logout
	const onIdle = () => {
		handleLogout();
	};

	// react idle timer methods and prop setup
	const { getRemainingTime, reset } = useIdleTimer({
		onIdle,
		onPrompt,
		timeout: 1000 * 60 * IDLE_MINS,
		promptTimeout: 1000 * 60 * LOGOUT_MINS,
		crossTab: true,
	});

	return (
		<div className="h-screen sticky top-12 mt-12 w-1/6">
			<Modal open={logoutOpen} onClose={closeModal} event={handleLogout} message="Are you sure you want to logout?" />
			<Modal
				open={idleOpen}
				onClose={closeModal}
				message={`You've been idle for a while. Are you still there? Logging out in ${(timeVal / 1000).toFixed(0)} seconds`}
			/>
			<div className="sticky h-fit bg-white rounded-lg drop-shadow-md flex flex-col ">
				<div className="flex flex-col items-center">
					<img className="w-56 m-6" src={logo} alt="profile" />
				</div>
				<div className="profile">
					<div className="profile-image font-mukta">{initials}</div>
					<div className="mt-5 font-mukta">Welcome, {firstName + " " + lastName}</div>
				</div>
				<div className="flex h-full justify-center text-left ">
					<div className="flex flex-col gap-4">
						<Subscribed />
						{/* <a
                            href="#"
                            className="font-mukta flex text-xl items-center w-fit py-2 pr-10 rounded
                             hover:bg-blue-600 hover:text-white hover:drop-shadow-mdease-in-out duration-200"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="50"
                                height="20"
                                fill="currentColor"
                                className="bi bi-lightbulb"
                                viewBox="0 0 16 16"
                            >
                                <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1z" />
                            </svg>
                            Solutions (0)
                        </a> */}
						{/*<a href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="20" fill="currentColor" className="bi bi-newspaper" viewBox="0 0 16 16">
                                <path d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5v-11zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5H12z" />
                                <path d="M2 3h10v2H2V3zm0 3h4v3H2V6zm0 4h4v1H2v-1zm0 2h4v1H2v-1zm5-6h2v1H7V6zm3 0h2v1h-2V6zM7 8h2v1H7V8zm3 0h2v1h-2V8zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1z" />
                            </svg>
                            News
                            </a>*/}
						{/* <a
                            href="#"
                            className="font-mukta flex text-xl items-center w-fit py-2 pr-10 rounded
                             hover:bg-blue-600 hover:text-white hover:drop-shadow-mdease-in-out duration-200"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="50"
                                height="20"
                                fill="currentColor"
                                className="bi bi-person-square"
                                viewBox="0 0 16 16"
                            >
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z" />
                            </svg>
                            Account
                        </a> */}
						<a href="#" className="navItemComponent" /* onClick={handleLogout}*/ onClick={openLogoutModal}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="50"
								height="20"
								fill="currentColor"
								className="bi bi-box-arrow-left"
								viewBox="0 0 16 16"
							>
								<path
									fillRule="evenodd"
									d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
								/>
								<path
									fillRule="evenodd"
									d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
								/>
							</svg>
							Logout
						</a>
						<div className="border-t-2">
							<div className="flex gap-2 my-5">
								<a href="#" className="font-mukta text-slate-500">
									About
								</a>
								<a href="#" className="font-mukta text-slate-500">
									Privacy
								</a>
								<a href="#" className="font-mukta text-slate-500">
									Help
								</a>
								<a href="#" className="font-mukta text-slate-500">
									Contact
								</a>
							</div>
							<div className="font-mukta text-slate-500 pb-5">© 2022 Sisa Energy Ltd.</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
