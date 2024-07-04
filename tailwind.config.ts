import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        /* Piece images */
        BlackBishop: "url('/images/BlackBishop.png')",
        BlackKing: "url('/images/BlackKing.png')",
        BlackKnight: "url('/images/BlackKnight.png')",
        BlackPawn: "url('/images/BlackPawn.png')",
        BlackQueen: "url('/images/BlackQueen.png')",
        BlackRook: "url('/images/BlackRook.png')",
        WhiteBishop: "url('/images/WhiteBishop.png')",
        WhiteKing: "url('/images/WhiteKing.png')",
        WhiteKnight: "url('/images/WhiteKnight.png')",
        WhitePawn: "url('/images/WhitePawn.png')",
        WhiteQueen: "url('/images/WhiteQueen.png')",
        WhiteRook: "url('/images/WhiteRook.png')",
      },
      colors: {
        'square-dark': 'rgb(115 149 82)',
        'square-light': 'rgb(235 236 208)',
      },
      width: {
        '1/8': '12.5%',
      },
      height: {
        '1/8': '12.5%',
      },
    },
  },
  safelist: [
    {
      pattern: /row-start-(1|2|3|4|5|6|7|8)/,
    },
    {
      pattern: /col-start-(1|2|3|4|5|6|7|8)/,
    },
    {
      pattern:
        /bg-(BlackBishop|BlackKing|BlackKnight|BlackPawn|BlackQueen|BlackRook|WhiteBishop|WhiteKing|WhiteKnight|WhitePawn|WhiteQueen|WhiteRook)/,
    },
    {
      pattern: /bg-square-(light|dark)/,
    },
  ],
  plugins: [],
};
export default config;
