import React, { createContext, useState, useContext } from "react";

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

  const SoundTiming = ({ e }) => {
    const soundTiming = e[e.length - 1];
    return soundTiming <= soundNumber ? (
      <div
        style={{
          position: "absolute",
          top: "30%",
          right: "23%",
          color: "#fff",
          backgroundColor: "grey",
          fontSize: "50px",
          width: "200px",
          height: "200px",
          borderRadius: "200px",
          borderWidth: "0px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: "60%",
        }}
      >
        {soundTiming}
      </div>
    ) : null;
  };

  return (
    <ToggleContext.Provider
      value={{ isToggled, toggle, soundNumber, sound, SoundTiming }}
    >
      {children}
    </ToggleContext.Provider>
  );
};

// Custom hook to use the toggle context
export const useToggle = () => {
  return useContext(ToggleContext);
};
