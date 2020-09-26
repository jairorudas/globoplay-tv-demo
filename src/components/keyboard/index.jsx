import React, { useRef } from "react";
import Container from "../container";
import "./styles.css";

const Keyboard = () => {
  const UL = useRef();
  const ALFANUMBER = [
    "A",
    "B",
    "C",
    "D",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];
  return (
    <Container>
      <ul ref={UL} className="keyboard">
        {ALFANUMBER.map((item, i) => (
          <li key={Math.random}>{item}</li>
        ))}
      </ul>
    </Container>
  );
};

export default Keyboard;
