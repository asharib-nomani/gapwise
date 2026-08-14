import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let ai = null;

if (apiKey) {
  try {
    ai = new GoogleGenAI({ apiKey });
    console.log('✅ Gemini AI client successfully initialized with GEMINI_API_KEY.');
  } catch (error) {
    console.error('❌ Failed to initialize Gemini AI client:', error);
  }
} else {
  console.warn('⚠️ GEMINI_API_KEY is not set. Express server will run in DETERMINISTIC FALLBACK MODE.');
}

// Fallback Intervention Blueprints
const FALLBACK_INTERVENTIONS = {
  division: {
    durationMinutes: 10,
    title: '10-Minute Division Refresher',
    steps: [
      'Quick mental division drills (1-digit divisors)',
      'Visual grouping activity using 16 counters divided into 4 bags',
      'Two guided examples of division as sharing',
      'One challenge question'
    ],
    content: `### 10-Minute Division Refresher Activity (Fallback Mode)

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
  },
  factors_multiples: {
    durationMinutes: 10,
    title: '10-Minute Factors & Multiples Mini-Session',
    steps: [
      'Skip counting practice (multiples)',
      'Rainbow factor diagrams for 12 and 18',
      'Two GCF/LCM finder exercises',
      'Self-check question'
    ],
    content: `### 10-Minute Factors & Multiples Mini-Session (Fallback Mode)

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
- The simplified fraction is $2/3$.

#### Part 4: Practice Question (2 Minutes)
"Find the Least Common Multiple (LCM) of 6 and 8."
- *Answer*: Multiples of 6: 6, 12, 18, 24, 30. Multiples of 8: 8, 16, 24, 32. The smallest shared is **24**.`
  },
  multiplication: {
    durationMinutes: 10,
    title: 'Multiplication Array Builder',
    steps: [
      'Repeated addition to multiplication bridge',
      'Drawing grid arrays (e.g. 3x4 dots)',
      'Mastery drill for 6s, 7s, and 8s',
      'Word problem challenge'
    ],
    content: `### 10-Minute Multiplication Array Builder (Fallback Mode)

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
  },
  number_comparison: {
    durationMinutes: 10,
    title: 'Place Value & Number Line Builder',
    steps: [
      'Place value chart labeling (thousands, hundreds, tens, ones)',
      'Number line walk-through',
      'Decimal size comparison using money analogy',
      'Check-in question'
    ],
    content: `### 10-Minute Place Value & Number Line Builder (Fallback Mode)

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
  },
  equivalent_fractions: {
    durationMinutes: 10,
    title: 'Scale Factor Balance Activity',
    steps: [
      'The scale balance rule explanation',
      'Interactive multiplier arrows',
      'Two equivalence practice problems',
      'Verification via drawing'
    ],
    content: `### 10-Minute Scale Factor Balance Activity (Fallback Mode)

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
  },
  fraction_understanding: {
    durationMinutes: 10,
    title: 'Fraction Visualizer & Naming Session',
    steps: [
      'Visual circles and rectangle fraction representations',
      'Naming: Numerator (top/parts) vs. Denominator (bottom/whole)',
      'Fraction shading practice',
      'Identify fraction challenge'
    ],
    content: `### 10-Minute Fraction Visualizer (Fallback Mode)

**Objective**: Solidify basic representation of parts of a whole.
**Estimated Time**: 10 minutes

#### Part 1: Parts and Wholes (3 Minutes)
Draw a rectangle and split it into 4 equal blocks. Shade 1 block.
- Ask: "How many total blocks do we have?" (4)
- "How many are shaded?" (1)
- Explain that we write this as 1 out of 4, or $1/4$.
- Draw another rectangle with 4 blocks and shade 3. Write $3/4$.

#### Part 2: Numerator & Denominator Names (3 Minutes)
Explain the roles of numerator and denominator:
- **Denominator (Down)**: How many parts the whole is cut into. It sets the size of the pieces!
- **Numerator (Number on top)**: How many of those pieces we are talking about.
- Practice matching numerator/denominator terms.

#### Part 3: Drawing Practice (2 Minutes)
Draw a circle and divide it into 3 equal slices (thirds). Ask the student to shade 2/3.

#### Part 4: Check-in Question (2 Minutes)
"In the fraction 5/6, what does the 6 tell us?"
- *Answer*: The whole is divided into 6 equal parts.`
  },
  fraction_operations: {
    durationMinutes: 10,
    title: 'Visual Fraction Addition Builder',
    steps: [
      'Shaded circle additions (same denominators)',
      'The Denominator Rule: "Keep the size of slices same!"',
      'Unlike denominator addition using paper folding',
      'Practice exercise'
    ],
    content: `### 10-Minute Visual Fraction Addition Builder (Fallback Mode)

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
"When adding fractions, the denominator is the size of the slice. We only add the numerators. The denominator stays the same!"
- $2/5 + 1/5 = 3/5$ (not $3/10$)
- $4/7 + 2/7 = 6/7$ (not $6/14$)

#### Part 3: Guided Example (3 Minutes)
Let's add 1/2 + 1/4:
- "Can we add them directly? No, the slices are different sizes."
- "Let's change 1/2 into fourths. Multiply top and bottom by 2: $1/2 = 2/4$."
- "Now add: $2/4 + 1/4 = 3/4$!"

#### Part 4: Practice (2 Minutes)
"Solve: 1/3 + 1/3"
- *Answer*: $2/3$.`
  }
};

