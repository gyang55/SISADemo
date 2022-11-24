import React, { useEffect, useState } from 'react';
import { changePasswordPost } from '../../utils/HttpClient';
import logo from "../../Logo.png";
import "../../styles/reset.css"
import { useParams } from 'react-router-dom';

export const ResetPassword = (props) => {

    const [alert, setAlert] = useState(false)
    const [msg, setMsg] = useState("")
    const resetToken = useParams().jwt

    useEffect(() => {
        if (alert) {
            document.querySelector(".msg").value = msg
            document.querySelector(".msg").style.color = "red"
            return;
        }
        if (msg !== null && !alert) {
            document.querySelector(".msg").value = msg
            document.querySelector(".msg").style.color = "green"
        }
    }, [alert, msg])

    const onsubmit = (e) => {
        e.preventDefault()
        let password = document.querySelector('#reset-password').value
        let confirmPassword = document.querySelector('#reset-password-confirm').value

        if (password !== confirmPassword) {
            setAlert(true)
            setMsg("Password doesn't match.")
            return;
        }
        changePasswordPost(password, resetToken).then(res => {
            if (res.alert !== undefined) {
                setMsg(res.msg)
                setAlert(true)
                return;
            }
            if (res.data.success) {
                setMsg("Password successfully changed. You can login with your new password.")
                setAlert(false)
            }
        }).catch(err => console.log(err))
    }


    return (
        <>
            <div className='logoDiv'>
                <img className='logo' src={logo} alt="SISA Energy Ltd"></img>
            </div>
            <div className='container'>
                <div className='frame frame-reset'>
                    <div className='nav'>
                        <ul>
                            <li className="signin-active">
                                <a className="btn" id="reset-nav">Reset Password</a>
                            </li>
                        </ul>
                    </div>
                    <h4 className='title-msg title-reset'>
                        Password must be 8 characters long.
                    </h4>

                    <form className='form-forgot form-signin form-reset' onSubmit={onsubmit}>
                        <label htmlFor="email">New Password</label>
                        <input className="form-styling" id="reset-password" type="password" name="password" placeholder="" required />
                        <label htmlFor="password">Confirm Password</label>
                        <input className="form-styling" id='reset-password-confirm' type="password" name="confirm-password" placeholder="" required />
                        <button type='submit' className="btn-signin btn-animate" >Reset Password</button>
                    </form>

                    <div>
                        <p className='msg' style={{ color: "red"}}>{msg}</p>
                    </div>
                </div>
            </div>
        </>
    )
}