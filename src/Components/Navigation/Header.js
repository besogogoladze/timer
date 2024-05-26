import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import TimerIcon from "@mui/icons-material/Timer";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import ShutterSpeedIcon from "@mui/icons-material/ShutterSpeed";
import "./header.css";

function Header({ ...props }) {
  const { pathname } = useLocation();

  function capitalizeFirstLetter(string) {
    let newString = string.slice(1);
    return newString[0].toUpperCase() + newString.slice(1);
  }
  return (
    <header>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0px 20px",
          paddingTop: "20px",
          position: "relative",
        }}
        className={`${
          props.burgerMenu ? "burgerHiddenDiv" : null
        } burgerHeaderDiv`}
      >
        <button onClick={props.menuOpener}>
          <MenuIcon />
        </button>
        <p>{pathname === "/" ? "Tabata" : capitalizeFirstLetter(pathname)}</p>
        <button style={{ color: "chocolate" }}>Intervals</button>
      </div>
      <nav
        className={`${props.burgerMenu ? "burgerNav" : null} burgerHiddenNav`}
        style={{
          width: "100%",
          backgroundColor: "#000",
          margin: "0",
          padding: "50px 0px 0px 0px",
          height: "calc(100vh - 50px)",
        }}
      >
        <ul
          style={{
            width: "100%",
            backgroundColor: "grey",
            margin: "0",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <li
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              paddingTop: "20px",
            }}
          >
            <div style={{ margin: "0px 10px" }}>
              <ShutterSpeedIcon style={{ color: "chocolate" }} />
            </div>
            <NavLink
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                paddingRight: "10px",
              }}
              onClick={() => props.setBurgerMenu(false)}
              to="/"
            >
              <p>Tabata</p>
              <KeyboardArrowRightIcon style={{ color: "#424242" }} />
            </NavLink>
          </li>
          <li
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <div style={{ margin: "0px 10px" }}>
              <AvTimerIcon style={{ color: "chocolate" }} />
            </div>
            <NavLink
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                paddingRight: "10px",
              }}
              onClick={() => props.setBurgerMenu(false)}
              to="/rounds"
            >
              <p>Rounds</p>
              <KeyboardArrowRightIcon style={{ color: "#424242" }} />
            </NavLink>
          </li>
          <li
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <div style={{ margin: "0px 10px" }}>
              <TimerIcon style={{ color: "chocolate" }} />
            </div>
            <NavLink
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                paddingRight: "10px",
              }}
              onClick={() => props.setBurgerMenu(false)}
              to="/stopwatch"
            >
              <p>Stopwatch</p>
              <KeyboardArrowRightIcon style={{ color: "#424242" }} />
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
