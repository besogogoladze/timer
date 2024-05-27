import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import TimerIcon from "@mui/icons-material/Timer";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import ShutterSpeedIcon from "@mui/icons-material/ShutterSpeed";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import "./header.css";
import { useToggle } from "../../Hooks/UseContext";

function Header({ ...props }) {
  const { pathname } = useLocation();
  const { toggle } = useToggle();

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
          <MenuIcon style={{ fontSize: "2rem" }} />
        </button>
        <p>{pathname === "/" ? "Tabata" : capitalizeFirstLetter(pathname)}</p>
        <button onClick={toggle} style={{ color: "chocolate" }}>
          Intervals
        </button>
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
            margin: "0",
            padding: "20px 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <li
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <NavLink onClick={() => props.setBurgerMenu(false)} to="/">
              <Card
                sx={{
                  maxWidth: "100%",
                  width: "250px",
                  backgroundColor: "#003",
                  borderRadius: "2rem",
                }}
              >
                <CardActionArea>
                  <ShutterSpeedIcon
                    style={{
                      color: "chocolate",
                      width: "100%",
                      fontSize: "50px",
                      marginTop: "20px",
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="h4"
                      style={{ color: "#fff", textAlign: "center" }}
                    >
                      Tabata
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </NavLink>
          </li>
          <li
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <NavLink onClick={() => props.setBurgerMenu(false)} to="/rounds">
              <Card
                sx={{
                  maxWidth: "100%",
                  width: "250px",
                  backgroundColor: "#003",
                  borderRadius: "2rem",
                }}
              >
                <CardActionArea>
                  <AvTimerIcon
                    style={{
                      color: "chocolate",
                      width: "100%",
                      fontSize: "50px",
                      marginTop: "20px",
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="h4"
                      style={{ color: "#fff", textAlign: "center" }}
                    >
                      Rounds
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </NavLink>
          </li>
          <li
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <NavLink onClick={() => props.setBurgerMenu(false)} to="/stopwatch">
              <Card
                sx={{
                  maxWidth: "100%",
                  width: "250px",
                  backgroundColor: "#003",
                  borderRadius: "2rem",
                }}
              >
                <CardActionArea>
                  <TimerIcon
                    style={{
                      color: "chocolate",
                      width: "100%",
                      fontSize: "50px",
                      marginTop: "20px",
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="h4"
                      style={{ color: "#fff", textAlign: "center" }}
                    >
                      Stopwatch
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
