import React from 'react';
import Header from '../components/Layout/Header';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <Header />
      <h2>Current List of accessible URLs of <Link to="/">Auth System</Link>:</h2>
      <p>- <Link className="text-blue-700" to="/auth">Login Page</Link></p>
      <p>- <Link className="text-blue-700" to="/signup">Signup Page</Link></p>
    </div>
  )
}

export default HomePage