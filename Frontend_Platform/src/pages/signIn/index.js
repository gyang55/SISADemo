import React, { useCallback, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login';
import { loginPost, googleLogin, signUpPost } from '../../utils/HttpClient';
import logo from "../../Logo.png";
import '../../styles/login.css';
import AnimateHeight from 'react-animate-height';
import ReCAPTCHA from "react-google-recaptcha";
import { AnimatedBackground } from "../global/Background"

function SignIn_Comp(props) {
    const navigate = useNavigate();
    const [isSignInTab, setActiveTab] = useState(true);
    const [loading, setLoading] = useState(false);
    const [height, setHeight] = useState(175);
    const captchaRef = useRef(null);
    const captchaRefSignUp = useRef(null);
    let [state, setState] = useState({
        alert: false,
        msg: ""
    })

    const googleSuccess = (res) => {
        let data = {
            googleLogin: true,
            email: res.profileObj.email,
            pass: res.profileObj.googleId,
            firstName: res.profileObj.givenName,
            lastName: res.profileObj.familyName,
            phone: "",
            company: "",
            address: ""
        }
        googleLogin(data, props.setToken, navigate)
    }

    const googleFail = (err) => {
        console.log(err)
        setState({
            alert: true,
            msg: "Error Signing In with Google"
        })
    }

    const signInSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        const token = captchaRef.current.getValue();
        const email = e.target.email.value;
        const pass = e.target.password.value;
        loginPost(email, pass, token, props.setToken, navigate).then(
            payload => {
                if (payload.alert) {
                    setState({
                        alert: payload,
                        msg: payload
                    })
                }
                setLoading(false)
            }
        )
    }

    const signUpSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        let pass = e.target.password.value;
        let cPass = e.target.confirmPassword.value;
        const token = captchaRefSignUp.current.getValue();

        if (pass !== cPass) {
            setState({
                alert: true,
                msg: "Password doesn't match"
            })
            setLoading(false)
            return
        }

        let data = {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            company: e.target.CName.value,
            address: e.target.OAddress.value,
            pass: e.target.password.value,
            accountNumber: e.target.ANumber.value
        }

        signUpPost(data, token, props.setToken, navigate).then(
            (res) => {
                setState({
                    alert: res.alert,
                    msg: res.msg
                })
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function SignUpTab() {
        return (
            <div>
                <div>
                    <div className='grid grid-cols-2 p-1'>
                        <label htmlFor="firstName">First name*</label>
                        <label htmlFor="lastName">Last name*</label>
                        <input className="form-styling" type="text" id="firstName" required placeholder="" />
                        <input className="form-styling" type="text" id="lastName" required placeholder="" />
                        <label htmlFor="email">Email*</label>
                        <label htmlFor="phone">Phone Number*</label>
                        <input className="form-styling" type="text" id="email" required placeholder="" />
                        <input className="form-styling" type="text" id="phone" required placeholder=""
                            pattern="(\d{3}[-\.\s]??\d{3}[-\.\s]??\d{4}|\(\d{3}\)\s*\d{3}[-\.\s]??\d{4}|\d{3}[-\.\s]??\d{4})" />
                    </div>
                    <div>
                        <label htmlFor="CName">Company Name</label>
                        <input className="form-styling" type="text" id="CName" placeholder="" />
                        <label htmlFor="OAddress">Office Address</label>
                        <input className="form-styling" type="text" id="OAddress" placeholder="" />
                    </div>
                    <div className="grid grid-cols-2 p-1">
                        <label htmlFor="password">Password*</label>
                        <label htmlFor="confirmPassword">Confirm Password*</label>
                        <input className="form-styling" type="password" id="password" required placeholder="" />
                        <input className="form-styling" type="password" id="confirmPassword" required placeholder="" />
                    </div>
                    <div>
                        <label htmlFor="ANumber">Account Number*</label>
                        <input className="form-styling" type="text" id="ANumber" placeholder="" />
                    </div>
                </div>
            </div>
        );
    }

    function SignInTab() {
        return (
            <div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input className="form-styling" id="signin-email-input" type="email" name="email" placeholder="" required />
                    <label htmlFor="password">Password</label>
                    <input className="form-styling" id='signin-password-input' type="password" name="password" placeholder="" required />
                </div>
            </div>
        );
    }

    const ReCaptchaComponent = useCallback(() => {
        return (
            <div className="w-full mt-3">
                <ReCAPTCHA className="ml-10 w-full "
                    ref={isSignInTab ? captchaRef : captchaRefSignUp}
                    sitekey={process.env.REACT_APP_RECAPTCHA_KEY} />
            </div>
        )
    }, [state, isSignInTab])

    function ForgotPasswordBox() {
        return (
            <div className='forgotPasswordContainer grid mt-5 place-items-center'>
                <Link className="forgotPasswordAnchor" to={"/forgot-password"}>Forgot your password?</Link>
            </div>
        );
    }

    function handleTabSwitch(prams) {
        if (state['msg'] != "") {
            setState({ msg: "" })
        }
        if (prams === isSignInTab) {
            return
        } else {
            isSignInTab ? setHeight(560) : setHeight(175);
            setActiveTab(prams);
        }
    }

    return (
        <>
            <AnimatedBackground />
            <div className='flex h-screen flex-col items-center'>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                <div className='logoDiv mt-4'>
                    <img className='logo' src={logo} alt="SISA Energy Ltd"></img>
                </div>
                <div className="container">
                    <div className="frame">
                        <div className="nav">
                            <ul className="w-2/3">
                                <li className={isSignInTab ? "active" : ""} onClick={() => handleTabSwitch(true)}>
                                    <a className="btn" id="sign-in">Sign in</a>
                                </li>
                                <li className={!isSignInTab ? "active" : ""} onClick={() => handleTabSwitch(false)}>
                                    <a className="btn" id="sign-up">Sign up</a>
                                </li>
                            </ul>
                        </div>
                        <div id='google-login-row'>
                            <GoogleLogin
                                clientId={process.env.REACT_APP_CLIENT_ID}
                                render={(renderProps) => (isSignInTab ?
                                    <button type="button" className="google-login" onClick={renderProps.onClick}>
                                        Sign in with Google
                                    </button> :
                                    <button type="button" className="google-login" onClick={renderProps.onClick}>
                                        Sign up with Google
                                    </button>
                                )}
                                onSuccess={googleSuccess}
                                onFailure={googleFail}
                                cookiePolicy={"single_host_origin"}
                                className="bg-white"
                            />
                        </div>
                        <form className="mt-5 " name="form" onSubmit={isSignInTab ? signInSubmit : signUpSubmit}>
                            <AnimateHeight duration={250} height={height}>
                                <div id="boxContainer">
                                    {isSignInTab ? <SignInTab /> : <SignUpTab />}
                                </div>
                            </AnimateHeight>
                            {
                                <p id='msg' style={{ color: "red", textAlign: "center", marginTop: "0.4rem", marginBottom: "0.4rem" }}>
                                    {state.msg}
                                </p>}
                            <ReCaptchaComponent />
                            <div className="grid place-items-center w-full">
                                <button className="loginButtons w-11/12 mb-1 bg-indigo-500 text-white font-bold py-2 px-6 rounded-full" type="submit">
                                    {loading ? <i class="fa fa-spinner fa-spin"></i> : ""}{isSignInTab ? <span>Sign In</span> : <span>Sign Up</span>}
                                </button>
                            </div>
                        </form>
                        {isSignInTab && <ForgotPasswordBox />}
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignIn_Comp;