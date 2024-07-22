import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './navbar';
import Home from './home';
import CreateAccount from './createaccount';
import Login from './login';
import Deposit from './deposit';
import Withdraw from './withdraw';
import Balance from './balance';
import AllData from './alldata';
import { UserContext } from './context';

function Spa() {
  return (
    <Router>
      <div>
        <NavBar />
        <UserContext.Provider value={{ users: [{ name: 'abel', email: 'abel@mit.edu', password: 'secret', balance: 100 }] }}>
          <div className="container" style={{ padding: "20px" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/CreateAccount/" element={<CreateAccount />} />
              <Route path="/login/" element={<Login />} />
              <Route path="/deposit/" element={<Deposit />} />
              <Route path="/withdraw/" element={<Withdraw />} />
              <Route path="/balance/" element={<Balance />} />
              <Route path="/alldata/" element={<AllData />} />
            </Routes>
          </div>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default Spa;
