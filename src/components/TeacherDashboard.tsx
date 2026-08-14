import React, { useState, useMemo } from 'react';
import type { Student } from '../types';
import { CONCEPTS } from '../data/concepts';
import { Users, BookOpen, Sparkles, RefreshCw, X, ChevronRight } from 'lucide-react';

interface TeacherDashboardProps {
  onNavigate: (view: 'landing' | 'student' | 'teacher') => void;
  studentsList: Student[];
  onRecheckStudent: (studentId: string, conceptId: string, success: boolean) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ 
  onNavigate, 
  studentsList,
  onRecheckStudent
}) => {
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [isGeneratingIntervention, setIsGeneratingIntervention] = useState(false);
  const [generatedWorksheet, setGeneratedWorksheet] = useState<{title: string, content: string} | null>(null);
  
  // Recheck state
  const [isRechecking, setIsRechecking] = useState(false);
  const [recheckConcept, setRecheckConcept] = useState<string | null>(null);
  const [recheckAnswers, setRecheckAnswers] = useState<boolean[]>([]);
  const [recheckStep, setRecheckStep] = useState<number>(0);

  // Active student object
  const selectedStudent = useMemo(() => {
    return studentsList.find(s => s.id === selectedStudentId) || null;
  }, [studentsList, selectedStudentId]);

  // Aggregate Gaps dynamically
  const gapAggregation = useMemo(() => {
    const counts: Record<string, { count: number; severity: string; description: string }> = {
      division: { count: 0, severity: 'high', description: 'Students need support reversing multiplication.' },
      factors_multiples: { count: 0, severity: 'medium', description: 'Students struggle finding common factors.' },
      multiplication: { count: 0, severity: 'high', description: 'Students need base arithmetic reinforcement.' },
      number_comparison: { count: 0, severity: 'high', description: 'Students struggle with place value magnitudes.' },
      equivalent_fractions: { count: 0, severity: 'medium', description: 'Students struggle scaling numerators.' },
      fraction_understanding: { count: 0, severity: 'medium', description: 'Students struggle identifying numerator/denominator.' },
      fraction_operations: { count: 0, severity: 'medium', description: 'Students struggle adding/subtracting fractions.' }
    };

    studentsList.forEach(student => {
      if (student.diagnosticResult?.primaryGap) {
        const concept = student.diagnosticResult.primaryGap.conceptId;
        if (counts[concept]) counts[concept].count++;
      }
      student.diagnosticResult?.secondaryGaps.forEach(g => {
        const concept = g.conceptId;
        if (counts[concept]) counts[concept].count++;
      });
    });

    return Object.entries(counts)
      .map(([conceptId, data]) => ({ conceptId, ...data }))
      .filter(item => item.count > 0)
      .sort((a, b) => b.count - a.count);
  }, [studentsList]);

  // Calculate dynamic readiness score
  const classReadiness = useMemo(() => {
    if (studentsList.length === 0) return 0;
    let scoreSum = 0;
    studentsList.forEach(s => {
      scoreSum += s.diagnosticResult?.currentTopicReadiness || 90;
    });
    return Math.round(scoreSum / studentsList.length);
  }, [studentsList]);

  // Quick helper to render red/yellow/green color pills for student list status
  const getStatusBadge = (status: Student['status']) => {
    switch (status) {
      case 'ready':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">Solid Foundations</span>;
      case 'needs_practice':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700">Needs Practice</span>;
      case 'needs_foundation_review':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700">Foundation Review</span>;
    }
  };

  // Convert markdown to basic HTML securely
  const formatMarkdown = (md: string): string => {
    if (!md) return '';
    return md
      .replace(/^### (.*$)/gim, '<h3 class="text-base font-extrabold text-slate-800 mt-4 mb-2">$1</h3>')
      .replace(/^#### (.*$)/gim, '<h4 class="text-sm font-bold text-slate-700 mt-3 mb-1">$1</h4>')
      .replace(/^\* (.*$)/gim, '<li class="text-xs text-slate-600 list-disc ml-5 mb-1">$1</li>')
      .replace(/^\- (.*$)/gim, '<li class="text-xs text-slate-600 list-disc ml-5 mb-1">$1</li>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-800">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-slate-600">$1</em>')
      .replace(/\n/g, '<br />');
  };

  // Call the server endpoint for Gemini Intervention Worksheet
  const generateIntervention = async (conceptId: string, studentName: string) => {
    setIsGeneratingIntervention(true);
    setGeneratedWorksheet(null);
    try {
      const response = await fetch('/api/intervention', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conceptId, studentName })
      });
      const data = await response.json();
      setGeneratedWorksheet({
        title: data.title || '10-Minute Activity',
        content: formatMarkdown(data.content || '')
      });
    } catch (error) {
      console.error('Failed to generate intervention worksheet:', error);
      // Fallback
      setGeneratedWorksheet({
        title: '10-Minute Division Refresher',
        content: 'Failed to connect. Running offline.'
      });
    } finally {
      setIsGeneratingIntervention(false);
    }
  };

  // Reassessment micro-questions (2 per concept)
  const recheckQuestions: Record<string, { q: string; a: string; opts: string[] }[]> = {
    division: [
      { q: 'What is 35 divided by 5?', a: '7', opts: ['5', '6', '7', '8'] },
      { q: 'Divide 24 pencils into 3 equal bags. How many in each bag?', a: '8', opts: ['6', '7', '8', '12'] }
    ],
    factors_multiples: [
      { q: 'What is the GCF of 8 and 12?', a: '4', opts: ['2', '4', '8', '24'] },
      { q: 'What is the LCM of 3 and 5?', a: '15', opts: ['8', '10', '15', '30'] }
    ],
    multiplication: [
      { q: 'What is 8 × 7?', a: '56', opts: ['49', '54', '56', '63'] },
      { q: 'Solve: 6 × 9 = ?', a: '54', opts: ['48', '54', '60', '72'] }
    ],
    number_comparison: [
      { q: 'Which is larger: 0.45 or 0.5?', a: '0.5', opts: ['0.45', '0.5', 'both are equal'] },
      { q: 'What sign goes in the box? 1,209 [?] 1,290', a: '<', opts: ['>', '<', '='] }
    ],
    equivalent_fractions: [
      { q: 'Simplify the fraction 6/9 to its simplest form.', a: '2/3', opts: ['1/3', '2/3', '3/4', '3/6'] },
      { q: 'Find the missing number: 2/5 = ?/15', a: '6', opts: ['4', '6', '8', '10'] }
    ],
    fraction_understanding: [
      { q: 'What is the numerator of the fraction 3/7?', a: '3', opts: ['3', '7', '10'] },
      { q: 'A bar is divided into 5 pieces, and 2 are shaded. What fraction is shaded?', a: '2/5', opts: ['2/5', '3/5', '2/3'] }
    ],
    fraction_operations: [
      { q: 'Solve: 2/5 + 1/5 = ?', a: '3/5', opts: ['3/10', '3/5', '1/5'] },
      { q: 'Solve: 1/2 + 1/8 = ?', a: '5/8', opts: ['2/10', '5/8', '3/8'] }
    ]
  };

  const startRecheck = (conceptId: string) => {
    setRecheckConcept(conceptId);
    setRecheckAnswers([]);
    setRecheckStep(0);
    setIsRechecking(true);
  };

  const submitRecheckAnswer = (answer: string) => {
    if (!recheckConcept) return;
    const questions = recheckQuestions[recheckConcept] || recheckQuestions['division'];
    const currentQ = questions[recheckStep];
    const isCorrect = answer === currentQ.a;

    const updatedAnswers = [...recheckAnswers, isCorrect];
    setRecheckAnswers(updatedAnswers);

    if (recheckStep + 1 < questions.length) {
      setRecheckStep(recheckStep + 1);
    } else {
      // Recheck complete!
      const passedAll = updatedAnswers.every(ans => ans === true);
      onRecheckStudent(selectedStudentId!, recheckConcept, passedAll);
      setIsRechecking(false);
      setRecheckConcept(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Dashboard Header */}
      <header className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('landing')}>
            <div className="w-10 h-10 flex items-center justify-center bg-brand-600 rounded-xl shadow-md text-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25A2.25 2.25 0 0 1 13.5 8.25V6Z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 2" d="M15.75 15.75h2.25v2.25h-2.25z" />
              </svg>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900">Gap<span className="text-brand-600">Wise</span></span>
              <p className="text-[10px] text-slate-500 font-medium tracking-wide uppercase -mt-1">Teacher Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate('student')}
              className="px-4 py-2 border border-slate-200 bg-white rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 smooth-transition"
            >
              Open Student Diagnostic
            </button>
            <div className="px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-medium text-slate-600 flex items-center space-x-1">
              <span>Class:</span>
              <strong className="text-slate-800 font-bold">Grade 6A</strong>
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Metric & Priority Gaps */}
        <div className="lg:col-span-1 space-y-6">
          {/* Class Readiness Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center justify-between">
              <span>Class Readiness</span>
              <Users className="w-4 h-4 text-slate-400" />
            </h3>
            
            <div className="mt-4 flex items-center justify-between">
              <div>
                <span className="text-5xl font-extrabold text-slate-900 tracking-tight">{classReadiness}%</span>
                <p className="text-xs text-slate-500 mt-2 font-medium">Students appear ready for the current topic (Fractions).</p>
              </div>
              
              {/* Doughnut Ring */}
              <div className="relative w-20 h-20">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                  <circle 
                    cx="18" 
                    cy="18" 
                    r="16" 
                    fill="none" 
                    stroke="#4763be" 
                    strokeWidth="3" 
                    strokeDasharray="100" 
                    strokeDashoffset={100 - classReadiness}
                    className="smooth-transition"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-700">
                  {classReadiness}%
                </div>
              </div>
            </div>
          </div>

          {/* Priority Gaps List */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-3 mb-4">
              What should I focus on? (Priority Gaps)
            </h3>
            
            {gapAggregation.length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-400">
                🎉 No active foundational gaps detected in this class!
              </div>
            ) : (
              <div className="space-y-4">
                {gapAggregation.map((gap, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-100/50 hover:border-brand-200 smooth-transition">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-xs">
                      {gap.count}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-slate-900 capitalize">{gap.conceptId.replace('_', ' ')}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{gap.description}</p>
                      <span className="inline-block text-[9px] font-semibold text-slate-400 mt-1">Affecting {gap.count} student{gap.count > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* MIDDLE/RIGHT COLUMN: Class Learning Map */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="text-base font-bold text-slate-900">Class Learning Map</h3>
                <p className="text-xs text-slate-500 mt-1">Review diagnostic histories and specific foundational checkpoints.</p>
              </div>
            </div>

            <div className="divide-y divide-slate-100 max-h-[580px] overflow-y-auto">
              {studentsList.map((student) => {
                const primaryGap = student.diagnosticResult?.primaryGap?.conceptId;
                const secondaryGaps = student.diagnosticResult?.secondaryGaps.map(g => g.conceptId) || [];
                const strengths = student.diagnosticResult?.strengths || [];

                return (
                  <div 
                    key={student.id}
                    onClick={() => setSelectedStudentId(student.id)}
                    className={`p-4 flex items-center justify-between hover:bg-slate-50/80 cursor-pointer smooth-transition ${selectedStudentId === student.id ? 'bg-brand-50/40 border-l-4 border-l-brand-600' : 'border-l-4 border-l-transparent'}`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <strong className="text-sm font-semibold text-slate-900">{student.name}</strong>
                        {getStatusBadge(student.status)}
                      </div>
                      
                      {/* Concepts horizontal pill bar */}
                      <div className="flex flex-wrap items-center gap-1.5 mt-2">
                        {CONCEPTS.map(c => {
                          const isPrimary = c.id === primaryGap;
                          const isSecondary = secondaryGaps.includes(c.id);
                          const isStrength = strengths.includes(c.id);
                          
                          let indicator = '🟢';
                          let title = `${c.name}: Solid`;
                          if (isPrimary) {
                            indicator = '🔴';
                            title = `${c.name}: Primary Learning Gap`;
                          } else if (isSecondary) {
                            indicator = '🟡';
                            title = `${c.name}: Secondary Learning Gap`;
                          } else if (!isStrength) {
                            indicator = '⚪'; // Untested or neutral
                            title = `${c.name}: Not Tested`;
                          }

                          return (
                            <span 
                              key={c.id} 
                              className="text-[10px] flex items-center space-x-0.5 bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded cursor-help"
                              title={title}
                            >
                              <span>{indicator}</span>
                              <span className="capitalize">{c.id.split('_')[0]}</span>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-slate-700">{student.diagnosticResult?.currentTopicReadiness || 90}%</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* INDIVIDUAL STUDENT SLIDEOUT SIDEBAR */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-slide-in">
            {/* Sidebar Header */}
            <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Student Profile & Diagnostic</span>
                <h2 className="text-xl font-extrabold text-slate-900 mt-1">{selectedStudent.name}</h2>
                <p className="text-xs text-slate-500">{selectedStudent.grade} • {selectedStudent.subject} • {selectedStudent.currentTopic}</p>
              </div>
              <button 
                onClick={() => {
                  setSelectedStudentId(null);
                  setGeneratedWorksheet(null);
                }}
                className="w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-800 smooth-transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sidebar Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Foundation Analysis Status */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Foundation Analysis</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {CONCEPTS.map(c => {
                    const isPrimary = c.id === selectedStudent.diagnosticResult?.primaryGap?.conceptId;
                    const isSecondary = selectedStudent.diagnosticResult?.secondaryGaps.some(g => g.conceptId === c.id);
                    const isStrength = selectedStudent.diagnosticResult?.strengths.includes(c.id);
                    
                    let statusLabel = '⚪ Not Evaluated';
                    let bgClass = 'bg-slate-50 border-slate-200/50 text-slate-500';
                    
                    if (isPrimary) {
                      statusLabel = '🔴 Needs Reinforcement';
                      bgClass = 'bg-rose-50 border-rose-100 text-rose-800';
                    } else if (isSecondary) {
                      statusLabel = '🟡 Some Uncertainty';
                      bgClass = 'bg-amber-50 border-amber-100 text-amber-800';
                    } else if (isStrength) {
                      statusLabel = '🟢 Looks Solid';
                      bgClass = 'bg-emerald-50 border-emerald-100 text-emerald-800';
                    }

                    return (
                      <div key={c.id} className={`p-2.5 rounded-lg border text-xs flex justify-between items-center ${bgClass}`}>
                        <span className="font-semibold">{c.name}</span>
                        <span className="text-[10px] font-medium opacity-80">{statusLabel}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* What may be holding Ahmed back? */}
              {selectedStudent.diagnosticResult?.primaryGap && (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">What is holding {selectedStudent.name.split(' ')[0]} back?</h3>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {selectedStudent.diagnosticResult.teacherRecommendation}
                  </p>
                  
                  {/* Evidence & Confidence */}
                  <div className="mt-4 pt-3 border-t border-slate-200/50 grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400">Confidence Score</span>
                      <p className="text-xs font-bold text-slate-800 flex items-center space-x-1 capitalize">
                        <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                        <span>{selectedStudent.diagnosticResult.primaryGap.confidence}</span>
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400">Evidence Count</span>
                      <p className="text-xs font-semibold text-slate-700">
                        {selectedStudent.diagnosticResult.primaryGap.evidence.length} related answers wrong.
                      </p>
                    </div>
                  </div>
                  
                  {/* Evidence Logs */}
                  <div className="mt-3">
                    <span className="text-[9px] uppercase font-bold text-slate-400">Diagnostic Details</span>
                    <ul className="list-disc ml-4 space-y-0.5 mt-1">
                      {selectedStudent.diagnosticResult.primaryGap.evidence.map((ev, i) => (
                        <li key={i} className="text-[10px] text-slate-500">{ev}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* RECHECK GAP SUB-SECTION */}
              {selectedStudent.diagnosticResult?.primaryGap && (
                <div className="border border-brand-100 bg-brand-50/20 p-4 rounded-xl">
                  <h4 className="text-xs font-bold text-brand-900 flex items-center space-x-1">
                    <span>Re-evaluate Prerequisite</span>
                  </h4>
                  <p className="text-[10px] text-slate-500 mt-1">Recheck if the diagnosed prerequisite gap has been resolved.</p>
                  
                  {isRechecking && recheckConcept === selectedStudent.diagnosticResult.primaryGap.conceptId ? (
                    <div className="mt-4 bg-white p-3 rounded-lg border border-brand-200 shadow-sm text-center">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-brand-600 uppercase">Micro-Check Step {recheckStep + 1} of 2</span>
                        <span className="text-[10px] text-slate-400">Concept: {recheckConcept}</span>
                      </div>
                      
                      {(() => {
                        const questions = recheckQuestions[recheckConcept] || recheckQuestions['division'];
                        const activeQ = questions[recheckStep];
                        return (
                          <div>
                            <p className="text-xs font-bold text-slate-800 mb-3">{activeQ.q}</p>
                            <div className="grid grid-cols-2 gap-2">
                              {activeQ.opts.map((opt, i) => (
                                <button
                                  key={i}
                                  onClick={() => submitRecheckAnswer(opt)}
                                  className="py-2 text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-700 hover:bg-brand-600 hover:text-white rounded-lg smooth-transition"
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  ) : (
                    <button
                      onClick={() => startRecheck(selectedStudent.diagnosticResult!.primaryGap!.conceptId)}
                      className="mt-3 px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded text-[11px] font-bold flex items-center space-x-1 smooth-transition shadow-sm"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Recheck Gap</span>
                    </button>
                  )}
                </div>
              )}

              {/* AI generated revision activities */}
              {selectedStudent.diagnosticResult?.primaryGap && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Targeted Mini-Intervention</h3>
                    {selectedStudent.diagnosticResult.ruleBased && (
                      <span className="text-[9px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">Deterministic Fallback</span>
                    )}
                  </div>
                  
                  {!generatedWorksheet && (
                    <button
                      onClick={() => generateIntervention(selectedStudent.diagnosticResult!.primaryGap!.conceptId, selectedStudent.name)}
                      disabled={isGeneratingIntervention}
                      className="w-full py-3 bg-slate-900 text-white hover:bg-slate-800 font-bold rounded-xl text-xs flex items-center justify-center space-x-2 smooth-transition shadow"
                    >
                      {isGeneratingIntervention ? (
                        <>
                          <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                          <span>Generating 10-Min Revision Activity...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-brand-400" />
                          <span>Generate 10-Minute Revision Activity</span>
                        </>
                      )}
                    </button>
                  )}

                  {/* Rendered Intervention Worksheet */}
                  {generatedWorksheet && (
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-sm relative">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
                        <h4 className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
                          <BookOpen className="w-4 h-4 text-brand-600" />
                          <span>{generatedWorksheet.title}</span>
                        </h4>
                        <button 
                          onClick={() => setGeneratedWorksheet(null)}
                          className="text-slate-400 hover:text-slate-700 text-xs font-semibold"
                        >
                          Clear
                        </button>
                      </div>

                      {/* Render markdown output */}
                      <div 
                        className="prose prose-xs max-w-none text-xs text-slate-700 leading-relaxed space-y-2 select-text"
                        dangerouslySetInnerHTML={{ __html: generatedWorksheet.content }}
                      />

                      <div className="mt-4 pt-3 border-t border-slate-200 flex justify-end">
                        <button
                          onClick={() => window.print()}
                          className="px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-50 text-[10px] font-bold text-slate-600 rounded smooth-transition"
                        >
                          Print Worksheet
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button 
                onClick={() => {
                  setSelectedStudentId(null);
                  setGeneratedWorksheet(null);
                }}
                className="px-4 py-2 text-xs font-bold bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg smooth-transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
