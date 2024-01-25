import React, { useState } from 'react';
import './Registration.css';

export default function RegistrationForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registrationStatus, setRegistrationStatus] = useState(null);

    const handleRegistration = async () => {
        try {
            const response = await fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    email: email, 
                    password: password,
                }),
            });
            if (response.ok) {
                const user = await response.json();
                console.log('User registered successfully:', user);
                setRegistrationStatus('success');
            } else {
                const errorData = await response.json();
                console.error('Error registering user:', errorData.error);
                setRegistrationStatus('error');
            }
        } catch (error) {
            console.error('Error registering user', error);
            setRegistrationStatus('error');
        }
    }


    return (
        <div>
            <h2>Registration</h2>
            <form>
                <label>
                    Username:
                    <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <br />
                <label>
                    Email:
                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <br />
                <label>
                    Password:
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <button type='button' onClick={handleRegistration}>Register</button>
            </form>

            {registrationStatus === 'success' && (
                <div style={{color: 'green'}}>Registration successful!</div>
            )}

            {registrationStatus === 'error' && (
                <div style={{color: 'red'}}> Registration failed! Please try again</div>
            )} 
        </div>
    )
};