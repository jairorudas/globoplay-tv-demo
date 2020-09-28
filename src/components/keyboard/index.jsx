import React, { useState, useEffect, useContext } from "react";
import { AplicationContext } from "../../context/aplicationContext";
import paintFocus, {removeFocus} from '../../utils/paintElement'

import "./styles.css";

const Keyboard = () => {
  const [search, setSearch]  = useState([])
  const [isSpaceSelected, setSpaceSelected ] = useState(false)
  const [isDeleteSelected, setDeleteSelected ] = useState(false)
  const [currentLetter, setCurrentLetter] = useState({x: 0, y: 0})
  const {
    setFindFilme
  } = useContext(AplicationContext);
  const ALFANUMBER = [
    "A",
    "B",
    "C",
    "D",
    "E",
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
  let counterX = 0
  let counterY = 0
  let deleted = false
  let space = false

  const MATRIZ = [
    ['A','B','C','D','E','F'],
    ['G','H','I','J','K','L'],
    ['M','N','O','P','Q','R'],
    ['S','T','U','V','W','X'],
    ['Y','Z','0','1','2','3'],
    ['4','5','6','7','8','9']
  ]

  const leftEdge = ['A', 'G', 'M', 'S', 'Y', '4']
  const RightEdge = ['F', 'L', 'R', 'X', '3', '9']
  const topEdge   = ['A', 'B', 'C', 'D', 'E', 'F']
  const bottomEdge = ['4', '5', '6', '7', '8', '9']

  const pressLetter = (operation, letter) => {

    if(space){
      setSearch(search => [...search, ' ' ])
      return
    }
    deleted ? 
    setSearch(search => search.slice(0, search.length - 1)) :
    setSearch(search => [...search, letter])

  }

  useEffect(() => {
    paintFocus(MATRIZ[currentLetter.x][currentLetter.y])
  }, [currentLetter])

  useEffect(() => {
    deleted = isDeleteSelected
    space = isSpaceSelected
  }, [isDeleteSelected, isSpaceSelected])


  const changeKeyboardFocus = (coordinate, side) => {
    removeFocus(MATRIZ[counterX][counterY], '#000')

    if(coordinate === 'y' && side === 'right') {
      setCurrentLetter({x: counterX, y: ++counterY})
    }
    if(coordinate === 'y' && side === 'left'){
      setCurrentLetter({x: counterX, y: --counterY})
    }
    if(coordinate === 'x' && side === 'down'){
      setCurrentLetter({x: ++counterX,y: counterY })
    }
    if(coordinate === 'x' && side === 'up'){
      setCurrentLetter({x: --counterX, y: counterY} )
    }
  }

  const verifyMove = (changeContainerFocus, side) => {
    if(changeContainerFocus && side === 'left') {
      localStorage.setItem('currentNav', 0)
      removeFocus(MATRIZ[counterX][counterY], '#000')
      return
    }
    if(changeContainerFocus && side === 'right') {
      removeFocus(MATRIZ[counterX][counterY], '#000')
      localStorage.setItem('currentNav', 2)
      return
    }
    if(changeContainerFocus && side === 'up'){
      return
    }
    if(changeContainerFocus && side === 'down') {
      removeFocus(MATRIZ[counterX][counterY], '#000')
      if(MATRIZ[counterX][counterY] <= 6) {
        space = true
        setSpaceSelected(space)
      } else {
        deleted = true
        setDeleteSelected(deleted)
      }
      return
    }

    if(space) {
      space = false
      setSpaceSelected(space)
    }

    if (deleted){
      deleted = false
      setDeleteSelected(deleted)
    }

    switch (side) {
      case 'left':
        changeKeyboardFocus('y', side)
        break;
      case 'right':
        changeKeyboardFocus('y', side)
        break
      case 'down':
        changeKeyboardFocus('x', side)
        break
      case 'up':
        changeKeyboardFocus('x', side)
        break
      default:
        break;
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if(+(localStorage.getItem('currentNav')) === 1){
        let changeContainerFocus
        const currentFoco = MATRIZ[counterX][counterY]
        switch (e.key) {
          case 'Enter':
            pressLetter('add', currentFoco)
          break;
          case 'ArrowLeft':
            changeContainerFocus = (leftEdge.includes(currentFoco))
            verifyMove(changeContainerFocus, 'left')
            break;
          case 'ArrowRight':
            changeContainerFocus = (RightEdge.includes(currentFoco))
            verifyMove(changeContainerFocus, 'right')     
            break;
          case 'ArrowDown':
            changeContainerFocus = (bottomEdge.includes(currentFoco))
            verifyMove(changeContainerFocus, 'down')
            break;
          case 'ArrowUp':
            changeContainerFocus = (topEdge.includes(currentFoco))
            verifyMove(changeContainerFocus, 'up')
            break;
          default:
            break;
        }
        
      }
    }, this)
  }, [])

  useEffect(() => {
    localStorage.setItem('currentNav', 1)
  }, [])

  useEffect(() => {
    const busca = (search.length > 0 ? search.join('') : '').toLowerCase()
    setFindFilme(busca)
    console.log(busca);
  }, [search])

  return (
    <section className="wraper-keyboard" id="nav-1">
      <h3 className="search">{ search.length > 0 ? search.join('') : 'Search' }  </h3>
      <ul className="keyboard">
        {ALFANUMBER.map((item, i) => (
          <li key={i} id={item}>{item}</li>
        ))}
        <div className="large-buttons">
          <li id="space" className={`${isSpaceSelected ? 'activeButton' : '' } `} >Espaço</li>
          <li id="delete" className={`${isDeleteSelected ? 'activeButton' : '' } `}>Apagar</li>
        </div>
      </ul>
    </section>
  );
};

export default Keyboard;
