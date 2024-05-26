import React, { createContext, useState, useContext } from "react";

// Create a context
const ToggleContext = createContext();

// Create a provider component
export const ToggleProvider = ({ children }) => {
  const [isToggled, setIsToggled] = useState(false);
  const [soundNumber, setSoundNumber] = useState(
    localStorage.getItem("sound") === null ? 3 : localStorage.getItem("sound")
  );
  // const [startTime, setStartTime] = useState(3);
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
    const soundTiming = props.e.slice(-2);
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
          justifyContent: "center",
          alignItems: "center",
          opacity: "60%",
          display: props.isActive,
        }}
      >
        {soundTiming[soundTiming.length - 1]}
      </div>
    ) : null;
  };

  // const StartFunction = () => {
  //   for (let i = 3; i >= 0; i--) {
  //     setStartTime(i);
  //   }
  //   return (
  //     <div
  //       style={{
  //         position: "absolute",
  //         top: "30%",
  //         right: "23%",
  //         color: "#fff",
  //         backgroundColor: "grey",
  //         fontSize: "50px",
  //         width: "200px",
  //         height: "200px",
  //         borderRadius: "200px",
  //         borderWidth: "0px",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         opacity: "60%",
  //         display: `${startTime > 0 ? "flex" : "none"}`,
  //       }}
  //     >
  //       {startTime}
  //     </div>
  //   );
  // };

  return (
    <ToggleContext.Provider
      value={{
        isToggled,
        toggle,
        soundNumber,
        sound,
        SoundTiming,
        // StartFunction,
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
