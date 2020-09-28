import React, { useContext, useEffect, useState } from "react";
import { AplicationContext } from "../../context/aplicationContext";
import './styles.css'

const Item = ({ filme }) => (
  <img className="img-filme" src={filme.show.image?.medium} alt="img" />
);

export default ({ id }) => {
  const {
    filmes,
  } = useContext(AplicationContext);

  const [currentNav, setCurrentNav] = useState()
  let index = 0;

  const animateCarousel = (side) => {
    let NEW_TRANSLATE = null
    const NODE = document.getElementById(`nav-${id}`);
    const LIST = NODE.getElementsByTagName("li");
    const DATA_TRANSFORM = LIST[0].style.transform
    const value =  (+DATA_TRANSFORM?.slice(DATA_TRANSFORM.length-6, DATA_TRANSFORM.length - 3)) || 90   
    
    if(side === 'prev') {
      NEW_TRANSLATE = value - 110
      
    for (let item of LIST) {
      item.style.transform = `translate(calc(210px - ${NEW_TRANSLATE}%))`;
    }
  }else {
      NEW_TRANSLATE = value + 110
      for (let item of LIST) {
        item.style.transform = `translate(calc(210px - ${NEW_TRANSLATE}%))`;
      }
    }
  }
  
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      console.log(localStorage.getItem('currentNav'), 'current nav')
      let currentContainer = +(localStorage.getItem('currentNav'))
      setCurrentNav(currentContainer)
      if(currentContainer === id) {
        if (e.key === "ArrowLeft") {
          goToFilme("prev");
        }
  
        if (e.key === "ArrowRight") {
          goToFilme("next");
        }
        
        if (e.key === "ArrowDown") {
          console.log('down');
        }
      }
    });
  },[]);

 

 
  // let filme = filmes.find((filme) => filme.show.id === +li.id);

  const goToFilme = (move) => {
    if(move === 'next') {
      index +=  1
      animateCarousel(move)
    } else {
      if(index === 0) {
        localStorage.setItem('currentNav', 1)
      } else {
        index -= 1
        animateCarousel(move)
      }
    }
  };
  
  return (<section style={{position: "relative"}}>
    <ul className="horizontal" id={`nav-${id}`}>
      {filmes.map((el, i) => (
        <li
          key={el.show.id}
          className={`list`}
          id={el.show.id}
        >
          <Item filme={el} />
        </li>
      ))}
    </ul>
      <div className={` ${currentNav === id ? 'selection' : ''} `}></div>
    </section>
  );
};
