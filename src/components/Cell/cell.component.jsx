import React from 'react';
import { CELL_FLAG, CELL_VALUES, EMOTES } from '../../constants'
import './cell.css';

const Cell = ({ item, onLeftClick, onRightClick }) => {
    const handleLeftClick = () => {
        onLeftClick(item.x, item.y);
    };

    const handleRightClick = (event) => {
        console.log(event);
        event.preventDefault();
        onRightClick(item.x, item.y);
    };

    const renderCellContent = () => {
        if (item.revealed) {
            switch (item.value) {
                case CELL_VALUES.EXPLOSION:
                    return EMOTES.EXPLOSION;
                case CELL_VALUES.MINE:
                    if (item.flag === CELL_FLAG.FLAG) {
                        return (
                            <>
                                {EMOTES.FLAG}
                                {EMOTES.MINE}
                            </>
                        );
                    }
                    return EMOTES.MINE;
                case CELL_VALUES.EMPTY:
                    return '';
                default:
                    return item.value;
            }
        } else if (item.flag === CELL_FLAG.FLAG) {
            return EMOTES.FLAG;
        } else if (item.flag === CELL_FLAG.QUESTION) {
            return EMOTES.QUESTION;
        }
    };

    const cellClass =
        item.revealed
            ? item.value === CELL_VALUES.MINE
                ? ''
                : 'revealed'
            : item.flag === CELL_FLAG.FLAG
            ? 'flag'
            : item.flag === CELL_FLAG.QUESTION
            ? 'question'
            : '';

    return (
        <div className="cell">
            <button
                onClick={handleLeftClick}
                onContextMenu={handleRightClick}
                className={cellClass}
                id={item.value > CELL_VALUES.EMPTY ? 'num' + item.value : ''}
            >
                <span className="emoji">{renderCellContent()}</span>
            </button>
        </div>
    );
};

export default Cell;