import React, { useState } from 'react'
import './App.css';
import ChoiceCard from "./components/ChoiceCard";
const choices = {
  scissors: {
    name: "scissors",
    url: "http://www.pngmart.com/files/1/Scissors-PNG-Pic.png"
  },
  paper: {
    name: "paper",
    url: "http://pngimagesfree.com/Paper/Thumb/blank-note-paper-free-clipa.png"
  },
  rock: {
    name: "rock",
    url:
      "https://opengameart.org/sites/default/files/forum-attachments/very%20simple%20rock_0.png"
  }
};

let result;

function App() {
  let [userC, setUserC] = useState({})
  let [computerC, setComputerC] = useState({})
  const [gameHistory, setGameHistory] = useState([]);
  const [previousWinner, setPreviousWinner] = useState(null);
  const onplay = (userChoice) => {
    setUserC(choices[userChoice])
    let itemArray = Object.keys(choices)
    let randomNum = Math.floor(Math.random() * itemArray.length)
    let itemName = itemArray[randomNum]
    setComputerC(choices[itemName])
    if (userC.name === "rock") {
      result = computerC.name === "scissors" ? "Victory!" : "Defeat!";
    }
    if (userC.name === "paper") {
      result = computerC.name === "rock" ? "Victory!" : "Defeat!";
    }
    if (userC.name === "scissors") {
      result = computerC.name === "paper" ? "Victory!" : "Defeat!";
    }

    if (userC.name === computerC.name) result = "Tie game!";
    console.log(userC.name, computerC.name, result)
    if (result === "Victory!") {
      setPreviousWinner("You");
    } else if (result === "Defeat!") {
      setPreviousWinner("Computer");
    } else {
      setPreviousWinner("Tie");
    }
    gameHistory.push(result);
    setGameHistory(gameHistory)
  }
  return (
    <div className="App">
      <ChoiceCard title="You" choice={userC} previousWinner={previousWinner} />
      <div className="format">
        <button className="btn btn-info btn-lg" onClick={() => onplay('rock')}>Rock</button>
        <button className="btn btn-info btn-lg" onClick={() => onplay('paper')}>Paper</button>
        <button className="btn btn-info btn-lg" onClick={() => onplay('scissors')}>Scissors</button>
        <div>
          <div>{result}</div>
        </div>
      </div>
      <ChoiceCard title="Computer" choice={computerC} previousWinner={previousWinner} />
      <div className="col-md-2 themed-grid-col historyFormat">
        <h3>History</h3>
        <div>
          {gameHistory.map(result => {
            return <div>{result}</div>;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
