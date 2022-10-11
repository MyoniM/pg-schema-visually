import ToggleSwitch from './toggleSwitch';

import { CodeContext } from '../App';

// styles
import classes from './navbar.module.css';
import { useContext } from 'react';

export default function Navbar() {
  const { viewData, setViewData } = useContext(CodeContext);

  const setDarkSide = (value: boolean) => {
    document.body.style.backgroundColor = value ? "#44444c" : "#fbfbfb"
    setViewData((viewData: any) => ({ ...viewData, darkSide: value }));
  };

  return (
    <div className={classes.wrapper}>
      <a href="/" className={classes.logo}>
        <img src="./pg-ic.svg" alt="pg-logo" />
        <h1>Schema Visually</h1>
      </a>
      <div className={classes.wrapper}>
        <div className="btn-wrapper">
          Dark Side
          <ToggleSwitch checked={viewData['darkSide'] ?? false} onChange={setDarkSide} />
        </div>
        <div style={{ width: '20px' }}></div>
        <a href="/help" className="btn-wrapper">
          ? Help
        </a>
      </div>
    </div>
  );
}
