'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Question {
  question: string;
  options: string[];
  answer: string;
}

interface QuizProps {
  questions: Question[];
}

export default function Quiz({ questions }: QuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleOptionSelect = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
  };

  const handleCheckAnswer = () => {
    if (!selectedOption) return;
    
    if (selectedOption === questions[currentStep].answer) {
      setScore(prev => prev + 1);
    }
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const handleRetry = () => {
    setCurrentStep(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    let message = "Needs Improvement";
    if (percentage > 70) message = "Excellent!";
    else if (percentage > 40) message = "Good effort!";

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl bg-white p-8 border border-gray-100 shadow-xl text-center"
      >
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 text-orange-600 mb-6">
          <Trophy size={40} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{message}</h2>
        <p className="text-gray-500 mb-8">You scored {score} out of {questions.length} questions correctly.</p>
        
        <div className="flex flex-col gap-3">
          <div className="h-4 w-full rounded-full bg-gray-100 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              className="h-full bg-orange-500"
            />
          </div>
          <p className="text-sm font-bold text-gray-700">{percentage}% accuracy</p>
        </div>

        <button 
          onClick={handleRetry}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-4 text-white font-bold transition-all hover:bg-orange-600 active:scale-[0.98]"
        >
          <RotateCcw size={20} />
          Retry Quiz
        </button>
      </motion.div>
    );
  }

  const currentQuestion = questions[currentStep];

  return (
    <div className="rounded-2xl bg-white p-6 border border-gray-200">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold">Quick Knowledge Check</h2>
        <span className="text-[11px] font-bold text-gray-400">Step {currentStep + 1} / {questions.length}</span>
      </div>

      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
        <h3 className="mb-6 text-[16px] font-semibold text-gray-800 leading-snug">
          {currentQuestion.question}
        </h3>

        <div className="grid gap-3 mb-6">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedOption === option;
            const isCorrect = isAnswered && option === currentQuestion.answer;
            const isWrong = isAnswered && isSelected && option !== currentQuestion.answer;

            return (
              <button
                key={option}
                disabled={isAnswered}
                onClick={() => handleOptionSelect(option)}
                className={cn(
                  "group relative w-full rounded-xl border p-3 text-left text-sm transition-all duration-200",
                  isSelected ? "border-blue-500 bg-blue-50 font-medium text-blue-700 ring-1 ring-blue-500" : "border-gray-200 bg-white hover:border-blue-400",
                  isCorrect && "border-green-500 bg-green-50 text-green-700 ring-1 ring-green-500",
                  isWrong && "border-red-500 bg-red-50 text-red-700 ring-1 ring-red-500"
                )}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {isCorrect && <CheckCircle2 className="text-green-500" size={16} />}
                  {isWrong && <XCircle className="text-red-500" size={16} />}
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between">
          <div>
            {isAnswered && (
              <p className={cn(
                "text-[11px] font-medium italic",
                selectedOption === currentQuestion.answer ? "text-green-600" : "text-red-500"
              )}>
                {selectedOption === currentQuestion.answer ? "Excellent! That is correct." : "Not quite. Review the material and try again."}
              </p>
            )}
          </div>

          {!isAnswered ? (
            <button
              disabled={!selectedOption}
              onClick={handleCheckAnswer}
              className="bg-gray-900 text-white text-xs px-6 py-2.5 rounded-lg font-bold disabled:bg-gray-200 transition-all hover:bg-black"
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-blue-600 text-white text-xs px-6 py-2.5 rounded-lg font-bold transition-all hover:bg-blue-700"
            >
              {currentStep === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
