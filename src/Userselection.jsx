import React, { useContext, useEffect, useState } from "react";
import crownImg from "./assets/crown.png";
import { CHOICES, IMAGE_MAP, UserContext, WINNER_DETAIL } from "./Constants";
import { getRandomChoice } from "./helpers/getRandomChoice";
import Tippy from "@tippyjs/react";

export function Userselection() {
  const { finalSelection, setFinalSelection } = useContext(UserContext);

  const [selected, setSelected] = useState();
  const [isUserWinner, setWinnerDetail] = useState();
  const [matchCompleted, setMatchCompleted] = useState(0);

  const {
    normalMatchResult: { oneOnOneWinner },
    tournamentMatchResult: {
      isTournamentSelected,
      totalMatchToConduct,
      tournamentsCompleted,
      currentRoundWinner,
    },
  } = finalSelection;

  const handleSelect = (value) => {
    if (
      !isTournamentSelected ||
      (isTournamentSelected && totalMatchToConduct > matchCompleted)
    ) {
      let choice = getRandomChoice(CHOICES);
      setSelected(value);
      isTournamentSelected && setMatchCompleted((num) => num + 1);
      setFinalSelection((prev) => {
        return {
          ...prev,
          selectionComplete: true,
          userSelectInfo: value,
          compSelectInfo: choice,
        };
      });
    }
  };

  useEffect(() => {
    setWinnerDetail(oneOnOneWinner);
  }, [oneOnOneWinner]);

  useEffect(() => {
    isTournamentSelected && tournamentsCompleted === 0 && setMatchCompleted(0);
  }, [isTournamentSelected, tournamentsCompleted]);

  return (
    <>
      <p>
        <strong>Choose an option:</strong>
      </p>
      <div className="image-selection">
        {CHOICES.map((choice) => (
          <Tippy content={choice} key={choice}>
            <img
              key={choice}
              src={IMAGE_MAP[choice]}
              alt={choice}
              onClick={() => handleSelect(choice)}
              className={`choosen-img ${selected === choice ? "selected" : ""}`}
            />
          </Tippy>
        ))}
      </div>
      {(tournamentsCompleted !== 0 || oneOnOneWinner !== "") && (
        <div className="selection-div-cntr">
          <label htmlFor="user-input-select">
            <strong>Your Selection:</strong>
          </label>
          <div
            className={`${
              (isTournamentSelected &&
                currentRoundWinner === WINNER_DETAIL.Computer) ||
              (!isTournamentSelected &&
                oneOnOneWinner === WINNER_DETAIL.Computer)
                ? "match-lost crown-cntr"
                : " crown-cntr"
            }`}
          >
            <img
              id="user-input-select"
              src={IMAGE_MAP[selected]}
              alt={selected}
              title={selected}
              className={`user-choice-img`}
            />
            {!isTournamentSelected && isUserWinner === WINNER_DETAIL.User && (
              <img src={crownImg} alt="Winner" className="crown-img" />
            )}
          </div>
        </div>
      )}
    </>
  );
}
