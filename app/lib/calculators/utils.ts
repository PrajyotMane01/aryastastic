const zTable: { [key: string]: number } = {
  '80%': 1.282,
  '85%': 1.44,
  '90%': 1.645,
  '95%': 1.96,
  '97%': 2.17,
  '99%': 2.576,
  '99.5%': 2.807,
  '99.9%': 3.291,
};

const zTableOneTailed: { [key: string]: number } = {
  '80%': 0.84,
  '85%': 1.04,
  '90%': 1.28,
  '95%': 1.64,
  '99%': 2.33,
};

const zTableOneTailedAlpha: { [key: string]: number } = {
  '1%': 2.33,
  '2.5%': 1.96,
  '5%': 1.64,
  '10%': 1.28,
};

// Function to get Z-value for a given confidence level (two-tailed)
export const getZValue = (confidenceLevel: number): number => {
  const percentage = `${confidenceLevel}%`;
  return zTable[percentage] || 1.96; // Default for 95%
};

// Function to get Z-value for a given power (one-tailed)
export const getZValueOneTailed = (power: number): number => {
  const percentage = `${power * 100}%`;
  return zTableOneTailed[percentage] || 0.84; // Default for 80% power
};

// Function to get Z-value for a given alpha (one-tailed)
export const getZValueOneTailedAlpha = (alpha: number): number => {
  const percentage = `${alpha * 100}%`;
  return zTableOneTailedAlpha[percentage] || 1.64; // Default for alpha=0.05
};

// Common result type for all calculators
export interface CalculatorResult {
  sampleSize: number | null;
  power: number | null;
  effectSize: number | null;
  interpretation: string;
  calculations: string[];
}

// Extended result type for calculators that return multiple sample sizes
export interface ExtendedCalculatorResult extends CalculatorResult {
  n1?: number;
  n2?: number;
  totalN?: number;
}

// Utility function to get Z-value for equivalence studies (two-sided)
export const getZValueEquivalence = (alpha: number): number => {
  const zTable: { [key: string]: number } = {
    '0.01': 2.57,   // As per your specifications
    '0.05': 1.96,   // As per your specifications
    '0.1': 1.64,    // As per your specifications
  };
  
  const key = alpha.toFixed(2);
  return zTable[key] || 1.96; // fallback to α=0.05
};

// Utility function to get Z-value for equivalence studies (one-sided)
export const getZValueEquivalenceOneSided = (alpha: number): number => {
  const zTable: { [key: string]: number } = {
    '0.01': 2.33,   // As per your specifications
    '0.05': 1.64,   // As per your specifications
    '0.1': 1.28,    // As per your specifications
  };
  
  const key = alpha.toFixed(2);
  return zTable[key] || 1.64; // fallback to α=0.05
}; 