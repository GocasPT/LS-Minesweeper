import React from "react";
import { Footer } from "../";
import "./game-over-modal.css";

//TODO: check this component
function GameOverModal(props) {
  const { isOpen, stopWatch, minesLeft, handleClose } = props;

  const modalClass = `w3-modal ${isOpen ? "show-modal" : ""}`;

  return (
    <div id="modal-gameOver" className={modalClass}>
      <div className="w3-modal-content w3-card-4 w3-animate-zoom estilos">
        <header>
          <span
            className="w3-button w3-display-topright closeModal"
            data-modalid="gameOver"
            onClick={handleClose}
          >
            &times;
          </span>
          <div>Jogo Terminado</div>
        </header>
        <div className="info" id="messageGameOver">
          <p>Minas restantes: {minesLeft}</p>
          <p>Tempo: {stopWatch} </p>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default GameOverModal;