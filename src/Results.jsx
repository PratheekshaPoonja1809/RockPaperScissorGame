import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  VICTORY_STATUS,
  UserContext,
  WINNER_DETAIL,
  IMAGE_MAP,
} from "./Constants";
import { getWinnerDetail } from "./helpers/getWinnerDetail";
import Button from "./utils/Button";
import Modal from "./utils/Modal";
import { getRandomChoice } from "./helpers/getRandomChoice";
import { Frown, Meh, Smile } from "react-feather";

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
      totalMatchToConduct,
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
          tournamentMatchResult: {
            isTournamentSelected: false,
            totalMatchToConduct: 0,
            tournamentsCompleted: 0,
            userWinningCount: 0,
            compWinningCount: 0,
            currentRoundWinner: "",
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
        const prevMatch = prev.normalMatchResult || {};
        return {
          ...prev,
          selectionComplete: false,
          normalMatchResult: {
            ...prevMatch,
            oneOnOneWinner: "",
          },
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
            currentRoundWinner: winnerDetail || "",
          },
        };
      });
    }
  };

  const mapImage =
    userWinningCount > compWinningCount
      ? WINNER_DETAIL.User
      : userWinningCount < compWinningCount
      ? WINNER_DETAIL.Computer
      : WINNER_DETAIL.Tie;

  const getFaceoffResults = () => {
    let winnerDetail = "";
    if (userWinningCount === compWinningCount) {
      winnerDetail = "Tie";
    }
    if (userWinningCount > compWinningCount) {
      winnerDetail = "User";
    }
    if (userWinningCount < compWinningCount) {
      winnerDetail = "Computer";
    }
    let param = VICTORY_STATUS[winnerDetail] || VICTORY_STATUS.ToStart;
    return getRandomChoice(param);
  };

  const resetTournamentMatch = () => {
    setFinalSelection((prev) => {
      const prevTournament = prev.tournamentMatchResult || {};
      return {
        ...prev,
        selectionComplete: false,
        tournamentMatchResult: {
          ...prevTournament,
          userWinningCount: 0,
          compWinningCount: 0,
          tournamentsCompleted: 0,
          currentRoundWinner: "",
        },
      };
    });
  };

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
            Score: Player {userWinningCount} - {compWinningCount} Computer
          </h3>
          <h3>Matches Played: {tournamentsCompleted}</h3>
          <Button text="Rematch" onClick={resetTournamentMatch} />
          {tournamentsCompleted === totalMatchToConduct && (
            <Modal text="Game Outcome" onClose={resetTournamentMatch}>
              <h3 className="flex-center no-white-space">
                {getFaceoffResults()}
                {mapImage === WINNER_DETAIL.User && (
                  <>
                    <Smile color="green" className="padding1" />
                    <span>
                      Final score: {userWinningCount} - {compWinningCount}
                    </span>
                  </>
                )}
                {mapImage === WINNER_DETAIL.Computer && (
                  <>
                    <Frown color="red" className="padding1" />
                    <span>
                      Final score: {userWinningCount} - {compWinningCount}
                    </span>
                  </>
                )}
                {mapImage === WINNER_DETAIL.Tie && (
                  <>
                    <Meh color="orange" className="padding1" />
                    <span>
                      Final score: {userWinningCount} - {compWinningCount}
                    </span>
                  </>
                )}
              </h3>
              <img
                src={IMAGE_MAP[mapImage]}
                alt={"results"}
                className="face-off-result-img"
              />
            </Modal>
          )}
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
