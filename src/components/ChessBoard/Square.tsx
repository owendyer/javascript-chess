import { getSquareFromLocation } from './helpers';
import { useDroppable } from '@dnd-kit/core';

export interface SquareProps {
  square?: string;
  color?: string;
  location: {
    file: number;
    rank: number;
  };
}

function Square(props: SquareProps) {
  const square = getSquareFromLocation(
    props.location.file,
    props.location.rank
  );
  const color =
    (props.location.file + props.location.rank) % 2 === 0 ? 'dark' : 'light';

  const { isOver, setNodeRef } = useDroppable({
    id: square,
    data: {
      square: square,
      location: props.location,
    },
  });

  const style = {
    border: isOver ? '6px solid white' : undefined,
  };

  return (
    <div id={square} ref={setNodeRef} className={`bg-square-${color}`} style={style}>
      {/* {square} */}
    </div>
  );
}

export default Square;
