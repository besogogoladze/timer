import { useState } from "react";
import "./App.css";
import Header from "./Components/Navigation/Header";
import Router from "./Router/Router";

function App() {
  const [burgerMenu, setBurgerMenu] = useState(false);
  const menuOpener = () => {
    setBurgerMenu(true);
  };
  return (
    <div style={{ backgroundColor: "#000" }}>
      <Header
        setBurgerMenu={setBurgerMenu}
        burgerMenu={burgerMenu}
        menuOpener={menuOpener}
      />
      <div
        className={`${burgerMenu ? "burgerHiddenDiv" : null}`}
        style={{ height: "calc(100vh - 155px)", paddingTop: "100px" }}
      >
        <Router />
      </div>
    </div>
  );
}

export default App;
