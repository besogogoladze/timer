import React, { createContext, useState, useContext } from "react";

// Create a context
const ToggleContext = createContext();

// Create a provider component
export const ToggleProvider = ({ children }) => {
  const [isToggled, setIsToggled] = useState(false);
  const [soundNumber, setSoundNumber] = useState(
    localStorage.getItem("sound") === null ? 3 : localStorage.getItem("sound")
  );
  let min = 1;
  let max = 10;

  const toggle = () => {
    setIsToggled((prevState) => !prevState);
  };

  const sound = (e) => {
    setSoundNumber(Math.max(min, Math.min(max, Number(e.target.value))));
    localStorage.setItem("sound", Number(e.target.value));
  };

  return (
    <ToggleContext.Provider value={{ isToggled, toggle, soundNumber, sound }}>
      {children}
    </ToggleContext.Provider>
  );
};

// Custom hook to use the toggle context
export const useToggle = () => {
  return useContext(ToggleContext);
};
