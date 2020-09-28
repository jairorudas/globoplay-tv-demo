import React, { useState, createContext, useEffect } from "react";

export const AplicationContext = createContext();

const AplicationProvider = ({ children }) => {
  const [currentFilme, setCurrentFilme] = useState(null);
  const [filmes, setFilmes] = useState([]);
  const [findFilme, setFindFilme] = useState('')

  useEffect(() => {
    fetch("http://api.tvmaze.com/search/shows?q=girls").then(async (res) => {
      const filmes = await res.json();
      setFilmes(filmes);
    });
  }, []);

  return (
    <AplicationContext.Provider
      value={{
        filmes,
        findFilme,
        currentFilme,
        setCurrentFilme,
        setFindFilme,
      }}
    >
      {children}
    </AplicationContext.Provider>
  );
};

export default AplicationProvider;
