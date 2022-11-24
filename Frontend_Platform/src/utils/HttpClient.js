import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

function loginPost(email, password, captcha, setToken, navigate) {
	return axios
		.post(apiUrl.concat("login"), { email, password, captcha })
		.then((res) => {
			if (res.data.captcha_verification === false) {
				return {
					alert: true,
					msg: "ReCaptcha failed.",
				};
			}
			if (res.data.account_found) {
				//Account found.

				if (res.data.login) {
					//Login Successful
					setToken(res.data.access_token);
					navigate("/", { token: res.data.access_token });
				} else {
					//Wrong Password
					return {
						alert: true,
						msg: "Wrong password",
					};
				}
			} else {
				//Account not found. Need to sign up.
				return {
					alert: true,
					msg: "No account found.",
				};
			}
		})
		.catch((err) => {
			console.error(err);
		});
}

function googleLogin(data, setToken, navigate) {
	return axios
		.post(apiUrl + "login", data )
		.then((res) => {
			if (res.data.account_found) {
				//Account found.
				if (res.data.login) {
					//Login Successful
					setToken(res.data.access_token);
					navigate("/", { token: res.data.access_token });
				} else {
					//Wrong Password
					return {
						alert: true,
						msg: "Wrong password",
					};
				}
			} else {
				//Account not found. Sign up with google.
				axios.post(apiUrl + "signup", data).then((res) => {
					if (res.data.user_added === true) {
						axios
							.post(apiUrl + "login", {
								email: data.email,
								pass: data.pass,
								googleLogin: true
							})
							.then((res) => {
								setToken(res.data.access_token);
								navigate("/", { token: res.data.access_token });
							});
					} else {
						return {
							alert: true,
							msg: "Error Sigining up with Google",
						};
					}
				});
			}
		})
		.catch((err) => {
			console.error(err);
		});
}

function signUpPost(data, captcha, setToken, navigate) {
	return axios
		.post(apiUrl + "signup", { data, captcha })
		.then((res) => {
			if ("captcha_verification" in res.data && res.data.captcha_verification === false) {
				return {
					alert: true,
					msg: "ReCaptcha failed.",
				};
			}
			if (res.data.user_added === true) {
				setToken(res.data.access_token);
				navigate("/", { token: res.data.access_token });
			} else {
				return {
					alert: true,
					msg: res.data.error,
				};
			}
		})
		.catch((err) => {
			console.error(err);
		});
}

async function getData(endpoint, removeToken, navigate, name, getCachedData, putCache, clearCacheData) {
	if(name=='profile'){
		return axios
				.get(apiUrl + endpoint, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				})
				.then((res) => {
					console.log(res.data);
					return res.data;
				})
	}
	if (caches.has(name)) {
		let awaited_response = await getCachedData(name, "data");
		if (awaited_response === false) {
			return axios
				.get(apiUrl + endpoint, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				})
				.then((res) => {
					putCache(res.data);
					return res.data;
				})
				.catch((err) => {
					if (err.response.status === 401 && localStorage.getItem("token") !== null) {
						window.alert("Session timeout. Please sign in again.");
						removeToken();
						clearCacheData();
						navigate("/");
					}
				});
		} else {
			return awaited_response;
		}
	}
}

function resetPassPost(email, captcha) {
	return axios
		.post(apiUrl.concat("reset-password"), { email, captcha })
		.then((res) => res)
		.catch((err) => console.log(err));
}

function changeUserDetailsPost(details) {
	return axios
		.post(apiUrl.concat("update-profile"), {
			details,
		})
		.then((res) => res)
		.catch((err) => {
			console.log(err);
		});
}

function changeUserPassword(password) {
	return axios
		.post(apiUrl.concat("update-profile"), {
			password,
		})
		.then((res) => console.log(res))
		.catch((err) => {
			console.log(err);
		});
}

function changePasswordPost(password, resetToken) {
	return axios
		.post(
			apiUrl.concat("change-password"),
			{ password },
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		)
		.then((res) => res)
		.catch((err) => {
			if (err.response.status === 401) {
				return {
					alert: true,
					msg: "Session timed out. Please submit your email to recieve a new link.",
				};
			}
			if (err.response.status === 405) {
				return {
					alert: true,
					msg: "Unauthorized session request.",
				};
			}
		});
}

export { loginPost, googleLogin, signUpPost, getData, resetPassPost, changeUserDetailsPost, changePasswordPost };
