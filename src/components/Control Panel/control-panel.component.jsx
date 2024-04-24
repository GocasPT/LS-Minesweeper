import React from "react";
import "./control-panel.css";

//TODO: improve this component
function ControlPanel(props) {
  const { gameStarted, level, onGameStart, onLevelChange, stopWatch, minesLeft } = props;
  
  const gameStartedClass = gameStarted ? " gameStarted" : "";

  return (
    <section id="panel-control">
      <h3 className="sr-only">Escolha do Nível</h3>
      <form className="form">
        <fieldset className="form-group">
          <label htmlFor="btLevel">Nível:</label>
          <select
            id="btLevel"
            defaultValue="0"
            onChange={onLevelChange}
            disabled={gameStarted}
          >
            <option value="0">Seleccione...</option>
            <option value="1">Básico (9x9 - 10 minas)</option>
            <option value="2">Intermédio (16x16 - 40 minas)</option>
            <option value="3">Avançado (30x16 - 90 minas)</option>
          </select>
        </fieldset>
        <button
          type="button"
          id="btPlay"
          disabled={level === "0"}
          onClick={onGameStart}
        >
          {gameStarted ? "Parar jogo" : "Iniciar Jogo"}
        </button>
      </form>
      <div className="form-metadata">
        <p id="message" role="alert" className="hide">
          Clique em Iniciar o Jogo!
        </p>
        <dl className={`list-item left${gameStartedClass}`}>
          <dt>Tempo de Jogo:</dt>
          <dd id="gameTime">{stopWatch}</dd>
        </dl>
        <dl className={`list-item right${gameStartedClass}`}>
          <dt>Minas restantes</dt>
          <dd id="minesLeft">{minesLeft}</dd>
        </dl>
      </div>
    </section>
  );
}

export default ControlPanel;
