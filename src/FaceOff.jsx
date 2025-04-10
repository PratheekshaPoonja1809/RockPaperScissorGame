import React, { useContext, useState } from "react";
import match from "./assets/faceoff.png";
import { LogOut } from "react-feather";
import { MATCH_TYPE, UserContext } from "./Constants";

export function FaceOff() {
  const [matchCount, setMatchCount] = useState(0);
  const [matchType, setMatchType] = useState(MATCH_TYPE.NORMAL);

  const { setFinalSelection } = useContext(UserContext);

  const updateTournamentState = (isActive, count = 0) => {
    setMatchType(isActive ? MATCH_TYPE.TOURNAMENT : MATCH_TYPE.NORMAL);
    setMatchCount(count);
    setFinalSelection((prev) => ({
      ...prev,
      tournamentMatchResult: {
        ...(prev.tournamentMatchResult || {}),
        isTournamentSelected: isActive,
        totalMatchToConduct: isActive ? count : 0,
        tournamentsCompleted: 0,
        userWinningCount: 0,
        compWinningCount: 0,
        currentRoundWinner: "",
      },
    }));
  };

  const startFaceoffMatch = () => {
    if (matchType === MATCH_TYPE.NORMAL) {
      const input = prompt(
        "How many matches do you want to play? Pick a number from 2 to 100!"
      );
      const parsed = parseInt(input, 10);

      if (!isNaN(parsed) && parsed >= 2 && parsed <= 100) {
        updateTournamentState(true, parsed);
      } else if (input !== null) {
        alert("Please enter a valid number between 2 and 100.");
        updateTournamentState(false, 0);
      }
    } else {
      updateTournamentState(false, 0);
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
          title="Start Faceoff"
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
