import React, { useContext, useEffect, useState } from "react";
import { choices, IMAGE_MAP, UserContext, WINNER_DETAIL } from "./Constants";
import PropTypes from "prop-types";
import crownImg from "./assets/crown.png";
import { getRandomChoice } from "./helpers/getRandomChoice";

export function Computerselection({ selectionDone }) {
  const { finalSelection, setFinalSelection } = useContext(UserContext);
  const [compChoice, setCompChoice] = useState("");
  const [isCompWinner, setWinnerDetail] = useState(false);

  useEffect(() => {
    const choice = getRandomChoice(choices);
    if (choice && selectionDone) {
      setCompChoice(choice);
      setFinalSelection((prev) => ({
        ...prev,
        compSelectInfo: choice,
        selectionComplete: false,
      }));
    }
  }, [selectionDone]);

  useEffect(() => {
    setWinnerDetail(finalSelection.gameWinner);
  }, [finalSelection.gameWinner]);

  return (
    <div className="selection-div-cntr">
      <label htmlFor="comp-input-select">
        <strong>Computer Selection:</strong>
      </label>
      <br />
      <img
        id="comp-input-select"
        src={IMAGE_MAP[compChoice]}
        alt={compChoice}
        title={compChoice}
        className={`choosen-img`}
      />
      {isCompWinner === WINNER_DETAIL.Computer && (
        <img src={crownImg} alt="winner" className="crown-img" />
      )}
    </div>
  );
}

Computerselection.propTypes = {
  selectionDone: PropTypes.string,
};

Computerselection.defaultProps = {
  selectionDone: choices[0],
};
