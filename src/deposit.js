import React, { useState } from 'react';
import { Card } from './context'; // Ensure this is the correct path

function Deposit() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState('');

  return (
    <Card
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={show ?
        <DepositForm setShow={setShow} setStatus={setStatus} /> :
        <DepositMsg setShow={setShow} setStatus={setStatus} />}
    />
  );
}

function DepositMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button type="submit"
        className="btn btn-light"
        onClick={() => {
          props.setShow(true);
          props.setStatus('');
        }}>
        Deposit again
      </button>
    </>
  );
}

function DepositForm(props) {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');

  async function handle() {
    if (!email || !amount) {
      props.setStatus('Email and amount are required');
      return;
    }

    try {
      const response = await fetch(`https://aqueous-lowlands-43473-b4c6f58d4156.herokuapp.com/account/update/${email}/${amount}`, {
        method: 'GET', // or 'POST' if your backend requires it
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      props.setStatus(`Deposit successful! New balance: $${result.balance}`);
      props.setShow(false);
    } catch (error) {
      props.setStatus(`Deposit failed: ${error.message}`);
      console.error('Error updating balance:', error);
    }
  }

  return (
    <>
      Email<br />
      <input
        type="email"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={e => setEmail(e.currentTarget.value)}
      /><br />

      Amount<br />
      <input
        type="number"
        className="form-control"
        placeholder="Enter amount"
        value={amount}
        onChange={e => setAmount(e.currentTarget.value)}
      /><br />

      <button
        type="submit"
        className="btn btn-light"
        onClick={handle}
      >
        Deposit
      </button>
    </>
  );
}

export default Deposit;
