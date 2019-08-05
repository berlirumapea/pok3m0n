import React from "react";
import Button from "../Button/Button";
import { PokemonContext } from "../../context";

const Modal = ({ id, isSuccess, closeModal, openPokemonList }) => {
  const { dispatch } = React.useContext(PokemonContext);
  const [nickName, setNickName] = React.useState("");
  const [isNickNameSubmitted, setIsNickNameSubmitted] = React.useState(false);

  const submitNickName = () => {
    if (nickName === "") return;
    setIsNickNameSubmitted(true);
    dispatch({ type: "SUBMIT_NICKNAME", payload: { id, nickName } });
  };

  const inputOnChange = e => setNickName(e.target.value);



  return (
    <div data-testid="modal">
      {isSuccess && (
        <div className="overlay" data-testid="success-modal">
          <h1>Success!</h1>
          <p>You now own this pokemon!</p>
          {!isNickNameSubmitted && (
            <>
              <input
                onChange={inputOnChange}
                placeholder="Pokemon Nickname"
                className="input-nickname"
                data-testid="input-nickname"
              />
              <Button
                content="Set Nickname"
                onClick={submitNickName}
                data-testid="submit-button"
              />
            </>
          )}

          {isNickNameSubmitted && (
            <>
              <Button
                content="View My Pokemon List"
                onClick={openPokemonList}
                data-testid="open-mypokemons"
              />

              <Button
                content="Close"
                backgroundColor="transparent"
                onClick={closeModal}
              />
            </>
          )}
        </div>
      )}
      { !isSuccess && (
        <div className="overlay" data-testid="fail-modal">
          <h1>Failed</h1>
          <p>You've failed to catch this pokemon. Try again later!</p>
          <Button
            content="Close"
            backgroundColor="transparent"
            onClick={closeModal}
          />
        </div>
      )}
    </div>
  );
};

export default Modal;
