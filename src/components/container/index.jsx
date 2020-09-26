import React, { useContext, useState, useEffect, useRef } from "react";
import { AplicationContext } from "../../context/aplicationContext";

const Item = ({ filme }) => (
  <img className="img-filme" src={filme.show.image?.medium} alt="img" />
);

export default ({ id }) => {
  const {
    filmes,
    currentFilme,
    currentContainer,
    setCurrentFilme,
    getFilmes,
  } = useContext(AplicationContext);
  const UL = useRef(null);
  // const [lastItem, setLastItem] = useState(0);
  const containerID = id;
  let i = 0;

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (currentContainer === containerID && e.key === "ArrowLeft") {
        goToFilme("prev");
      }

      if (currentContainer === containerID && e.key === "ArrowRight") {
        goToFilme("next");
      }
    });
  }, [filmes]);

  // useEffect(() => {
  //   console.log(filmes, "FILMES");
  //   console.log(getFilmes(), "GET FILMES");
  //   console.log(UL.current, "UL");
  // }, [filmes]);

  const goToFilme = (move) => {
    const newPosition = move === "next" ? (i += 1) : (i -= 1);
    if (i >= 0) {
      let li = UL.current.getElementsByTagName("li")[newPosition];
      let filme = filmes.find((filme) => filme.show.id === +li.id);
      setCurrentFilme(filme);
      console.log(currentFilme, "New current Filme");
    }
  };

  return (
    <ul className="horizontal" id={`container-${id}`} ref={UL}>
      {filmes.map((el, i) => (
        <li
          key={el.show.id}
          className={`list ${true ? "active" : ""}`}
          id={el.show.id}
        >
          <Item filme={el} />
        </li>
      ))}
    </ul>
  );
};
