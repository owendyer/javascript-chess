import { SquareProps } from './Square';
import { PieceProps, PieceType, PieceColor, pieceTypeFromSymbol } from './types';
import { BoardPerspective } from './Board';
import { useDraggable } from '@dnd-kit/core';
import { getSquareFromLocation } from './helpers';
import { CSS } from '@dnd-kit/utilities';

function Piece(props: PieceProps) {
  const color = PieceColor[props.color];
  const type = PieceType[props.type];
  const square = getSquareFromLocation(
    props.square.location.file,
    props.square.location.rank
  );

  const rowStart =
    BoardPerspective === 'w'
      ? 8 - props.square.location.rank
      : props.square.location.rank + 1;
  const colStart =
    BoardPerspective === 'w'
      ? props.square.location.file + 1
      : 8 - props.square.location.file;

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: color + type + '-' + square,
    data: {
      type: props.type,
      color: props.color,
      square: props.square,
    },
  });

  const dragStyle = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`bg-${color}${type} bg-cover row-start-${rowStart} col-start-${colStart} cursor-grab active:cursor-grabbing`}
      style={dragStyle}
    >
        {square}
        </div>
  );
}

export default Piece;
