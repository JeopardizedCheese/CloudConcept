// src/pages/Dashboard.js
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <>
      <h1>Hey this is a dashboard. Im not styled yet btw</h1>
      <Link
      to="/"
      className='text-2xl font-bold underline text-red-600'
      >
        Return to home
      </Link>
    </>
  )
};

export default Dashboard;