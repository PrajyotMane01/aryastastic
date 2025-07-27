// Sample Size Calculator for Difference between Proportions — Complete Implementation
import {
  getZValue,
  getZValueOneTailed,
  getZValueOneTailedAlpha,
  CalculatorResult
} from './utils';

// Independent Groups Calculators

export const calculateDiffPropCI = (confidenceLevel: number, p1: number, p2: number, marginError: number): CalculatorResult => {
  try {
    const z = getZValue(confidenceLevel);
    const nExact = (z * z * (p1 * (1 - p1) + p2 * (1 - p2))) / (marginError * marginError);
    const n = Math.round(nExact);
    
    const calculations = [
      `Given:`,
      `• Confidence Level = ${confidenceLevel}%`,
      `• Proportion Group 1 (p1) = ${p1}`,
      `• Proportion Group 2 (p2) = ${p2}`,
      `• Margin of Error (E) = ${marginError}`,
      ``,
      `Step 1: Apply the formula`,
      `n = Z_{α/2}² * (p1(1-p1) + p2(1-p2)) / E²`,
      `n = ${z.toFixed(4)}² * (${p1}*${(1-p1).toFixed(3)} + ${p2}*${(1-p2).toFixed(3)}) / ${marginError}²`,
      `n = ${nExact.toFixed(4)}`,
      ``,
      `Step 2: Round up to nearest integer`,
      `Required sample size per group = ${n}`
    ];
    
    return {
      sampleSize: n,
      power: null,
      effectSize: null,
      interpretation: `For a ${confidenceLevel}% confidence interval of the difference in proportions with margin of error ${marginError}, you need ${n} subjects per group (total N = ${2 * n}).`,
      calculations: calculations
    };
  } catch {
    return {
      sampleSize: null,
      power: null,
      effectSize: null,
      interpretation: 'Error in calculation. Please check your inputs.',
      calculations: []
    };
  }
};

export const calculateDiffPropTwoTailed = (alpha: number, power: number, p1: number, p2: number): CalculatorResult => {
  try {
    const zAlpha = getZValue((1 - alpha) * 100);
    const zBeta = getZValueOneTailed(power);
    const pooledP = (p1 + p2) / 2;
    const numerator1 = zAlpha * Math.sqrt(2 * pooledP * (1 - pooledP));
    const numerator2 = zBeta * Math.sqrt(p1 * (1 - p1) + p2 * (1 - p2));
    const nExact = Math.pow((numerator1 + numerator2) / Math.abs(p1 - p2), 2);
    const n = Math.round(nExact);
    
    const calculations = [
      `Given:`,
      `• Significance Level (α) = ${alpha}`,
      `• Power (1-β) = ${power}`,
      `• Proportion Group 1 (p1) = ${p1}`,
      `• Proportion Group 2 (p2) = ${p2}`,
      ``,
      `Step 1: Calculate pooled proportion`,
      `p̄ = (p1 + p2) / 2 = ${pooledP.toFixed(4)}`,
      ``,
      `Step 2: Apply the formula`,
      `n = (Z_{α/2}√(2p̄(1-p̄)) + Z_{β}√(p1(1-p1)+p2(1-p2)))² / |p1-p2|²`,
      `n = ${nExact.toFixed(4)}`,
      ``,
      `Step 3: Round up to nearest integer`,
      `Required sample size per group = ${n}`
    ];
    
    return {
      sampleSize: n,
      power: power,
      effectSize: Math.abs(p1 - p2),
      interpretation: `For a two-tailed test comparing two independent proportions with α=${alpha}, power=${power}, p1=${p1}, and p2=${p2}, you need ${n} subjects per group (total N = ${2*n}).`,
      calculations: calculations
    };
  } catch {
    return {
      sampleSize: null,
      power: null,
      effectSize: null,
      interpretation: 'Error in calculation. Please check your inputs.',
      calculations: []
    };
  }
};

export const calculateDiffPropOneTailed = (alpha: number, power: number, p1: number, p2: number): CalculatorResult => {
  try {
    const zAlpha = getZValueOneTailedAlpha(alpha);
    const zBeta = getZValueOneTailed(power);
    const pooledP = (p1 + p2) / 2;
    const numerator1 = zAlpha * Math.sqrt(2 * pooledP * (1 - pooledP));
    const numerator2 = zBeta * Math.sqrt(p1 * (1 - p1) + p2 * (1 - p2));
    const nExact = Math.pow((numerator1 + numerator2) / Math.abs(p1 - p2), 2);
    const n = Math.round(nExact);
    
    const calculations = [
      `Given:`,
      `• Significance Level (α) = ${alpha}`,
      `• Power (1-β) = ${power}`,
      `• Proportion Group 1 (p1) = ${p1}`,
      `• Proportion Group 2 (p2) = ${p2}`,
      ``,
      `Step 1: Calculate pooled proportion`,
      `p̄ = (p1 + p2) / 2 = ${pooledP.toFixed(4)}`,
      ``,
      `Step 2: Apply the formula (one-tailed)`,
      `n = (Z_{α}√(2p̄(1-p̄)) + Z_{β}√(p1(1-p1)+p2(1-p2)))² / |p1-p2|²`,
      `n = ${nExact.toFixed(4)}`,
      ``,
      `Step 3: Round up to nearest integer`,
      `Required sample size per group = ${n}`
    ];
    
    return {
      sampleSize: n,
      power: power,
      effectSize: Math.abs(p1 - p2),
      interpretation: `For a one-tailed test comparing two independent proportions with α=${alpha}, power=${power}, p1=${p1}, and p2=${p2}, you need ${n} subjects per group (total N = ${2*n}).`,
      calculations: calculations
    };
  } catch {
    return {
      sampleSize: null,
      power: null,
      effectSize: null,
      interpretation: 'Error in calculation. Please check your inputs.',
      calculations: []
    };
  }
};

