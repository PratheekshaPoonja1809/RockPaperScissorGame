import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { choices, RESULT_STATUS, UserContext } from "./Constants";

export function Results() {
  const fetchResults = useContext(UserContext);
  const [result, setResult] = useState("");

  const { userSelectInfo, compSelectInfo } = fetchResults.finalSelection;

  const displayResult = () => {
    let res;
    if (!userSelectInfo || !compSelectInfo) {
      res = RESULT_STATUS.ToStart;
    } else if (compSelectInfo === userSelectInfo) {
      res = RESULT_STATUS.Tie;
    } else {
      if (userSelectInfo === choices[0]) {
        res = compSelectInfo === choices[1] ? RESULT_STATUS.Lose : RESULT_STATUS.Win;
      }
      if (userSelectInfo === choices[1]) {
        res = compSelectInfo === choices[2] ? RESULT_STATUS.Lose : RESULT_STATUS.Win;
      }
      if (userSelectInfo === choices[2]) {
        res = compSelectInfo === choices[0] ? RESULT_STATUS.Lose : RESULT_STATUS.Win;
      }
    }
    setResult(res);
  };

  useEffect(() => {
    displayResult();
  }, [userSelectInfo, compSelectInfo]);

  return (
    <div>
      <p>
        <strong>Result:</strong> {result}
      </p>
    </div>
  );
}

Results.propTypes = { userInputChanged: PropTypes.string };
