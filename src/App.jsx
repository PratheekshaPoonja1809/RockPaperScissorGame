import React, { useEffect, useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "./App.css";
import Button from "./utils/Button";
import { Userselection } from "./Userselection";
import { Computerselection } from "./Computerselection";
import { Results } from "./Results";
import { APP_TITLE, FEEDBACK, MATCH_DETAILS, UserContext } from "./Constants";
import { HelpCircle, Linkedin, Mail, MoreVertical } from "react-feather";
import Modal from "./utils/Modal";
import { FaceOff } from "./FaceOff";
import { Guide } from "./Guide";

function App() {
  const [startGame, setStartGame] = useState(false);
  const [isFeedbackRequested, setFeedbackRequested] = useState(false);
  const [timer, setTimer] = useState(3);
  const [modalDisplay, setModalDisplay] = useState(false);
  const [finalSelection, setFinalSelection] = useState(MATCH_DETAILS);

  const startTheGameFn = () => {
    setStartGame(true);
    setTimer(3);
  };

  const toggleModal = () => {
    setModalDisplay(!modalDisplay);
  };

  useEffect(() => {
    let interval;
    if (startGame && timer > 0) {
      interval = setInterval(() => {
        setTimer((t) => t - 1);
      }, 100);
    }

    return () => clearInterval(interval);
  }, [startGame, timer]);

  return (
    <UserContext.Provider value={{ finalSelection, setFinalSelection }}>
      <header className={`header ${startGame ? "top" : "center"}`}>
        {APP_TITLE}
      </header>
      <main className="main-container">
        <section>
          {!timer && (
            <div className="menu-cntr">
              <Tippy content="Give us your thoughts">
                <MoreVertical
                  onClick={() => setFeedbackRequested(!isFeedbackRequested)}
                />
              </Tippy>
              <Tippy content="View app guide">
                <HelpCircle
                  className="menu-option help"
                  onClick={toggleModal}
                />
              </Tippy>
              <FaceOff />
            </div>
          )}
          {modalDisplay && <Guide onClose={setModalDisplay} />}
          {isFeedbackRequested && (
            <Modal
              text="Got feedback? We're all ears!"
              onClose={() => setFeedbackRequested(!isFeedbackRequested)}
            >
              <p className="feedback-para">
                {FEEDBACK.MSG1}
                <a href={FEEDBACK.MAIL}>
                  <Tippy content="Get in touch via email">
                    <Mail width="35px" />
                  </Tippy>
                </a>{" "}
                or{" "}
                <a
                  href={FEEDBACK.LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Tippy content="Connect with me on LinkedIn">
                    <Linkedin width="35px" />
                  </Tippy>
                </a>
                {FEEDBACK.MSG2}.
              </p>
            </Modal>
          )}
        </section>
        {!startGame && (
          <Button
            text="Lets Go..."
            onClick={startTheGameFn}
            className={`${!startGame ? "start-game button" : undefined}`}
          />
        )}
        {startGame && timer > 0 && <p>Game starts in {timer}</p>}
        {!timer && (
          <section className="full-width">
            <Userselection />
            <Computerselection />
            <Results />
          </section>
        )}
      </main>
    </UserContext.Provider>
  );
}

export default App;
