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
  Win: [
    "Victory is yours!",
    "You did it!",
    "You're on fire!",
    "A glorious triumph!",
    "You've conquered the machine!",
    "Winner winner!",
  ],
  Lose: [
    "Better luck next time!",
    "Oops! That didn’t work out.",
    "Defeated, but not done!",
    "Crushed by the computer!",
    "The crown slips away…",
    "Outplayed this time.",
  ],
  Tie: [
    "Great minds think alike!",
    "It's a draw!",
    "No winners this time!",
    "Neither side budged…",
    "Mirror match!",
    "Nobody wins, nobody loses!",
  ],
  ToStart: [
    "Let the game begin - pick one!",
    "Rock, Paper, or Scissors?",
    "Don't keep the computer waiting…",
    "Choose your weapon...",
  ],
};

export const WINNER_DETAIL = {
  User: "User",
  Computer: "Computer",
  Tie: "Tie",
};

export const MATCH_TYPE = {
  TOURNAMENT: "Tournament",
  NORMAL: "Normal",
};
