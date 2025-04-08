import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  choices,
  RESULT_STATUS,
  UserContext,
  WINNER_DETAIL,
} from "./Constants";

export function Results() {
  const { finalSelection, setFinalSelection } = useContext(UserContext);
  const [result, setResult] = useState("");

  const { userSelectInfo, compSelectInfo, gameWinner } = finalSelection;

  const displayResult = () => {
    let res;
    let winnerDetail = "";
    if (!userSelectInfo || !compSelectInfo) {
      res = RESULT_STATUS.ToStart;
    } else if (compSelectInfo === userSelectInfo) {
      res = RESULT_STATUS.Tie;
      winnerDetail = "Tie";
    } else {
      if (userSelectInfo === choices[0]) {
        res =
          compSelectInfo === choices[1]
            ? RESULT_STATUS.Lose
            : RESULT_STATUS.Win;
        winnerDetail =
          compSelectInfo === choices[1]
            ? WINNER_DETAIL.Computer
            : WINNER_DETAIL.User;
      }
      if (userSelectInfo === choices[1]) {
        res =
          compSelectInfo === choices[2]
            ? RESULT_STATUS.Lose
            : RESULT_STATUS.Win;
        winnerDetail =
          compSelectInfo === choices[2]
            ? WINNER_DETAIL.Computer
            : WINNER_DETAIL.User;
      }
      if (userSelectInfo === choices[2]) {
        res =
          compSelectInfo === choices[0]
            ? RESULT_STATUS.Lose
            : RESULT_STATUS.Win;
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
        Result:
        <span
          style={{
            color:
              gameWinner === "User"
                ? "green"
                : gameWinner === "Computer"
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