// 1. Endpoint: Diagnose learning gaps from responses
app.post('/api/diagnose', async (req, res) => {
  const { grade, subject, currentTopic, responses } = req.body;

  if (!responses || !Array.isArray(responses) || responses.length === 0) {
    return res.status(400).json({ error: 'Invalid or empty responses array.' });
  }

  // 1. Fallback Logic: Deterministic Analysis
  const runDeterministicAnalysis = () => {
    // Group responses by concept
    const conceptStats = {};
    responses.forEach(r => {
      if (!conceptStats[r.conceptId]) {
        conceptStats[r.conceptId] = { total: 0, incorrect: 0, evidence: [] };
      }
      conceptStats[r.conceptId].total++;
      if (!r.isCorrect) {
        conceptStats[r.conceptId].incorrect++;
        conceptStats[r.conceptId].evidence.push(`Answered "${r.questionId}" incorrectly.`);
      }
    });

    // Find primary gap: concept with highest number of incorrect answers
    let primaryGapConcept = null;
    let maxIncorrect = 0;
    
    // Sort concepts based on dependency (we investigate basic prerequisites first)
    // Concept list in order of basic -> advanced:
    const conceptOrder = ['number_comparison', 'multiplication', 'division', 'factors_multiples', 'fraction_understanding', 'equivalent_fractions', 'fraction_operations'];
    
    conceptOrder.forEach(conceptId => {
      const stats = conceptStats[conceptId];
      if (stats && stats.incorrect > 0) {
        // If a basic concept has multiple errors, prioritize it as the primary gap
        if (stats.incorrect > maxIncorrect || (stats.incorrect === maxIncorrect && !primaryGapConcept)) {
          maxIncorrect = stats.incorrect;
          primaryGapConcept = conceptId;
        }
      }
    });

    let primaryGap = null;
    if (primaryGapConcept) {
      const stats = conceptStats[primaryGapConcept];
      const severity = stats.incorrect >= 2 ? 'high' : 'medium';
      const confidence = stats.total >= 3 ? 'high' : 'medium';
      primaryGap = {
        conceptId: primaryGapConcept,
        severity,
        confidence,
        evidence: stats.evidence
      };
    }

    // Secondary gaps: other concepts with errors
    const secondaryGaps = [];
    Object.keys(conceptStats).forEach(conceptId => {
      if (conceptId !== primaryGapConcept && conceptStats[conceptId].incorrect > 0) {
        const stats = conceptStats[conceptId];
        secondaryGaps.push({
          conceptId,
          severity: stats.incorrect >= 2 ? 'high' : 'medium',
          confidence: 'medium',
          evidence: stats.evidence
        });
      }
    });

    // Strengths: concepts with 100% correct answers
    const strengths = [];
    Object.keys(conceptStats).forEach(conceptId => {
      if (conceptStats[conceptId].incorrect === 0 && conceptStats[conceptId].total > 0) {
        strengths.push(conceptId);
      }
    });

    // Compute readiness score
    let readinessScore = 95;
    if (primaryGap) {
      readinessScore -= primaryGap.severity === 'high' ? 40 : 25;
    }
    readinessScore -= secondaryGaps.length * 15;
    readinessScore = Math.max(15, Math.min(95, readinessScore));

    // Generate recommendation
    let teacherRecommendation = '';
    if (primaryGap) {
      const conceptNames = {
        number_comparison: 'Number Sense & Comparison',
        multiplication: 'Multiplication Fundamentals',
        division: 'Division Fundamentals',
        factors_multiples: 'Factors & Multiples',
        fraction_understanding: 'Basic Fraction Understanding',
        equivalent_fractions: 'Equivalent Fractions',
        fraction_operations: 'Fraction Operations'
      };
      const name = conceptNames[primaryGap.conceptId] || primaryGap.conceptId;
      teacherRecommendation = `Revisit ${name} before moving forward. The student is struggling with the foundation, which prevents successful completion of the current Fractions lessons.`;
    } else {
      teacherRecommendation = 'The student shows solid understanding of prerequisites. Ready to proceed with fraction operations and advanced content.';
    }

    // Assign fallback intervention based on primary gap
    const interventionKey = primaryGap ? primaryGap.conceptId : 'fraction_operations';
    const baseIntervention = FALLBACK_INTERVENTIONS[interventionKey] || FALLBACK_INTERVENTIONS['division'];

    return {
      primaryGap,
      secondaryGaps,
      strengths,
      currentTopicReadiness: readinessScore,
      teacherRecommendation,
      intervention: primaryGap ? baseIntervention : null,
      ruleBased: true
    };
  };

  // If Gemini is not initialized, run deterministic and return
  if (!ai) {
    return res.json(runDeterministicAnalysis());
  }

  // 2. Call Gemini
  try {
    const formattedResponses = responses.map(r => 
      `- Question ID: ${r.questionId}, Concept Tested: ${r.conceptId}, Correct Answer: ${r.correctAnswer}, Student's Selection: ${r.studentAnswer}, Result: ${r.isCorrect ? 'CORRECT' : 'INCORRECT'}`
    ).join('\n');

    const prompt = `You are a professional educational diagnostic AI. Your goal is to determine WHY a student is struggling with the current topic, focusing on finding the likely prerequisite learning gap.
    
    STUDENT PROFILE:
    - Grade: ${grade}
    - Subject: ${subject}
    - Current Topic: ${currentTopic}
    
    CONCEPT GRAPH (PREREQUISITES FROM BASIC TO ADVANCED):
    Number Sense (number_comparison) -> Multiplication (multiplication) -> Division (division) -> Factors & Multiples (factors_multiples) -> Basic Fractions (fraction_understanding) -> Equivalent Fractions (equivalent_fractions) -> Fraction Operations (fraction_operations)

    QUIZ RESPONSES:
    ${formattedResponses}

    TASK:
    Analyze these responses. Identify the likely primary learning gap (deepest root cause in the prerequisite chain), secondary gaps (other areas of struggle), and strengths (concepts showing solid execution). Compute readiness for the current topic (0-100%). Create a short recommendation for the teacher.
    
    NOTE:
    - The primary gap should represent the earliest/deepest prerequisite concept in the dependency chain that the student struggled with. For example, if both division and factors are weak, and division is a prerequisite for factors, division is likely the primary gap.
    - One wrong answer must not be enough to confidently declare a gap. Look for repeated patterns.
    - The confidence must be "high", "medium", or "low" based on the volume of evidence.
    - Evidence should refer to specific questions and responses.

    Respond in JSON matching the exact schema specified. Do not include markdown code block syntax inside the json values.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'OBJECT',
          properties: {
            primaryGap: {
              type: 'OBJECT',
              nullable: true,
              properties: {
                conceptId: { type: 'STRING' },
                severity: { type: 'STRING', enum: ['high', 'medium', 'low'] },
                confidence: { type: 'STRING', enum: ['high', 'medium', 'low'] },
                evidence: { type: 'ARRAY', items: { type: 'STRING' } }
              },
              required: ['conceptId', 'severity', 'confidence', 'evidence']
            },
            secondaryGaps: {
              type: 'ARRAY',
              items: {
                type: 'OBJECT',
                properties: {
                  conceptId: { type: 'STRING' },
                  severity: { type: 'STRING', enum: ['high', 'medium', 'low'] },
                  confidence: { type: 'STRING', enum: ['high', 'medium', 'low'] },
                  evidence: { type: 'ARRAY', items: { type: 'STRING' } }
                },
                required: ['conceptId', 'severity', 'confidence', 'evidence']
              }
            },
            strengths: { type: 'ARRAY', items: { type: 'STRING' } },
            currentTopicReadiness: { type: 'INTEGER' },
            teacherRecommendation: { type: 'STRING' }
          },
          required: ['primaryGap', 'secondaryGaps', 'strengths', 'currentTopicReadiness', 'teacherRecommendation']
        }
      }
    });

    const result = JSON.parse(response.text);
    
    // Attach matching intervention activity using fallback blueprints as base
    if (result.primaryGap) {
      const key = result.primaryGap.conceptId;
      result.intervention = FALLBACK_INTERVENTIONS[key] || FALLBACK_INTERVENTIONS['division'];
    } else {
      result.intervention = null;
    }

    result.ruleBased = false;
    res.json(result);
  } catch (error) {
    console.error('❌ Gemini /api/diagnose failed. Running fallback...', error);
    res.json(runDeterministicAnalysis());
  }
});

// 2. Endpoint: Generate targeted 10-minute intervention activity
app.post('/api/intervention', async (req, res) => {
  const { conceptId, studentName } = req.body;

  if (!conceptId) {
    return res.status(400).json({ error: 'conceptId is required.' });
  }

  const fallbackIntervention = FALLBACK_INTERVENTIONS[conceptId] || FALLBACK_INTERVENTIONS['division'];
  
  if (!ai) {
    // Personalize the fallback content
    const personalizedContent = fallbackIntervention.content.replace(/\(Fallback Mode\)/g, `for ${studentName || 'the student'}`);
    return res.json({
      ...fallbackIntervention,
      content: personalizedContent,
      ruleBased: true
    });
  }

  try {
    const prompt = `You are an expert EdTech developer and remedial educator.
    Create a 10-Minute targeted learning intervention for a Grade 6 student named "${studentName || 'Ahmed'}" who is struggling with the concept: "${conceptId}".
    The intervention should fit a 10-minute lesson window and contain:
    - Part 1: Quick mental warmups/drills (2 minutes)
    - Part 2: A visual/hands-on grouping or drawing activity (3 minutes)
    - Part 3: Two guided examples with step-by-step solutions (3 minutes)
    - Part 4: One challenge question with explanation (2 minutes)
    
    Use clear, encouraging language. Provide instructions for the teacher on how to guide the student.
    Use LaTeX formatting for mathematical expressions (e.g. $1/2$ or $12 \\div 3 = 4$).
    
    Respond in JSON matching the exact schema specified. Do not include markdown code block wraps in the string values.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'OBJECT',
          properties: {
            durationMinutes: { type: 'INTEGER' },
            title: { type: 'STRING' },
            steps: { type: 'ARRAY', items: { type: 'STRING' } },
            content: { type: 'STRING', description: 'Full markdown document for the intervention worksheet' }
          },
          required: ['durationMinutes', 'title', 'steps', 'content']
        }
      }
    });

    const result = JSON.parse(response.text);
    result.ruleBased = false;
    res.json(result);
  } catch (error) {
    console.error('❌ Gemini /api/intervention failed. Running fallback...', error);
    const personalizedContent = fallbackIntervention.content.replace(/\(Fallback Mode\)/g, `for ${studentName || 'the student'}`);
    res.json({
      ...fallbackIntervention,
      content: personalizedContent,
      ruleBased: true
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 GapWise API Server running on http://localhost:${PORT}`);
});
