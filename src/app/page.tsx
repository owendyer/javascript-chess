import ChessBoard from '@/components/ChessBoard/ChessBoard';
import Chess from '@/components/ChessBoard/Chess';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col place-content-center p-24">
      {/* <ChessBoard /> */}
      <Chess />
    </main>
  );
}
