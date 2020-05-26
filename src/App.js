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
let className;

function App() {
  let [userC, setUserC] = useState({})
  let [computerC, setComputerC] = useState({})
  const [gameHistory, setGameHistory] = useState([]);
  const [flawless, setFlawless] = useState(null);
  const [previousWinner, setPreviousWinner] = useState(null);
  const [playerName, setPlayerName] = useState("Player Name");
  const submitName = (playerName) => {
    setPlayerName(document.getElementById("nameBox").value)
  }
  const onplay = (userChoice) => {
    let itemArray = Object.keys(choices)
    let randomNum = Math.floor(Math.random() * itemArray.length)
    let itemName = itemArray[randomNum]

    judgment(choices[userChoice], choices[itemName])

    setUserC(choices[userChoice])
    setComputerC(choices[itemName])
    gameHistory.push(result);
    setGameHistory(gameHistory)
  }

  const judgment = (user, computer) => {
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
    if (result === "Victory!") {
      setPreviousWinner("You");
      className = "victory";
    } else if (result === "Defeat!") {
      setPreviousWinner("Computer");
      className = "defeat";
    } else {
      setPreviousWinner("Tie");
      className = "tie";
    }

    if (gameHistory[gameHistory.length-1] === "Victory!" && gameHistory[gameHistory.length-2] === "Victory!" && gameHistory[gameHistory.length-3] === "Victory!") {
     setFlawless("Flawless Victory!")
    } else if (gameHistory[gameHistory.length-1] === "Defeat!" && gameHistory[gameHistory.length-2] === "Defeat!" && gameHistory[gameHistory.length-3] === "Defeat!") {
      setFlawless("Flawless Victory!")
    }

  }
  return (
    <div className="App">
      <ChoiceCard title="You" choice={userC} previousWinner={previousWinner} />
      <div className="format">
        <div>
          <h4>{flawless}</h4>
        </div>
        <button className="btn btn-info btn-lg" onClick={() => onplay('rock')}>Rock</button>
        <button className="btn btn-info btn-lg" onClick={() => onplay('paper')}>Paper</button>
        <button className="btn btn-info btn-lg" onClick={() => onplay('scissors')}>Scissors</button>
        <div>
          <h2 className={`${className}`}>{result}</h2>
        </div>
      </div>
      <ChoiceCard title="Computer" choice={computerC} previousWinner={previousWinner} />
      <div className="col-md-3 themed-grid-col">
        <input type="text" id="nameBox" placeholder="Enter name here..."></input>
        <button className="btn btn-info" onClick={() => submitName()}>Submit</button>
        <div class="historyFormat">
          <h3>History</h3>
          <div>
            {gameHistory.map(result => {
              return <div>{playerName}: {result}</div>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
