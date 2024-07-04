'use client';

import { useState } from 'react';
import Piece from './Piece';

import { useDroppable } from '@dnd-kit/core';
import { getFileCharacter, getFileNumber } from '../ChessBoard/helpers';

interface Props {
  // pieces: string[][];
  pieces: any[][];
}

export default function Pieces(props: Props) {
  return (
    <div className="absolute left-0 right-0 top-0 bottom-0 grid grid-cols-8 grid-rows-8">
      {/* {props.pieces.map((r, rank) =>
        r.map((f, file) =>
          props.pieces[file][rank] ? (
            <Piece
              key={`${props.pieces[file][rank]}-${getFileCharacter(file)}${
                rank + 1
              }`}
              rank={rank}
              file={file}
              piece={props.pieces[file][rank]}
            />
          ) : null
        )
      )} */}
      {props.pieces
        .toReversed()
        .map((r, rank) =>
          r.map((s, square) =>
            s ? (
              <Piece
                key={`${s.color}${s.type}-${s.square}`}
                square={s.square}
                pieceType={s.type}
                pieceColor={s.color}
                file={getFileNumber(s.square)}
                rank={rank}
              />
            ) : null
          )
        )}
    </div>
  );
}