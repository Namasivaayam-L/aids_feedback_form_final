import axios from 'axios'
import React, { useState } from 'react'
import './logInPageCSS.css'
import CaptchaBOX from '../components/captchaBOX'
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

export const LogInPage = () => {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [isVerified, setisVerified] = useState()
    const [error, setError] = useState('')
    async function handleSignIn(event) {
      event.preventDefault()
        const data = { username, password ,isVerified }
        try {
            const url = '/feedback/signin'
            window.sessionStorage.setItem('username', username)
            const res = await axios.post(url, data)
            if(res.data==='User Not Available'){
                document.getElementById('rollNo_ip').style.border='3px solid'
                document.getElementById('rollNo_ip').style.borderColor='red'
            }
            
            if(res.data==='Invalid Password'){
                document.getElementById('rollNo_ip').style.borderColor='white'
                document.getElementById('password_ip').style.border='3px solid'
                document.getElementById('password_ip').style.borderColor='red'
            }
            
            if(res.data==='Invalid Captcha Retry'){
                document.getElementById('user_captcha_input').style.border='3px solid'
                document.getElementById('user_captcha_input').style.borderColor='red'
            }
            
            if (isVerified===true) {
                document.getElementById('user_captcha_input').style.borderColor='white'
            }
            
            if (res.data ==='/feedback'){
                document.getElementById('password_ip').style.borderColor='white'
                window.sessionStorage.setItem('username',username)  
                window.location.replace('http://localhost:3000/feedback')
            }
            if (res.data ==='/facultyDashboard'){
                document.getElementById('password_ip').style.borderColor='white'
                window.sessionStorage.setItem('username',username)  
                window.location.replace('http://localhost:3000/facultyDashboard')
            }
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) 
                setError(error.response.data.message)
       }
    }
    return (
        <div class="bg-img" >
            <div class="content">
                <header> ADS Log In</header>
                <div>
                    <div class="field">
                        {/* <span class="fa fa-user"></span> */}
                        <input
                            id='rollNo_ip'
                            type='text'
                            placeholder='Enter your Username'
                            name='Username'
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                            />
                    </div>
                    <div class="field space">
                            <input
                                id='password_ip'
                                type='password'
                                placeholder='Enter your Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                />
                            <span class="show">Show</span>
                    </div>
                    <div  style={{ display: 'flex' }}>
                        <CaptchaBOX onChange={(val) => { setisVerified(val) }} style={{top:'-5px'}} />
                        {isVerified === true && (<ThumbUpOffAltIcon style={{ margin: '22px -15px', }} />)}
                        {isVerified === false && (<ThumbDownOffAltIcon style={{ margin: '22px -15px', }} />)}
                    </div>
                    <div class="field space">
                        <button id='logIn_Btn' onClick={handleSignIn}>Log In</button>
                    </div>
                </div>
            </div> 
        </div>
    )
}  