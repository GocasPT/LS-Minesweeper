import React from 'react';
import { CODES, EMOTES } from '../../constants'

const Cell = (props) => {
    const { value, isRevealed, onLeftClieck, onRighClick } = props;

    const handleClick = (event) => {
        console.log(event);
        console.log(event.button);
        //use onLeftClieck or onRighClick depending on the event.button
        //onLeftClieck()
        //onRighClick();
    }

    return (
        <div className="cell">
            <button
                onClick={handleClick}
                className={isRevealed ? "revealed" : ""}
            >
                {isRevealed
                ? (value === CODES.MINE
                    ? EMOTES.MINE
                    : value === CODES.FLAG
                    ? EMOTES.FLAG
                    : value === CODES.QUESTION
                    ? EMOTES.QUESTION
                    : value === CODES.MINE_FLAG
                    ? EMOTES.MINE
                    : value === CODES.MINE_QUESTION
                    ? EMOTES.MINE
                    : value === CODES.NOTHING
                    ? ""
                    : value)
                : ""}
            </button>
        </div>
    );
};

export default Cell;