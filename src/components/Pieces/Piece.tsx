'use client';

import React, { useEffect, useState } from 'react';

import { DragEvent } from 'react';
// import { DragPreviewImage, useDrag } from 'react-dnd';
import Image from 'next/image';
// import { getEmptyImage } from 'react-dnd-html5-backend';

import { useDraggable } from '@dnd-kit/core';
import { getFileCharacter } from '../ChessBoard/helpers';

// export default function Piece(props: Props) {
//   const { attributes, listeners, setNodeRef, transform } = useDraggable({
//     id: `${props.pieceColor}${props.pieceType}-${props.square}`,
//     data: {
//       pieceType: props.pieceType,
//       pieceColor: props.pieceColor,
//       sourceSquare: {
//         square: props.square,
//         file: props.file,
//         rank: props.rank,
//       },
//     },
//   });

//   const style = transform
//     ? {
//         transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
//       }
//     : undefined;

//   const getClassName = () => {
//     let c = 'bg-cover cursor-grab active:cursor-grabbing ';
//     c += ' bg-' + props.pieceColor + props.pieceType;
//     c += ` row-start-${8 - props.rank} col-start-${props.file + 1}`;
//     return c;
//   };

//   const [pieceStyle, setPieceStyle] = useState({
//     opacity: 1,
//   });

//   return (
//     <div
//       ref={setNodeRef}
//       className={getClassName()}
//       style={style}
//       {...listeners}
//       {...attributes}
//     />
//   );
// }

// export default function Piece(props: Props) {
//   const { attributes, listeners, setNodeRef, transform } = useDraggable({
//     id:
//       props.pieceColor +
//       props.pieceType +
//       '-' +
//       getFileCharacter(props.file) +
//       String(props.rank),
//     data: {
//       type: props.pieceType,
//       color: props.pieceColor,
//       location: {
//         rank: props.rank,
//         file: props.file,
//       },
//     },
//   });

//   const pieceSymbolFromType: { [key: number]: string } = {
//     1: 'b',
//     2: 'k',
//     3: 'n',
//     4: 'p',
//     5: 'q',
//     6: 'r',
//   };

//   const pieceColor = props.pieceColor ? 'b' : 'w';

//   const className = `bg-${pieceColor}${
//     pieceSymbolFromType[props.pieceType]
//   } bg-cover row-start-${8 - props.rank} col-start-${props.file + 1}
//   `;

//   const dragStyle = {
//     transform: transform
//       ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
//       : undefined,
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       {...listeners}
//       {...attributes}
//       style={dragStyle}
//       className={className}
//     />
//   );
// }

interface PieceProps {
  pieceType: number;
  pieceColor: number;
  location: Square;
}

interface Square {
  rank: number;
  file: number;
}

/*
    TODO: Globalize this
  */

const ranks: string[] = ['1', '2', '3', '4', '5', '6', '7', '8'];
const files: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export class Piece extends React.Component {
  pieceType: number;
  pieceColor: number;
  location: Square;

  constructor(props: PieceProps) {
    super(props);
    this.pieceType = props.pieceType;
    this.pieceColor = props.pieceColor;
    this.location = props.location;

    this.state = {
      location: {
        file: this.location.file,
        rank: this.location.rank,
      },
    };

    // this.setState({});
  }

  move(to: Square) {
    this.setState({
      location: {
        file: to.file,
        rank: to.rank,
      },
    });

    this.location = to;
  }

  colorNumber() {
    return this.pieceColor;
  }

  colorString() {
    return this.pieceColor === 0 ? 'w' : 'b';
  }

  typeNumber() {
    return this.pieceType;
  }

  symbolFromType() {
    const symbols = [undefined, 'b', 'k', 'n', 'p', 'q', 'r'];
    return symbols[this.pieceType];
  }

  get square() {
    return files[this.location.file] + ranks[this.location.rank];
  }

  render() {
    return (
      <PieceComponent
        square={this.square}
        pieceType={this.symbolFromType()}
        pieceColor={this.colorString()}
        location={this.location}
      />
    );
  }
}

interface PieceComponentProps {
  square: string;
  pieceType: number;
  pieceColor: number;
  location: Square;
}

function PieceComponent(props: PieceComponentProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.pieceColor + props.pieceType + '-' + props.square,
    data: {
      type: props.pieceType,
      color: props.pieceColor,
      location: props.location,
    },
  });
  /*
    TODO: Globalize board perspective so that this can be switched
  */
  const boardPerspective = 'w';
  const rowStart =
    boardPerspective === 'w'
      ? 8 - props.location.rank
      : props.location.rank + 1;
  const colStart =
    boardPerspective === 'w'
      ? props.location.file + 1
      : 8 - props.location.file;
  /*
    NOTE: +1 for rank and file in grid since they are index from 0-7 instead of 1-8 like the grid
  */
  const className = `bg-${props.pieceColor}${props.pieceType} bg-cover row-start-${rowStart} col-start-${colStart}
  `;
  const dragStyle = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={className}
      style={dragStyle}
    >
      {/* {props.square} */}
    </div>
  );
}

/*
  TODO: Move this to its own file
*/

interface PiecesProps {
  pieces: Piece[];
}

export class Pieces extends React.Component<PiecesProps> {
  pieces: Piece[];
  constructor(props: PiecesProps) {
    super(props);
    this.pieces = this.props.pieces;
    this.setState({
      pieces: this.props.pieces,
    });
  }
  render() {
    return (
      <>
        {this.pieces.map((piece) => (
          <>{piece.render()}</>
        ))}
      </>
    );
  }
}

// export class Pieces {
//   pieces: Piece[];
//   constructor() {
//     this.pieces = [];
//   }

//   addPiece(piece: PieceProps) {
//     const p = new Piece(piece);
//     this.pieces.push(p);
//     return p;
//   }

//   getPieces() {
//     return this.pieces;
//   }

//   movePiece(from: Square, to: Square) {
//     const sourcePieceIndex = this.pieces.findIndex((piece) => {
//       return (
//         piece.location.file === from.file && piece.location.rank === from.rank
//       );
//     });

//     const targetPieceIndex = this.pieces.findIndex((piece) => {
//       return piece.location.file === to.file && piece.location.rank === to.rank;
//     });

//     if (this.pieces.at(sourcePieceIndex) === undefined) {
//       console.log('Attempted to move invalid piece');
//       return;
//     }

//     this.pieces.at(sourcePieceIndex)?.move(to);
//   }
// }
