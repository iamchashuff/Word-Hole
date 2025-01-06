import React, { useState } from "react";
import "./App.css";
import Row from "./Row";

const App = () => {
  const targetWord = "FLASH";
  const maxAttempts = 6;

  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [isWordGuessed, setIsWordGuessed] = useState(false);

  const handleInputChange = (event) => {
    setCurrentGuess(event.target.value.toUpperCase());
  };

  const handleGuess = () => {
    if (currentGuess.length !== 5) {
      return;
    }

    const updatedGuesses = [...guesses, currentGuess];
    setGuesses(updatedGuesses);

    if (currentGuess === targetWord) {
      setIsGameOver(true);
      setIsWordGuessed(true);
    } else if (updatedGuesses.length >= maxAttempts) {
      setIsGameOver(true);
    }

    setCurrentGuess("");
  };

  const toggleRules = () => {
    setShowRules(!showRules);
  };

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const getKeyClass = (letter) => {
    if (guesses.some((guess) => guess.includes(letter))) {
      if (targetWord.includes(letter)) {
        return "present";
      } else {
        return "absent";
      }
    }
    return "";
  };

  const handleKeyClick = (letter) => {
    if (currentGuess.length < 5) {
      setCurrentGuess(currentGuess + letter);
    }
  };

  const handleDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  return (
    <div>
      <div className={`main-container ${isWordGuessed ? 'bounce' : ''}`}>
        <h1>Word-Hole</h1>
        {guesses.map((guess, index) => (
          <Row key={index} guess={guess} targetWord={targetWord} />
        ))}
        {!isGameOver && (
          <>
            <input
              value={currentGuess}
              onChange={handleInputChange}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleGuess();
                }
              }}
              maxLength={targetWord.length}
              placeholder="Enter your guess"
            />
            <button onClick={handleGuess}>Guess</button>
          </>
        )}
        {isGameOver && currentGuess !== targetWord && (
          <p className="game-over-text">{`Game Over! The word was: ${targetWord}`}</p>
        )}
      </div>
      <button className="toggle-rules-button" onClick={toggleRules}>
        {showRules ? "Hide Rules" : "Show Rules"}
      </button>
      {showRules && (
        <div className="rules-container">
          <p className="rules">
            Guess the correct 5-letter word within 6 attempts
          </p>
          <p className="rules2">
            If a letter turns <strong style={{ color: '#044D87' }}>Blue</strong>, it means the letter is correct.<br />
            If a letter turns <strong className="highlight-orange" style={{ color: '#A34321' }}>Orange</strong>, it means it exists in the word but not in that spot.<br />
            If a letter turns <strong style={{ color: '#6F6D71' }}>Gray</strong>, it means the letter is <strong>NOT</strong> correct.
          </p>
        </div>
      )}
      <div className="keyboard">
        {alphabet.map((letter) => (
          <button
            key={letter}
            className={`key ${getKeyClass(letter)}`}
            onClick={() => handleKeyClick(letter)}
            disabled={isGameOver}
          >
            {letter}
          </button>
        ))}
        <button
          className="key delete-key"
          onClick={handleDelete}
          disabled={isGameOver}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default App;