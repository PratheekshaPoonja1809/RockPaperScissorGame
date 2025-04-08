import React, { useContext, useState } from "react";
import Dropdown from "./utils/Dropdown";
import { choices, IMAGE_MAP, UserContext } from "./Constants";

export function Userselection() {
  const { setFinalSelection } = useContext(UserContext);
  const [selected, setSelected] = useState(choices[0]);

  const handleSelect = (value) => {
    setSelected(value);
    setFinalSelection((prev) => ({
      ...prev,
      userSelectInfo: value,
    }));
  };

  return (
    <>
      <p>
        <strong>Choose an option:</strong>
      </p>
      <div className="image-selection">
        {choices.map((choice) => (
          <img
            key={choice}
            src={IMAGE_MAP[choice]}
            alt={choice}
            title={choice}
            onClick={() => handleSelect(choice)}
            className={`choosen-img ${selected === choice ? "selected" : ""}`}
          />
        ))}
      </div>
      <div className="selection-div-cntr">
        <label htmlFor="user-input-select">
          <strong>Your Selection:</strong>
        </label>
        <br />
        <img
          id="user-input-select"
          src={IMAGE_MAP[selected]}
          alt={selected}
          title={selected}
          className={`user-choice-img`}
        />
      </div>
    </>
  );
}