export const calculateDiffPropEquivA = (alpha: number, power: number, equivalenceMargin: number, p1: number, p2: number): CalculatorResult => {
  try {
    const zAlpha = getZValue((1 - alpha) * 100);
    const zBeta = getZValueOneTailed(power);
    const nExact = ((p1 * (1 - p1) + p2 * (1 - p2)) * (zAlpha + zBeta) * (zAlpha + zBeta)) / (equivalenceMargin * equivalenceMargin);
    const n = Math.round(nExact);
    
    const calculations = [
      `Given:`,
      `• Significance Level (α) = ${alpha}`,
      `• Power (1-β) = ${power}`,
      `• Equivalence Margin (δ) = ${equivalenceMargin}`,
      `• Proportion Group 1 (p1) = ${p1}`,
      `• Proportion Group 2 (p2) = ${p2}`,
      ``,
      `Step 1: Apply equivalence formula`,
      `n = (p1(1-p1) + p2(1-p2)) * (Z_{α/2} + Z_{β})² / δ²`,
      `n = ${nExact.toFixed(4)}`,
      ``,
      `Step 2: Round up to nearest integer`,
      `Required sample size per group = ${n}`
    ];
    
    return {
      sampleSize: n,
      power: power,
      effectSize: equivalenceMargin,
      interpretation: `For an equivalence study comparing proportions with margin ${equivalenceMargin}, α=${alpha}, and power=${power}, you need ${n} subjects per group (total N = ${2 * n}).`,
      calculations: calculations
    };
  } catch {
    return {
      sampleSize: null,
      power: null,
      effectSize: null,
      interpretation: 'Error in calculation. Please check your inputs.',
      calculations: []
    };
  }
};

export const calculateDiffPropEquivB = (alpha: number, power: number, equivalenceMargin: number, p1: number, p2: number, expectedDiff: number): CalculatorResult => {
  try {
    const zAlpha = getZValue((1 - alpha) * 100);
    const zBeta = getZValueOneTailed(power);
    const effectiveDiff = equivalenceMargin - Math.abs(expectedDiff);
    const nExact = ((p1 * (1 - p1) + p2 * (1 - p2)) * (zAlpha + zBeta) * (zAlpha + zBeta)) / (effectiveDiff * effectiveDiff);
    const n = Math.round(nExact);
    
    const calculations = [
      `Given:`,
      `• Significance Level (α) = ${alpha}`,
      `• Power (1-β) = ${power}`,
      `• Equivalence Margin (δ) = ${equivalenceMargin}`,
      `• Expected Difference = ${expectedDiff}`,
      `• Proportion Group 1 (p1) = ${p1}`,
      `• Proportion Group 2 (p2) = ${p2}`,
      ``,
      `Step 1: Calculate effective difference`,
      `Effective diff = δ - |expected diff| = ${equivalenceMargin} - |${expectedDiff}| = ${effectiveDiff.toFixed(4)}`,
      ``,
      `Step 2: Apply equivalence formula B`,
      `n = (p1(1-p1) + p2(1-p2)) * (Z_{α/2} + Z_{β})² / (effective diff)²`,
      `n = ${nExact.toFixed(4)}`,
      ``,
      `Step 3: Round up to nearest integer`,
      `Required sample size per group = ${n}`
    ];
    
    return {
      sampleSize: n,
      power: power,
      effectSize: effectiveDiff,
      interpretation: `For equivalence study B comparing proportions with margin ${equivalenceMargin} and expected difference ${expectedDiff}, you need ${n} subjects per group (total N = ${2 * n}).`,
      calculations: calculations
    };
  } catch {
    return {
      sampleSize: null,
      power: null,
      effectSize: null,
      interpretation: 'Error in calculation. Please check your inputs.',
      calculations: []
    };
  }
};

