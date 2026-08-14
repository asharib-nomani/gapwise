import type { Concept } from '../types';

export const CONCEPTS: Concept[] = [
  {
    id: 'number_comparison',
    name: 'Number Sense & Comparison',
    description: 'Comparing numbers, understanding place value, and placement on a number line.',
    prerequisites: []
  },
  {
    id: 'multiplication',
    name: 'Multiplication Fundamentals',
    description: 'Understanding multiplication as repeated addition and mastering basic multiplication facts.',
    prerequisites: ['number_comparison']
  },
  {
    id: 'division',
    name: 'Division Fundamentals',
    description: 'Understanding division as sharing equally, grouping, and inverse of multiplication.',
    prerequisites: ['multiplication']
  },
  {
    id: 'factors_multiples',
    name: 'Factors & Multiples',
    description: 'Finding factors, multiples, Least Common Multiples (LCM), and Greatest Common Factors (GCF).',
    prerequisites: ['division']
  },
  {
    id: 'fraction_understanding',
    name: 'Basic Fraction Understanding',
    description: 'Representing parts of a whole, identifying numerators/denominators, and naming basic fractions.',
    prerequisites: ['division']
  },
  {
    id: 'equivalent_fractions',
    name: 'Equivalent Fractions',
    description: 'Finding equivalent fractions by multiplying/dividing, and simplifying fractions to simplest form.',
    prerequisites: ['factors_multiples', 'fraction_understanding']
  },
  {
    id: 'fraction_operations',
    name: 'Fraction Operations',
    description: 'Adding, subtracting, multiplying, and dividing fractions (requires equivalent fractions and division).',
    prerequisites: ['equivalent_fractions', 'multiplication']
  }
];

// Helper to get concept name from ID
export const getConceptName = (id: string): string => {
  const concept = CONCEPTS.find(c => c.id === id);
  return concept ? concept.name : id;
};
