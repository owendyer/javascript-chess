'use client';

import Square, { SquareProps } from './Square';
import { useState, useId } from 'react';
import { getSquareFromLocation } from './helpers';

export var BoardPerspective = 'w';

function Board() {
  //   const board: SquareProps[] = [];

  /*
        Initialize the board

        TODO: Add square color and algebraic representation to the object


        NOTE: Squares and pieces are indexed the same so rank=0 -> rank = 8 actually
    */
  const initBoard = () => {
    const tempBoard: SquareProps[] = [];
    for (var rank = 7; rank >= 0; --rank) {
      for (var file = 0; file < 8; ++file) {
        tempBoard.push({
          location: {
            file: file,
            rank: rank,
          },
        });
      }
    }

    return tempBoard;
  };

  const [board, setBoard] = useState<SquareProps[]>(initBoard());

  /*
    TODO: Finish implementing this
  */
  const flipBoard = () => {
    if (BoardPerspective === 'w') {
      BoardPerspective = 'b';
    } else {
      BoardPerspective = 'w';
    }
  };

  return (
    <>
      <div className="w-full h-full bg-blue-400 grid grid-cols-8 grid-rows-8">
        {board.map((square) => (
          <Square
            key={getSquareFromLocation(
              square.location.file,
              square.location.rank
            )}
            location={{
              file: square.location.file,
              rank: square.location.rank,
            }}
          />
        ))}
      </div>
      <button onClick={flipBoard}>Flip Board</button>
    </>
  );
}

export default Board;
