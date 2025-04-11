import { IMAGE_MAP } from "./Constants";
import guide from "./assets/guideline.png";
import Image from "./utils/Image";
import Modal from "./utils/Modal";
import PropTypes from "prop-types";

export const Guide = ({ onClose }) => {
  return (
    <Modal text="Guide book" onClose={onClose}>
      <div className="game-rule-font">
        <p>
          Rock, Paper, Scissors is a quick and fun game played between two
          players - in this case, you vs the computer. The goal is to choose a
          hand gesture that beats your opponent's choice.
        </p>
        <strong>How to Play? </strong>
        <div>
          Get ready for a quick and classic face-off! <br />
          Choose your move - Rock, Paper or Scissors. The computer picks at the
          same time. The winner is decided by these rules:
          <ul className="game-rules">
            <li className="flex-center">
              Rock(
              <Image src={IMAGE_MAP.Rock} alt="Rock" />) crushes Scissors(
              <Image src={IMAGE_MAP.Scissors} alt="Scissors" />)
            </li>
            <li className="flex-center">
              Paper(
              <Image src={IMAGE_MAP.Paper} alt="Paper" />) covers Rock(
              <Image src={IMAGE_MAP.Rock} alt="Rock" />)
            </li>
            <li className="flex-center">
              Scissors(
              <Image src={IMAGE_MAP.Scissors} alt="Scissors" />) cut Paper(
              <Image src={IMAGE_MAP.Paper} alt="Paper" />)
            </li>
            <li className="flex-center">Same move? It's a tie</li>
          </ul>
          <em>Make your choice… and may the best pick win!</em>
        </div>
        <img src={guide} alt="Guide" />
        <>
          <h4>Best of N Matches Mode</h4>
          <p>
            In this mode, the player chooses how many matches to play - anywhere
            from 2 to 100.
            <br />
            After selecting the number: The player plays Rock Paper Scissors one
            round at a time. Each round shows who won (player, computer, or
            draw).
            <br />
            The game keeps track of scores for both sides. <br />
            Once all matches are finished, the game shows the final winner based
            on the total score. <br />
            <strong>
              <em>
                It's a fun way to play multiple rounds and see who comes out on
                top!
              </em>
            </strong>
          </p>
        </>
      </div>
    </Modal>
  );
};

Guide.propTypes = {
  onClose: PropTypes.func,
};

Guide.defaultProps = {
  onClose: () => alert("Close"),
};
