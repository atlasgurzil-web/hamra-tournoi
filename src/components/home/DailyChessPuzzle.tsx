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

  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

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
    <section className="py-16 sm:py-24 bg-[#181816]/70 border-y border-[#26241F] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionTitle
          badge="Entraînement Tactique"
          title={t.puzzle.title}
          subtitle={t.puzzle.subtitle}
          align="center"
        />

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Chessboard Component in Claude Warm Aesthetic */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="p-3 sm:p-4 rounded-3xl bg-[#141413] border border-[#2E2C27] shadow-2xl w-full max-w-[360px] sm:max-w-[420px]">
              
              {/* Top files indicator */}
              <div className="grid grid-cols-8 text-center text-[10px] font-mono text-[#7D786F] mb-1">
                {files.map((f) => <span key={f}>{f}</span>)}
              </div>

              {/* Board Grid */}
              <div className="grid grid-cols-8 grid-rows-8 aspect-square rounded-xl overflow-hidden border border-[#2E2C27] shadow-inner">
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
                            ? 'bg-[#D97757] text-white ring-2 ring-[#FAF7F2] z-10 scale-105 shadow-md'
                            : isSolutionTo
                            ? 'bg-[#7E9F80] text-white ring-2 ring-[#A8D5AA] z-10 animate-bounce'
                            : isSolutionFrom
                            ? 'bg-[#8A2E14] text-white'
                            : isLight
                            ? 'bg-[#EAE5D9] text-[#24221E] hover:bg-[#F3EFE7]'
                            : 'bg-[#403B33] text-[#FAF7F2] hover:bg-[#4E483F]'
                        }`}
                      >
                        <span className="drop-shadow-sm">{piece}</span>
                        {fileIdx === 0 && (
                          <span className="absolute top-0.5 left-0.5 text-[8px] font-mono opacity-50">
                            {r}
                          </span>
                        )}
                        {rankIdx === 7 && (
                          <span className="absolute bottom-0.5 right-0.5 text-[8px] font-mono opacity-50">
                            {f}
                          </span>
                        )}
                      </button>
                    );
                  })
                )}
              </div>

              {/* Bottom files indicator */}
              <div className="grid grid-cols-8 text-center text-[10px] font-mono text-[#7D786F] mt-1">
                {files.map((f) => <span key={f}>{f}</span>)}
              </div>

            </div>
          </div>

          {/* Puzzle Explanation & Controls in Claude Panel */}
          <div className="lg:col-span-5 space-y-5 bg-[#1E1D1A] p-6 sm:p-7 rounded-2xl border border-[#2E2C27] shadow-xl">
            
            <div className="flex items-center justify-between">
              <span className="text-xs px-2.5 py-1 rounded bg-[#2B1F19] text-[#E2896B] font-mono font-semibold border border-[#D97757]/30">
                Difficulté : {puzzle.difficulty}
              </span>
              <span className="text-xs text-[#9C968B] font-mono">
                Défi {currentPuzzleIndex + 1} / {dailyPuzzles.length}
              </span>
            </div>

            <h3 className="font-serif text-2xl text-[#F5F2EB]">
              {puzzle.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#BDB8AD] leading-relaxed font-sans">
              {puzzle.description}
            </p>

            <div className="p-3.5 rounded-xl bg-[#141413] border border-[#2E2C27]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#F5F2EB]">
                <span className="w-3 h-3 rounded-full bg-white border border-[#9C968B]"></span>
                <span>{puzzle.toMove === 'white' ? t.puzzle.toPlayWhite : t.puzzle.toPlayBlack}</span>
              </div>
              <p className="text-[11px] text-[#9C968B] mt-1 font-sans">
                Touchez d'abord la pièce blanche, puis touchez la case de destination.
              </p>
            </div>

            {/* Success banner in Claude Sage */}
            {(solved || revealed) && (
              <div className="p-4 rounded-xl bg-[#18261B] border border-[#7E9F80]/50 text-[#CDE6CE] space-y-2 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center gap-2 font-bold text-sm text-[#8FBC8F]">
                  <CheckCircle2 className="w-5 h-5 text-[#8FBC8F]" />
                  <span>{solved ? t.puzzle.congrats : t.puzzle.solutionRevealed}</span>
                  <span className="font-mono bg-[#253D2A] px-2 py-0.5 rounded text-white font-bold">
                    {puzzle.solutionMove.notation}
                  </span>
                </div>
                <p className="text-xs text-[#CDE6CE]/90 leading-relaxed font-sans">
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
                    className="flex-1 py-2.5 rounded-xl btn-obsidian font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <HelpCircle className="w-4 h-4 text-[#D4A373]" />
                    <span>Voir la Solution</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="px-3.5 py-2.5 rounded-xl btn-obsidian text-[#9C968B] hover:text-white transition-colors"
                    title="Réinitialiser"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <button
                  onClick={handleNextPuzzle}
                  className="w-full py-3 rounded-xl btn-claude font-semibold text-xs sm:text-sm active:scale-95 shadow-md"
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
