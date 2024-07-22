import React, { useState } from 'react';

function CreateAccount() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const createAccount = async (name, email, password) => {
    try {
        const response = await fetch('https://aqueous-lowlands-43473-b4c6f58d4156.herokuapp.com/account/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Account creation successful:', data);
        return data;
    } catch (error) {
        console.error('Error creating account:', error.message);
        throw error; // Re-throw error to handle further up the chain
    }
};

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const createdUser = await createAccount(name, email, password);
      setSuccessMessage('Account created successfully!');
      console.log('Created user:', createdUser);
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      setErrorMessage('Account creation failed');
      console.error('Account creation error:', error);
    }
  };

  return (
    <div>
      <h1>Create Account</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleFormSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        <br />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <br />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <br />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default CreateAccount;












//https://us-central1-katie-jonesbankingapp.cloudfunctions.net/createAccount/createAccount
