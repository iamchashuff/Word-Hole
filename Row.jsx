import React from "react";
import "./Row.css";

const Row = ({ guess, targetWord }) => {
  // Determine the status of each letter in the guess
  const getLetterStatus = (letter, index, correctLetters, presentLetters) => {
    if (letter === targetWord[index]) {
      correctLetters[letter] = (correctLetters[letter] || 0) + 1;
      return "correct";
    } else if (targetWord.includes(letter)) {
      const countInTarget = targetWord.split(letter).length - 1;
      const correctCount = correctLetters[letter] || 0;
      const presentCount = presentLetters[letter] || 0;

      if (correctCount + presentCount < countInTarget) {
        presentLetters[letter] = (presentLetters[letter] || 0) + 1;
        return "present";
      }
    }
    return "absent";
  };

  const correctLetters = {};
  const presentLetters = {};

  return (
    <div className="word-row">
      {guess.split("").map((letter, index) => (
        <span
          key={index}
          className={`letter ${getLetterStatus(letter, index, correctLetters, presentLetters)}`}
        >
          {letter}
        </span>
      ))}
    </div>
  );
};

export default Row;