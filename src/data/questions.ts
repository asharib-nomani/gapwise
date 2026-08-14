import type { Question } from '../types';

export const QUESTIONS: Question[] = [
  // 1. Number Sense & Comparison
  {
    id: 'ns_1',
    conceptId: 'number_comparison',
    text: 'Which sign makes this comparison true? 4,509 ___ 4,059',
    options: ['>', '<', '='],
    correctAnswer: '>',
    visualType: 'comparison',
    visualData: { left: '4,509', right: '4,059' }
  },
  {
    id: 'ns_2',
    conceptId: 'number_comparison',
    text: 'Imagine a number line. Which number is exactly halfway between 3 and 4?',
    options: ['3.1', '3.5', '4.5', '2.5'],
    correctAnswer: '3.5'
  },
  {
    id: 'ns_3',
    conceptId: 'number_comparison',
    text: 'Which number is the largest?',
    options: ['0.07', '0.7', '0.007', '0.077'],
    correctAnswer: '0.7'
  },

  // 2. Multiplication
  {
    id: 'mult_1',
    conceptId: 'multiplication',
    text: 'A playful squirrel hides 6 acorns under each of the 8 trees in the garden. How many acorns did it hide in total?',
    options: ['14', '36', '42', '48'],
    correctAnswer: '48'
  },
  {
    id: 'mult_2',
    conceptId: 'multiplication',
    text: 'Find the missing number in this pattern: 7, 14, 21, [?], 35, 42',
    options: ['24', '28', '30', '32'],
    correctAnswer: '28'
  },
  {
    id: 'mult_3',
    conceptId: 'multiplication',
    text: 'Solve: 9 × 8 = ?',
    options: ['64', '72', '81', '90'],
    correctAnswer: '72'
  },

  // 3. Division
  {
    id: 'div_1',
    conceptId: 'division',
    text: 'You have 24 delicious chocolate chip cookies and want to share them equally among 4 friends. How many cookies does each friend get?',
    options: ['4', '6', '8', '12'],
    correctAnswer: '6',
    visualType: 'division_grouping',
    visualData: { total: 24, groups: 4 }
  },
  {
    id: 'div_2',
    conceptId: 'division',
    text: 'Solve: 42 ÷ 6 = ?',
    options: ['6', '7', '8', '9'],
    correctAnswer: '7'
  },
  {
    id: 'div_3',
    conceptId: 'division',
    text: 'A robot has 32 batteries and needs to pack them into boxes that hold 8 batteries each. How many boxes can the robot fill completely?',
    options: ['3', '4', '6', '8'],
    correctAnswer: '4'
  },

  // 4. Factors & Multiples
  {
    id: 'fm_1',
    conceptId: 'factors_multiples',
    text: 'What is the Greatest Common Factor (GCF) of the numbers 12 and 18?',
    options: ['2', '3', '6', '36'],
    correctAnswer: '6'
  },
  {
    id: 'fm_2',
    conceptId: 'factors_multiples',
    text: 'What is the Least Common Multiple (LCM) of 4 and 6?',
    options: ['2', '12', '24', '8'],
    correctAnswer: '12'
  },
  {
    id: 'fm_3',
    conceptId: 'factors_multiples',
    text: 'Which of the following is a prime number (has only 1 and itself as factors)?',
    options: ['9', '15', '21', '23'],
    correctAnswer: '23'
  },

  // 5. Basic Fraction Understanding
  {
    id: 'fu_1',
    conceptId: 'fraction_understanding',
    text: 'Look at the circle below. What fraction of this circle is shaded blue?',
    options: ['1/4', '2/4', '3/4', '3/3'],
    correctAnswer: '3/4',
    visualType: 'fraction_grid',
    visualData: { shaded: 3, total: 4 }
  },
  {
    id: 'fu_2',
    conceptId: 'fraction_understanding',
    text: 'In the fraction 5/8, what is the math word for the bottom number "8", which shows how many equal parts the whole is divided into?',
    options: ['Numerator', 'Denominator', 'Remainder', 'Divisor'],
    correctAnswer: 'Denominator'
  },

  // 6. Equivalent Fractions
  {
    id: 'ef_1',
    conceptId: 'equivalent_fractions',
    text: 'If you have a pizza cut into 6 slices and eat 4 of them (4/6), which fraction represents eating the exact same amount of pizza?',
    options: ['1/2', '2/3', '3/4', '5/6'],
    correctAnswer: '2/3',
    visualType: 'fraction_grid',
    visualData: { shaded: 4, total: 6, compareTo: '2/3' }
  },
  {
    id: 'ef_2',
    conceptId: 'equivalent_fractions',
    text: 'Solve to find the missing numerator: 3/5 = ?/20',
    options: ['9', '12', '15', '16'],
    correctAnswer: '12'
  },

  // 7. Fraction Operations
  {
    id: 'fo_1',
    conceptId: 'fraction_operations',
    text: 'A recipe calls for 1/4 cup of sugar and 2/4 cup of flour. How much of these ingredients do you add in total?',
    options: ['3/8 cup', '3/4 cup', '1/2 cup', '3/16 cup'],
    correctAnswer: '3/4 cup'
  },
  {
    id: 'fo_2',
    conceptId: 'fraction_operations',
    text: 'Add: 1/2 + 1/4 = ?',
    options: ['2/6', '3/4', '2/4', '5/8'],
    correctAnswer: '3/4'
  },
  {
    id: 'fo_3',
    conceptId: 'fraction_operations',
    text: 'Solve: 2/3 × 1/4 = ? (Tip: multiply the numerators together and the denominators together, then simplify)',
    options: ['1/6', '2/7', '3/7', '1/4'],
    correctAnswer: '1/6'
  }
];