export const calculateDiffPropNonInf = (alpha: number, power: number, nonInfMargin: number, p1: number, p2: number): CalculatorResult => {
  try {
    const zAlpha = getZValueOneTailedAlpha(alpha);
    const zBeta = getZValueOneTailed(power);
    const nExact = ((p1 * (1 - p1) + p2 * (1 - p2)) * (zAlpha + zBeta) * (zAlpha + zBeta)) / (nonInfMargin * nonInfMargin);
    const n = Math.round(nExact);
    
    const calculations = [
      `Given:`,
      `• Significance Level (α) = ${alpha}`,
      `• Power (1-β) = ${power}`,
      `• Non-Inferiority Margin (δ) = ${nonInfMargin}`,
      `• Proportion Group 1 (p1) = ${p1}`,
      `• Proportion Group 2 (p2) = ${p2}`,
      ``,
      `Step 1: Apply non-inferiority formula`,
      `n = (p1(1-p1) + p2(1-p2)) * (Z_{α} + Z_{β})² / δ²`,
      `n = ${nExact.toFixed(4)}`,
      ``,
      `Step 2: Round up to nearest integer`,
      `Required sample size per group = ${n}`
    ];
    
    return {
      sampleSize: n,
      power: power,
      effectSize: nonInfMargin,
      interpretation: `For a non-inferiority study comparing proportions with margin ${nonInfMargin}, α=${alpha}, and power=${power}, you need ${n} subjects per group (total N = ${2 * n}).`,
      calculations: calculations
    };
  } catch {
    return {
      sampleSize: null,
      power: null,
      effectSize: null,
      interpretation: 'Error in calculation. Please check your inputs.',
      calculations: []
    };
  }
};

// Related Groups Calculators

export const calculateDiffPropRelTwo = (alpha: number, power: number, p1: number, p2: number, correlation: number): CalculatorResult => {
  try {
    const zAlpha = getZValue((1 - alpha) * 100);
    const zBeta = getZValueOneTailed(power);
    const varDiff = p1 * (1 - p1) + p2 * (1 - p2) - 2 * correlation * Math.sqrt(p1 * (1 - p1) * p2 * (1 - p2));
    const nExact = (Math.pow(zAlpha + zBeta, 2) * varDiff) / Math.pow(p1 - p2, 2);
    const n = Math.round(nExact);
    
    const calculations = [
      `Given:`,
      `• Significance Level (α) = ${alpha}`,
      `• Power (1-β) = ${power}`,
      `• Proportion Group 1 (p1) = ${p1}`,
      `• Proportion Group 2 (p2) = ${p2}`,
      `• Correlation (ρ) = ${correlation}`,
      ``,
      `Step 1: Calculate variance of difference`,
      `Var(diff) = p1(1-p1) + p2(1-p2) - 2ρ√(p1(1-p1)×p2(1-p2))`,
      `Var(diff) = ${varDiff.toFixed(4)}`,
      ``,
      `Step 2: Apply related samples formula`,
      `n = (Z_{α/2} + Z_{β})² × Var(diff) / (p1-p2)²`,
      `n = ${nExact.toFixed(4)}`,
      ``,
      `Step 3: Round up to nearest integer`,
      `Required sample size = ${n} pairs`
    ];
    
    return {
      sampleSize: n,
      power: power,
      effectSize: Math.abs(p1 - p2),
      interpretation: `For a two-tailed test comparing related proportions with α=${alpha}, power=${power}, and correlation=${correlation}, you need ${n} paired observations.`,
      calculations: calculations
    };
  } catch {
    return {
      sampleSize: null,
      power: null,
      effectSize: null,
      interpretation: 'Error in calculation. Please check your inputs.',
      calculations: []
    };
  }
};

export const calculateDiffPropRelOne = (alpha: number, power: number, p1: number, p2: number, correlation: number): CalculatorResult => {
  try {
    const zAlpha = getZValueOneTailedAlpha(alpha);
    const zBeta = getZValueOneTailed(power);
    const varDiff = p1 * (1 - p1) + p2 * (1 - p2) - 2 * correlation * Math.sqrt(p1 * (1 - p1) * p2 * (1 - p2));
    const nExact = (Math.pow(zAlpha + zBeta, 2) * varDiff) / Math.pow(p1 - p2, 2);
    const n = Math.round(nExact);
    
    const calculations = [
      `Given:`,
      `• Significance Level (α) = ${alpha}`,
      `• Power (1-β) = ${power}`,
      `• Proportion Group 1 (p1) = ${p1}`,
      `• Proportion Group 2 (p2) = ${p2}`,
      `• Correlation (ρ) = ${correlation}`,
      ``,
      `Step 1: Calculate variance of difference`,
      `Var(diff) = p1(1-p1) + p2(1-p2) - 2ρ√(p1(1-p1)×p2(1-p2))`,
      `Var(diff) = ${varDiff.toFixed(4)}`,
      ``,
      `Step 2: Apply related samples formula (one-tailed)`,
      `n = (Z_{α} + Z_{β})² × Var(diff) / (p1-p2)²`,
      `n = ${nExact.toFixed(4)}`,
      ``,
      `Step 3: Round up to nearest integer`,
      `Required sample size = ${n} pairs`
    ];
    
    return {
      sampleSize: n,
      power: power,
      effectSize: Math.abs(p1 - p2),
      interpretation: `For a one-tailed test comparing related proportions with α=${alpha}, power=${power}, and correlation=${correlation}, you need ${n} paired observations.`,
      calculations: calculations
    };
  } catch {
    return {
      sampleSize: null,
      power: null,
      effectSize: null,
      interpretation: 'Error in calculation. Please check your inputs.',
      calculations: []
    };
  }
}; 