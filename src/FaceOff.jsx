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
          totalMatchToConduct: isActive?count:0,
          tournamentResult: 0,
        },
      }));
  };

  const startFaceoffMatch = () => {
    if (matchType === MATCH_TYPE.NORMAL) {
      const input = prompt(
        "How many matches do you want to play? Pick a number from 1 to 10!"
      );
      const parsed = parseInt(input, 10);

      if (!isNaN(parsed) && parsed >= 1 && parsed <= 10) {
        updateTournamentState(true, parsed);
      } else if (input !== null) {
        alert("Please enter a valid number between 1 and 10.");
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
