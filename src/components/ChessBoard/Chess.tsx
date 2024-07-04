'use client';

import Board from './Board';
import Piece from './Piece';
import { loadPositionFromFen } from './helpers';
import { PieceProps, PieceType } from './types';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import {
  restrictToParentElement,
  snapCenterToCursor,
} from '@dnd-kit/modifiers';
import { useState } from 'react';

function Chess() {
  /*
        Load starting position. This could be made to be dynamic
    */

  const [pieces, setPieces] = useState<PieceProps[]>(
    loadPositionFromFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR')
  );

  //   const pieces: PieceProps[] = loadPositionFromFen(
  //     'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'
  //   );

  /*
    Get all of the legal moves that a piece can make from its current square
  */
  const getLegalMoves = (piece: PieceProps) => {
    console.log(piece);

    /*
        Rooks
    */
    if (piece.type === PieceType.Rook) {
      /*
        Rook can only move horizontally/vertically so either the row or column must stay the same
        */

      const rank = piece.square.location.rank;
      const file = piece.square.location.file;

      const candidateMoves = pieces.filter((move) => {
        return (
            move.square.location.file === file ||
            move.square.location.rank === rank
        );
      });

      const legalMoves = candidateMoves.map((move) => {
        if (move.color === piece.color) {
            return;
        }
        return move;
      })

      console.log(legalMoves);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id === over?.id) {
      return;
    }

    console.log(active);
    console.log(over);
    console.log(pieces);

    const piece = pieces.find(
      (piece) => piece.square.square === active.data.current.square.square
    );

    if (piece === undefined) {
      console.log('Invalid piece');
      return;
    }

    getLegalMoves(piece);

    /*
        Check if the drop square is occupied
    */
    const targetSquare = pieces.find(
      (piece) => piece.square.square === over?.data.current.square
    );

    /*
        Square is empty, piece can go to it (not including king because of check)
    */
    if (targetSquare === undefined) {
      /*
            TODO: Add move piece stuff here (should just make a function probably)
        */
      const piecesCopy = pieces;
      setPieces(
        piecesCopy.map((piece) => {
          if (piece.square.square === active.data.current.square.square) {
            return {
              ...piece,
              square: {
                square: over?.data.current.square,
                location: over?.data.current.location,
              },
            };
          } else {
            return piece;
          }
        })
      );
    } else {
      /*
            Check if the piece on the target square is of the same color
        */
      if (targetSquare.color === active.data.current.color) {
        console.log('Pieces are the same color. Illegal move');
        return;
      }

      const piecesCopy = pieces;
      const targetSquareIndex = piecesCopy.findIndex(
        (piece) => piece.square.square === over?.data.current.square
      );
      piecesCopy.splice(targetSquareIndex, 1);

      setPieces(
        piecesCopy.map((piece) => {
          if (piece.square.square === active.data.current.square.square) {
            return {
              ...piece,
              square: {
                square: over?.data.current.square,
                location: over?.data.current.location,
              },
            };
          } else {
            return piece;
          }
        })
      );
    }
  };

  return (
    <div id="chess" className="aspect-square relative">
      <DndContext
        onDragEnd={handleDragEnd}
        modifiers={[snapCenterToCursor, restrictToParentElement]}
      >
        <Board />
        <div className="absolute left-0 top-0 right-0 bottom-0 w-full h-full grid grid-cols-8 grid-rows-8">
          {pieces.map((piece) => (
            <Piece
              key={`${piece.color}${piece.type}-${piece.square.square}`}
              type={piece.type}
              color={piece.color}
              square={piece.square}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
}

export default Chess;
