// Single Proportion Sample Size Calculators
import { getZValue, getZValueOneTailed, getZValueOneTailedAlpha, CalculatorResult } from './utils';

// =============================================================================
// 5. SAMPLE SIZE FOR SINGLE PROPORTION/INCIDENCE RATE
// =============================================================================

// 511 - CI with absolute margin, no finite correction
export const calculateSinglePropCI = (
  confidenceLevel: number,
  anticipatedProportion: number,
  absoluteMarginError: number
): CalculatorResult => {
  try {
    const z = getZValue(confidenceLevel);
    const p = anticipatedProportion;
    const d = absoluteMarginError;
    
    const nExact = (z * z * p * (1 - p)) / (d * d);
    const n = Math.round(nExact);
    
    const calculations = [
      `=== CI FOR PROPORTION (NO FINITE CORRECTION) ===`,
      ``,
      `Given:`,
      `• Confidence Level = ${confidenceLevel}%`,
      `• Anticipated Proportion (p) = ${p}`,
      `• Absolute Margin of Error (d) = ${d}`,
      ``,
      `Step 1: Find Z-value`,
      `Z_{α/2} = ${z.toFixed(4)}`,
      ``,
      `Step 2: Apply formula`,
      `n = Z²p(1-p) / d²`,
      `n = ${z.toFixed(4)}² × ${p} × ${(1-p).toFixed(4)} / ${d}²`,
      `n = ${nExact.toFixed(4)}`,
      ``,
      `Step 3: Round up`,
      `Required sample size = ${n}`
    ];
    
    return {
      sampleSize: n,
      power: null,
      effectSize: null,
      interpretation: `For a ${confidenceLevel}% confidence interval of proportion with absolute margin of error ${d}, you need ${n} subjects.`,
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

// 512 - CI with absolute margin, finite correction
export const calculateSinglePropCIFinite = (
  populationSize: number,
  confidenceLevel: number,
  anticipatedProportion: number,
  absoluteMarginError: number
): CalculatorResult => {
  try {
    const N = populationSize;
    const z = getZValue(confidenceLevel);
    const p = anticipatedProportion;
    const d = absoluteMarginError;
    
    const n0 = (z * z * p * (1 - p)) / (d * d);
    const nExact = n0 / (1 + (n0 - 1) / N);
    const n = Math.round(nExact);
    
    const calculations = [
      `=== CI FOR PROPORTION (WITH FINITE CORRECTION) ===`,
      ``,
      `Given:`,
      `• Population Size (N) = ${N}`,
      `• Confidence Level = ${confidenceLevel}%`,
      `• Anticipated Proportion (p) = ${p}`,
      `• Absolute Margin of Error (d) = ${d}`,
      ``,
      `Step 1: Calculate initial sample size`,
      `n₀ = Z²p(1-p) / d² = ${n0.toFixed(4)}`,
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

// 513 - CI with relative margin, no finite correction
export const calculateSinglePropCIRelative = (
  confidenceLevel: number,
  anticipatedProportion: number,
  relativeMarginError: number
): CalculatorResult => {
  try {
    const z = getZValue(confidenceLevel);
    const p = anticipatedProportion;
    const r = relativeMarginError; // relative margin as decimal (e.g., 0.1 for 10%)
    
    const absoluteMargin = r * p; // Convert relative to absolute margin
    const nExact = (z * z * p * (1 - p)) / (absoluteMargin * absoluteMargin);
    const n = Math.round(nExact);
    
    const calculations = [
      `=== CI FOR PROPORTION (RELATIVE MARGIN, NO FINITE CORRECTION) ===`,
      ``,
      `Given:`,
      `• Confidence Level = ${confidenceLevel}%`,
      `• Anticipated Proportion (p) = ${p}`,
      `• Relative Margin of Error = ${(r*100).toFixed(1)}%`,
      ``,
      `Step 1: Convert relative to absolute margin`,
      `Absolute margin = ${r} × ${p} = ${absoluteMargin.toFixed(4)}`,
      ``,
      `Step 2: Apply formula`,
      `n = Z²p(1-p) / (absolute margin)²`,
      `n = ${z.toFixed(4)}² × ${p} × ${(1-p).toFixed(4)} / ${absoluteMargin.toFixed(4)}²`,
      `n = ${nExact.toFixed(4)}`,
      ``,
      `Step 3: Round up`,
      `Required sample size = ${n}`
    ];
    
    return {
      sampleSize: n,
      power: null,
      effectSize: null,
      interpretation: `For a ${confidenceLevel}% confidence interval with ${(r*100).toFixed(1)}% relative margin of error, you need ${n} subjects.`,
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

// 514 - CI with relative margin, finite correction
export const calculateSinglePropCIRelativeFinite = (
  populationSize: number,
  confidenceLevel: number,
  anticipatedProportion: number,
  relativeMarginError: number
): CalculatorResult => {
  try {
    const N = populationSize;
    const z = getZValue(confidenceLevel);
    const p = anticipatedProportion;
    const r = relativeMarginError;
    
    const absoluteMargin = r * p;
    const n0 = (z * z * p * (1 - p)) / (absoluteMargin * absoluteMargin);
    const nExact = n0 / (1 + (n0 - 1) / N);
    const n = Math.round(nExact);
    
    const calculations = [
      `=== CI FOR PROPORTION (RELATIVE MARGIN, WITH FINITE CORRECTION) ===`,
      ``,
      `Given:`,
      `• Population Size (N) = ${N}`,
      `• Confidence Level = ${confidenceLevel}%`,
      `• Anticipated Proportion (p) = ${p}`,
      `• Relative Margin of Error = ${(r*100).toFixed(1)}%`,
      ``,
      `Step 1: Convert relative to absolute margin`,
      `Absolute margin = ${r} × ${p} = ${absoluteMargin.toFixed(4)}`,
      ``,
      `Step 2: Calculate initial sample size`,
      `n₀ = Z²p(1-p) / (absolute margin)² = ${n0.toFixed(4)}`,
      ``,
      `Step 3: Apply finite population correction`,
      `n = n₀ / (1 + (n₀-1)/N) = ${nExact.toFixed(4)}`,
      ``,
      `Step 4: Round up`,
      `Required sample size = ${n}`
    ];
    
    return {
      sampleSize: n,
      power: null,
      effectSize: null,
      interpretation: `For a ${confidenceLevel}% confidence interval with ${(r*100).toFixed(1)}% relative margin and finite correction, you need ${n} subjects.`,
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

// 521 - Hypothesis test two-tailed
export const calculateSinglePropTestTwoTailed = (
  alpha: number,
  power: number,
  nullProportion: number,
  alternativeProportion: number
): CalculatorResult => {
  try {
    const zAlpha = getZValue((1 - alpha) * 100);
    const zBeta = getZValueOneTailed(power);
    
    const p0 = nullProportion;
    const p1 = alternativeProportion;
    
    const numerator = Math.pow(zAlpha * Math.sqrt(p0 * (1 - p0)) + zBeta * Math.sqrt(p1 * (1 - p1)), 2);
    const denominator = Math.pow(p1 - p0, 2);
    const nExact = numerator / denominator;
    const n = Math.round(nExact);
    
    const calculations = [
      `=== HYPOTHESIS TEST FOR PROPORTION (TWO-TAILED) ===`,
      ``,
      `Given:`,
      `• Significance Level (α) = ${alpha}`,
      `• Power (1-β) = ${power}`,
      `• Null Proportion (p₀) = ${p0}`,
      `• Alternative Proportion (p₁) = ${p1}`,
      ``,
      `Step 1: Find Z-values`,
      `Z_{α/2} = ${zAlpha.toFixed(4)}`,
      `Z_{β} = ${zBeta.toFixed(4)}`,
      ``,
      `Step 2: Apply formula`,
      `n = [Z_{α/2}√(p₀(1-p₀)) + Z_{β}√(p₁(1-p₁))]² / (p₁-p₀)²`,
      `n = [${zAlpha.toFixed(4)}√(${p0}×${(1-p0).toFixed(4)}) + ${zBeta.toFixed(4)}√(${p1}×${(1-p1).toFixed(4)})]² / (${p1}-${p0})²`,
      `n = ${nExact.toFixed(4)}`,
      ``,
      `Step 3: Round up`,
      `Required sample size = ${n}`
    ];
    
    return {
      sampleSize: n,
      power: power,
      effectSize: Math.abs(p1 - p0),
      interpretation: `For a two-tailed test with α=${alpha}, power=${power}, testing ${p0} vs ${p1}, you need ${n} subjects.`,
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

// 522 - Hypothesis test one-tailed
export const calculateSinglePropTestOneTailed = (
  alpha: number,
  power: number,
  nullProportion: number,
  alternativeProportion: number
): CalculatorResult => {
  try {
    const zAlpha = getZValueOneTailedAlpha(alpha);
    const zBeta = getZValueOneTailed(power);
    
    const p0 = nullProportion;
    const p1 = alternativeProportion;
    
    const numerator = Math.pow(zAlpha * Math.sqrt(p0 * (1 - p0)) + zBeta * Math.sqrt(p1 * (1 - p1)), 2);
    const denominator = Math.pow(p1 - p0, 2);
    const nExact = numerator / denominator;
    const n = Math.round(nExact);
    
    const calculations = [
      `=== HYPOTHESIS TEST FOR PROPORTION (ONE-TAILED) ===`,
      ``,
      `Given:`,
      `• Significance Level (α) = ${alpha}`,
      `• Power (1-β) = ${power}`,
      `• Null Proportion (p₀) = ${p0}`,
      `• Alternative Proportion (p₁) = ${p1}`,
      ``,
      `Step 1: Find Z-values (one-tailed)`,
      `Z_{α} = ${zAlpha.toFixed(4)}`,
      `Z_{β} = ${zBeta.toFixed(4)}`,
      ``,
      `Step 2: Apply formula`,
      `n = [Z_{α}√(p₀(1-p₀)) + Z_{β}√(p₁(1-p₁))]² / (p₁-p₀)²`,
      `n = ${nExact.toFixed(4)}`,
      ``,
      `Step 3: Round up`,
      `Required sample size = ${n}`
    ];
    
    return {
      sampleSize: n,
      power: power,
      effectSize: Math.abs(p1 - p0),
      interpretation: `For a one-tailed test with α=${alpha}, power=${power}, testing ${p0} vs ${p1}, you need ${n} subjects.`,
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

// 530 - CI for incidence rate with relative margin
export const calculateIncidenceRateCI = (
  confidenceLevel: number,
  anticipatedRate: number,
  relativeMarginError: number,
  timeUnit: number = 1
): CalculatorResult => {
  try {
    const z = getZValue(confidenceLevel);
    const λ = anticipatedRate; // incidence rate
    const r = relativeMarginError;
    const t = timeUnit;
    
    // For Poisson distribution: n = Z² / (λt × r²)
    const nExact = (z * z) / (λ * t * r * r);
    const n = Math.round(nExact);
    
    const calculations = [
      `=== CI FOR INCIDENCE RATE (RELATIVE MARGIN) ===`,
      ``,
      `Given:`,
      `• Confidence Level = ${confidenceLevel}%`,
      `• Anticipated Rate (λ) = ${λ} per time unit`,
      `• Relative Margin of Error = ${(r*100).toFixed(1)}%`,
      `• Time Unit = ${t}`,
      ``,
      `Step 1: Apply Poisson formula`,
      `n = Z² / (λt × r²)`,
      `n = ${z.toFixed(4)}² / (${λ} × ${t} × ${r}²)`,
      `n = ${nExact.toFixed(4)}`,
      ``,
      `Step 2: Round up`,
      `Required sample size = ${n}`
    ];
    
    return {
      sampleSize: n,
      power: null,
      effectSize: null,
      interpretation: `For a ${confidenceLevel}% confidence interval of incidence rate with ${(r*100).toFixed(1)}% relative margin, you need ${n} subjects.`,
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

// 541 - Incidence rate hypothesis test two-tailed
export const calculateIncidenceRateTestTwoTailed = (
  alpha: number,
  power: number,
  nullRate: number,
  alternativeRate: number,
  timeUnit: number = 1
): CalculatorResult => {
  try {
    const zAlpha = getZValue((1 - alpha) * 100);
    const zBeta = getZValueOneTailed(power);
    
    const λ0 = nullRate;
    const λ1 = alternativeRate;
    const t = timeUnit;
    
    // For Poisson: n = (Z_{α/2}√λ₀ + Z_{β}√λ₁)² / (λ₁-λ₀)² / t
    const numerator = Math.pow(zAlpha * Math.sqrt(λ0) + zBeta * Math.sqrt(λ1), 2);
    const denominator = Math.pow(λ1 - λ0, 2) * t;
    const nExact = numerator / denominator;
    const n = Math.round(nExact);
    
    const calculations = [
      `=== HYPOTHESIS TEST FOR INCIDENCE RATE (TWO-TAILED) ===`,
      ``,
      `Given:`,
      `• Significance Level (α) = ${alpha}`,
      `• Power (1-β) = ${power}`,
      `• Null Rate (λ₀) = ${λ0}`,
      `• Alternative Rate (λ₁) = ${λ1}`,
      `• Time Unit = ${t}`,
      ``,
      `Step 1: Apply Poisson formula`,
      `n = (Z_{α/2}√λ₀ + Z_{β}√λ₁)² / [(λ₁-λ₀)² × t]`,
      `n = ${nExact.toFixed(4)}`,
      ``,
      `Step 2: Round up`,
      `Required sample size = ${n}`
    ];
    
    return {
      sampleSize: n,
      power: power,
      effectSize: Math.abs(λ1 - λ0),
      interpretation: `For a two-tailed test of incidence rates with α=${alpha}, power=${power}, you need ${n} subjects.`,
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

// 542 - Incidence rate hypothesis test one-tailed
export const calculateIncidenceRateTestOneTailed = (
  alpha: number,
  power: number,
  nullRate: number,
  alternativeRate: number,
  timeUnit: number = 1
): CalculatorResult => {
  try {
    const zAlpha = getZValueOneTailedAlpha(alpha);
    const zBeta = getZValueOneTailed(power);
    
    const λ0 = nullRate;
    const λ1 = alternativeRate;
    const t = timeUnit;
    
    const numerator = Math.pow(zAlpha * Math.sqrt(λ0) + zBeta * Math.sqrt(λ1), 2);
    const denominator = Math.pow(λ1 - λ0, 2) * t;
    const nExact = numerator / denominator;
    const n = Math.round(nExact);
    
    const calculations = [
      `=== HYPOTHESIS TEST FOR INCIDENCE RATE (ONE-TAILED) ===`,
      ``,
      `Given:`,
      `• Significance Level (α) = ${alpha}`,
      `• Power (1-β) = ${power}`,
      `• Null Rate (λ₀) = ${λ0}`,
      `• Alternative Rate (λ₁) = ${λ1}`,
      `• Time Unit = ${t}`,
      ``,
      `Step 1: Apply Poisson formula (one-tailed)`,
      `n = (Z_{α}√λ₀ + Z_{β}√λ₁)² / [(λ₁-λ₀)² × t]`,
      `n = ${nExact.toFixed(4)}`,
      ``,
      `Step 2: Round up`,
      `Required sample size = ${n}`
    ];
    
    return {
      sampleSize: n,
      power: power,
      effectSize: Math.abs(λ1 - λ0),
      interpretation: `For a one-tailed test of incidence rates with α=${alpha}, power=${power}, you need ${n} subjects.`,
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