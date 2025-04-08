import React, { useState } from "react";
import match from "./assets/faceoff.png";
import { LogOut } from "react-feather";
import { MATCH_TYPE } from "./Constants";

export function FaceOff() {
  const [matchCount, setMatchCount] = useState(0);
  const [matchType, setMatchType] = useState(MATCH_TYPE.NORMAL);

  const startFaceoffMatch = () => {
    if (matchType === MATCH_TYPE.NORMAL) {
      const input = prompt(
        "How many matches do you want to play? Pick a number from 1 to 10!"
      );
      const parsed = parseInt(input, 10);
      if (!isNaN(parsed) && parsed >= 1 && parsed <= 10) {
        setMatchType(MATCH_TYPE.TOURNAMENT);
        setMatchCount(parsed);
      } else if (input !== null) {
        alert("Please enter a valid number between 1 and 10.");
        setMatchCount(0);
      }
    }else{
        setMatchType(MATCH_TYPE.NORMAL);
    }
  };

  return (
    <>
      {matchType === MATCH_TYPE.TOURNAMENT ? (
        <LogOut
          alt="Exit Face-off"
          className="menu-option face-off"
          onClick={startFaceoffMatch}
        />
      ) : (
        <img
          src={match}
          alt="Face-off"
          className="menu-option face-off"
          onClick={startFaceoffMatch}
        />
      )}
      {matchCount > 0 && matchType === MATCH_TYPE.TOURNAMENT && (
        <h3 className="match-info">
          Let the battle begin - {matchCount}{" "}
          {matchCount === 1 ? "match" : "matches"} lined up!!
        </h3>
      )}
    </>
  );
}
