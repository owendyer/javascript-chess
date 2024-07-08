export enum PieceType {
  None = 0,
  Bishop,
  King,
  Knight,
  Pawn,
  Queen,
  Rook,
}

export enum PieceColor {
  White = 0,
  Black,
}

export interface SquareProps {
  square: string;
  color?: string;
  location: {
    file: number;
    rank: number;
  };
}

export interface PieceProps {
  type: PieceType;
  color: PieceColor;
  square: SquareProps;
}

export const pieceTypeFromSymbol: { [key: string]: PieceType } = {
  b: PieceType.Bishop,
  k: PieceType.King,
  n: PieceType.Knight,
  p: PieceType.Pawn,
  q: PieceType.Queen,
  r: PieceType.Rook,
};