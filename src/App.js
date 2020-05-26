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
    let itemArray = Object.keys(choices)
    let randomNum = Math.floor(Math.random() * itemArray.length)
    let itemName = itemArray[randomNum]

    judgment(choices[userChoice],choices[itemName])
    
    setUserC(choices[userChoice])
    setComputerC(choices[itemName])
    gameHistory.push(result);
    setGameHistory(gameHistory)
  }

  const judgment = (user,computer) => {
    if (user.name === "rock") {
      result = computer.name === "scissors" ? "Victory!" : "Defeat!";
    }
    if (user.name === "paper") {
      result = computer.name === "rock" ? "Victory!" : "Defeat!";
    }
    if (user.name === "scissors") {
      result = computer.name === "paper" ? "Victory!" : "Defeat!";
    }

    if (user.name === computer.name) result = "Tie game!";
    console.log(user.name, computer.name, result)
    if (result === "Victory!") {
      setPreviousWinner("You");
    } else if (result === "Defeat!") {
      setPreviousWinner("Computer");
    } else {
      setPreviousWinner("Tie");
    }

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
