import type { Student } from '../types';

export const DEMO_STUDENTS: Student[] = [
  {
    id: 'st_ahmed',
    name: 'Ahmed Khan',
    grade: 'Grade 6',
    subject: 'Mathematics',
    currentTopic: 'Fractions',
    lastDiagnosticDate: '2026-08-12',
    history: [
      { questionId: 'ns_1', conceptId: 'number_comparison', studentAnswer: '>', isCorrect: true },
      { questionId: 'ns_2', conceptId: 'number_comparison', studentAnswer: '3.5', isCorrect: true },
      { questionId: 'mult_1', conceptId: 'multiplication', studentAnswer: '48', isCorrect: true },
      { questionId: 'mult_2', conceptId: 'multiplication', studentAnswer: '28', isCorrect: true },
      { questionId: 'div_1', conceptId: 'division', studentAnswer: '4', isCorrect: false }, // got 6 cookies wrong
      { questionId: 'div_2', conceptId: 'division', studentAnswer: '6', isCorrect: false }, // 42 / 6 = 7 wrong (got 6)
      { questionId: 'div_3', conceptId: 'division', studentAnswer: '6', isCorrect: false }, // 32 / 8 = 4 wrong (got 6)
      { questionId: 'fm_1', conceptId: 'factors_multiples', studentAnswer: '2', isCorrect: false },
      { questionId: 'fu_1', conceptId: 'fraction_understanding', studentAnswer: '3/4', isCorrect: true }
    ],
    status: 'needs_foundation_review',
    diagnosticResult: {
      primaryGap: {
        conceptId: 'division',
        severity: 'high',
        confidence: 'high',
        evidence: [
          'Answered "24 ÷ 4 cookies" incorrectly as "4".',
          'Answered "42 ÷ 6" incorrectly as "6".',
          'Answered "32 ÷ 8 batteries" incorrectly as "6".'
        ]
      },
      secondaryGaps: [
        {
          conceptId: 'factors_multiples',
          severity: 'medium',
          confidence: 'medium',
          evidence: ['Struggled to identify GCF of 12 and 18.']
        }
      ],
      strengths: ['multiplication', 'number_comparison'],
      currentTopicReadiness: 45,
      teacherRecommendation: 'Ahmed has a strong grasp of multiplication but struggles when reversing the operation for division. Since fractions represent parts divided by a whole, division is his primary barrier. Review basic division as sharing before introducing complex fraction operations.',
      intervention: {
        durationMinutes: 10,
        title: '10-Minute Division Refresher',
        steps: [
          'Quick mental division drills (1-digit divisors)',
          'Visual grouping activity using 16 counters divided into 4 bags',
          'Two guided examples of division as sharing',
          'One challenge question'
        ],
        content: `### 10-Minute Division Refresher Activity

**Objective**: Rebuild division confidence for fractions.
**Estimated Time**: 10 minutes

#### Part 1: Quick Mental Division (2 Minutes)
Ask the student these three quick questions:
1. "What is 15 split into 3 equal groups?" (5)
2. "If 20 crayons are shared among 4 kids, how many does each get?" (5)
3. "What number times 5 gives you 30?" (6)

#### Part 2: Visual Grouping Activity (3 Minutes)
Draw 16 circles on a sheet of paper.
- Ask the student to draw circles enclosing groups of 4.
- Ask: "How many groups of 4 did we make?" (4 groups of 4 = 16)
- Explain that 16 divided by 4 means finding how many groups of 4 fit in 16.

#### Part 3: Guided Examples (3 Minutes)
Work through these together:
- **Example 1**: "If we have 18 candies and want to put them into 3 bags equally. How many in each bag?" Write: $18 \\div 3 = 6$.
- **Example 2**: "If we have 25 cookies and put 5 in each box, how many boxes do we need?" Write: $25 \\div 5 = 5$.

#### Part 4: Challenge Question (2 Minutes)
"A bakery has 35 cupcakes. If they put 5 cupcakes in each box, how many boxes will they fill?"
- *Answer*: 7 boxes ($35 \\div 5 = 7$). Encourage the student to check using multiplication ($7 \\times 5 = 35$).`
      }
    }
  },
  {
    id: 'st_sara',
    name: 'Sara Ahmed',
    grade: 'Grade 6',
    subject: 'Mathematics',
    currentTopic: 'Fractions',
    lastDiagnosticDate: '2026-08-13',
    history: [
      { questionId: 'ns_1', conceptId: 'number_comparison', studentAnswer: '>', isCorrect: true },
      { questionId: 'mult_1', conceptId: 'multiplication', studentAnswer: '48', isCorrect: true },
      { questionId: 'div_1', conceptId: 'division', studentAnswer: '6', isCorrect: true },
      { questionId: 'fm_1', conceptId: 'factors_multiples', studentAnswer: '2', isCorrect: false }, // GCF wrong
      { questionId: 'fm_2', conceptId: 'factors_multiples', studentAnswer: '24', isCorrect: false }, // LCM wrong
      { questionId: 'fu_1', conceptId: 'fraction_understanding', studentAnswer: '3/4', isCorrect: true },
      { questionId: 'ef_1', conceptId: 'equivalent_fractions', studentAnswer: '1/2', isCorrect: false } // Equivalent wrong
    ],
    status: 'needs_practice',
    diagnosticResult: {
      primaryGap: {
        conceptId: 'factors_multiples',
        severity: 'medium',
        confidence: 'high',
        evidence: [
          'Answered GCF of 12 and 18 incorrectly as 2.',
          'Answered LCM of 4 and 6 incorrectly as 24.',
          'Answered equivalent fraction of 4/6 incorrectly as 1/2.'
        ]
      },
      secondaryGaps: [
        {
          conceptId: 'equivalent_fractions',
          severity: 'low',
          confidence: 'medium',
          evidence: ['Failed to simplify 4/6 to 2/3.']
        }
      ],
      strengths: ['division', 'multiplication', 'number_comparison'],
      currentTopicReadiness: 65,
      teacherRecommendation: 'Sara understands division and multiplication, but struggle with finding common multiples and factors. This will make finding common denominators in fractions difficult. Focus on visual factor trees and skip counting.',
      intervention: {
        durationMinutes: 10,
        title: '10-Minute Factors & Multiples Mini-Session',
        steps: [
          'Skip counting practice (multiples)',
          'Rainbow factor diagrams for 12 and 18',
          'Two guided GCF finder exercises',
          'Self-check question'
        ],
        content: `### 10-Minute Factors & Multiples Mini-Session

**Objective**: Understand how to find common factors and multiples for simplifying and adding fractions.
**Estimated Time**: 10 minutes

#### Part 1: Skip Counting (Multiples) (2 Minutes)
Practice skip counting out loud:
- Count by 3s up to 18: 3, 6, 9, 12, 15, 18.
- Count by 4s up to 20: 4, 8, 12, 16, 20.
- Highlight the number **12** as a multiple of both 3 and 4!

#### Part 2: Rainbow Factor Diagram (3 Minutes)
Draw a rainbow to find factors of 12:
- Connect $1 \\times 12$
- Connect $2 \\times 6$
- Connect $3 \\times 4$
- The factors of 12 are: 1, 2, 3, 4, 6, 12.
- Repeat for 18: 1, 2, 3, 6, 9, 18.
- Circle the shared numbers: 1, 2, 3, 6. The largest is **6** (GCF).

#### Part 3: Guided Example (3 Minutes)
Simplify 12/18 together using the GCF (6):
- Divide numerator: $12 \\div 6 = 2$.
- Divide denominator: $18 \\div 6 = 3$.
- simplified fraction is $2/3$.

#### Part 4: Practice Question (2 Minutes)
"Find the Least Common Multiple (LCM) of 6 and 8."
- *Answer*: Multiples of 6: 6, 12, 18, 24, 30. Multiples of 8: 8, 16, 24, 32. The smallest shared is **24**.`
      }
    }
  },
  {
    id: 'st_hamza',
    name: 'Hamza Malik',
    grade: 'Grade 6',
    subject: 'Mathematics',
    currentTopic: 'Fractions',
    lastDiagnosticDate: '2026-08-11',
    history: [
      { questionId: 'ns_1', conceptId: 'number_comparison', studentAnswer: '>', isCorrect: true },
      { questionId: 'mult_1', conceptId: 'multiplication', studentAnswer: '14', isCorrect: false }, // squirrel wrong (got addition)
      { questionId: 'mult_2', conceptId: 'multiplication', studentAnswer: '24', isCorrect: false }, // pattern wrong
      { questionId: 'mult_3', conceptId: 'multiplication', studentAnswer: '64', isCorrect: false }, // 9x8 wrong
      { questionId: 'div_1', conceptId: 'division', studentAnswer: '4', isCorrect: false }
    ],
    status: 'needs_foundation_review',
    diagnosticResult: {
      primaryGap: {
        conceptId: 'multiplication',
        severity: 'high',
        confidence: 'high',
        evidence: [
          'Answered 6 × 8 acorns incorrectly as 14 (addition error).',
          'Missed the skip pattern for 7s (selected 24 instead of 28).',
          'Answered 9 × 8 incorrectly as 64.'
        ]
      },
      secondaryGaps: [
        {
          conceptId: 'division',
          severity: 'high',
          confidence: 'medium',
          evidence: ['Failed division question due to weak multiplication basis.']
        }
      ],
      strengths: ['number_comparison'],
      currentTopicReadiness: 30,
      teacherRecommendation: 'Hamza has a critical gap in multiplication fundamentals. Multiplication is used for finding equivalent fractions, simplifying fractions, and multiplying fractions. Revisit multiplication arrays and skip counting immediately.',
      intervention: {
        durationMinutes: 10,
        title: 'Multiplication Array Builder',
        steps: [
          'Repeated addition to multiplication bridge',
          'Drawing grid arrays (e.g. 3x4 dots)',
          'Mastery drill for 6s, 7s, and 8s',
          'Word problem challenge'
        ],
        content: `### 10-Minute Multiplication Array Builder

**Objective**: Rebuild multiplication conceptual models and key facts.
**Estimated Time**: 10 minutes

#### Part 1: Repeated Addition Concept (2 Minutes)
Explain that $3 \\times 5$ is just 5 added together 3 times:
- $5 + 5 + 5 = 15$
- Show $6 \\times 3$: $3 + 3 + 3 + 3 + 3 + 3 = 18$

#### Part 2: Grid Arrays (3 Minutes)
Draw a grid of dots:
- Draw 3 rows of 4 dots.
- Count them together (12).
- Show that 3 rows of 4 is written as $3 \\times 4 = 12$.
- Rotate the page: now it is 4 rows of 3 dots ($4 \\times 3 = 12$).

#### Part 3: Guided Drill (3 Minutes)
Practice skip counting for 6s and 8s using visual aids.
- Skip count 6: 6, 12, 18, 24, 30.
- Skip count 8: 8, 16, 24, 32, 40.

#### Part 4: Challenge Question (2 Minutes)
"A classroom has 5 tables. Each table has 6 crayons. How many crayons are there?"
- *Answer*: $5 \\times 6 = 30$ crayons.`
      }
    }
  },
  {
    id: 'st_ali',
    name: 'Ali Raza',
    grade: 'Grade 6',
    subject: 'Mathematics',
    currentTopic: 'Fractions',
    lastDiagnosticDate: '2026-08-14',
    history: [
      { questionId: 'ns_1', conceptId: 'number_comparison', studentAnswer: '>', isCorrect: true },
      { questionId: 'mult_1', conceptId: 'multiplication', studentAnswer: '48', isCorrect: true },
      { questionId: 'div_1', conceptId: 'division', studentAnswer: '6', isCorrect: true },
      { questionId: 'fm_1', conceptId: 'factors_multiples', studentAnswer: '6', isCorrect: true },
      { questionId: 'fu_1', conceptId: 'fraction_understanding', studentAnswer: '3/4', isCorrect: true },
      { questionId: 'ef_1', conceptId: 'equivalent_fractions', studentAnswer: '2/3', isCorrect: true },
      { questionId: 'fo_1', conceptId: 'fraction_operations', studentAnswer: '3/4 cup', isCorrect: true }
    ],
    status: 'ready',
    diagnosticResult: {
      primaryGap: null,
      secondaryGaps: [],
      strengths: ['number_comparison', 'multiplication', 'division', 'factors_multiples', 'fraction_understanding', 'equivalent_fractions'],
      currentTopicReadiness: 95,
      teacherRecommendation: 'Ali has strong foundational mastery across all prerequisite concepts. He is fully ready for Grade 6 Fractions. You can challenge him with advanced fraction word problems and early algebra fractions.',
      intervention: null
    }
  },
  {
    id: 'st_zain',
    name: 'Zainab Bibi',
    grade: 'Grade 6',
    subject: 'Mathematics',
    currentTopic: 'Fractions',
    lastDiagnosticDate: '2026-08-13',
    history: [
      { questionId: 'ns_1', conceptId: 'number_comparison', studentAnswer: '>', isCorrect: true },
      { questionId: 'mult_1', conceptId: 'multiplication', studentAnswer: '48', isCorrect: true },
      { questionId: 'div_1', conceptId: 'division', studentAnswer: '4', isCorrect: false }, // Division missed
      { questionId: 'div_2', conceptId: 'division', studentAnswer: '6', isCorrect: false }, // Division missed
      { questionId: 'fm_1', conceptId: 'factors_multiples', studentAnswer: '2', isCorrect: false }, // Factors missed
      { questionId: 'fm_2', conceptId: 'factors_multiples', studentAnswer: '24', isCorrect: false } // Factors missed
    ],
    status: 'needs_foundation_review',
    diagnosticResult: {
      primaryGap: {
        conceptId: 'division',
        severity: 'high',
        confidence: 'high',
        evidence: [
          'Answered 24 ÷ 4 incorrectly.',
          'Answered 42 ÷ 6 incorrectly.'
        ]
      },
      secondaryGaps: [
        {
          conceptId: 'factors_multiples',
          severity: 'high',
          confidence: 'high',
          evidence: [
            'Struggled with Greatest Common Factor (GCF) of 12 and 18.',
            'Struggled with Least Common Multiple (LCM) of 4 and 6.'
          ]
        }
      ],
      strengths: ['multiplication', 'number_comparison'],
      currentTopicReadiness: 40,
      teacherRecommendation: 'Zainab is struggling with both division sharing models and factoring numbers. Because these two skills are key for equivalent fractions, she needs intensive small-group instruction on division before working on simplifying fractions.',
      intervention: {
        durationMinutes: 10,
        title: 'Joint Division & GCF Practice',
        steps: [
          'Revisit sharing/grouping model of division',
          'Use sharing model to find factors of 12',
          'Guided GCF matching',
          'Confidence-building check-out'
        ],
        content: `### 10-Minute Joint Division & GCF Refresher

**Objective**: Connecting division to factors and multiples.
**Estimated Time**: 10 minutes

#### Part 1: Division as Grouping (3 Minutes)
Use drawing boards:
- Ask the student: "Group 12 dots into piles of 3. How many piles do you get?" (4 piles)
- "Group 12 dots into piles of 4. How many piles do you get?" (3 piles)
- Write out the factor pairs: $3 \\times 4 = 12$. So 3 and 4 are factors of 12!

#### Part 2: Factoring via Division (3 Minutes)
Show that a factor is any number that divides 12 with no leftovers:
- $12 \\div 2 = 6$ (2 and 6 are factors)
- $12 \\div 5 = 2$ R 2 (5 is NOT a factor)
- Factors of 12: 1, 2, 3, 4, 6, 12.

#### Part 3: Guided Example (2 Minutes)
Find common factors of 8 and 12:
- Factors of 8: 1, 2, 4, 8.
- Factors of 12: 1, 2, 3, 4, 6, 12.
- The largest factor they share is **4** (GCF).

#### Part 4: Quick Check (2 Minutes)
"Is 6 a factor of 15?" (No, because $15 \\div 6 = 2$ remainder 3).`
      }
    }
  },
  {
    id: 'st_ayesha',
    name: 'Ayesha Siddiqui',
    grade: 'Grade 6',
    subject: 'Mathematics',
    currentTopic: 'Fractions',
    lastDiagnosticDate: '2026-08-10',
    history: [
      { questionId: 'ns_1', conceptId: 'number_comparison', studentAnswer: '>', isCorrect: true },
      { questionId: 'mult_1', conceptId: 'multiplication', studentAnswer: '48', isCorrect: true },
      { questionId: 'div_1', conceptId: 'division', studentAnswer: '6', isCorrect: true },
      { questionId: 'fm_1', conceptId: 'factors_multiples', studentAnswer: '6', isCorrect: true },
      { questionId: 'fu_1', conceptId: 'fraction_understanding', studentAnswer: '3/4', isCorrect: true },
      { questionId: 'ef_1', conceptId: 'equivalent_fractions', studentAnswer: '2/3', isCorrect: true },
      { questionId: 'fo_1', conceptId: 'fraction_operations', studentAnswer: '3/8 cup', isCorrect: false }, // 1/4 + 2/4 = 3/8 (added denominators!)
      { questionId: 'fo_2', conceptId: 'fraction_operations', studentAnswer: '2/6', isCorrect: false }  // 1/2 + 1/4 = 2/6 (added num/denom!)
    ],
    status: 'needs_practice',
    diagnosticResult: {
      primaryGap: {
        conceptId: 'fraction_operations',
        severity: 'medium',
        confidence: 'high',
        evidence: [
          'Answered 1/4 + 2/4 incorrectly as 3/8 (added numerators AND denominators).',
          'Answered 1/2 + 1/4 incorrectly as 2/6 (added numerators AND denominators).'
        ]
      },
      secondaryGaps: [],
      strengths: ['equivalent_fractions', 'factors_multiples', 'division', 'multiplication'],
      currentTopicReadiness: 70,
      teacherRecommendation: 'Ayesha has excellent foundational arithmetic. Her gap is a common misconception in fraction addition: adding denominators instead of finding a common denominator and keeping it the same. Re-teach with visual area models.',
      intervention: {
        durationMinutes: 10,
        title: 'Visual Fraction Addition Builder',
        steps: [
          'Shaded circle additions (same denominators)',
          'The Denominator Rule: "Keep the size of slices same!"',
          'Unlike denominator addition using paper folding',
          'Practice exercise'
        ],
        content: `### 10-Minute Visual Fraction Addition Builder

**Objective**: Clear the misconception of adding denominators.
**Estimated Time**: 10 minutes

#### Part 1: Visual Pizza Addition (3 Minutes)
Draw two circles cut into 4 slices (fourths):
- Shade 1 slice of the first circle (1/4).
- Shade 2 slices of the second circle (2/4).
- Ask: "If you put these shaded slices in one pizza, how many fourths do you have?" (3 slices)
- Write: $1/4 + 2/4 = 3/4$.
- Point out: "We did NOT get 3/8. The size of the slices is still fourths!"

#### Part 2: The Golden Rule (2 Minutes)
"When adding fractions, the denominator is the size of the slice. We only add the numerators (how many slices we have). The denominator stays the same!"
- $2/5 + 1/5 = 3/5$ (not $3/10$)
- $4/7 + 2/7 = 6/7$ (not $6/14$)

#### Part 3: Guided Example (3 Minutes)
Let's add 1/2 + 1/4:
- "Can we add them directly? No, the slices are different sizes (halves and fourths)."
- "Let's change 1/2 into fourths. Multiply top and bottom by 2: $1/2 = 2/4$."
- "Now add: $2/4 + 1/4 = 3/4$!"

#### Part 4: Practice (2 Minutes)
"Solve: 1/3 + 1/3"
- *Answer*: $2/3$. (Make sure student keeps denominator as 3).`
      }
    }
  },
  {
    id: 'st_fatima',
    name: 'Fatima Zahra',
    grade: 'Grade 6',
    subject: 'Mathematics',
    currentTopic: 'Fractions',
    lastDiagnosticDate: '2026-08-14',
    history: [
      { questionId: 'ns_1', conceptId: 'number_comparison', studentAnswer: '>', isCorrect: true },
      { questionId: 'mult_1', conceptId: 'multiplication', studentAnswer: '48', isCorrect: true },
      { questionId: 'div_1', conceptId: 'division', studentAnswer: '6', isCorrect: true },
      { questionId: 'fm_1', conceptId: 'factors_multiples', studentAnswer: '6', isCorrect: true },
      { questionId: 'fu_1', conceptId: 'fraction_understanding', studentAnswer: '3/4', isCorrect: true },
      { questionId: 'ef_1', conceptId: 'equivalent_fractions', studentAnswer: '1/2', isCorrect: false },
      { questionId: 'ef_2', conceptId: 'equivalent_fractions', studentAnswer: '9', isCorrect: false } // 3/5 = ?/20 got 9
    ],
    status: 'needs_practice',
    diagnosticResult: {
      primaryGap: {
        conceptId: 'equivalent_fractions',
        severity: 'medium',
        confidence: 'high',
        evidence: [
          'Answered 4/6 equivalent fraction incorrectly as 1/2.',
          'Answered 3/5 = ?/20 incorrectly as 9.'
        ]
      },
      secondaryGaps: [],
      strengths: ['fraction_understanding', 'factors_multiples', 'division', 'multiplication'],
      currentTopicReadiness: 72,
      teacherRecommendation: 'Fatima has a solid grasp of factors and division, but does not apply scale factors to numerators and denominators consistently. Focus on the "balance" rule (what you do to the bottom, you must do to the top).',
      intervention: {
        durationMinutes: 10,
        title: 'Scale Factor Balance Activity',
        steps: [
          'The scale balance rule explanation',
          'Interactive multiplier arrows',
          'Two equivalence practice problems',
          'Verification via drawing'
        ],
        content: `### 10-Minute Scale Factor Balance Activity

**Objective**: Master finding equivalent fractions by scaling.
**Estimated Time**: 10 minutes

#### Part 1: The Golden Balance Rule (2 Minutes)
"A fraction is like a balance scale. To keep it equivalent, whatever you multiply or divide the bottom by, you must multiply or divide the top by the EXACT same number!"
- Write: $\\frac{1 \\times 3}{2 \\times 3} = \\frac{3}{6}$

#### Part 2: Arrow Method (3 Minutes)
For $3/5 = ?/20$:
- Draw an arrow from 5 to 20 on the bottom. Ask: "What did we multiply 5 by to get 20?" (4)
- Now draw an arrow from 3 to the unknown top. "Since we multiplied the bottom by 4, we must multiply the top by 4!"
- $3 \\times 4 = 12$. So the missing number is **12**!

#### Part 3: Guided Example (3 Minutes)
Simplify 8/12:
- "Let's divide top and bottom by their GCF, which is 4."
- Numerator: $8 \\div 4 = 2$.
- Denominator: $12 \\div 4 = 3$.
- Equivalent simplified fraction: $2/3$.

#### Part 4: Practice (2 Minutes)
"Find the equivalent fraction: 2/3 = ?/9"
- *Answer*: **6** (since $3 \\times 3 = 9$, then $2 \\times 3 = 6$, giving $6/9$).`
      }
    }
  },
  {
    id: 'st_bilal',
    name: 'Bilal Hassan',
    grade: 'Grade 6',
    subject: 'Mathematics',
    currentTopic: 'Fractions',
    lastDiagnosticDate: '2026-08-09',
    history: [
      { questionId: 'ns_1', conceptId: 'number_comparison', studentAnswer: '<', isCorrect: false }, // 4509 < 4059 wrong
      { questionId: 'ns_2', conceptId: 'number_comparison', studentAnswer: '2.5', isCorrect: false }, // number line wrong
      { questionId: 'ns_3', conceptId: 'number_comparison', studentAnswer: '0.077', isCorrect: false }, // largest decimal wrong
      { questionId: 'mult_1', conceptId: 'multiplication', studentAnswer: '48', isCorrect: true }
    ],
    status: 'needs_foundation_review',
    diagnosticResult: {
      primaryGap: {
        conceptId: 'number_comparison',
        severity: 'high',
        confidence: 'high',
        evidence: [
          'Answered 4,509 is less than 4,059.',
          'Identified halfway between 3 and 4 as 2.5 on a number line.',
          'Identified 0.077 as larger than 0.7.'
        ]
      },
      secondaryGaps: [],
      strengths: ['multiplication'],
      currentTopicReadiness: 25,
      teacherRecommendation: 'Bilal has a fundamental gap in basic number sense and comparison. Place value understanding is weak, particularly with multi-digit integers and decimals. This makes comparing fractions or understanding fraction magnitude extremely difficult. Revisit place value charts.',
      intervention: {
        durationMinutes: 10,
        title: 'Place Value & Number Line Builder',
        steps: [
          'Place value chart labeling (thousands, hundreds, tens, ones)',
          'Number line walk-through',
          'Decimal size comparison using money analogy',
          'Check-in question'
        ],
        content: `### 10-Minute Place Value & Number Line Builder

**Objective**: Solidify number comparison and decimal values.
**Estimated Time**: 10 minutes

#### Part 1: Place Value House (3 Minutes)
Draw a place value chart for 4,509 and 4,059:
- Compare the thousands place: both have 4.
- Compare the hundreds place: 4,**5**09 has a 5, and 4,**0**59 has a 0.
- Since 5 hundreds is bigger than 0 hundreds, 4,509 is larger!

#### Part 2: Decimal Money Analogy (3 Minutes)
Compare 0.7 and 0.077:
- Tell the student to think of decimals as dollar cents.
- $0.7$ is like 7 dimes or 70 cents ($0.70$).
- $0.077$ is like 7 cents and a tiny bit ($0.077$).
- Ask: "Which would you rather have, 70 cents or 7 cents?" (70 cents!) So $0.7 > 0.077$.

#### Part 3: Number Line Halfways (2 Minutes)
Draw a line from 3 to 4. Mark the middle:
- "What number lies between 3 and 4?" (3 and a half, or 3.5)
- Point out why 2.5 is incorrect (it lies between 2 and 3).

#### Part 4: Practice (2 Minutes)
"Which is larger: 0.12 or 0.2?"
- *Answer*: **0.2** (since $0.20$ is 20 cents, and $0.12$ is 12 cents).`
      }
    }
  },
  {
    id: 'st_khadija',
    name: 'Khadija Umar',
    grade: 'Grade 6',
    subject: 'Mathematics',
    currentTopic: 'Fractions',
    lastDiagnosticDate: '2026-08-14',
    history: [
      { questionId: 'ns_1', conceptId: 'number_comparison', studentAnswer: '>', isCorrect: true },
      { questionId: 'mult_1', conceptId: 'multiplication', studentAnswer: '48', isCorrect: true },
      { questionId: 'div_1', conceptId: 'division', studentAnswer: '6', isCorrect: true },
      { questionId: 'fm_1', conceptId: 'factors_multiples', studentAnswer: '6', isCorrect: true },
      { questionId: 'fu_1', conceptId: 'fraction_understanding', studentAnswer: '3/4', isCorrect: true },
      { questionId: 'ef_1', conceptId: 'equivalent_fractions', studentAnswer: '2/3', isCorrect: true },
      { questionId: 'fo_1', conceptId: 'fraction_operations', studentAnswer: '3/4 cup', isCorrect: true }
    ],
    status: 'ready',
    diagnosticResult: {
      primaryGap: null,
      secondaryGaps: [],
      strengths: ['number_comparison', 'multiplication', 'division', 'factors_multiples', 'fraction_understanding', 'equivalent_fractions'],
      currentTopicReadiness: 98,
      teacherRecommendation: 'Khadija shows stellar mastery. She is ready for any challenge in fraction operations or converting fractions to decimals.',
      intervention: null
    }
  },
  {
    id: 'st_mustafa',
    name: 'Mustafa Ali',
    grade: 'Grade 6',
    subject: 'Mathematics',
    currentTopic: 'Fractions',
    lastDiagnosticDate: '2026-08-14',
    history: [
      { questionId: 'ns_1', conceptId: 'number_comparison', studentAnswer: '>', isCorrect: true },
      { questionId: 'mult_1', conceptId: 'multiplication', studentAnswer: '48', isCorrect: true },
      { questionId: 'div_1', conceptId: 'division', studentAnswer: '6', isCorrect: true },
      { questionId: 'fm_1', conceptId: 'factors_multiples', studentAnswer: '6', isCorrect: true },
      { questionId: 'fu_1', conceptId: 'fraction_understanding', studentAnswer: '3/4', isCorrect: true },
      { questionId: 'ef_1', conceptId: 'equivalent_fractions', studentAnswer: '2/3', isCorrect: true },
      { questionId: 'fo_1', conceptId: 'fraction_operations', studentAnswer: '3/4 cup', isCorrect: true }
    ],
    status: 'ready',
    diagnosticResult: {
      primaryGap: null,
      secondaryGaps: [],
      strengths: ['number_comparison', 'multiplication', 'division', 'factors_multiples', 'fraction_understanding', 'equivalent_fractions'],
      currentTopicReadiness: 95,
      teacherRecommendation: 'Mustafa understands all concepts. Fully ready to proceed to fraction operations.',
      intervention: null
    }
  },
  {
    id: 'st_yusuf',
    name: 'Yusuf Lodhi',
    grade: 'Grade 6',
    subject: 'Mathematics',
    currentTopic: 'Fractions',
    lastDiagnosticDate: '2026-08-12',
    history: [
      { questionId: 'ns_1', conceptId: 'number_comparison', studentAnswer: '>', isCorrect: true },
      { questionId: 'mult_1', conceptId: 'multiplication', studentAnswer: '48', isCorrect: true },
      { questionId: 'div_1', conceptId: 'division', studentAnswer: '4', isCorrect: false },
      { questionId: 'div_2', conceptId: 'division', studentAnswer: '6', isCorrect: false },
      { questionId: 'div_3', conceptId: 'division', studentAnswer: '6', isCorrect: false }
    ],
    status: 'needs_foundation_review',
    diagnosticResult: {
      primaryGap: {
        conceptId: 'division',
        severity: 'high',
        confidence: 'high',
        evidence: [
          'Answered 24 ÷ 4 incorrectly.',
          'Answered 42 ÷ 6 incorrectly.',
          'Answered 32 ÷ 8 incorrectly.'
        ]
      },
      secondaryGaps: [],
      strengths: ['multiplication', 'number_comparison'],
      currentTopicReadiness: 48,
      teacherRecommendation: 'Yusuf has a division gap. He is good at multiplication but cannot seem to divide correctly. Review division as equal groups.',
      intervention: {
        durationMinutes: 10,
        title: '10-Minute Division Refresher',
        steps: [
          'Mental division drills',
          'Visual counters grouping',
          'Two guided division examples',
          'Challenge question'
        ],
        content: `### 10-Minute Division Refresher (Yusuf)

**Objective**: Re-establish division concepts.
**Estimated Time**: 10 minutes

(Same as standard Division Refresher. Focus on sharing and grouping model).`
      }
    }
  },
  {
    id: 'st_zoya',
    name: 'Zoya Khan',
    grade: 'Grade 6',
    subject: 'Mathematics',
    currentTopic: 'Fractions',
    lastDiagnosticDate: '2026-08-13',
    history: [
      { questionId: 'ns_1', conceptId: 'number_comparison', studentAnswer: '>', isCorrect: true },
      { questionId: 'mult_1', conceptId: 'multiplication', studentAnswer: '48', isCorrect: true },
      { questionId: 'div_1', conceptId: 'division', studentAnswer: '6', isCorrect: true },
      { questionId: 'fm_1', conceptId: 'factors_multiples', studentAnswer: '2', isCorrect: false },
      { questionId: 'fm_2', conceptId: 'factors_multiples', studentAnswer: '24', isCorrect: false }
    ],
    status: 'needs_practice',
    diagnosticResult: {
      primaryGap: {
        conceptId: 'factors_multiples',
        severity: 'medium',
        confidence: 'high',
        evidence: [
          'Answered GCF of 12 and 18 incorrectly as 2.',
          'Answered LCM of 4 and 6 incorrectly as 24.'
        ]
      },
      secondaryGaps: [],
      strengths: ['division', 'multiplication', 'number_comparison'],
      currentTopicReadiness: 68,
      teacherRecommendation: 'Zoya needs practice finding common factors and multiples. Review GCF and LCM finding strategies.',
      intervention: {
        durationMinutes: 10,
        title: '10-Minute Factors & Multiples Mini-Session',
        steps: [
          'Skip counting practice',
          'Rainbow factors for 12 and 18',
          'LCM common list method',
          'Self-check question'
        ],
        content: `### 10-Minute Factors & Multiples Mini-Session (Zoya)
**Objective**: Mastering factors and multiples.
(Same as standard Factors and Multiples session).`
      }
    }
  }
];
