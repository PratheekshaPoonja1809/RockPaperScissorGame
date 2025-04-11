import React, { useContext, useEffect, useState } from "react";
import { choices, IMAGE_MAP, UserContext, WINNER_DETAIL } from "./Constants";
import PropTypes from "prop-types";
import crownImg from "./assets/crown.png";
import Tippy from "@tippyjs/react";

export function Computerselection() {
  const { finalSelection } = useContext(UserContext);
  const [isCompWinner, setWinnerDetail] = useState(false);
  const {
    compSelectInfo,
    normalMatchResult: { oneOnOneWinner },
    tournamentMatchResult: {
      isTournamentSelected,
      currentRoundWinner,
      tournamentsCompleted,
    },
  } = finalSelection;

  useEffect(() => {
    setWinnerDetail(oneOnOneWinner);
  }, [oneOnOneWinner]);

  return (
    <>
      {(tournamentsCompleted !== 0 || oneOnOneWinner !== "") && (
        <div className="selection-div-cntr">
          <label htmlFor="comp-input-select">
            <strong>Computer Selection:</strong>
          </label>
          <div
            className={`${
              isTournamentSelected && currentRoundWinner === WINNER_DETAIL.User
                ? "match-lost crown-cntr"
                : "crown-cntr"
            }`}
          >
            <img
              id="comp-input-select"
              src={IMAGE_MAP[compSelectInfo]}
              alt={compSelectInfo}
              className={`choosen-img`}
            />
            {!isTournamentSelected &&
              isCompWinner === WINNER_DETAIL.Computer && (
                <img src={crownImg} alt="winner" className="crown-img" />
              )}
          </div>
        </div>
      )}
    </>
  );
}

Computerselection.propTypes = {
  selectionDone: PropTypes.string,
};

Computerselection.defaultProps = {
  selectionDone: choices[0],
};
