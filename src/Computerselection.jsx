import React, { useContext, useEffect, useState } from "react";
import { choices, IMAGE_MAP, UserContext, WINNER_DETAIL } from "./Constants";
import PropTypes from "prop-types";
import crownImg from "./assets/crown.png";

export function Computerselection() {
  const { finalSelection } = useContext(UserContext);
  const [isCompWinner, setWinnerDetail] = useState(false);
  const {compSelectInfo,normalMatchResult:{oneOnOneWinner}} = finalSelection;

  useEffect(() => {
    setWinnerDetail(oneOnOneWinner);
  }, [oneOnOneWinner]);

  return (
    <div className="selection-div-cntr">
      <label htmlFor="comp-input-select">
        <strong>Computer Selection:</strong>
      </label>
      <div className="crown-cntr">
        <img
          id="comp-input-select"
          src={IMAGE_MAP[compSelectInfo]}
          alt={compSelectInfo}
          title={compSelectInfo}
          className={`choosen-img`}
        />
        {isCompWinner === WINNER_DETAIL.Computer && (
          <img src={crownImg} alt="winner" className="crown-img" />
        )}
      </div>
    </div>
  );
}

Computerselection.propTypes = {
  selectionDone: PropTypes.string,
};

Computerselection.defaultProps = {
  selectionDone: choices[0],
};
