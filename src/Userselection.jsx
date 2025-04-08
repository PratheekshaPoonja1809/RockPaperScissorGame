import React, { useContext, useEffect, useState } from "react";
import crownImg from "./assets/crown.png";
import { choices, IMAGE_MAP, UserContext, WINNER_DETAIL } from "./Constants";

export function Userselection() {
  const { finalSelection, setFinalSelection } = useContext(UserContext);
  const [selected, setSelected] = useState();
  const [isUserWinner, setWinnerDetail] = useState();

  const handleSelect = (value) => {
    setSelected(value);
    setFinalSelection((prev) => ({
      ...prev,
      userSelectInfo: value,
      selectionComplete: true,
    }));
  };

  useEffect(() => {
    setWinnerDetail(finalSelection.gameWinner);
  }, [finalSelection.gameWinner]);

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
        <br />
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
    </>
  );
}
