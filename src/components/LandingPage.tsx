import React from 'react';
import { BookOpen, Sparkles, ShieldAlert, Award, ArrowRight, Layers, BarChart2, RotateCcw } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (view: 'landing' | 'student' | 'teacher') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navigation Header */}
      <header className="bg-white border-b border-slate-100 py-4 px-6 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('landing')}>
            {/* Abstract Gap Logo: Geometric blocks finding the missing piece */}
            <div className="w-10 h-10 flex items-center justify-center bg-brand-600 rounded-xl shadow-md text-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25A2.25 2.25 0 0 1 13.5 8.25V6Z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 2" d="M15.75 15.75h2.25v2.25h-2.25z" />
              </svg>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900">Gap<span className="text-brand-600">Wise</span></span>
              <p className="text-[10px] text-slate-500 font-medium tracking-wide uppercase -mt-1">Prerequisite Diagnostics</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => onNavigate('student')}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-brand-600 hover:bg-slate-50 rounded-lg smooth-transition"
            >
              Student Diagnostic
            </button>
            <button
              onClick={() => onNavigate('teacher')}
              className="px-4 py-2 text-sm font-medium bg-brand-600 text-white hover:bg-brand-700 rounded-lg shadow-sm hover:shadow smooth-transition"
            >
              Teacher Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-20 px-6 border-b border-slate-100">
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-brand-50 border border-brand-100 rounded-full px-3 py-1 text-xs font-semibold text-brand-700 mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Powered Learning-Gap Diagnostics</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Find the gap. <br/>
            <span className="bg-gradient-to-r from-brand-600 to-indigo-600 bg-clip-text text-transparent">Fix the foundation.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            GapWise uses generative AI to identify the missing prerequisite concepts behind a student's learning difficulty — before the gap becomes a bigger problem.
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('teacher')}
              className="w-full sm:w-auto px-8 py-4 bg-brand-600 text-white font-semibold rounded-xl shadow-lg hover:bg-brand-700 hover:shadow-xl hover:-translate-y-0.5 smooth-transition flex items-center justify-center space-x-2"
            >
              <span>Try Teacher Demo</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => onNavigate('student')}
              className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 shadow-sm hover:bg-slate-50 hover:border-slate-300 smooth-transition flex items-center justify-center space-x-2"
            >
              <span>Take Student Diagnostic</span>
            </button>
          </div>
        </div>

        {/* Visual Animated Flow Demo */}
        <div className="max-w-5xl mx-auto mt-16 p-4 bg-slate-50 rounded-2xl border border-slate-200 shadow-md relative">
          <div className="bg-white rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-stretch justify-between gap-6 relative">
            
            {/* Step 1: Struggle */}
            <div className="flex-1 flex flex-col items-center text-center p-4 border border-slate-100 rounded-xl bg-slate-50/50">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-4">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">01. Current Topic Symptom</span>
              <h3 className="text-sm font-semibold text-slate-800 mt-2">Student struggles with Fractions</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-[180px]">Cannot solve equivalent fractions worksheet</p>
            </div>

            {/* Connector */}
            <div className="hidden md:flex items-center text-brand-500 font-bold">&rarr;</div>

            {/* Step 2: Investigation */}
            <div className="flex-1 flex flex-col items-center text-center p-4 border border-slate-100 rounded-xl bg-slate-50/50">
              <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 mb-4">
                <Layers className="w-6 h-6" />
              </div>
              <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">02. GapWise Diagnostic</span>
              <h3 className="text-sm font-semibold text-slate-800 mt-2">Adaptive 6-Question Quiz</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-[180px]">System traces back through prerequisite chain</p>
            </div>

            {/* Connector */}
            <div className="hidden md:flex items-center text-brand-500 font-bold">&rarr;</div>

            {/* Step 3: Detection */}
            <div className="flex-1 flex flex-col items-center text-center p-4 border border-slate-100 rounded-xl bg-slate-50/50">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mb-4 animate-pulse">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">03. AI Reasoner</span>
              <h3 className="text-sm font-semibold text-slate-800 mt-2">Division Gap Detected</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-[180px]">AI links error patterns directly to division roots</p>
            </div>

            {/* Connector */}
            <div className="hidden md:flex items-center text-brand-500 font-bold">&rarr;</div>

            {/* Step 4: Intervention */}
            <div className="flex-1 flex flex-col items-center text-center p-4 border border-slate-100 rounded-xl bg-slate-50/50">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
                <Award className="w-6 h-6" />
              </div>
              <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">04. Targeted Solution</span>
              <h3 className="text-sm font-semibold text-slate-800 mt-2">10-Min Lesson Generated</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-[180px]">Teacher intervenes and resolves foundation gap</p>
            </div>

          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-20 px-6 bg-slate-50 border-b border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">The Core Problem</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 leading-tight">
                A student can fall behind because of just one missing concept.
              </h2>
              <p className="text-slate-600 mt-6 leading-relaxed">
                In mathematics and language learning, concepts accumulate. Today's lesson rests on yesterday's prerequisite. When a student fails a quiz on fractions, they don't necessarily have a "fraction" problem. 
              </p>
              <p className="text-slate-600 mt-4 leading-relaxed font-semibold">
                Often, they never properly understood Division or Factors, making Equivalent Fractions conceptually impossible.
              </p>
              <div className="mt-8 p-4 bg-white border border-slate-100 rounded-xl shadow-sm flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold mt-0.5 text-xs">!</div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Teachers lack the time to run individual prerequisite tracing for 30 different students daily. Symptoms are graded, but root causes remain hidden.
                </p>
              </div>
            </div>
            
            {/* Diagnostic Chain Visualizer */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4 mb-6 flex items-center justify-between">
                <span>The Learning Failure Chain</span>
                <span className="text-xs text-red-500 font-semibold bg-red-50 px-2.5 py-0.5 rounded-full">Cumulative Gap</span>
              </h3>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-semibold text-sm">🟢</div>
                  <div className="flex-1 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <p className="text-xs font-semibold text-slate-800">Multiplication</p>
                    <p className="text-[10px] text-slate-500">Student gets 9 × 8 correct.</p>
                  </div>
                </div>
                
                <div className="w-0.5 h-4 bg-slate-200 ml-4"></div>

                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center font-bold text-sm">🔴</div>
                  <div className="flex-1 bg-red-50/30 p-3 rounded-lg border border-red-100">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-red-800">Division (Missing Gap)</p>
                      <span className="text-[9px] font-bold bg-red-100 text-red-700 px-1.5 py-0.5 rounded">Critical Block</span>
                    </div>
                    <p className="text-[10px] text-red-700 mt-1">Failed basic grouping questions repeatedly.</p>
                  </div>
                </div>

                <div className="w-0.5 h-4 bg-red-200 ml-4"></div>

                <div className="flex items-center space-x-4 opacity-50">
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-semibold text-sm">🔒</div>
                  <div className="flex-1 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <p className="text-xs font-semibold text-slate-800">Equivalent Fractions</p>
                    <p className="text-[10px] text-slate-500">Cannot simplify 4/6 to 2/3 (blocked by division).</p>
                  </div>
                </div>

                <div className="w-0.5 h-4 bg-slate-200 ml-4"></div>

                <div className="flex items-center space-x-4 opacity-50">
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-semibold text-sm">🔒</div>
                  <div className="flex-1 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <p className="text-xs font-semibold text-slate-800">Fraction Operations</p>
                    <p className="text-[10px] text-slate-500">Struggles to complete addition of unlike denominators.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 px-6 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">Interactive Framework</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">How GapWise Repairs Foundations</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 hover:border-brand-200 smooth-transition">
              <span className="text-3xl font-extrabold text-brand-200">01</span>
              <h3 className="text-lg font-bold text-slate-950 mt-4 flex items-center space-x-2">
                <BarChart2 className="w-5 h-5 text-brand-600" />
                <span>Diagnose</span>
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Students receive a short, gamified 6-to-10 question diagnostic session that adapts in real-time to investigate basic mathematical roots.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 hover:border-brand-200 smooth-transition">
              <span className="text-3xl font-extrabold text-brand-200">02</span>
              <h3 className="text-lg font-bold text-slate-950 mt-4 flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-brand-600" />
                <span>Detect</span>
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Our Gemini reasoning model analyzes the student's pattern of responses, separating transient errors from solid root prerequisite gaps.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 hover:border-brand-200 smooth-transition">
              <span className="text-3xl font-extrabold text-brand-200">03</span>
              <h3 className="text-lg font-bold text-slate-950 mt-4 flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-brand-600" />
                <span>Guide</span>
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Gemini generates a targeted 10-minute intervention activity for the specific diagnosed concept, providing teachers with immediate, useful resources.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 hover:border-brand-200 smooth-transition">
              <span className="text-3xl font-extrabold text-brand-200">04</span>
              <h3 className="text-lg font-bold text-slate-950 mt-4 flex items-center space-x-2">
                <RotateCcw className="w-5 h-5 text-brand-600" />
                <span>Recheck</span>
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Run a quick 2-question micro-reassessment on the diagnosed concept to verify the gap has been repaired and mark the student as ready.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-20 px-6 bg-slate-900 text-white relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3.5xl sm:text-4xl font-bold tracking-tight">
            Don't wait for failure to reveal the gap.
          </h2>
          <p className="mt-4 text-slate-300 text-base max-w-md mx-auto leading-relaxed">
            Trace root causes, deploy targeted micro-interventions, and watch class mathematics readiness climb.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('teacher')}
              className="w-full sm:w-auto px-8 py-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-lg shadow smooth-transition"
            >
              Open Teacher Dashboard
            </button>
            <button
              onClick={() => onNavigate('student')}
              className="w-full sm:w-auto px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-semibold rounded-lg smooth-transition"
            >
              Start Student Diagnostic
            </button>
          </div>
          
          <p className="text-[10px] text-slate-500 mt-12 max-w-lg mx-auto">
            GapWise provides educational insights to support teachers. AI recommendations are not formal educational, psychological, or medical diagnoses.
          </p>
        </div>
      </section>
    </div>
  );
};
