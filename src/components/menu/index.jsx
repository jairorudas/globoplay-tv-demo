import React from "react";
import search from "../../assets/search.png";
import feed from "../../assets/feed.png";
import market from "../../assets/market.png";
import videoPlayer from "../../assets/video-player.png";
import user from "../../assets/user.png";
import "./styles.css";

export default () => {
  return (
    <ul className="fatherList">
      <li className="item">
        <img src={search} alt="search" />
      </li>
      <li className="item">
        <img src={feed} alt="search" />
      </li>
      <li className="item">
        <img src={market} alt="search" />
      </li>
      <li className="item">
        <img src={videoPlayer} alt="search" />
      </li>
      <li className="item">
        <img src={user} alt="search" />
      </li>
    </ul>
  );
};
