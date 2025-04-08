import React, { useEffect, useState } from "react";
import "./App.css";
import Button from "./utils/Button";
import { Userselection } from "./Userselection";
import { Computerselection } from "./Computerselection";
import { Results } from "./Results";
import { APP_TITLE, UserContext } from "./Constants";
import { HelpCircle } from "react-feather";
import Modal from "./utils/Modal";

function App() {
  const [startGame, setStartGame] = useState(false);
  const [timer, setTimer] = useState(3);
  const [modalDisplay, setModalDisplay] = useState(false);
  const [finalSelection, setFinalSelection] = useState({
    userSelectInfo: "",
    compSelectInfo: "",
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
        {!timer && <HelpCircle className="help" onClick={toggleModal} />}
        {modalDisplay && <Modal onClose={setModalDisplay} text="Guide book" />}
      </header>
      <main>
        {!startGame && <Button text="Lets Go..." onClick={startTheGameFn} />}
        {startGame && timer > 0 && <p>Game starts in {timer}</p>}
        {!timer && (
          <section>
            <Userselection/>
            <Computerselection
              userInputChange={finalSelection.userSelectInfo}
            />
            <Results userInputChanged={finalSelection.userSelectInfo} />
          </section>
        )}
      </main>
    </UserContext.Provider>
  );
}

export default App;
