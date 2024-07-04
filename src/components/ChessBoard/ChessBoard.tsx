'use client';

import React from 'react';
// import Square from '../Square';
import {
  getFileCharacter,
  getFileNumber,
  loadPositionFromFen,
} from './helpers';
// import Pieces from '../Pieces/Pieces';
import { DndContext, DragEndEvent, useDroppable } from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import { snapCenterToCursor } from '@dnd-kit/modifiers';
// import Piece from '../Pieces/Piece';
import { Piece, Pieces } from '../Pieces/Piece';
import { Square } from '../Square';

const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];
const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

// interface Piece {
//   image: string;
//   x: number;
//   y: number;
// }

// interface PieceType {
//   type: string;
//   color: string;
//   rank: number;
//   file: number;
// }

interface BoardProps {
  position: string;
}

class Board extends React.Component<BoardProps> {
  board: Square[] = [];

  constructor(props: BoardProps) {
    super(props);
    this.init();
  }

  addSquare(rank: number, file: number) {
    const s = new Square({
      rank: rank,
      file: file,
    });

    this.board.push(s);
    return s;
  }

  /*
    TODO: Change this so that ranks and files can start from 0
  */
  init() {
    for (var rank = 7; rank >= 0; --rank) {
      for (var file = 0; file < 8; ++file) {
        this.addSquare(rank, file);
      }
    }
    // const position = loadPositionFromFen(this.props.position);
    // position.map((piece) => {

    // })
  }

  render() {
    return <>{this.board.map((square) => square.render())}</>;
  }
}

export default function ChessBoard() {
  // const initPosition = () => {
  //   const position: PieceType[] = new Array();

  //   for (let i = 0; i < 8; ++i) {
  //     position.push({
  //       type: 'p',
  //       color: 'w',
  //       rank: 6,
  //       file: i,
  //     });
  //   }

  //   return position;
  // };

  // NOTE: This returns numbers for each piece. these needs to be converted to the piece type
  const loadedFen = loadPositionFromFen(
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'
  );
  // console.log("Loaded fen:");
  // console.log(loadedFen);

  // const pieceTypeFromIndex: { [key: number]: string } = {
  //   1: 'b',
  //   2: 'k',
  //   3: 'n',
  //   4: 'p',
  //   5: 'q',
  //   6: 'r',
  // };

  // const board: Board = new Board();
  // board.init();

  // console.log(board.board);

  // const piecesss: Pieces = new Pieces();
  const piecesss: Piece[] = [];

  const fenToPieces = loadedFen.map((piece) => {
    // piecesss.addPiece({
    //   pieceType: piece.type,
    //   pieceColor: piece.color,
    //   location: piece.location,
    // });
    piecesss.push(
      new Piece({
        pieceType: piece.type,
        pieceColor: piece.color,
        location: piece.location,
      })
    );
  });

  // const [pieces, updatePieces] = useState(piecess);

  /*
    NOTE: The extra array here for state might be extra. Could just do this with the piecesss array if the board can refresh with its state
  */
  // const [pieces, updatePieces] = useState(piecesss.getPieces());

  // console.log(pieces);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    // console.log(active);
    // console.log(over);

    if (active.id === over?.id) {
      return;
    }

    if (
      active.data.current.location.rank === over?.data.current.rank &&
      active.data.current.location.file === over?.data.current.file
    ) {
      console.log('from same square');
    } else {
      console.log(active.data.current);
      console.log(over?.data.current);
      console.log('from different square');
    }

    const sourceSquare = {
      rank: active.data.current.location.rank,
      file: active.data.current.location.file,
    };

    const targetSquare = {
      file: over?.data.current.file,
      rank: over?.data.current.rank,
    };

    piecesss
      .find((piece) => {
        return (
          piece.location.file === sourceSquare.file &&
          piece.location.rank === sourceSquare.rank
        );
      })
      ?.setState({
        location: {
          file: targetSquare.file,
          rank: targetSquare.rank,
        },
      });

    // if (
    //   active.data.current.square ===
    //   over?.data.current.square
    // ) {
    //   console.log('from same square');
    //   return;
    // }

    // if (
    //   active.data.current.sourceSquare.square ===
    //   over?.data.current.square.square
    // ) {
    //   return;
    // }

    // const sourceSquare = {
    //   file: active.data.current.sourceSquare.file,
    //   rank: active.data.current.sourceSquare.rank,
    // };

    // const targetSquare = {
    //   file: over?.data.current.square.file,
    //   rank: over?.data.current.square.rank,
    // };

    // const piece = active.data.current.pieceType;

    // const piecesCopy = [...pieces];

    // piecesCopy[targetSquare.file][targetSquare.rank] = piece;
    // piecesCopy[sourceSquare.file][sourceSquare.rank] = '';

    // updatePieces(piecesCopy);
  };

  return (
    // <div id="chess-board" className="bg-blue-400 aspect-square relative">
    //   <DndContext onDragEnd={handleDragEnd} modifiers={[snapCenterToCursor]}>
    //     <div className="w-full h-full grid grid-cols-8 grid-rows-8">
    //       {ranks.map((rank, i) =>
    //         files.map((file, j) => (
    //           <Square
    //             key={`${getFileCharacter(file)}${rank}`}
    //             file={j}
    //             rank={rank}
    //           />
    //         ))
    //       )}
    //     </div>

    //     <Pieces pieces={pieces} />
    //   </DndContext>
    // </div>

    <div id="chess-board" className="bg-blue-400 aspect-square relative">
      <DndContext onDragEnd={handleDragEnd} modifiers={[snapCenterToCursor]}>
        <div className="w-full h-full grid grid-cols-8 grid-rows-8">
          {/* {ranks
            .map((rank, rank_index) =>
              files.map((file, file_index) => (
                <Square
                  key={file + rank}
                  square={file + rank}
                  file={file_index}
                  rank={rank_index}
                />
              ))
            )} */}
          {/* {board.board.map((square) => (
            <>{square.render()}</>
          ))} */}
          <Board position="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR" />
        </div>
        <div className="absolute left-0 right-0 top-0 bottom-0 grid grid-cols-8 grid-rows-8">
          {/* {pieces.map((piece) => (
            <>{piece.render()}</>
          ))} */}
          <Pieces pieces={piecesss} />
        </div>
      </DndContext>
    </div>
  );
}
