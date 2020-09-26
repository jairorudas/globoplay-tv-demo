import React from "react";
import AplicationProvider from "./context/aplicationContext";
import Menu from "./components/menu";
import Keyboard from "./components/keyboard";

import Container from "./components/container";
import "./App.css";

function App() {
  return (
    <AplicationProvider>
      <Menu />
      <section className="">
        <Keyboard />
        <div className="App" style={{ overflow: "hidden" }}>
          <Container id={0}></Container>
          <Container id={1}></Container>
        </div>
      </section>
    </AplicationProvider>
  );
}

export default App;
