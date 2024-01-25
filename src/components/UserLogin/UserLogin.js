import React, { useState } from 'react';

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            if(response.ok) {
                const { token } = await response.json();
                console.log('Login successful! Token: ', token);
                //You can store the token in local storage or a state management solution
                // For now we are going to log in 
                setLoginStatus('success');
            } else {
                const errorData = await response.json();
                console.error('Error logging in', errorData.error);
                setLoginStatus('error');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setLoginStatus('error');
        }
    };

    return (
        <>
            <h2>Login Form</h2>
            <form>
                <label>
                    Username:
                    <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <br />
                <label>
                    Password:
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button type='button' onClick={handleLogin}>
                    Login
                </button>
            </form>

            {loginStatus === 'success' && (
                <div style={{color: 'green'}}> Login Successful! Redirecting... </div>
            )}

            {loginStatus === 'error' && (
                <div style={{color: 'red'}}> Login Failed! Error please try again</div>
            )}
        </>
    )
}