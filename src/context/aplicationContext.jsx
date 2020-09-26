import React, { useState, createContext, useEffect } from "react";

export const AplicationContext = createContext();

const AplicationProvider = ({ children }) => {
  const [currentContainer, setCurrentContainer] = useState(0);
  const [currentFilme, setCurrentFilme] = useState(null);
  // const [totalVerticalItems, setTotalVerticalItems] = useState();
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    focusCurrentFilme();
    console.log(currentFilme, "filme");
  }, [currentFilme]);

  const focusCurrentFilme = () => {
    if (currentFilme?.show?.id) {
      let node = document.getElementById(currentFilme.show.id);
      node.style.borderColor = "#ff0000cc";
      node.style.borderWidth = "2px";
      node.style.borderStyle = "solid";
      node.focus();
    }
  };

  const getFilmes = () => filmes;

  useEffect(() => {
    fetch("http://api.tvmaze.com/search/shows?q=girls").then(async (res) => {
      const filmes = await res.json();
      setFilmes(filmes);
      setCurrentFilme(filmes[0]);
    });
  }, []);

  return (
    <AplicationContext.Provider
      value={{
        filmes,
        currentFilme,
        currentContainer,
        getFilmes,
        setCurrentFilme,
        setCurrentContainer,
      }}
    >
      {children}
    </AplicationContext.Provider>
  );
};

export default AplicationProvider;
