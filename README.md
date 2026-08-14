# 🧠 GapWise

### **Find the gap. Fix the foundation.**

> An AI-powered learning-gap diagnostic platform that helps teachers
> discover the foundational concepts behind a student's current learning
> difficulties.

[![Built with
React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Gemini
AI](https://img.shields.io/badge/AI-Google%20Gemini-8E75B2?logo=google)](https://ai.google.dev/)
[![Tailwind
CSS](https://img.shields.io/badge/Style-Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Status](https://img.shields.io/badge/Status-Hackathon%20MVP-success)](#)

------------------------------------------------------------------------

## 🇵🇰 The Problem

In Pakistani schools, students often fall behind because **one missing
foundational concept can make every new topic harder**.

A student may struggle with **fractions**, for example, not because
fractions themselves are too difficult, but because they never fully
understood **division or multiplication** earlier.

The problem is that teachers usually see only the symptom:

> **"Ahmed is weak in fractions."**

But the real issue may be:

> **"Ahmed has an unresolved gap in division."**

With large classrooms and limited time, it is difficult for teachers to
identify these hidden prerequisite gaps for every student.

### The result

**Small learning gaps accumulate into bigger learning problems.**

------------------------------------------------------------------------

## 💡 Our Solution

**GapWise** turns learning-gap detection into a short, student-friendly
diagnostic process.

Instead of simply asking:

> *"Did the student get the answer right?"*

GapWise asks:

> **"Why is the student struggling with this topic?"**

It analyzes a student's response patterns against a **prerequisite
concept map**, then uses AI to identify the most likely foundational gap
and provide the teacher with an actionable next step.

### The core loop

``` text
Diagnose
   ↓
Detect the likely root gap
   ↓
Guide the teacher
   ↓
Targeted intervention
   ↓
Reassess
```

------------------------------------------------------------------------

# ✨ How GapWise Works

### 01 --- Diagnose

Students complete a short, playful diagnostic instead of a stressful
exam.

The questions are designed to investigate the foundational concepts
required for the current topic.

### 02 --- Detect

GapWise analyzes response patterns across related concepts.

For example:

``` text
Multiplication  →  Strong
Division        →  Weak
Factors         →  Uncertain
Fractions       →  Current difficulty
```

The system can identify **division** as a likely prerequisite gap.

### 03 --- Explain

Google Gemini analyzes the evidence and produces a structured
learning-gap insight.

The teacher can see:

-   Likely primary gap
-   Secondary gaps
-   Strengths
-   Evidence
-   Confidence
-   Current-topic readiness

### 04 --- Guide

Instead of simply saying *"the student is struggling"*, GapWise gives
the teacher a practical recommendation.

Example:

> **Review division fundamentals before moving deeper into fraction
> operations.**

### 05 --- Reassess

The teacher can revisit the identified concept and check whether the gap
has improved.

------------------------------------------------------------------------

# 🧠 What Makes GapWise Different?

Most educational tools focus on **scores**.

GapWise focuses on **foundations**.

  Traditional approach       GapWise
  -------------------------- -------------------------------------
  Student gets a score       Student gets a learning-gap profile
  Identifies what is wrong   Investigates why it is wrong
  Same test for everyone     Diagnostic investigation
  Teacher sees performance   Teacher sees actionable insight
  Focuses on current topic   Traces prerequisite concepts
  Feedback after failure     Early intervention

### One simple idea:

> **Don't wait for failure to reveal the gap.**

------------------------------------------------------------------------

# 🎯 Hackathon MVP

The current MVP focuses on:

**Grade 6 → Mathematics → Fractions**

The diagnostic investigates prerequisite concepts such as:

``` text
Number Sense
      ↓
Multiplication
      ↓
Division
      ↓
Factors & Multiples
      ↓
Fractions
      ↓
Equivalent Fractions
      ↓
Fraction Operations
```

The architecture is designed to expand this model to other grades,
subjects, and concepts.

------------------------------------------------------------------------

# 🤖 AI-Powered Diagnosis

GapWise uses **Google Gemini** as its reasoning layer.

Gemini receives structured diagnostic evidence including:

-   Student responses
-   Concepts tested
-   Correct answers
-   Prerequisite relationships
-   Repeated mistakes
-   Current topic
-   Grade level

It then generates structured insights such as:

``` json
{
  "primaryGap": {
    "concept": "division",
    "severity": "high",
    "confidence": "high"
  },
  "secondaryGaps": [
    {
      "concept": "factors_and_multiples",
      "severity": "medium"
    }
  ],
  "strengths": [
    "multiplication",
    "number_comparison"
  ],
  "currentTopicReadiness": "needs_foundation_review"
}
```

### Hybrid by design

GapWise does **not** blindly trust an LLM.

The system combines:

**Deterministic logic**

-   Question bank
-   Correct answers
-   Concept mapping
-   Prerequisite relationships
-   Response tracking

with:

**Gemini AI**

-   Pattern interpretation
-   Root-gap reasoning
-   Evidence explanation
-   Teacher recommendations
-   Intervention generation

This makes the diagnostic more grounded and reliable.

------------------------------------------------------------------------

# 👨‍🏫 Teacher Dashboard

The teacher gets a classroom-level view of learning gaps.

### Class Learning Map

Example:

``` text
Ahmed
🔴 Division
🟡 Factors & Multiples
🟢 Multiplication

Sara
🟢 Foundations look solid

Hamza
🔴 Multiplication
🟡 Division
```

Teachers can quickly identify:

-   Which concepts are affecting the most students
-   Which individual students need attention
-   Which foundations appear strong
-   Where classroom intervention should start

------------------------------------------------------------------------

# 👤 Individual Student Insight

For each student, GapWise can show:

### Primary Gap

**Division --- High confidence**

### Evidence

> The student struggled repeatedly with division-related questions.

### Strengths

-   Multiplication
-   Number comparison

### Recommended Action

> Review division fundamentals before moving deeper into fraction
> operations.

### AI-Generated Intervention

A teacher can generate a short targeted activity such as:

**10-Minute Division Refresher**

1.  Quick mental division
2.  Visual grouping
3.  Two guided examples
4.  One challenge question

------------------------------------------------------------------------

# 🎮 Student Experience

GapWise deliberately avoids making the diagnostic feel like an exam.

Instead of:

> **TEST --- 10 Questions**

students see:

> 👋 **Let's see how your Maths brain is working today.**

And:

> **No marks. No pressure. Just have fun.**

The student experience is designed to be:

-   Short
-   Playful
-   Mobile-friendly
-   Low-pressure
-   Easy to understand

Students are not shown their AI diagnosis. The insight is designed for
the teacher.

------------------------------------------------------------------------

# 🏗️ Product Architecture

``` text
                    ┌──────────────────┐
                    │     Student      │
                    │    Diagnostic    │
                    └────────┬─────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │  Response Analysis  │
                  │  + Concept Mapping  │
                  └──────────┬──────────┘
                             │
                    Structured Evidence
                             │
                             ▼
                  ┌─────────────────────┐
                  │     Gemini AI       │
                  │ Diagnostic Reasoner │
                  └──────────┬──────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │  Learning Gap       │
                  │  + Evidence        │
                  │  + Recommendation  │
                  └──────────┬──────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │ Teacher Dashboard   │
                  └──────────┬──────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │ Targeted Intervention│
                  │    + Reassessment   │
                  └─────────────────────┘
```

------------------------------------------------------------------------

# 🛠️ Technology Stack

  Technology                    Purpose
  ----------------------------- -----------------------------
  **React**                     User interface
  **TypeScript**                Type-safe application logic
  **Tailwind CSS**              UI styling
  **Lucide**                    Interface icons
  **Google Gemini**             AI diagnostic reasoning
  **@google/genai**             Gemini API integration
  **Local state / demo data**   Hackathon MVP data layer

The MVP intentionally avoids unnecessary infrastructure such as
authentication, payments, and a complex database.

------------------------------------------------------------------------

# 🔐 Privacy & Safety

GapWise is designed as an educational support tool.

The MVP uses fictional/demo student data and does not require sensitive
personal information.

GapWise does **not** attempt to diagnose:

-   Learning disabilities
-   Mental health conditions
-   Medical conditions
-   Intelligence
-   Personality

AI results are educational insights intended to support teachers, not
formal diagnoses.

> **GapWise provides educational insights to support teachers. AI
> recommendations are not formal educational, psychological, or medical
> diagnoses.**

------------------------------------------------------------------------

# 🚀 Future Vision

The current MVP starts with one learning pathway, but the underlying
idea can scale.

### Subjects

-   📐 Mathematics
-   🔬 Science
-   📖 English
-   اردو Urdu

### Grades

**3--8**

### Future capabilities

-   Curriculum-aware concept graphs
-   More adaptive diagnostics
-   Personalized learning paths
-   Teacher-generated intervention plans
-   Progress tracking
-   Reassessment analytics
-   School-level learning-gap analytics
-   Parent-facing progress summaries
-   Offline-friendly diagnostics for low-connectivity environments

------------------------------------------------------------------------

# 🌍 Why Pakistan?

Pakistan has a large and diverse school-going population, and classroom
teachers often have to support many students with very different levels
of understanding.

GapWise is designed around a simple reality:

> **A teacher shouldn't have to manually investigate every student's
> entire learning history to find one missing foundation.**

AI can help make that investigation faster and more actionable.

------------------------------------------------------------------------

# 🏆 Built for the Chai & Code Challenge

GapWise was built around the challenge:

> **Build something inspired by Pakistan.**

Rather than creating another generic AI chatbot, we focused on a
specific problem in education:

**The hidden learning gap behind a student's struggle.**

The goal is simple:

> **Find the gap before it becomes a bigger problem.**

------------------------------------------------------------------------

# 📸 Screenshots

Add project screenshots here:

``` text
docs/
├── landing-page.png
├── student-diagnostic.png
├── teacher-dashboard.png
└── student-insight.png
```

Then embed them in this section as they become available.

------------------------------------------------------------------------

# ⚙️ Getting Started

## Prerequisites

-   Node.js 18+
-   npm
-   A Google Gemini API key

## Installation

Clone the repository and install dependencies:

``` bash
npm install
```

## Environment Variable

Create a local environment file:

``` text
GEMINI_API_KEY=your_api_key_here
```

**Never commit your API key to GitHub.**

## Run locally

``` bash
npm run dev
```

Open the local development URL shown in your terminal.

## Production build

``` bash
npm run build
```

------------------------------------------------------------------------

# 🧪 Demo Flow

For the fastest demonstration:

``` text
1. Open GapWise
        ↓
2. Teacher Demo
        ↓
3. Grade 6
        ↓
4. Mathematics
        ↓
5. Fractions
        ↓
6. View Class Learning Map
        ↓
7. Open Ahmed
        ↓
8. See "Likely Root Gap: Division"
        ↓
9. View AI Evidence
        ↓
10. Generate Revision Activity
```

### The 30-second pitch

> **"A student can struggle with fractions because they never mastered
> division. Teachers usually see the symptom, not the cause. GapWise
> gives students a short diagnostic, traces their responses through
> prerequisite concepts, and uses AI to identify the likely learning gap
> and tell the teacher what to do next."**

------------------------------------------------------------------------

# 🧭 Roadmap

### Phase 1 --- MVP

-   [x] Student diagnostic
-   [x] Concept-based question bank
-   [x] Teacher dashboard
-   [x] AI learning-gap analysis
-   [x] Individual student insights
-   [x] AI-generated intervention
-   [x] Demo classroom

### Phase 2 --- Expansion

-   [ ] More Mathematics concepts
-   [ ] Grades 3--8
-   [ ] Science
-   [ ] English
-   [ ] Urdu
-   [ ] Improved adaptive questioning
-   [ ] Reassessment analytics

### Phase 3 --- Real-World Deployment

-   [ ] Teacher accounts
-   [ ] School dashboards
-   [ ] Curriculum mapping
-   [ ] Student progress history
-   [ ] Offline/low-bandwidth support
-   [ ] Real classroom pilots

------------------------------------------------------------------------

# ❤️ The Vision

Every student has gaps.

The problem isn't always **that they don't understand today's lesson**.

Sometimes, they are standing on a weak foundation.

GapWise helps teachers find that foundation.

### **Find the gap. Fix the foundation.**

------------------------------------------------------------------------

## 📄 License

This project was created as a hackathon prototype. Add an appropriate
open-source license before distributing the code publicly.
