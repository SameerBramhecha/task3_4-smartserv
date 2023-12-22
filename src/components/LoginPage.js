import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import toast, { Toaster } from "react-hot-toast";
import logo from './logo.png';


const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleForgotPassword = () => {
        const emailSubject = encodeURIComponent('Password Reset Request');
        const emailBody = encodeURIComponent('Please reset my password.');

        window.location.href = `mailto:support@smartserv.io?subject=${emailSubject}&body=${emailBody}`;
    };
    const handleLogin = () => {
        console.log(username);
        console.log(password);
        // Validating email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(username)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        // Validating password format
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@]{8,}$/;
        if (!passwordRegex.test(password)) {
            toast.error("Password must contain at least 8 characters, including an uppercase letter and a number. Special characters other than '@' are not allowed.");
            return;
        }
        toast.success("Login Success");
        if (password === 'SmartServTest@123')
        {
            navigate("/dashboard");
        }
        

    };

    return (
        <div className="login-container">
            <img src={logo} alt="SmartServ"></img>
            <br></br>
            <br></br>
            <form >
                
                <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <br></br>
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
<br></br>
                <button type="button" onClick={handleLogin}>Login</button>
                <br></br>
                <p>
                    <span className="forgot-password-link" onClick={handleForgotPassword}>
                        Forgot Password?
                    </span>
                </p>
            </form>
            <Toaster />
        </div>
    );
};

export default LoginPage;
