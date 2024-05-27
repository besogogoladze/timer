import React, { createContext, useState, useContext, useEffect } from "react";
import "./useContext.css";

// Create a context
const ToggleContext = createContext();

// Create a provider component
export const ToggleProvider = ({ children }) => {
  const [isToggled, setIsToggled] = useState(false);
  const [soundNumber, setSoundNumber] = useState(
    localStorage.getItem("sound") === null ? 3 : localStorage.getItem("sound")
  );
  let min = 0;
  let max = 10;

  const toggle = () => {
    setIsToggled((prevState) => !prevState);
  };

  const sound = (e) => {
    setSoundNumber(Math.max(min, Math.min(max, Number(e.target.value))));
    localStorage.setItem("sound", Number(e.target.value));
  };

  const SoundTiming = ({ ...props }) => {
    let soundTiming = props.e.slice(-2);
    if (props.e.slice(0, 2) > 0) {
      soundTiming = props.e.slice(2) + props.e.slice(-2);
    }
    return Number(soundTiming) <= Number(soundNumber) ? (
      <div
        className="startFunction"
        style={{
          position: "absolute",
          top: "30%",
          right: "23%",
          color: "#fff",
          backgroundColor: "grey",
          width: "200px",
          height: "200px",
          borderRadius: "200px",
          borderWidth: "0px",
          justifyContent: "center",
          alignItems: "center",
          display: props.isActive,
        }}
      >
        {soundTiming[soundTiming.length - 1]}
      </div>
    ) : null;
  };

  const StartFunction = ({ ...props }) => {
    const [count, setCount] = useState(4);
    useEffect(() => {
      if (props.startFunction === true) {
        const intervalId = setInterval(() => {
          setCount((prevCount) => {
            if (prevCount >= 0) {
              return prevCount - 1;
            } else {
              clearInterval(intervalId);
              return 0;
            }
          });
        }, 1000); // Decrement the count every 1000ms (1 second)
        // Cleanup function to clear the interval
        if (count > 0) {
          props.playAudio();
        }
        if (count === 0) {
          props.playAirHorn();
        }
        return () => clearInterval(intervalId);
      }
      if (props.startFunction === false) {
        setCount(3);
      }
    }, [count, props, props.startFunction]);

    return (
      <div
        className="startFunction"
        style={{
          position: "absolute",
          top: "30%",
          right: "24%",
          color: `${count === 0 ? "#00e81b" : "#fff"}`,
          backgroundColor: `${count === 0 ? "#006128" : "grey"}`,
          width: "200px",
          height: "200px",
          borderRadius: "200px",
          borderWidth: "0px",
          justifyContent: "center",
          alignItems: "center",
          display: `${props.startFunction ? "flex" : "none"}`,
        }}
      >
        {count === 0 ? "Go!" : count}
      </div>
    );
  };

  return (
    <ToggleContext.Provider
      value={{
        isToggled,
        toggle,
        soundNumber,
        sound,
        SoundTiming,
        StartFunction,
      }}
    >
      {children}
    </ToggleContext.Provider>
  );
};

// Custom hook to use the toggle context
export const useToggle = () => {
  return useContext(ToggleContext);
};
