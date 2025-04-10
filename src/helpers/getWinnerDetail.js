import { choices, VICTORY_STATUS, WINNER_DETAIL } from "../Constants";
import { getRandomChoice } from "./getRandomChoice";

export const getWinnerDetail = (finalSelection) => {
  let winnerDetail = "";
 
  const { userSelectInfo, compSelectInfo } = finalSelection; //ch

  if (compSelectInfo === userSelectInfo) {
    winnerDetail = WINNER_DETAIL.Tie;
  } else {
    switch (userSelectInfo) {
      case choices[0]: // Rock
        winnerDetail =
          compSelectInfo === choices[1] // Paper
            ? WINNER_DETAIL.Computer
            : WINNER_DETAIL.User;
        break;

      case choices[1]: // Paper
        winnerDetail =
          compSelectInfo === choices[2] // Scissors
            ? WINNER_DETAIL.Computer
            : WINNER_DETAIL.User;
        break;

      case choices[2]: // Scissors
        winnerDetail =
          compSelectInfo === choices[0] // Rock
            ? WINNER_DETAIL.Computer
            : WINNER_DETAIL.User;
        break;

      default:
        winnerDetail = "";
        break;
    }
  }
  let param = VICTORY_STATUS[winnerDetail] || VICTORY_STATUS.ToStart;
  let resultText = getRandomChoice(param);

  return [winnerDetail, resultText];
};
