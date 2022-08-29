import React, {useState, useEffect} from "react"
import {nanoid} from "nanoid"
import Dice from "./Components/dice.js"

function App() {
  const [difficulty, setDifficulty] = useState(10)  //state to determine the amount of dices in a game. can be changed with a select
  const [dices, setDices] = useState(createDices())
  const [isWon, setIsWon] = useState(false) //state to check if game is won
  const [moves, setMoves] = useState(0) //state to check number of moves taken to win a game
  const [bestScore, setBestSCore] = useState(localStorage.getItem("best"))

  useEffect(() => {
    checkWin()
  }, [dices])

  function createDices(){
    const diceArray = []
    for(let i=0; i < difficulty; i++){
      diceArray[i] = createDice()
    }
    return diceArray
  }

  function createDice(){
    return {
      value: Math.floor(Math.random()*6+1),
      isHeld: false,
      id: nanoid()
    }
  }

  function buttonHandler(){
    setMoves(prevMoves => prevMoves+1)
    if(isWon){
      setMoves(0)
      setDices(createDices())
      setIsWon(false)
    }
    else setDices(prevDices => {
      const newDices = prevDices.map((dice)=>{
        return !dice.isHeld ? createDice() : dice
      })
      return newDices
    })
  }

  function toggleIsHeld(id){
    setDices(prevDices => {
      const newDices = prevDices.map((dice)=>{
        return dice.id === id ? {...dice, isHeld: !dice.isHeld} : dice
      })
      return newDices
    })
  }

  function checkWin(){
    const allHeld = dices.every(dice => dice.isHeld)
    const firstValue = dices[0].value
    const allSameValue = dices.every(dice => dice.value === firstValue)
    if (allHeld && allSameValue)
      setIsWon(true)
  }

  function saveGameStats(){
    setBestSCore(moves)
    localStorage.setItem("best", moves)
  }

  const playDices = dices.map(dice =>{
    return <Dice key={dice.id} value={dice.value} isHeld={dice.isHeld} id={dice.id} toggleIsHeld={toggleIsHeld}/>
  })

  return (
    <div className="App">
      <div className="game">
        <h1>Tenzies</h1>
        <h3>Best Score: {bestScore}</h3>
        <h3>Current moves: {moves}</h3>
        <div className="container">
          {playDices}
        </div>
      <button className="btn" onClick={buttonHandler}>{isWon ? "New Game" : "Reroll"}</button>
      {isWon && <button className="btn" onClick={saveGameStats}>Save Game</button>}
      </div>
    </div>
  );
}

export default App;