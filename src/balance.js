import React, { useState } from 'react';
import { Card } from './context'; // Ensure this is the correct path

function Balance() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState('');

  return (
    <Card
      bgcolor="info"
      header="Balance"
      status={status}
      body={show ?
        <BalanceForm setShow={setShow} setStatus={setStatus} /> :
        <BalanceMsg setShow={setShow} setStatus={setStatus} />}
    />
  );
}

function BalanceMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button type="submit"
        className="btn btn-light"
        onClick={() => {
          props.setShow(true);
          props.setStatus('');
        }}>
        Check balance again
      </button>
    </>
  );
}

function BalanceForm(props) {
  const [email, setEmail] = useState('');
  const [balance, setBalance] = useState('');

  async function handle() {
    try {
      const response = await fetch(`https://aqueous-lowlands-43473-b4c6f58d4156.herokuapp.com/account/find/${email}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const userData = await response.json();
      setBalance(userData.balance);
      props.setStatus(`Balance: ${userData.balance}`);
      props.setShow(false);
      console.log('User data:', userData);
    } catch (err) {
      props.setStatus('Error: ' + err.message);
      console.log('Error:', err.message);
    }
  }

  return (
    <>
      Email<br />
      <input type="input"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={e => setEmail(e.currentTarget.value)} /><br />

      <button type="submit"
        className="btn btn-light"
        onClick={handle}>
        Check Balance
      </button>
    </>
  );
}

export default Balance;



