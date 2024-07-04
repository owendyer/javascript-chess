import {
  PieceType,
  SquareProps,
  PieceColor,
  PieceProps,
  pieceTypeFromSymbol,
} from './types';

export function getFileCharacter(fileIndex: number) {
  return String.fromCharCode(97 + fileIndex);
}

export function getFileNumber(file: string | undefined) {
  if (file === undefined) {
    return -1;
  }

  return file.charCodeAt(0) - 97;
}

export function getSquareFromLocation(file: number, rank: number) {
  return `${getFileCharacter(file)}${rank}`;
}

export function loadPositionFromFen(fen: string) {
  const fenBoard = fen.split(' ')[0];
  // console.log(fenBoard);
  let file = 0;
  let rank = 7;

  const pieces: PieceProps[] = [];

  for (const symbol of fenBoard) {
    if (symbol === '/') {
      file = 0;
      rank--;
    } else {
      if (isNaN(parseInt(symbol)) === false) {
        file += parseInt(symbol);
      } else {
        const pieceColor =
          symbol.toUpperCase() === symbol ? PieceColor.White : PieceColor.Black;
        const pieceType = pieceTypeFromSymbol[symbol.toLowerCase()];

        pieces.push({
          type: pieceType,
          color: pieceColor,
          square: {
            square: getSquareFromLocation(file, rank),
            location: {
              file: file,
              rank: rank,
            },
          },
        });

        file++;
      }
    }
  }

  return pieces;
}
