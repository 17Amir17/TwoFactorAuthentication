import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './Components/Homepage';
import Login from './Components/Login';
import { TwoFactor } from './Components/TwoFactor';
import { UserContextProvider } from './Context/UserContext';
function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/twofactor" element={<TwoFactor />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
