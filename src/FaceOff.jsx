import React, { useContext, useState } from "react";
import match from "./assets/faceoff.png";
import { LogOut } from "react-feather";
import { MATCH_TYPE, UserContext } from "./Constants";
import Tippy from "@tippyjs/react";
import Button from "./utils/Button";

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

  const startFaceoffMatch = (countChange) => {
    if (matchType === MATCH_TYPE.NORMAL || countChange) {
      const input = prompt(
        "How many matches do you want to play? Pick a number from 2 to 100!"
      );
      const parsed = Number(input);

      if (!isNaN(parsed) && parsed >= 2 && parsed <= 100) {
        updateTournamentState(true, parsed);
      } else if (input !== null) {
        alert("Please enter a valid number between 2 and 100.");
      }
    } else {
      updateTournamentState(false, 0);
    }
  };

  return (
    <>
      {matchType === MATCH_TYPE.TOURNAMENT ? (
        <Tippy content="Play a 1-on-1 game">
          <LogOut
            alt="Exit Face-off"
            className="menu-option face-off"
            onClick={() => startFaceoffMatch(false)}
          />
        </Tippy>
      ) : (
        <Tippy content="Ready to battle?">
          <img
            src={match}
            alt="Face-off"
            className="menu-option face-off"
            onClick={() => startFaceoffMatch(false)}
          />
        </Tippy>
      )}
      {matchCount > 0 && matchType === MATCH_TYPE.TOURNAMENT && (
        <h3 className="match-info">
          Let the battle begin -{" "}
          <Button
            text={matchCount}
            className="match-count-btn"
            onClick={() => startFaceoffMatch(true)}
          />
          {matchCount === 1 ? "match" : "matches"} lined up!!
        </h3>
      )}
    </>
  );
}
