import React, { useState, useEffect, useRef } from "react";

const wordPairs = [
  ["Apple", "Pear"],
  ["Sun", "Star"],
  ["Ocean", "Sea"],
  ["Laptop", "Tablet"],
  ["Doctor", "Nurse"],
  ["Pencil", "Pen"],
  ["Soccer", "Football"],
  ["Shark", "Whale"],
];

const Game = () => {
  const [players, setPlayers] = useState([]);
  const [initialPlayers, setInitialPlayers] = useState([]); // Store initial players
  const [name, setName] = useState("");
  const [started, setStarted] = useState(false);
  const [assignments, setAssignments] = useState({});
  const [queue, setQueue] = useState([]);
  const [currentViewer, setCurrentViewer] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [allRevealed, setAllRevealed] = useState(false);
  const [eliminationPhase, setEliminationPhase] = useState(false);
  const [eliminatedPlayer, setEliminatedPlayer] = useState(null);
  const [eliminatedRole, setEliminatedRole] = useState("");
  const [finalGuess, setFinalGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");

  // Refs for autoFocus
  const nameInputRef = useRef(null);
  const finalGuessInputRef = useRef(null);

  // AutoFocus on inputs
  useEffect(() => {
    if (nameInputRef.current) nameInputRef.current.focus();
  }, [started, gameOver]);

  useEffect(() => {
    if (finalGuessInputRef.current) finalGuessInputRef.current.focus();
  }, [eliminatedPlayer]);

  // Auto-capitalize the first letter of player names
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const addPlayer = (e) => {
    if (e) e.preventDefault(); // Prevent form submission
    if (name.trim() && !players.includes(name)) {
      const capitalizedName = capitalizeFirstLetter(name.trim());
      setPlayers([...players, capitalizedName]);
      setName("");
    }
  };

  const removePlayer = (player) => {
    setPlayers(players.filter((p) => p !== player));
  };

  const assignRolesAndQueue = (playerList) => {
    const pair = wordPairs[Math.floor(Math.random() * wordPairs.length)];
    const civilianWord = pair[0];
    const undercoverWord = pair[1];

    // Assign roles
    let roles = Array(playerList.length).fill("Civilian");
    const mrWhiteIndex = Math.floor(Math.random() * playerList.length);
    roles[mrWhiteIndex] = "Mr. White";

    let undercoverIndex;
    do {
      undercoverIndex = Math.floor(Math.random() * playerList.length);
    } while (undercoverIndex === mrWhiteIndex);
    roles[undercoverIndex] = "Undercover";

    // Create assignments
    const newAssignments = {};
    playerList.forEach((player, index) => {
      newAssignments[player] = {
        word: roles[index] === "Civilian" ? civilianWord : roles[index] === "Undercover" ? undercoverWord : "????",
        role: roles[index],
      };
    });

    // Set the initial revealing queue to match the players list
    setQueue([...playerList]);

    setAssignments(newAssignments);
    setStarted(true);
    setCurrentViewer(playerList[0]); // Start with the first player in the list
  };

  const startGame = () => {
    if (players.length < 3) return alert("Need at least 3 players!");
    setInitialPlayers([...players]); // Save initial players
    assignRolesAndQueue(players);
  };

  const revealWord = () => {
    setRevealed(true);
  };

  const hideWord = () => {
    setRevealed(false);
    const currentIndex = queue.indexOf(currentViewer);
    if (currentIndex < queue.length - 1) {
      setCurrentViewer(queue[currentIndex + 1]); // Move to the next player
    } else {
      // All players have revealed their roles
      setCurrentViewer(null);
      setAllRevealed(true);

      // Randomize the queue for the elimination phase, ensuring Mr. White is not first
      let shuffledQueue = [...players].sort(() => Math.random() - 0.5);
      while (assignments[shuffledQueue[0]].role === "Mr. White") {
        shuffledQueue = [...players].sort(() => Math.random() - 0.5);
      }
      setQueue(shuffledQueue);
    }
  };

  const handleElimination = (player) => {
    // Set eliminated player and their role
    setEliminatedPlayer(player);
    setEliminatedRole(assignments[player].role);

    // Remove the player from the list
    const updatedPlayers = players.filter((p) => p !== player);
    setPlayers(updatedPlayers);

    // Remove the player from the queue
    const updatedQueue = queue.filter((p) => p !== player);
    setQueue(updatedQueue);

    // If Mr. White is eliminated, pause for their guess
    if (assignments[player].role === "Mr. White") {
      setFinalGuess("");
      setEliminationPhase(false); // Pause elimination phase for Mr. White's guess
    } else {
      // Update the queue and check if the game is over
      updateQueue(updatedPlayers);
      checkGameOver(updatedPlayers);
    }
  };

  const updateQueue = (updatedPlayers) => {
    // Shuffle the remaining players, ensuring Mr. White is not first
    let shuffledQueue = [...updatedPlayers].sort(() => Math.random() - 0.5);
    while (assignments[shuffledQueue[0]].role === "Mr. White") {
      shuffledQueue = [...updatedPlayers].sort(() => Math.random() - 0.5);
    }
    setQueue(shuffledQueue);
  };

  const checkGameOver = (updatedPlayers) => {
    const civiliansLeft = updatedPlayers.filter((p) => assignments[p].role === "Civilian").length;
    const undercoverLeft = updatedPlayers.some((p) => assignments[p].role === "Undercover");
    const mrWhiteLeft = updatedPlayers.some((p) => assignments[p].role === "Mr. White");

    // Game over conditions
    if (civiliansLeft === 1 && undercoverLeft) {
      setWinner("Undercover Wins!");
      setGameOver(true);
    } else if (!undercoverLeft && !mrWhiteLeft) {
      setWinner("Civilians Win!");
      setGameOver(true);
    } else {
      // Continue elimination phase
      setEliminationPhase(true);
    }
  };

  const submitFinalGuess = () => {
    const civilianWord = assignments[players.find((p) => assignments[p].role === "Civilian")].word;
    if (finalGuess.toLowerCase() === civilianWord.toLowerCase()) {
      setWinner("Mr. White Wins!");
      setGameOver(true);
    } else {
      // If Mr. White guesses incorrectly, continue the game if Undercover is still alive
      const undercoverLeft = players.some((p) => assignments[p].role === "Undercover");
      if (undercoverLeft) {
        setEliminationPhase(true); // Proceed to elimination phase
        setEliminatedPlayer(null); // Reset eliminated player
        setEliminatedRole(""); // Reset eliminated role
      } else {
        setWinner("Civilians Win!");
        setGameOver(true);
      }
    }
  };

  // Handle Enter key for Mr. White's guess
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      submitFinalGuess();
    }
  };

  const playAgain = () => {
    setPlayers([...initialPlayers]); // Reset to initial players
    setAllRevealed(false);
    setEliminationPhase(false);
    setGameOver(false);
    setWinner("");
    setEliminatedPlayer(null);
    setEliminatedRole("");
    setFinalGuess("");
    assignRolesAndQueue(initialPlayers); // Restart with initial players
  };

  const quitGame = () => {
    setStarted(false);
    setAllRevealed(false);
    setEliminationPhase(false);
    setGameOver(false);
    setWinner("");
    setPlayers([]);
    setInitialPlayers([]);
    setAssignments({});
    setQueue([]);
    setEliminatedPlayer(null);
    setEliminatedRole("");
    setFinalGuess("");
  };

  const resetToTodoList = () => {
    setStarted(false);
    setGameOver(false);
    setAllRevealed(false);
    setEliminationPhase(false);
    setEliminatedPlayer(null);
    setEliminatedRole("");
    setFinalGuess("");
    setWinner("");
    setAssignments({});
    setQueue([]);
    setCurrentViewer(null);
    setRevealed(false);
    setPlayers([...initialPlayers]); // Restore initial players (including eliminated players)
  };

  return (
    <div className="p-6 text-center">
      {!started ? (
        <div>
          <h1 className="text-2xl font-bold">Code Undercover</h1>
          <form onSubmit={addPlayer}>
            <input
              ref={nameInputRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter player name"
              className="mt-2 p-2 border rounded"
              autoFocus
            />
            <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded">
              Add Player
            </button>
          </form>
          <ul className="mt-4">
            {players.map((p, i) => (
              <li key={i} className="flex items-center justify-between p-2">
                {p}
                <button
                  onClick={() => removePlayer(p)}
                  className="remove-player-button" // Add the custom class
                >
                  –
                </button>
              </li>
            ))}
          </ul>
          <button onClick={startGame} className="mt-4 p-2 bg-green-500 text-white rounded">
            Start Game
          </button>
        </div>
      ) : !allRevealed ? (
        <div>
          {currentViewer && (
            <div className="mt-4 p-4 border rounded bg-gray-100">
              <h2 className="text-lg font-bold">It's {currentViewer}'s Turn</h2>
              {!revealed ? (
                <button onClick={revealWord} className="mt-4 p-2 bg-blue-500 text-white rounded">
                  Reveal Word & Role
                </button>
              ) : (
                <div>
                  <p className="mt-2 text-xl">Your Role:</p>
                  <p className="text-2xl font-bold">{assignments[currentViewer].role}</p>
                  <p className="mt-2 text-xl">Your Secret Word:</p>
                  <p className="text-2xl font-bold">{assignments[currentViewer].word}</p>
                  <button onClick={hideWord} className="mt-4 p-2 bg-red-500 text-white rounded">
                    Hide & Next Player
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ) : gameOver ? (
        <div>
          <h2 className="text-2xl font-bold mt-4">{winner}</h2>
          <button onClick={playAgain} className="mt-4 p-2 bg-green-500 text-white rounded">
            Play Again
          </button>
          <button
            onClick={resetToTodoList}
            className="mt-4 p-2 bg-blue-500 text-white rounded"
          >
            Add Player
          </button>
          <button onClick={quitGame} className="mt-4 p-2 bg-red-500 text-white rounded">
            Quit
          </button>
        </div>
      ) : eliminatedPlayer && assignments[eliminatedPlayer].role === "Mr. White" ? (
        <div>
          <h2 className="text-2xl font-bold mt-4">Mr. White Eliminated!</h2>
          <p className="mt-2">Mr. White, guess the civilian's word:</p>
          <input
            ref={finalGuessInputRef}
            value={finalGuess}
            onChange={(e) => setFinalGuess(e.target.value)}
            onKeyPress={handleKeyPress} // Handle Enter key
            placeholder="Enter your guess"
            className="mt-2 p-2 border rounded"
            autoFocus
          />
          <button onClick={submitFinalGuess} className="mt-4 p-2 bg-green-500 text-white rounded">
            Submit Guess
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-lg font-bold mt-4">Elimination Phase</h2>
          {eliminatedPlayer && (
            <div className="mt-2 p-4 bg-gray-100 rounded">
              <p className="text-xl">
                {eliminatedPlayer} was eliminated. Their role was:{" "}
                <span className="font-bold">{eliminatedRole}</span>
              </p>
            </div>
          )}
          <p className="mt-2">Describe your secret word in the order below, using just a word:</p>
          <ul className="mt-2 p-4 bg-gray-200 rounded">
            {queue.map((player, index) => (
              <li key={index} className="p-1">
                {index + 1}. {player}
              </li>
            ))}
          </ul>
          <p className="mt-2">Vote to eliminate a player:</p>
          {players.map((player) => (
            <button
              key={player}
              onClick={() => handleElimination(player)}
              className="m-2 p-2 bg-red-500 text-white rounded"
            >
              Eliminate {player}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Game;