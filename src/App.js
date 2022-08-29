import React, {useState, useEffect} from "react"
import {nanoid} from "nanoid"
import Dice from "./Components/dice.js"

function App() {
  const [difficulty, setDifficulty] = useState(10)  //state to determine the amount of dices in a game. can be changed with a select
  const [dices, setDices] = useState(createDices())
  const [isWon, setIsWon] = useState(false) //state to check if game is won
  const [moves, setMoves] = useState(0) //state to check number of moves taken to win a game

  function createDices(){
    const diceArray = []
    for(let i=0; i < difficulty; i++){
      console.log("dice created")
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
    //roll new dices if dice is not held
  }

  const playDices = dices.map((dice) =>{
    return <Dice key={dice.id} value={dice.value}/>
  })

  return (
    <div className="App">
      <div className="game">
        <h1>Tenzies</h1>
        <div className="container">
          {playDices}
        </div>
      <button className="btn" onClick={buttonHandler}>hi</button>
      </div>
    </div>
  );
}

export default App;
