import React, {useContext, useEffect, useState} from "react";
import search from "../../assets/search.png";
import feed from "../../assets/feed.png";
import market from "../../assets/market.png";
import videoPlayer from "../../assets/video-player.png";
import user from "../../assets/user.png";
import "./styles.css";

export default () => {
  const [currentNav, setCurrentNav] = useState()

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      const id = setTimeout(() => {
        const currentContainer = +localStorage.getItem('currentNav');
        setCurrentNav(currentContainer)
        clearTimeout(id)
      }, 100)

      if(e.key === 'ArrowRight') {
        localStorage.setItem('currentNav', 1)
      }
    })
  }, [])

  useEffect(() => {
    console.log(currentNav)
  }, [currentNav])

  return (
    <section id="nav-0">
      <ul className={`fatherList ${currentNav === 0 ? 'menu-open' : ''}`} id="menu">
        <li className={`item ${currentNav === 0 ? 'active' : ''}`} >
          <img src={search} alt="search" />
          <p className={`${currentNav === 0 ? 'show-label' : ''}`}> Busca</p>
        </li>
        <li className="item">
          <img src={market} alt="Inicio" />
          <p className={`${currentNav === 0 ? 'show-label' : ''}`}>Inicio</p>
        </li>
        <li className="item">
          <img src={feed} alt="Now" />
          <p className={`${currentNav === 0 ? 'show-label' : ''}`}>Agora na TV</p>
        </li>
        <li className="item">
          <img src={videoPlayer} alt="Categoria" />
          <p className={`${currentNav === 0 ? 'show-label' : ''}`}>Categorias</p>
        </li>
        <li className="item">
          <img src={user} alt="User" />
          <p className={`${currentNav === 0 ? 'show-label' : ''}`}>User</p>
        </li>
      </ul>
    </section>
  );
};
