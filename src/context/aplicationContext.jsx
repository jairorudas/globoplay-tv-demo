import React, { useState, createContext, useEffect } from "react";

export const AplicationContext = createContext();

const AplicationProvider = ({ children }) => {
  const [currentFilme, setCurrentFilme] = useState(null);
  const [filmes, setFilmes] = useState([]);
  const [nameFilme, setNameFilme] = useState('')

  useEffect(() => {
    fetch("http://api.tvmaze.com/search/shows?q=girls").then(async (res) => {
      const filmes = await res.json();
      console.log(filmes)
      setFilmes(filmes);
    });
  }, []);

  const getMainFilmes = () => {
    if (nameFilme) {
     filmes.filter( filme => {
      const name = filme.show.name
      
      if((name.toLowerCase()).includes(nameFilme)){
        return filme
      }
      
     })
    } else {
      return filmes
    }
  }

  useEffect(() => {
    console.log(nameFilme, 'Name Filme')
  }, [nameFilme])

  return (
    <AplicationContext.Provider
      value={{
        filmes,
        nameFilme,
        currentFilme,
        setCurrentFilme,
        setNameFilme,
        getMainFilmes
      }}
    >
      {children}
    </AplicationContext.Provider>
  );
};

export default AplicationProvider;
