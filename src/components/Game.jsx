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
    ["Coffee", "Tea"],
    ["Pizza", "Burger"],
    ["Car", "Bike"],
    ["Dog", "Cat"],
    ["Book", "Magazine"],
    ["Tree", "Plant"],
    ["Mountain", "Hill"],
    ["River", "Lake"],
    ["City", "Town"],
    ["Chair", "Stool"],
    ["Phone", "Tablet"],
    ["Watch", "Clock"],
    ["Shoes", "Slippers"],
    ["Glasses", "Sunglasses"],
    ["Cake", "Pie"],
    ["Bread", "Toast"],
    ["Butter", "Cheese"],
    ["Juice", "Soda"],
    ["Ice Cream", "Frozen Yogurt"],
    ["Chocolate", "Candy"],
    ["Cup", "Mug"],
    ["Plate", "Bowl"],
    ["Fork", "Spoon"],
    ["Knife", "Sword"],
    ["Shirt", "T-Shirt"],
    ["Pants", "Jeans"],
    ["Socks", "Stockings"],
    ["Hat", "Cap"],
    ["Gloves", "Mittens"],
    ["Scarf", "Shawl"],
    ["Jacket", "Coat"],
    ["Dress", "Skirt"],
    ["Suit", "Tuxedo"],
    ["Tie", "Bowtie"],
    ["Belt", "Suspenders"],
    ["Wallet", "Purse"],
    ["Backpack", "Bag"],
    ["Luggage", "Suitcase"],
    ["Umbrella", "Parasol"],
    ["Camera", "Video Camera"],
    ["Computer", "Laptop"],
    ["Printer", "Scanner"],
    ["Keyboard", "Piano"],
    ["Guitar", "Violin"],
    ["Drum", "Cymbal"],
    ["Flute", "Clarinet"],
    ["Trumpet", "Trombone"],
    ["Saxophone", "Clarinet"],
    ["Microphone", "Speaker"],
    ["Headphones", "Earphones"],
    ["Radio", "Television"],
    ["Movie", "Film"],
    ["Theater", "Cinema"],
    ["Play", "Musical"],
    ["Concert", "Festival"],
    ["Art", "Painting"],
    ["Sculpture", "Statue"],
    ["Photography", "Cinematography"],
    ["Dance", "Ballet"],
    ["Music", "Song"],
    ["Poetry", "Prose"],
    ["Novel", "Short Story"],
    ["Comic", "Graphic Novel"],
    ["Newspaper", "Magazine"],
    ["Blog", "Website"],
    ["Email", "Letter"],
    ["Phone Call", "Text Message"],
    ["Social Media", "Networking"],
    ["Friend", "Acquaintance"],
    ["Family", "Relatives"],
    ["Parent", "Guardian"],
    ["Child", "Kid"],
    ["Baby", "Toddler"],
    ["Teenager", "Adult"],
    ["Student", "Teacher"],
    ["Professor", "Lecturer"],
    ["School", "University"],
    ["Classroom", "Lecture Hall"],
    ["Homework", "Assignment"],
    ["Exam", "Test"],
    ["Grade", "Score"],
    ["Degree", "Diploma"],
    ["Job", "Career"],
    ["Employer", "Employee"],
    ["Boss", "Manager"],
    ["Colleague", "Coworker"],
    ["Office", "Workspace"],
    ["Desk", "Table"],
    ["Chair", "Stool"],
    ["Computer", "Laptop"],
    ["Printer", "Scanner"],
    ["Phone", "Tablet"],
    ["Meeting", "Conference"],
    ["Presentation", "Speech"],
    ["Project", "Task"],
    ["Deadline", "Due Date"],
    ["Salary", "Wage"],
    ["Bonus", "Incentive"],
    ["Promotion", "Raise"],
    ["Resignation", "Retirement"],
    ["Interview", "Audition"],
    ["Resume", "CV"],
    ["Application", "Submission"],
    ["Offer", "Proposal"],
    ["Contract", "Agreement"],
    ["Business", "Company"],
    ["Entrepreneur", "Businessman"],
    ["Startup", "Venture"],
    ["Investment", "Funding"],
    ["Profit", "Revenue"],
    ["Loss", "Debt"],
    ["Bank", "Credit Union"],
    ["Account", "Savings"],
    ["Loan", "Mortgage"],
    ["Credit Card", "Debit Card"],
    ["Cash", "Currency"],
    ["Coin", "Bill"],
    ["ATM", "Bank Branch"],
    ["Transaction", "Payment"],
    ["Receipt", "Invoice"],
    ["Budget", "Expense"],
    ["Tax", "Duty"],
    ["Insurance", "Policy"],
    ["Claim", "Settlement"],
    ["Health", "Fitness"],
    ["Diet", "Nutrition"],
    ["Exercise", "Workout"],
    ["Yoga", "Meditation"],
    ["Gym", "Fitness Center"],
    ["Trainer", "Coach"],
    ["Athlete", "Player"],
    ["Team", "Squad"],
    ["Game", "Match"],
    ["Tournament", "Championship"],
    ["Victory", "Win"],
    ["Defeat", "Loss"],
    ["Score", "Goal"],
    ["Referee", "Umpire"],
    ["Spectator", "Audience"],
    ["Stadium", "Arena"],
    ["Field", "Court"],
    ["Ball", "Puck"],
    ["Bat", "Racket"],
    ["Helmet", "Cap"],
    ["Gloves", "Mittens"],
    ["Shoes", "Cleats"],
    ["Uniform", "Jersey"],
    ["Coach", "Manager"],
    ["Strategy", "Tactic"],
    ["Practice", "Training"],
    ["Skill", "Talent"],
    ["Experience", "Knowledge"],
    ["Learning", "Education"],
    ["Teaching", "Instruction"],
    ["Mentor", "Guide"],
    ["Advice", "Suggestion"],
    ["Feedback", "Review"],
    ["Improvement", "Progress"],
    ["Goal", "Objective"],
    ["Plan", "Strategy"],
    ["Action", "Execution"],
    ["Result", "Outcome"],
    ["Success", "Achievement"],
    ["Failure", "Mistake"],
    ["Challenge", "Obstacle"],
    ["Solution", "Answer"],
    ["Problem", "Issue"],
    ["Question", "Query"],
    ["Answer", "Response"],
    ["Discussion", "Debate"],
    ["Argument", "Dispute"],
    ["Agreement", "Consensus"],
    ["Compromise", "Settlement"],
    ["Conflict", "Fight"],
    ["Peace", "Harmony"],
    ["War", "Battle"],
    ["Victory", "Triumph"],
    ["Defeat", "Surrender"],
    ["Hero", "Champion"],
    ["Villain", "Antagonist"],
    ["Friend", "Ally"],
    ["Enemy", "Foe"],
    ["Love", "Affection"],
    ["Hate", "Dislike"],
    ["Joy", "Happiness"],
    ["Sadness", "Sorrow"],
    ["Anger", "Rage"],
    ["Fear", "Anxiety"],
    ["Surprise", "Shock"],
    ["Trust", "Confidence"],
    ["Doubt", "Suspicion"],
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
  const [paused, setPaused] = useState(false); // Pause state

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
    const trimmedName = name.trim();
    if (trimmedName && !players.some((p) => p.toLowerCase() === trimmedName.toLowerCase())) {
      const capitalizedName = capitalizeFirstLetter(trimmedName);
      setPlayers([...players, capitalizedName]);
      setName("");
    } else {
      alert("Name already exists or is invalid!");
    }
  };

  const removePlayer = (player) => {
    setPlayers(players.filter((p) => p !== player));
  };

  const assignRolesAndQueue = (playerList) => {
    const pair = wordPairs[Math.floor(Math.random() * wordPairs.length)];
    const civilianWord = pair[0];
    const undercoverWord = pair[1];

    // Determine number of Undercover and Mr. White based on player count
    let undercoverCount = 0;
    let mrWhiteCount = 0;

    if (playerList.length >= 3 && playerList.length <= 4) {
      undercoverCount = 1;
      mrWhiteCount = 0;
    } else if (playerList.length >= 5 && playerList.length <= 6) {
      undercoverCount = 1;
      mrWhiteCount = 1;
    } else if (playerList.length >= 7 && playerList.length <= 8) {
      undercoverCount = 2;
      mrWhiteCount = 1;
    } else if (playerList.length >= 9 && playerList.length <= 10) {
      undercoverCount = 3;
      mrWhiteCount = 1;
    } else if (playerList.length >= 11 && playerList.length <= 12) {
      undercoverCount = 3;
      mrWhiteCount = 2;
    } else if (playerList.length >= 13 && playerList.length <= 14) {
      undercoverCount = 4;
      mrWhiteCount = 2;
    } else if (playerList.length >= 15 && playerList.length <= 16) {
      undercoverCount = 5;
      mrWhiteCount = 2;
    } else if (playerList.length >= 17 && playerList.length <= 18) {
      undercoverCount = 5;
      mrWhiteCount = 3;
    } else if (playerList.length >= 19 && playerList.length <= 20) {
      undercoverCount = 6;
      mrWhiteCount = 3;
    }

    // Assign roles
    let roles = Array(playerList.length).fill("Civilian");

    // Assign Undercover roles
    for (let i = 0; i < undercoverCount; i++) {
      let index;
      do {
        index = Math.floor(Math.random() * playerList.length);
      } while (roles[index] !== "Civilian");
      roles[index] = "Undercover";
    }

    // Assign Mr. White roles
    for (let i = 0; i < mrWhiteCount; i++) {
      let index;
      do {
        index = Math.floor(Math.random() * playerList.length);
      } while (roles[index] !== "Civilian");
      roles[index] = "Mr. White";
    }

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

  // Calculate number of Undercover and Mr. White roles
  const calculateRoles = () => {
    const playerCount = players.length;
    let undercoverCount = 0;
    let mrWhiteCount = 0;

    if (playerCount >= 3 && playerCount <= 4) {
      undercoverCount = 1;
      mrWhiteCount = 0;
    } else if (playerCount >= 5 && playerCount <= 6) {
      undercoverCount = 1;
      mrWhiteCount = 1;
    } else if (playerCount >= 7 && playerCount <= 8) {
      undercoverCount = 2;
      mrWhiteCount = 1;
    } else if (playerCount >= 9 && playerCount <= 10) {
      undercoverCount = 3;
      mrWhiteCount = 1;
    } else if (playerCount >= 11 && playerCount <= 12) {
      undercoverCount = 3;
      mrWhiteCount = 2;
    } else if (playerCount >= 13 && playerCount <= 14) {
      undercoverCount = 4;
      mrWhiteCount = 2;
    } else if (playerCount >= 15 && playerCount <= 16) {
      undercoverCount = 5;
      mrWhiteCount = 2;
    } else if (playerCount >= 17 && playerCount <= 18) {
      undercoverCount = 5;
      mrWhiteCount = 3;
    } else if (playerCount >= 19 && playerCount <= 20) {
      undercoverCount = 6;
      mrWhiteCount = 3;
    }

    return { undercoverCount, mrWhiteCount };
  };

  const { undercoverCount, mrWhiteCount } = calculateRoles();

  return (
    <div className="p-6 text-center relative">
      {/* Pause Button */}
      {/* {started && !gameOver && (
        <div className="absolute top-2 right-2">
          <button
            onClick={() => setPaused(!paused)}
            className="p-2 bg-yellow-500 text-white rounded"
          >
            ⏸️ Pause
          </button>
          {paused && (
            <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg p-2">
              <button
                onClick={() => setPaused(false)}
                className="block w-full p-2 bg-blue-500 text-white rounded mb-2"
              >
                Resume
              </button>
              <button
                onClick={playAgain}
                className="block w-full p-2 bg-green-500 text-white rounded mb-2"
              >
                Restart
              </button>
              <button
                onClick={resetToTodoList}
                className="block w-full p-2 bg-blue-500 text-white rounded mb-2"
              >
                Add Player
              </button>
              <button
                onClick={quitGame}
                className="block w-full p-2 bg-red-500 text-white rounded"
              >
                Quit
              </button>
            </div>
          )}
        </div>
      )} */}

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
          <p className="mt-2 font-bold">
            Undercover: {undercoverCount} &nbsp;&nbsp;&nbsp; Mr. White: {mrWhiteCount}
          </p>
          <ul className="mt-4">
            {players.map((p, i) => (
              <li key={i} className="flex items-center justify-between p-2">
                {p}
                <button
                  onClick={() => removePlayer(p)}
                  className="remove-player-button" // Add the custom class
                >
                  <b>–</b>
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
          <ul className="mt-2 p-4 bg-gray-200 rounded mx-auto w-full md:w-1/2">
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