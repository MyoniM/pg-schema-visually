import React from 'react';

// styles
import classes from './navbar.module.css';

export default function Navbar() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.logo}>
        <img src="./pg-ic.svg" alt="pg-logo" />
        <h1>Schema Visually</h1>
      </div>
      <button className="btn">Export to PDF</button>
    </div>
  );
}
