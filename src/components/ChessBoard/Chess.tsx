"use client";

import Board, { initBoard } from "./Board";
import Piece from "./Piece";
import { loadPositionFromFen } from "./helpers";
import { PieceProps, PieceType, SquareProps } from "./types";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  restrictToParentElement,
  snapCenterToCursor,
} from "@dnd-kit/modifiers";
import { useState } from "react";

function Chess() {
  /*
        Load starting position. This could be made to be dynamic
    */

  const squares: SquareProps[] = initBoard();

  const [pieces, setPieces] = useState<PieceProps[]>(
    loadPositionFromFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR")
  );

  //   const pieces: PieceProps[] = loadPositionFromFen(
  //     'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'
  //   );

  const getLegalRookMoves = (piece: PieceProps) => {
    const rank = piece.square.location.rank;
    const file = piece.square.location.file;

    /*
      Rooks can move horizontally/vertically so we need to find all squares that have the same file and different rank or the same rank and different files
    */
    const candidateMoves = squares.filter((square) => {
      return square.location.file === file || square.location.rank === rank;
    });

    const fileMoves = squares.filter((square) => square.location.file === file);
    const rankMoves = squares.filter((square) => square.location.rank === rank);

    const piecesOnFile = pieces.filter(
      (piece) =>
        piece.square.location.file === file &&
        piece.square.location.rank !== rank
    );

    console.log("File moves:");
    console.log(fileMoves);
    console.log("Pieces on file:");
    console.log(piecesOnFile);

    const beforePiece = fileMoves.slice(0, file);
    const afterPiece = fileMoves.slice(file);

    const possibleMovesBeforePiece = beforePiece.toReversed().map((square) => {
      if (square.square === piece.square.square) {
        return undefined;
      }
      const algebraic = square.square;
      const firstPiece = pieces.find(
        (piece) => piece.square.location.file === square.location.file
      );
      console.log(`First piece on: ${firstPiece?.square.square}`);
    });

    // console.log(beforePiece);
    // console.log(afterPiece);

    /*
      Go over all of the squares on the file and find the first one with a piece (if it exists)
    */
    const candidateFileMoves = fileMoves.map((square) => {
      const origin = piece.square.location;
      /*
        If the current square is the same as the one that our moving piece is on then return undefined (this is not a legal move)
      */
      if (square.location === origin) {
        return undefined;
      }
    });

    /*
      To find legal moves:
      1. Go through all of the candidate moves and find the first piece on the rank/file
      2. Check if the piece is the same color as our moving piece
      3. If the piece is the same color, remove it. If the piece is the other color, keep it
      4. Remove all squares past the first occupied square (if it exists)
    */
    const legalMoves = candidateMoves.map((square) => {
      /*
        Check if the current square is occupied by a piece
      */
      const algebraic = square.square;
      const occupant = pieces.find(
        (piece) => piece.square.square === algebraic
      );
      /*
        Check if the current square is occupied by a piece of the same color
      */
      if (occupant?.color === piece.color) {
        console.log(`Piece on ${algebraic} is the same color as piece`);
        return undefined;
      }
      if (occupant) {
        console.log(
          `${algebraic} is occupied by ${occupant.color}${occupant.type}`
        );
      }

      return square;
    });

    console.log("Legal moves:");
    console.log(legalMoves);
  };

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

      // const rank = piece.square.location.rank;
      // const file = piece.square.location.file;

      // const candidateMoves = pieces.filter((move) => {
      //   return (
      //     move.square.location.file === file ||
      //     move.square.location.rank === rank
      //   );
      // });

      // const legalMoves = candidateMoves.map((move) => {
      //   if (move.color === piece.color) {
      //     return;
      //   }
      //   return move;
      // });

      // console.log(legalMoves);
      getLegalRookMoves(piece);
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
      console.log("Invalid piece");
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
        console.log("Pieces are the same color. Illegal move");
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
        <Board board={squares} />
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
