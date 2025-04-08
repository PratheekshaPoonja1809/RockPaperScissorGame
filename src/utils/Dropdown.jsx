import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { choices, UserContext } from "../Constants";

function Dropdown({ title }) {
  const userSelectionUpdate = useContext(UserContext);
  const [optionSelected, setOptionSelected] = useState(
    choices[0] || "Rock"
  );

  const changeUserSelection = (e) => {
    setOptionSelected(e.target.value);
    userSelectionUpdate.setFinalSelection((prev) => ({
      ...prev,
      userSelectInfo: e.target.value,
    }));
  };

  return (
    <>
      <label htmlFor="game-select">
        <strong>{title}</strong>
      </label>
      <select
        id="game-select"
        value={optionSelected}
        onChange={changeUserSelection}
      >
        {choices.map((choice) => (
          <option value={choice} key={choice}>
            {choice}
          </option>
        ))}
      </select>
    </>
  );
}

Dropdown.propTypes = {
  title: PropTypes.string,
};

Dropdown.defaultProps = {
  title: "Choose your move:",
};

export default Dropdown;
