// Sample Size Calculator for Single Mean — Complete Implementation
import {
  getZValue,
  getZValueOneTailed,
  getZValueOneTailedAlpha,
  CalculatorResult
} from './utils';

// =============================================================================
// 1. SAMPLE SIZE FOR SINGLE MEAN
// =============================================================================

// 111 - CI with absolute margin, no finite correction
export const calculateSingleMeanCI = (
  confidenceLevel: number,
  standardDeviation: number,
  absoluteMarginError: number
): CalculatorResult => {
  try {
    const z = getZValue(confidenceLevel);
    const σ = standardDeviation;
    const d = absoluteMarginError;
    
    const nExact = (z * z * σ * σ) / (d * d);
    const n = Math.round(nExact);
    
    const calculations = [
      `=== CI FOR MEAN (NO FINITE CORRECTION) ===`,
      ``,
      `Given:`,
      `• Confidence Level = ${confidenceLevel}%`,
      `• Standard Deviation (σ) = ${σ}`,
      `• Absolute Margin of Error (d) = ${d}`,
      ``,
      `Step 1: Find Z-value`,
      `Z_{α/2} = ${z.toFixed(4)}`,
      ``,
      `Step 2: Apply formula`,
      `n = Z²σ² / d²`,
      `n = ${z.toFixed(4)}² × ${σ}² / ${d}²`,
      `n = ${nExact.toFixed(4)}`,
      ``,
      `Step 3: Round up`,
      `Required sample size = ${n}`
    ];
    
    return {
      sampleSize: n,
      power: null,
      effectSize: null,
      interpretation: `For a ${confidenceLevel}% confidence interval of the mean with absolute margin of error ${d}, you need ${n} subjects.`,
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

// 112 - CI with absolute margin, finite correction
export const calculateSingleMeanCIFinite = (
  populationSize: number,
  confidenceLevel: number,
  standardDeviation: number,
  absoluteMarginError: number
): CalculatorResult => {
  try {
    const N = populationSize;
    const z = getZValue(confidenceLevel);
    const σ = standardDeviation;
    const d = absoluteMarginError;
    
    const n0 = (z * z * σ * σ) / (d * d);
    const nExact = n0 / (1 + (n0 - 1) / N);
    const n = Math.round(nExact);
    
    const calculations = [
      `=== CI FOR MEAN (WITH FINITE CORRECTION) ===`,
      ``,
      `Given:`,
      `• Population Size (N) = ${N}`,
      `• Confidence Level = ${confidenceLevel}%`,
      `• Standard Deviation (σ) = ${σ}`,
      `• Absolute Margin of Error (d) = ${d}`,
      ``,
      `Step 1: Calculate initial sample size`,
      `n₀ = Z²σ² / d² = ${n0.toFixed(4)}`,
      ``,
      `Step 2: Apply finite population correction`,
      `n = n₀ / (1 + (n₀-1)/N)`,
      `n = ${n0.toFixed(4)} / (1 + ${(n0-1).toFixed(4)}/${N})`,
      `n = ${nExact.toFixed(4)}`,
      ``,
      `Step 3: Round up`,
      `Required sample size = ${n}`
    ];
    
    return {
      sampleSize: n,
      power: null,
      effectSize: null,
      interpretation: `For a ${confidenceLevel}% confidence interval with finite population correction, you need ${n} subjects.`,
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

// 121 - Hypothesis test two-tailed
export const calculateSingleMeanTestTwoTailed = (
  alpha: number,
  power: number,
  nullMean: number,
  alternativeMean: number,
  standardDeviation: number
): CalculatorResult => {
  try {
    const zAlpha = getZValue((1 - alpha) * 100);
    const zBeta = getZValueOneTailed(power);
    
    const μ0 = nullMean;
    const μ1 = alternativeMean;
    const σ = standardDeviation;
    const δ = Math.abs(μ1 - μ0); // Effect size
    
    const nExact = (Math.pow(zAlpha + zBeta, 2) * σ * σ) / (δ * δ);
    const n = Math.round(nExact);
    
    const calculations = [
      `=== HYPOTHESIS TEST FOR MEAN (TWO-TAILED) ===`,
      ``,
      `Given:`,
      `• Significance Level (α) = ${alpha}`,
      `• Power (1-β) = ${power}`,
      `• Null Mean (μ₀) = ${μ0}`,
      `• Alternative Mean (μ₁) = ${μ1}`,
      `• Standard Deviation (σ) = ${σ}`,
      ``,
      `Step 1: Calculate effect size`,
      `δ = |μ₁ - μ₀| = |${μ1} - ${μ0}| = ${δ}`,
      ``,
      `Step 2: Find Z-values`,
      `Z_{α/2} = ${zAlpha.toFixed(4)}`,
      `Z_{β} = ${zBeta.toFixed(4)}`,
      ``,
      `Step 3: Apply formula`,
      `n = (Z_{α/2} + Z_{β})² × σ² / δ²`,
      `n = (${zAlpha.toFixed(4)} + ${zBeta.toFixed(4)})² × ${σ}² / ${δ}²`,
      `n = ${nExact.toFixed(4)}`,
      ``,
      `Step 4: Round up`,
      `Required sample size = ${n}`
    ];
    
    return {
      sampleSize: n,
      power: power,
      effectSize: δ / σ, // Standardized effect size
      interpretation: `For a two-tailed test with α=${alpha}, power=${power}, testing μ=${μ0} vs μ=${μ1}, you need ${n} subjects.`,
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

// 122 - Hypothesis test one-tailed
export const calculateSingleMeanTestOneTailed = (
  alpha: number,
  power: number,
  nullMean: number,
  alternativeMean: number,
  standardDeviation: number
): CalculatorResult => {
  try {
    const zAlpha = getZValueOneTailedAlpha(alpha);
    const zBeta = getZValueOneTailed(power);
    
    const μ0 = nullMean;
    const μ1 = alternativeMean;
    const σ = standardDeviation;
    const δ = Math.abs(μ1 - μ0);
    
    const nExact = (Math.pow(zAlpha + zBeta, 2) * σ * σ) / (δ * δ);
    const n = Math.round(nExact);
    
    const calculations = [
      `=== HYPOTHESIS TEST FOR MEAN (ONE-TAILED) ===`,
      ``,
      `Given:`,
      `• Significance Level (α) = ${alpha}`,
      `• Power (1-β) = ${power}`,
      `• Null Mean (μ₀) = ${μ0}`,
      `• Alternative Mean (μ₁) = ${μ1}`,
      `• Standard Deviation (σ) = ${σ}`,
      ``,
      `Step 1: Calculate effect size`,
      `δ = |μ₁ - μ₀| = ${δ}`,
      ``,
      `Step 2: Find Z-values (one-tailed)`,
      `Z_{α} = ${zAlpha.toFixed(4)}`,
      `Z_{β} = ${zBeta.toFixed(4)}`,
      ``,
      `Step 3: Apply formula`,
      `n = (Z_{α} + Z_{β})² × σ² / δ²`,
      `n = ${nExact.toFixed(4)}`,
      ``,
      `Step 4: Round up`,
      `Required sample size = ${n}`
    ];
    
    return {
      sampleSize: n,
      power: power,
      effectSize: δ / σ,
      interpretation: `For a one-tailed test with α=${alpha}, power=${power}, testing μ=${μ0} vs μ=${μ1}, you need ${n} subjects.`,
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

// 131 - Median Sign Test
export const calculateMedianSignTest = (
  alpha: number,
  power: number,
  hypothesizedMedian: number,
  proportionGreaterThanMedian: number
): CalculatorResult => {
  try {
    if (proportionGreaterThanMedian >= 1) {
      throw new Error('Proportion must be less than 1');
    }
    
    const zAlpha = getZValue((1 - alpha) * 100);
    const zBeta = getZValueOneTailed(power);
    
    const p0 = 0.5; // Under null hypothesis, 50% should be above median
    const p1 = proportionGreaterThanMedian; // Alternative proportion
    
    const numerator = Math.pow(zAlpha * Math.sqrt(p0 * (1 - p0)) + zBeta * Math.sqrt(p1 * (1 - p1)), 2);
    const denominator = Math.pow(p1 - p0, 2);
    const nExact = numerator / denominator;
    const n = Math.round(nExact);
    
    const calculations = [
      `=== MEDIAN SIGN TEST ===`,
      ``,
      `Given:`,
      `• Significance Level (α) = ${alpha}`,
      `• Power (1-β) = ${power}`,
      `• Hypothesized Median = ${hypothesizedMedian}`,
      `• Proportion > Median under H₁ = ${p1}`,
      ``,
      `Step 1: Set up proportions`,
      `p₀ = 0.5 (under null hypothesis)`,
      `p₁ = ${p1} (under alternative hypothesis)`,
      ``,
      `Step 2: Find Z-values`,
      `Z_{α/2} = ${zAlpha.toFixed(4)}`,
      `Z_{β} = ${zBeta.toFixed(4)}`,
      ``,
      `Step 3: Apply sign test formula`,
      `n = [Z_{α/2}√(p₀(1-p₀)) + Z_{β}√(p₁(1-p₁))]² / (p₁-p₀)²`,
      `n = [${zAlpha.toFixed(4)}√(0.5×0.5) + ${zBeta.toFixed(4)}√(${p1}×${(1-p1).toFixed(4)})]² / (${p1}-0.5)²`,
      `n = ${nExact.toFixed(4)}`,
      ``,
      `Step 4: Round up`,
      `Required sample size = ${n}`
    ];
    
    return {
      sampleSize: n,
      power: power,
      effectSize: Math.abs(p1 - p0),
      interpretation: `For a median sign test with α=${alpha}, power=${power}, and ${(p1*100).toFixed(1)}% of observations expected above the median, you need ${n} subjects.`,
      calculations: calculations
    };
  } catch {
    return {
      sampleSize: null,
      power: null,
      effectSize: null,
      interpretation: 'Error in calculation. Please check your inputs. Proportion must be less than 1.',
      calculations: []
    };
  }
};
