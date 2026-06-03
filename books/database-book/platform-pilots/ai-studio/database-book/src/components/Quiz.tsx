import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { cn } from '../utils';
import { motion, AnimatePresence } from 'motion/react';

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
  onClose?: () => void;
  inline?: boolean;
}

export function Quiz({ questions, onComplete, onClose, inline = false }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (index: number) => {
    if (isSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    setIsSubmitted(true);
  };

  const handleNext = () => {
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    const finalScore = score + (isCorrect ? 1 : 0);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setShowResults(true);
      onComplete(finalScore);
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setShowResults(false);
  };

  if (showResults) {
    const cardContent = (
      <div className="text-center p-6 bg-white border border-zinc-200 rounded-2xl shadow-xs">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold mb-1 text-zinc-900">RAT Complete!</h2>
        <p className="text-zinc-600 mb-6 text-sm">
          You scored <span className="font-bold text-indigo-600">{score}</span> out of {questions.length}
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={handleRetry}
            className="px-4 py-2 border border-zinc-200 text-zinc-700 hover:bg-zinc-50 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Retry Test
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl text-sm font-semibold transition-colors"
            >
              Continue Chapter
            </button>
          )}
        </div>
      </div>
    );

    if (inline) {
      return cardContent;
    }

    return (
      <div className="fixed inset-0 bg-zinc-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full"
        >
          {cardContent}
        </motion.div>
      </div>
    );
  }

  const mainContent = (
    <div className={cn("bg-white border border-zinc-200 rounded-2xl p-6 shadow-xs", !inline && "max-w-xl w-full")}>
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
          Reading Assessment Test (RAT) • Q {currentQuestionIndex + 1}/{questions.length}
        </span>
        {onClose && (
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-600 p-1 rounded-lg hover:bg-zinc-50 transition-colors">
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>

      <h3 className="text-xl font-bold mb-6 text-zinc-800 leading-tight">
        {currentQuestion.question}
      </h3>

      <div className="space-y-2.5 mb-6">
        {currentQuestion.options.map((option, index) => {
          const isCorrect = index === currentQuestion.correctAnswer;
          const isSelected = index === selectedOption;
          const showCorrect = isSubmitted && isCorrect;
          const showWrong = isSubmitted && isSelected && !isCorrect;

          return (
            <button
              key={index}
              onClick={() => handleOptionSelect(index)}
              disabled={isSubmitted}
              className={cn(
                "w-full text-left px-4 py-3 rounded-xl border-2 text-sm transition-all flex items-center justify-between cursor-pointer",
                isSelected && !isSubmitted ? "border-indigo-600 bg-indigo-50/50" : "border-zinc-100 hover:border-zinc-200 bg-zinc-50/30",
                showCorrect && "border-emerald-500 bg-emerald-50/50 text-emerald-900",
                showWrong && "border-rose-500 bg-rose-50/50 text-rose-900"
              )}
            >
              <span className={cn(
                "font-medium",
                isSelected && !isSubmitted ? "text-indigo-700" : "text-zinc-700",
                showCorrect && "text-emerald-850",
                showWrong && "text-rose-850"
              )}>
                {option}
              </span>
              {showCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 ml-2" />}
              {showWrong && <XCircle className="w-5 h-5 text-rose-500 shrink-0 ml-2" />}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div 
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200">
              <p className="text-xs text-zinc-600 leading-relaxed italic">
                <span className="font-bold text-zinc-700 not-italic">Explanation: </span>
                {currentQuestion.explanation}
              </p>
            </div>
            <button
              onClick={handleNext}
              className="w-full py-3 bg-zinc-950 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-black transition-colors"
            >
              {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Test"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className="w-full py-3 bg-indigo-600 text-white rounded-xl text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
          >
            Submit Answer
          </button>
        )}
      </AnimatePresence>
    </div>
  );

  if (inline) {
    return mainContent;
  }

  return (
    <div className="fixed inset-0 bg-zinc-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <motion.div 
        layout
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-lg w-full"
      >
        {mainContent}
      </motion.div>
    </div>
  );
}
