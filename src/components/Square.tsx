import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { getFileCharacter } from './ChessBoard/helpers';

interface Props {
  square: string;
  file: number;
  rank: number;
}

// export default function Square(props: Props) {
//   const { isOver, setNodeRef } = useDroppable({
//     id: props.square,
//     data: {
//       square: {
//         square: props.square,
//         file: props.file,
//         rank: props.rank,
//       },
//     },
//   });

//   const color = (props.file + props.rank) % 2 === 0 ? 'light' : 'dark';

//   const style = {
//     backgroundColor: isOver ? 'green' : undefined,
//   };

//   const className = `bg-square-${color}`;

//   return (
//     <div id={props.square} ref={setNodeRef} style={style} className={className}>
//     </div>
//   );
// }

interface SquareProps {
  rank: number;
  file: number;
}

const ranks: string[] = ['1', '2', '3', '4', '5', '6', '7', '8'];
const files: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export class Square extends React.Component {
  color: string;
  rank: number;
  file: number;
  constructor(props: SquareProps) {
    super(props);
    this.rank = props.rank;
    this.file = props.file;
    this.color = (this.rank + this.file) % 2 === 0 ? 'light' : 'dark';
  }

  colorString() {
    return this.color;
  }

  square() {
    return files[this.file] + ranks[this.rank];
  }

  render() {
    return (
      <SquareComponent
        square={this.square()}
        color={this.color}
        rank={this.rank}
        file={this.file}
      />
    );
  }
}

interface SquareComponentProps {
  square: string;
  color: string;
  rank: number;
  file: number;
}

function SquareComponent(props: SquareComponentProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.square,
    data: {
      square: props.square,
      file: props.file,
      rank: props.rank,
    },
  });

  const style = {
    backgroundColor: isOver ? 'green' : undefined,
  };

  const className = `bg-square-${props.color}`;
  return (
    <div id={props.square} ref={setNodeRef} className={className} style={style}>
      {props.square}
    </div>
  );
}
