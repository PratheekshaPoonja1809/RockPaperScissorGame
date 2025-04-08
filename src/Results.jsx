import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  choices,
  RESULT_STATUS,
  UserContext,
  WINNER_DETAIL,
} from "./Constants";
import { getRandomChoice } from "./helpers/getRandomChoice";

export function Results() {
  const { finalSelection, setFinalSelection } = useContext(UserContext);
  const [result, setResult] = useState("");

  const { userSelectInfo, compSelectInfo, gameWinner } = finalSelection;

  const displayResult = () => {
    let res;
    let winnerDetail = "";
    if (!userSelectInfo || !compSelectInfo) {
      res = getRandomChoice(RESULT_STATUS.ToStart);
    } else if (compSelectInfo === userSelectInfo) {
      res = getRandomChoice(RESULT_STATUS.Tie);
      winnerDetail = WINNER_DETAIL.Tie;
    } else {
      if (userSelectInfo === choices[0]) {
        res =
          compSelectInfo === choices[1]
            ? getRandomChoice(RESULT_STATUS.Lose)
            : getRandomChoice(RESULT_STATUS.Win);
        winnerDetail =
          compSelectInfo === choices[1]
            ? WINNER_DETAIL.Computer
            : WINNER_DETAIL.User;
      }
      if (userSelectInfo === choices[1]) {
        res =
          compSelectInfo === choices[2]
            ? getRandomChoice(RESULT_STATUS.Lose)
            : getRandomChoice(RESULT_STATUS.Win);
        winnerDetail =
          compSelectInfo === choices[2]
            ? WINNER_DETAIL.Computer
            : WINNER_DETAIL.User;
      }
      if (userSelectInfo === choices[2]) {
        res =
          compSelectInfo === choices[0]
            ? getRandomChoice(RESULT_STATUS.Lose)
            : getRandomChoice(RESULT_STATUS.Win);
        winnerDetail =
          compSelectInfo === choices[0]
            ? WINNER_DETAIL.Computer
            : WINNER_DETAIL.User;
      }
    }
    setResult(res);
    setFinalSelection((prev) => ({
      ...prev,
      gameWinner: winnerDetail,
    }));
  };

  useEffect(() => {
    displayResult();
  }, [userSelectInfo, compSelectInfo]);

  return (
    <h3>
      {!RESULT_STATUS.ToStart?.includes(result) && <>Result:</>}
      <span
        style={{
          color:
            gameWinner === WINNER_DETAIL.User
              ? "green"
              : gameWinner === WINNER_DETAIL.Computer
              ? "red"
              : "orange",
        }}
      >
        {" "}
        {result}
      </span>
    </h3>
  );
}

Results.propTypes = { userInputChanged: PropTypes.string };
