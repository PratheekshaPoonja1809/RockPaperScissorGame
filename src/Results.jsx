import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { VICTORY_STATUS, UserContext, WINNER_DETAIL } from "./Constants";
import { getWinnerDetail } from "./helpers/getWinnerDetail";
import Button from "./utils/Button";

export function Results() {
  const { finalSelection, setFinalSelection } = useContext(UserContext);
  const [result, setResult] = useState("");

  const {
    userSelectInfo,
    compSelectInfo,
    selectionComplete,
    normalMatchResult: { oneOnOneWinner },
    tournamentMatchResult: {
      isTournamentSelected,
      userWinningCount,
      compWinningCount,
      tournamentsCompleted,
    },
  } = finalSelection;

  const displayResult = () => {
    const [winnerDetail, resultText] = getWinnerDetail(finalSelection);
    if (selectionComplete) {
      setResult(resultText);

      setFinalSelection((prev) => {
        const prevMatch = prev.normalMatchResult || {};
        return {
          ...prev,
          selectionComplete: false,
          normalMatchResult: {
            ...prevMatch,
            oneOnOneWinner: winnerDetail,
          },
        };
      });
    }
  };

  const displayTournamentResult = () => {
    if (selectionComplete) {
      const [winnerDetail, resultText] = getWinnerDetail(finalSelection);
      setResult(resultText);
      setFinalSelection((prev) => {
        const prevTournament = prev.tournamentMatchResult || {};
        return {
          ...prev,
          selectionComplete: false,
          tournamentMatchResult: {
            ...prevTournament,
            userWinningCount:
              winnerDetail === WINNER_DETAIL.User
                ? (prevTournament.userWinningCount || 0) + 1
                : prevTournament.userWinningCount || 0,
            compWinningCount:
              winnerDetail === WINNER_DETAIL.Computer
                ? (prevTournament.compWinningCount || 0) + 1
                : prevTournament.compWinningCount || 0,
            tournamentsCompleted:
              (prevTournament.tournamentsCompleted || 0) + 1,
          },
        };
      });
    }
  };

  const resetTournamentMatch = () => {};

  useEffect(() => {
    if (!compSelectInfo) return;
    if (!isTournamentSelected) {
      displayResult();
    }
  }, [selectionComplete, compSelectInfo]);

  useEffect(() => {
    if (!compSelectInfo || !selectionComplete) return;
    if (isTournamentSelected) {
      displayTournamentResult();
    }
  }, [selectionComplete, compSelectInfo, userSelectInfo]);
  //both compSelectInfo, userSelectInfo is passed as dependency as count wont increase if user/computer selects same option as previous ones

  return (
    <>
      {isTournamentSelected ? (
        <div className="tournament-result-cntr">
          <h3>
            ScoreBoard - {userWinningCount}:{compWinningCount}
          </h3>
          <h3>Match Completed - {tournamentsCompleted}</h3>
          {!VICTORY_STATUS.ToStart?.includes(result) && <>Result:</>}
          <Button text="Reset" onClick={resetTournamentMatch} />
        </div>
      ) : (
        <h3>
          {!VICTORY_STATUS.ToStart?.includes(result) && <>Result:</>}
          <span
            style={{
              color:
                oneOnOneWinner === WINNER_DETAIL.User
                  ? "green"
                  : oneOnOneWinner === WINNER_DETAIL.Computer
                  ? "red"
                  : "orange",
            }}
          >
            {" "}
            {result}
          </span>
        </h3>
      )}
    </>
  );
}

Results.propTypes = { userInputChanged: PropTypes.string };
