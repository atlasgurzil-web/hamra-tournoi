import React, { useState } from 'react';
import { Sparkles, CheckCircle2, RotateCcw, HelpCircle, Trophy, Award } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { dailyPuzzles } from '../../data/puzzlesData';
import { SectionTitle } from '../common/SectionTitle';

export const DailyChessPuzzle: React.FC = () => {
  const { t } = useLanguage();
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [solved, setSolved] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const puzzle = dailyPuzzles[currentPuzzleIndex];

  // Simplified 8x8 representation for the interactive puzzle visualizer
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  // Board pieces mapping for puzzle 1
  const initialPieces: Record<string, string> = {
    'a8': '♜', 'c8': '♝', 'd8': '♛', 'e8': '♚', 'f8': '♝', 'h8': '♜',
    'a7': '♟', 'b7': '♟', 'c7': '♟', 'd7': '♟', 'f7': '♟', 'g7': '♟', 'h7': '♟',
    'c6': '♞', 'e4': '♞',
    'c4': '♗', 'f3': '♘',
    'a2': '♙', 'b2': '♙', 'c2': '♙', 'd2': '♙', 'f2': '♙', 'g2': '♙', 'h2': '♙',
    'a1': '♖', 'c1': '♗', 'd1': '♕', 'e1': '♔', 'h1': '♖'
  };

  const handleSquareClick = (square: string) => {
    if (solved || revealed) return;

    if (!selectedSquare) {
      if (square === puzzle.solutionMove.from) {
        setSelectedSquare(square);
      }
    } else {
      if (square === puzzle.solutionMove.to) {
        setSolved(true);
      } else {
        setSelectedSquare(null);
        setAttempts(attempts + 1);
      }
    }
  };

  const handleSolveAuto = () => {
    setRevealed(true);
  };

  const handleNextPuzzle = () => {
    setCurrentPuzzleIndex((currentPuzzleIndex + 1) % dailyPuzzles.length);
    setSelectedSquare(null);
    setSolved(false);
    setRevealed(false);
  };

  const handleReset = () => {
    setSelectedSquare(null);
    setSolved(false);
    setRevealed(false);
  };

  return (
    <section className="py-16 sm:py-24 bg-slate-900/60 border-y border-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionTitle
          badge="Entraînement Tactique"
          title={t.puzzle.title}
          subtitle={t.puzzle.subtitle}
          align="center"
        />

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Chessboard Component (Vector Interactive SVG / Grid) */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="p-3 sm:p-4 rounded-3xl bg-slate-950 border-2 border-hamra-900/80 shadow-2xl w-full max-w-[360px] sm:max-w-[420px]">
              
              {/* Top files indicator */}
              <div className="grid grid-cols-8 text-center text-[10px] font-mono text-slate-500 mb-1">
                {files.map((f) => <span key={f}>{f}</span>)}
              </div>

              {/* Board Grid */}
              <div className="grid grid-cols-8 grid-rows-8 aspect-square rounded-xl overflow-hidden border border-slate-800 shadow-inner">
                {ranks.map((r, rankIdx) =>
                  files.map((f, fileIdx) => {
                    const square = `${f}${r}`;
                    const isLight = (rankIdx + fileIdx) % 2 === 0;
                    const isSelected = selectedSquare === square;
                    const isSolutionFrom = (solved || revealed) && puzzle.solutionMove.from === square;
                    const isSolutionTo = (solved || revealed) && puzzle.solutionMove.to === square;
                    const piece = (solved || revealed)
                      ? (square === puzzle.solutionMove.to ? initialPieces[puzzle.solutionMove.from] : (square === puzzle.solutionMove.from ? '' : initialPieces[square]))
                      : initialPieces[square];

                    return (
                      <button
                        key={square}
                        onClick={() => handleSquareClick(square)}
                        aria-label={`Case ${square}`}
                        className={`aspect-square relative flex items-center justify-center text-xl sm:text-2xl font-bold select-none transition-all ${
                          isSelected
                            ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300 z-10 scale-105 shadow-md'
                            : isSolutionTo
                            ? 'bg-emerald-500 text-white ring-2 ring-emerald-300 z-10 animate-bounce'
                            : isSolutionFrom
                            ? 'bg-hamra-700/60 text-white'
                            : isLight
                            ? 'bg-slate-200 text-slate-900 hover:bg-slate-100'
                            : 'bg-slate-700 text-white hover:bg-slate-600'
                        }`}
                      >
                        <span className="drop-shadow-sm">{piece}</span>
                        {/* Square Coordinate label */}
                        {fileIdx === 0 && (
                          <span className="absolute top-0.5 left-0.5 text-[8px] font-mono opacity-40">
                            {r}
                          </span>
                        )}
                        {rankIdx === 7 && (
                          <span className="absolute bottom-0.5 right-0.5 text-[8px] font-mono opacity-40">
                            {f}
                          </span>
                        )}
                      </button>
                    );
                  })
                )}
              </div>

              {/* Bottom files indicator */}
              <div className="grid grid-cols-8 text-center text-[10px] font-mono text-slate-500 mt-1">
                {files.map((f) => <span key={f}>{f}</span>)}
              </div>

            </div>
          </div>

          {/* Puzzle Explanation & Controls */}
          <div className="lg:col-span-5 space-y-5 bg-slate-950/80 p-6 sm:p-7 rounded-2xl border border-slate-800">
            
            <div className="flex items-center justify-between">
              <span className="text-xs px-2.5 py-1 rounded bg-hamra-950 text-hamra-400 font-bold border border-hamra-900">
                Difficulté : {puzzle.difficulty}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Défi {currentPuzzleIndex + 1} sur {dailyPuzzles.length}
              </span>
            </div>

            <h3 className="font-display font-bold text-xl text-white">
              {puzzle.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {puzzle.description}
            </p>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                <span className="w-3 h-3 rounded-full bg-white border border-slate-400"></span>
                <span>{puzzle.toMove === 'white' ? t.puzzle.toPlayWhite : t.puzzle.toPlayBlack}</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Touchez d'abord la pièce blanche, puis touchez la case de destination.
              </p>
            </div>

            {/* Success banner */}
            {(solved || revealed) && (
              <div className="p-4 rounded-xl bg-emerald-950/90 border border-emerald-700 text-emerald-200 space-y-2 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center gap-2 font-bold text-sm text-emerald-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>{solved ? t.puzzle.congrats : t.puzzle.solutionRevealed}</span>
                  <span className="font-mono bg-emerald-900 px-2 py-0.5 rounded text-white font-extrabold">
                    {puzzle.solutionMove.notation}
                  </span>
                </div>
                <p className="text-xs text-emerald-200/90 leading-relaxed">
                  {puzzle.explanation}
                </p>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex items-center gap-3 pt-2">
              {!solved && !revealed ? (
                <>
                  <button
                    onClick={handleSolveAuto}
                    className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
                  >
                    <HelpCircle className="w-4 h-4 text-trophy-gold" />
                    <span>Voir la Solution</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors border border-slate-700"
                    title="Réinitialiser"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <button
                  onClick={handleNextPuzzle}
                  className="w-full py-3 rounded-xl bg-hamra-600 hover:bg-hamra-500 text-white font-bold text-xs sm:text-sm shadow-club transition-all active:scale-95"
                >
                  Prochain Défi Tactique →
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
