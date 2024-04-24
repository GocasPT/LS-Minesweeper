import React from 'react';
import { CELL_FLAG, CELL_VALUES, EMOTES } from '../../constants'
import './cell.css';

const Cell = (props) => {
    const { item, onLeftClieck, onRighClick } = props;

    return (
        <div className="cell">
            <button
                onContextMenu={(event) => onRighClick(event, item.x, item.y)}
                onClick={() => onLeftClieck(item.x, item.y)}
                className={item.flag === CELL_FLAG.FLAG ? 'flag' 
                    : item.flag === CELL_FLAG.QUESTION ? 'question'
                    : item.revealed ? 'revealed'
                    : item.value === CELL_VALUES.MINE ? 'mine'
                    : ''}
                id={item.value > CELL_VALUES.EMPTY ? "num"+item.value : ""}
            >
                { /*TODO: force to shot the mine on the game over (lose)*/ item.revealed ? (
                    item.value === CELL_VALUES.MINE ? EMOTES.MINE
                    : item.value === CELL_VALUES.EMPTY ? ''
                    : item.value
                ) : (
                    item.flag === CELL_FLAG.FLAG ? EMOTES.FLAG
                    : item.flag === CELL_FLAG.QUESTION ? EMOTES.QUESTION
                    : ''
                )}
            </button>
        </div>
    );
};

export default Cell;