import React from 'react';
import { Outlet, Link } from "react-router-dom";

const Root = () => <div className="App">
      <header className='App-header'>
        <Link className='App-link' to="/">Home</Link>
        <Link className='App-link' to="/register">Register</Link>
      </header>
      <div className='App-page'>
      <Outlet />
      </div>
    </div>


export const rootLoader = () => 'done'; 

export default Root;