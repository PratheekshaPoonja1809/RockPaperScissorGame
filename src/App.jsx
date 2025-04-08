import React, { useEffect, useState } from "react";
import "./App.css";
import Button from "./utils/Button";
import { Userselection } from "./Userselection";
import { Computerselection } from "./Computerselection";
import { Results } from "./Results";
import { APP_TITLE, UserContext } from "./Constants";
import { HelpCircle } from "react-feather";
import Modal from "./utils/Modal";
import { FaceOff } from "./FaceOff";

function App() {
  const [startGame, setStartGame] = useState(false);
  const [timer, setTimer] = useState(3);
  const [modalDisplay, setModalDisplay] = useState(false);
  const [finalSelection, setFinalSelection] = useState({
    userSelectInfo: "",
    compSelectInfo: "",
    selectionComplete: false,
    gameWinner: "",
  });

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
      }, 500);
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
              <HelpCircle className="menu-option help" onClick={toggleModal} />
              <FaceOff />
            </div>
          )}
          {modalDisplay && (
            <Modal onClose={setModalDisplay} text="Guide book" />
          )}
        </section>
        {!startGame && (
          <Button
            text="Lets Go..."
            onClick={startTheGameFn}
            className={`${!startGame ? "start-game" : undefined}`}
          />
        )}
        {startGame && timer > 0 && <p>Game starts in {timer}</p>}
        {!timer && (
          <section className="full-width">
            <Userselection />
            <Computerselection
              selectionDone={finalSelection.selectionComplete}
            />
            <Results />
          </section>
        )}
      </main>
    </UserContext.Provider>
  );
}

export default App;
