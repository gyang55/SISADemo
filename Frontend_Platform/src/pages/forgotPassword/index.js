import React, { useEffect, useState} from 'react';
import { resetPassPost } from '../../utils/HttpClient';
import logo from "../../Logo.png";
import "../../styles/forgot.css";
import ReCAPTCHA from "react-google-recaptcha";
import {useNavigate} from 'react-router-dom';

export const ForgotPassword = (props) => {

    const [emailSubmitted, setEmailSubmitted] = useState(false);
    const [captcha, setCaptcha] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (emailSubmitted) {
            let email = document.querySelector('#forgot-email-input').value
            document.querySelector('.resend').style.display = 'block';
            resetPassPost(email, captcha).catch(err => console.log(err))

        }
    }, [emailSubmitted])

    return (
        <>
            <div className='logoDiv'>
                <img className='logo' src={logo} alt="SISA Energy Ltd"></img>
            </div>
            <div className="grid place-items-center">
                <div className='frame frame-forgot'>
                    <div className='TopBarContainer'>
                        <ul className="grid grid-cols-8">
                            <li className="backIcon flex col-span-1">
                                <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16" onClick={() => navigate(-1)}>
                                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                                </svg>
                            </li>
                            <li className="flex col-span-7">
                                <a id="reset-nav">Lost your password ?</a>
                            </li>
                        </ul>
                    </div>
                    <h4 className='title-msg'>
                        Please enter your email address.
                        You will recieve a link to create a new password via email.
                    </h4>

                    <form className='form-forgot' onSubmit={e => { e.preventDefault(); setEmailSubmitted(true); }}>
                        <label htmlFor="email">Email</label>
                        <input className="form-styling" id="forgot-email-input" type="email"
                            name="email" placeholder="" required />
                        <div className="flex grid place-items-center ml-5">
                            <ReCAPTCHA
                                className="mt-3"
                                sitekey="6Le1wXEfAAAAAHlk-Mg4-sSmfGS4VuHd-kvJpMjY"
                                onChange={(value) => setCaptcha(value)}
                            />
                        </div>
                        <div className="grid place-items-center">
                            <button className="loginButtons w-9/12 mt-5 mb-5 text-white font-bold py-2 px-4 rounded-full">Send</button>
                        </div>
                    </form>

                    <div className="ResentFrame w-full">
                        Haven't recieved any email? Click <a href="#" style={{color: "#0044ff", textDecoration: "underline"}}>here</a> to resend.
                    </div>
                </div>
            </div>
        </>
    )
}