import React, { useState } from 'react';
import { QUESTIONS } from '../data/questions';
import type { StudentResponse, Question } from '../types';
import { ArrowLeft, ArrowRight, HelpCircle, CheckCircle2, AlertCircle } from 'lucide-react';

interface StudentDiagnosticProps {
  onNavigate: (view: 'landing' | 'student' | 'teacher') => void;
  onCompleteDiagnostic: (name: string, responses: StudentResponse[]) => Promise<void>;
}

export const StudentDiagnostic: React.FC<StudentDiagnosticProps> = ({ onNavigate, onCompleteDiagnostic }) => {
  const [step, setStep] = useState<'welcome' | 'quiz' | 'submitting' | 'complete'>('welcome');
  const [studentName, setStudentName] = useState('');
  const [nameError, setNameError] = useState('');
  
  // Quiz State
  const [responses, setResponses] = useState<StudentResponse[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizHistory, setQuizHistory] = useState<string[]>([]); // list of question IDs asked
  
  // Start the quiz
  const handleStart = () => {
    if (!studentName.trim()) {
      setNameError('Please enter your name to start the challenge!');
      return;
    }
    setNameError('');
    
    // Choose starting question: Basic Fraction Understanding (fu_1)
    const startQ = QUESTIONS.find(q => q.id === 'fu_1') || QUESTIONS[0];
    setCurrentQuestion(startQ);
    setQuizHistory([startQ.id]);
    setStep('quiz');
  };

  // Adaptive logic: select next question based on current response history
  const getNextQuestion = (lastResponse: StudentResponse): Question | null => {
    const answeredIds = [...quizHistory];
    
    // Maximum 7 questions for the diagnostic to keep it fast and precise
    if (answeredIds.length >= 7) {
      return null;
    }

    const lastConcept = lastResponse.conceptId;
    const wasCorrect = lastResponse.isCorrect;

    let targetConceptId = lastConcept;

    if (wasCorrect) {
      // Move downstream (harder concepts)
      if (lastConcept === 'number_comparison') {
        targetConceptId = 'multiplication';
      } else if (lastConcept === 'multiplication') {
        targetConceptId = 'division';
      } else if (lastConcept === 'division') {
        targetConceptId = 'fraction_understanding';
      } else if (lastConcept === 'fraction_understanding') {
        targetConceptId = 'equivalent_fractions';
      } else if (lastConcept === 'equivalent_fractions') {
        targetConceptId = 'fraction_operations';
      } else if (lastConcept === 'fraction_operations') {
        // If they got fraction operations right, verify another or finish
        targetConceptId = 'fraction_operations';
      }
    } else {
      // Move upstream (simpler concepts / prerequisites)
      if (lastConcept === 'fraction_operations') {
        targetConceptId = 'equivalent_fractions';
      } else if (lastConcept === 'equivalent_fractions') {
        targetConceptId = 'factors_multiples';
      } else if (lastConcept === 'factors_multiples') {
        targetConceptId = 'division';
      } else if (lastConcept === 'fraction_understanding') {
        targetConceptId = 'division';
      } else if (lastConcept === 'division') {
        targetConceptId = 'multiplication';
      } else if (lastConcept === 'multiplication') {
        targetConceptId = 'number_comparison';
      } else if (lastConcept === 'number_comparison') {
        // Already at the bottom
        targetConceptId = 'number_comparison';
      }
    }

    // Try to find an unanswered question in the target concept
    let nextQ = QUESTIONS.find(q => q.conceptId === targetConceptId && !answeredIds.includes(q.id));

    // If no unanswered questions exist in the target concept, fall back to adjacent concepts
    if (!nextQ) {
      // Scan through all questions to find ANY unanswered question in basic order
      const conceptOrder = ['number_comparison', 'multiplication', 'division', 'factors_multiples', 'fraction_understanding', 'equivalent_fractions', 'fraction_operations'];
      
      for (const conceptId of conceptOrder) {
        nextQ = QUESTIONS.find(q => q.conceptId === conceptId && !answeredIds.includes(q.id));
        if (nextQ) break;
      }
    }

    return nextQ || null; // Return null if all questions in bank are exhausted
  };

  const handleAnswerSubmit = async () => {
    if (!currentQuestion || selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const newResponse: StudentResponse = {
      questionId: currentQuestion.id,
      conceptId: currentQuestion.conceptId,
      studentAnswer: selectedAnswer,
      isCorrect
    };

    const updatedResponses = [...responses, newResponse];
    setResponses(updatedResponses);
    setSelectedAnswer(null);

    // Pick next question
    const nextQ = getNextQuestion(newResponse);

    if (nextQ) {
      setCurrentQuestion(nextQ);
      setQuizHistory([...quizHistory, nextQ.id]);
    } else {
      // Quiz complete!
      setStep('submitting');
      try {
        await onCompleteDiagnostic(studentName, updatedResponses);
        setStep('complete');
      } catch (err) {
        console.error('Submission failed:', err);
        setStep('complete'); // Force complete screen even on error
      }
    }
  };

  // Render visual aid based on question type
  const renderVisualAid = (q: Question) => {
    if (!q.visualType || q.visualType === 'none') return null;

    if (q.visualType === 'comparison' && q.visualData) {
      return (
        <div className="flex items-center justify-center space-x-6 my-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div className="px-6 py-4 bg-white rounded-lg shadow-sm border border-slate-200 text-xl font-bold text-slate-800">
            {q.visualData.left}
          </div>
          <div className="w-12 h-12 rounded-full border-2 border-dashed border-brand-400 bg-brand-50 flex items-center justify-center text-brand-600 font-bold text-lg">
            ?
          </div>
          <div className="px-6 py-4 bg-white rounded-lg shadow-sm border border-slate-200 text-xl font-bold text-slate-800">
            {q.visualData.right}
          </div>
        </div>
      );
    }

    if (q.visualType === 'fraction_grid' && q.visualData) {
      const { shaded, total } = q.visualData;
      // Draw a circular pizza fraction representation
      return (
        <div className="flex justify-center my-6">
          <svg width="120" height="120" viewBox="0 0 100 100" className="drop-shadow-sm">
            {/* Base Circle */}
            <circle cx="50" cy="50" r="45" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
            
            {/* Draw Slices */}
            {Array.from({ length: total }).map((_, i) => {
              const angle = 360 / total;
              const startAngle = i * angle;
              const endAngle = (i + 1) * angle;
              
              // Helper to convert polar to Cartesian coordinates
              const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
                const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
                return {
                  x: centerX + radius * Math.cos(angleInRadians),
                  y: centerY + radius * Math.sin(angleInRadians),
                };
              };

              const start = polarToCartesian(50, 50, 45, startAngle);
              const end = polarToCartesian(50, 50, 45, endAngle);
              const largeArcFlag = angle <= 180 ? '0' : '1';
              
              // Path definition
              const d = [
                'M', 50, 50,
                'L', start.x, start.y,
                'A', 45, 45, 0, largeArcFlag, 1, end.x, end.y,
                'Z'
              ].join(' ');

              const isShaded = i < shaded;

              return (
                <path
                  key={i}
                  d={d}
                  fill={isShaded ? '#3b82f6' : 'none'}
                  stroke="#ffffff"
                  strokeWidth="2"
                />
              );
            })}
          </svg>
        </div>
      );
    }

    if (q.visualType === 'division_grouping' && q.visualData) {
      const { total, groups } = q.visualData;
      return (
        <div className="my-6 bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
          <p className="text-xs text-slate-500 font-medium mb-3">Cookie Pool ({total} total)</p>
          <div className="flex flex-wrap justify-center gap-2 max-w-[320px] mx-auto mb-4">
            {Array.from({ length: total }).map((_, i) => (
              <span key={i} className="text-xl filter drop-shadow" title="Cookie">🍪</span>
            ))}
          </div>
          <div className="flex justify-center gap-4">
            {Array.from({ length: groups }).map((_, i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-brand-300 bg-white flex items-center justify-center text-xs font-bold text-brand-600">
                Plate {i + 1}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
      {/* Student Subheader */}
      <header className="bg-white border-b border-slate-200 py-4 px-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-2">
          <span className="text-lg font-extrabold text-slate-900 tracking-tight">Gap<span className="text-brand-600">Wise</span> Challenge</span>
        </div>
        <button 
          onClick={() => onNavigate('landing')}
          className="text-xs font-medium text-slate-500 hover:text-slate-800 flex items-center space-x-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit</span>
        </button>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden smooth-transition">
          
          {/* WELCOME STEP */}
          {step === 'welcome' && (
            <div className="p-8 text-center">
              <span className="text-4xl">Hey! 👋</span>
              <h2 className="text-2xl font-extrabold text-slate-950 mt-4">
                Let's see how your Maths brain is working today!
              </h2>
              <p className="text-slate-600 mt-3 max-w-sm mx-auto leading-relaxed">
                A quick challenge about Fractions. No marks, no pressure, just have fun!
              </p>

              <div className="mt-8 max-w-xs mx-auto text-left">
                <label htmlFor="student-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  What is your name?
                </label>
                <input
                  type="text"
                  id="student-name"
                  value={studentName}
                  onChange={(e) => {
                    setStudentName(e.target.value);
                    if (e.target.value) setNameError('');
                  }}
                  placeholder="Enter your first name..."
                  className={`w-full px-4 py-3 rounded-lg border bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white text-base text-slate-800 ${nameError ? 'border-red-400 focus:ring-red-400' : 'border-slate-200'}`}
                />
                {nameError && (
                  <p className="text-xs text-red-500 font-semibold mt-1.5 flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{nameError}</span>
                  </p>
                )}
              </div>

              <button
                onClick={handleStart}
                className="mt-8 w-full max-w-xs px-8 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl shadow-md smooth-transition hover:-translate-y-0.5"
              >
                Let's Go!
              </button>
            </div>
          )}

          {/* QUIZ STEP */}
          {step === 'quiz' && currentQuestion && (
            <div>
              {/* Progress Bar */}
              <div className="bg-slate-100 h-2 w-full">
                <div 
                  className="bg-brand-600 h-2 rounded-r-full smooth-transition" 
                  style={{ width: `${(quizHistory.length / 7) * 100}%` }}
                ></div>
              </div>

              <div className="p-6 sm:p-8">
                {/* Question Info */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Question {quizHistory.length} of 7
                  </span>
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 cursor-pointer" title="Prerequisite Investigation">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                </div>

                {/* Question Text */}
                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  {currentQuestion.text}
                </h3>

                {/* Render Custom SVGs or Diagrams */}
                {renderVisualAid(currentQuestion)}

                {/* Answers List */}
                <div className="space-y-3 mt-6">
                  {currentQuestion.options.map((option, idx) => {
                    const isSelected = selectedAnswer === option;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedAnswer(option)}
                        className={`w-full text-left px-5 py-4 rounded-xl border text-sm font-medium smooth-transition flex items-center justify-between ${isSelected ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-sm' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300'}`}
                      >
                        <span>{option}</span>
                        {isSelected && <div className="w-5 h-5 rounded-full bg-brand-600 flex items-center justify-center text-white text-[10px] font-bold">✓</div>}
                      </button>
                    );
                  })}
                </div>

                {/* Submit Action */}
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={handleAnswerSubmit}
                    disabled={selectedAnswer === null}
                    className={`px-6 py-3 rounded-lg font-bold text-sm smooth-transition flex items-center space-x-2 ${selectedAnswer !== null ? 'bg-brand-600 text-white hover:bg-brand-700 hover:shadow-md' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SUBMITTING STEP */}
          {step === 'submitting' && (
            <div className="p-12 text-center">
              <div className="w-12 h-12 rounded-full border-4 border-brand-500 border-t-transparent animate-spin mx-auto mb-6"></div>
              <h2 className="text-xl font-bold text-slate-800">Analyzing responses...</h2>
              <p className="text-xs text-slate-500 mt-2">Checking prerequisite concepts & structuring feedback</p>
            </div>
          )}

          {/* COMPLETE STEP */}
          {step === 'complete' && (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">🎉 Challenge complete!</h2>
              <p className="text-slate-600 mt-3 max-w-sm mx-auto leading-relaxed">
                Great work, <strong className="text-slate-950 font-bold">{studentName}</strong>! Your teacher will use your responses to understand how to help you learn better.
              </p>

              <div className="mt-8 p-4 bg-slate-50 border border-slate-100 rounded-xl max-w-xs mx-auto text-left">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Quiz Summary</p>
                <div className="flex items-center justify-between text-xs text-slate-600 border-b border-slate-200/50 pb-2 mb-2">
                  <span>Questions Asked:</span>
                  <span className="font-bold text-slate-800">{responses.length}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>Learning Status:</span>
                  <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Completed</span>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 max-w-xs mx-auto">
                <button
                  onClick={() => onNavigate('teacher')}
                  className="w-full px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-lg shadow-sm smooth-transition"
                >
                  View Teacher Dashboard
                </button>
                <button
                  onClick={() => {
                    setResponses([]);
                    setSelectedAnswer(null);
                    setQuizHistory([]);
                    setStep('welcome');
                  }}
                  className="w-full px-6 py-3 bg-white border border-slate-200 text-slate-600 font-semibold rounded-lg hover:bg-slate-50 smooth-transition"
                >
                  Start New Challenge
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Footer Info */}
      <footer className="py-4 text-center text-[10px] text-slate-400">
        GapWise diagnostic system • Grade 6 Mathematics
      </footer>
    </div>
  );
};
