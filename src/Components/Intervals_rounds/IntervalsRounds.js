import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "../Intervals_tabata/intervals.css";
import { useToggle } from "../../Hooks/UseContext";
import CloseIcon from "@mui/icons-material/Close";

function IntervalsStopwatch({ ...props }) {
  const { toggle, isToggled, sound, soundNumber } = useToggle();
  return (
    <div className={`${isToggled ? " intervals_display" : "intervals"}`}>
      <button
        onClick={toggle}
        style={{
          color: "chocolate",
          position: "absolute",
          top: "20px",
          right: "20px",
          width: "40px",
          height: "40px",
          backgroundColor: "transparent",
        }}
      >
        <CloseIcon />
      </button>
      <div className="settings">
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <p>სავარჯიშო დრო</p>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
              id="seconds-outlined"
            >
              <TextField
                id="filled-number"
                label="წამი"
                type="number"
                variant="outlined"
                value={props.interval}
                onChange={props.updateInterval}
                min="1"
                disabled={props.running}
              />
            </Box>
          </div>
          <div>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
              id="seconds-outlined"
            >
              <TextField
                id="filled-number"
                label="რაუნდი"
                type="number"
                variant="outlined"
                value={props.rounds}
                onChange={props.handleRoundsChange}
                min="1"
                disabled={props.isActive}
              />
            </Box>
          </div>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
            id="seconds-outlined"
          >
            <TextField
              id="filled-number"
              label="მუსიკა"
              type="number"
              variant="outlined"
              value={soundNumber}
              onChange={sound}
              min="1"
              disabled={props.running}
            />
          </Box>
        </div>
      </div>
    </div>
  );
}

export default IntervalsStopwatch;
