import { createContext } from "react";
import rockImg from "./assets/rock.png";
import paperImg from "./assets/paper.png";
import scissorsImg from "./assets/scissor.png";

export const UserContext = createContext();

export const APP_TITLE = "Rock - Paper - Scissor";

export const choices = ["Rock", "Paper", "Scissor"];

export const IMAGE_MAP = {
  Rock: rockImg,
  Paper: paperImg,
  Scissor: scissorsImg,
};
export const RESULT_STATUS = {
  Win: "You Win",
  Lose: "You Lose",
  Tie: "Its a Tie...",
  ToStart: "Waiting for selections...",
};
