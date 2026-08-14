import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { StudentDiagnostic } from './components/StudentDiagnostic';
import { TeacherDashboard } from './components/TeacherDashboard';
import { DEMO_STUDENTS } from './data/students';
import type { Student, StudentResponse, DiagnosticResult } from './types';

function App() {
  const [view, setView] = useState<'landing' | 'student' | 'teacher'>('landing');
  const [students, setStudents] = useState<Student[]>(DEMO_STUDENTS);

  const handleNavigate = (newView: 'landing' | 'student' | 'teacher') => {
    setView(newView);
    // Smooth scroll to top of page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Complete student diagnostic: Calls backend /api/diagnose securely
  const handleCompleteDiagnostic = async (name: string, responses: StudentResponse[]) => {
    try {
      const apiResponse = await fetch('/api/diagnose', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          grade: 'Grade 6',
          subject: 'Mathematics',
          currentTopic: 'Fractions',
          responses
        })
      });

      const diagnosticResult: DiagnosticResult = await apiResponse.json();

      // Create new student profile
      const newStudent: Student = {
        id: `st_${name.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}`,
        name,
        grade: 'Grade 6',
        subject: 'Mathematics',
        currentTopic: 'Fractions',
        lastDiagnosticDate: new Date().toISOString().split('T')[0],
        history: responses,
        status: diagnosticResult.primaryGap ? 'needs_foundation_review' : 'ready',
        diagnosticResult
      };

      // Add student to local list
      setStudents(prev => [newStudent, ...prev]);
    } catch (error) {
      console.error('Failed to submit diagnostic to backend:', error);
      
      // Local deterministic backup in case server is unreachable
      const primaryGap = responses.filter(r => !r.isCorrect).length > 0 
        ? {
            conceptId: responses.find(r => !r.isCorrect)?.conceptId || 'division',
            severity: 'high' as const,
            confidence: 'high' as const,
            evidence: ['Offline diagnostic: failed responses.']
          }
        : null;

      const mockDiagnostic: DiagnosticResult = {
        primaryGap,
        secondaryGaps: [],
        strengths: responses.filter(r => r.isCorrect).map(r => r.conceptId),
        currentTopicReadiness: primaryGap ? 45 : 95,
        teacherRecommendation: primaryGap 
          ? `Local Offline Mode: Focus on revisiting ${primaryGap.conceptId} fundamentals before proceeding with complex Fractions.`
          : 'Local Offline Mode: Student appears ready for current Fractions topics.',
        intervention: primaryGap 
          ? {
              durationMinutes: 10,
              title: `10-Minute ${primaryGap.conceptId.replace('_', ' ')} Refresher`,
              steps: ['Warm up exercises', 'Guided examples', 'Quick exit check'],
              content: `### Offline Intervention Activity\n\nObjective: Practice basic skills offline.`
            }
          : null,
        ruleBased: true
      };

      const newStudent: Student = {
        id: `st_${name.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}`,
        name,
        grade: 'Grade 6',
        subject: 'Mathematics',
        currentTopic: 'Fractions',
        lastDiagnosticDate: new Date().toISOString().split('T')[0],
        history: responses,
        status: mockDiagnostic.primaryGap ? 'needs_foundation_review' : 'ready',
        diagnosticResult: mockDiagnostic
      };

      setStudents(prev => [newStudent, ...prev]);
    }
  };

  // Handle mock student reassessment / gap rechecks
  const handleRecheckStudent = (studentId: string, conceptId: string, success: boolean) => {
    setStudents(prev => prev.map(student => {
      if (student.id !== studentId) return student;

      const updatedResult = student.diagnosticResult ? { ...student.diagnosticResult } : null;
      
      if (updatedResult) {
        if (success) {
          // Resolved gap
          updatedResult.primaryGap = null;
          updatedResult.currentTopicReadiness = 95;
          updatedResult.teacherRecommendation = `Reassessment verified: The prerequisite gap in "${conceptId.replace('_', ' ')}" has been resolved. The student is ready for Grade 6 Fractions.`;
          
          return {
            ...student,
            status: 'ready' as const,
            diagnosticResult: updatedResult
          };
        } else {
          // Still struggling
          updatedResult.currentTopicReadiness = Math.min(55, updatedResult.currentTopicReadiness + 10);
          updatedResult.teacherRecommendation = `Reassessment partial check: The student is still showing some uncertainty in "${conceptId.replace('_', ' ')}". Recommend continuing visual models and 1-on-1 focus.`;
          
          return {
            ...student,
            status: 'needs_practice' as const,
            diagnosticResult: updatedResult
          };
        }
      }

      return student;
    }));
  };

  return (
    <div className="font-sans antialiased text-slate-900 min-h-screen flex flex-col bg-slate-50">
      {view === 'landing' && (
        <LandingPage onNavigate={handleNavigate} />
      )}
      
      {view === 'student' && (
        <StudentDiagnostic 
          onNavigate={handleNavigate} 
          onCompleteDiagnostic={handleCompleteDiagnostic} 
        />
      )}
      
      {view === 'teacher' && (
        <TeacherDashboard 
          onNavigate={handleNavigate} 
          studentsList={students}
          onRecheckStudent={handleRecheckStudent}
        />
      )}
    </div>
  );
}

export default App;
