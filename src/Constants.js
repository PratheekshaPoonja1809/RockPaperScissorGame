import { createContext } from "react";
import rockImg from "./assets/rock.png";
import paperImg from "./assets/paper.png";
import scissorsImg from "./assets/scissor.png";
import victoryImg from "./assets/award.gif";
import tieImg from "./assets/draw.gif";
import lostImg from "./assets/lost.gif";

export const UserContext = createContext();

export const APP_TITLE = "Rock - Paper - Scissors";

export const CHOICES = ["Rock", "Paper", "Scissors"];

export const IMAGE_MAP = {
  Rock: rockImg,
  Paper: paperImg,
  Scissors: scissorsImg,
  User: victoryImg,
  Tie: tieImg,
  Computer: lostImg,
};

export const VICTORY_STATUS = {
  ToStart: [
    "Let the game begin - pick one! ",
    "Rock, Paper, or Scissors?",
    "Don't keep the computer waiting...",
    "Choose your weapon...",
  ],
  User: [
    "Victory is yours! ",
    "You did it! ",
    "You're on fire! ",
    "A glorious triumph! ",
    "You've conquered the machine! ",
    "Winner winner! ",
  ],
  Computer: [
    "Better luck next time! ",
    "Oops! That didn't work out. ",
    "Defeated, but not done! ",
    "Crushed by the computer! ",
    "The crown slips away... ",
    "Outplayed this time. ",
  ],
  Tie: [
    "Great minds think alike! ",
    "It's a draw! ",
    "No winners this time! ",
    "Neither side budged... ",
    "Mirror match! ",
    "Nobody wins, nobody loses! ",
  ],
};

export const WINNER_DETAIL = {
  User: "User",
  Computer: "Computer",
  Tie: "Tie",
  ToStart: "ToStart",
};

export const MATCH_TYPE = {
  TOURNAMENT: "Tournament",
  NORMAL: "Normal",
};

export const MATCH_DETAILS = {
  selectionComplete: false, //required for completion of computer selection
  userSelectInfo: "", //the option, user has selected
  compSelectInfo: "", //the option, computer has selected
  normalMatchResult: {
    oneOnOneWinner: "",
  },
  tournamentMatchResult: {
    isTournamentSelected: false, //false for normal game & true for tournament
    totalMatchToConduct: 0,
    tournamentsCompleted: 0,
    userWinningCount: 0,
    compWinningCount: 0,
    currentRoundWinner: "",
  },
};

export const FEEDBACK = {
  MSG1: "Whether you enjoyed the game or see room for improvement, your input truly matters. Feel free to reach out via ",
  MSG2: "I'd love to hear from you. Thanks so much for checking it out!",
  MAIL: "mailto:prathee024@email.com",
  LINKEDIN: "https://www.linkedin.com/in/pratheeksha-poonja-4a62a9bb/",
};
