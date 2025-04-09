import React, { useContext, useEffect, useState } from "react";
import crownImg from "./assets/crown.png";
import { choices, IMAGE_MAP, UserContext, WINNER_DETAIL } from "./Constants";
import { getRandomChoice } from "./helpers/getRandomChoice";

export function Userselection() {
  const { finalSelection, setFinalSelection } = useContext(UserContext);

  const [selected, setSelected] = useState();
  const [isUserWinner, setWinnerDetail] = useState();
  const [matchCompleted, setMatchCompleted] = useState(0);

  const {
    tournamentMatchResult: { isTournamentSelected, totalMatchToConduct },
    normalMatchResult: { oneOnOneWinner },
  } = finalSelection;

  const handleSelect = (value) => {
    if (
      !isTournamentSelected ||
      (isTournamentSelected && totalMatchToConduct > matchCompleted)
    ) {
      let choice = getRandomChoice(choices);
      setSelected(value);
      setMatchCompleted((num) => num + 1);
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
    setMatchCompleted(0);
  }, [isTournamentSelected]);

  return (
    <>
      <p>
        <strong>Choose an option:</strong>
      </p>
      <div className="image-selection">
        {choices.map((choice) => (
          <img
            key={choice}
            src={IMAGE_MAP[choice]}
            alt={choice}
            title={choice}
            onClick={() => handleSelect(choice)}
            className={`choosen-img ${selected === choice ? "selected" : ""}`}
          />
        ))}
      </div>
      <div className="selection-div-cntr">
        <label htmlFor="user-input-select">
          <strong>Your Selection:</strong>
        </label>
        <div className="crown-cntr">
          <img
            id="user-input-select"
            src={IMAGE_MAP[selected]}
            alt={selected}
            title={selected}
            className={`user-choice-img`}
          />
          {isUserWinner === WINNER_DETAIL.User && (
            <img src={crownImg} alt="Winner" className="crown-img" />
          )}
        </div>
      </div>
    </>
  );
}
