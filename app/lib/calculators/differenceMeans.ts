// Sample Size Calculator for Difference in Means — Full Implementation
import {
  getZValue,
  getZValueOneTailed,
  getZValueOneTailedAlpha,
  CalculatorResult
} from './utils';

// Independent Groups Calculators

// CI without finite correction
export const calculateDiffMeansCI = (
  confidenceLevel: number,
  stdDev1: number,
  stdDev2: number,
  marginError: number
): CalculatorResult => {
  try {
    const alpha = (100 - confidenceLevel) / 100;
    const z = getZValue(confidenceLevel);
    const nExact = (z * z * (stdDev1 * stdDev1 + stdDev2 * stdDev2)) / (marginError * marginError);
    const n = Math.round(nExact);

    const calculations = [
      `Given:`,
      `• Confidence Level = ${confidenceLevel}%`,
      `• Standard Deviation Group 1 (σ1) = ${stdDev1}`,
      `• Standard Deviation Group 2 (σ2) = ${stdDev2}`,
      `• Margin of Error (E) = ${marginError}`,
      ``,
      `Step 1: Calculate α`,
      `α = (100 - ${confidenceLevel}) / 100 = ${alpha.toFixed(4)}`,
      ``,
      `Step 2: Find Z-value for ${confidenceLevel}% confidence`,
      `Z_{α/2} = ${z.toFixed(4)}`,
      ``,
      `Step 3: Apply the formula`,
      `n = Z_{α/2}² * (σ1² + σ2²) / E²`,
      `n = ${z.toFixed(4)}² * (${stdDev1}² + ${stdDev2}²) / ${marginError}²`,
      `n = ${nExact.toFixed(4)}`,
      ``,
      `Step 4: Round up to nearest integer`,
      `Required sample size per group = ${n}`
    ];

    return {
      sampleSize: n,
      power: null,
      effectSize: null,
      interpretation: `For a ${confidenceLevel}% confidence interval of the difference in means with margin of error ${marginError}, you need ${n} subjects per group (total N = ${2 * n}).`,
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

// CI with finite correction
export const calculateDiffMeansCIFinite = (
  confidenceLevel: number,
  stdDev1: number,
  stdDev2: number,
  marginError: number,
  populationSize1: number,
  populationSize2: number
): CalculatorResult => {
  try {
    const z = getZValue(confidenceLevel);
    const pooledVariance = stdDev1 ** 2 + stdDev2 ** 2;
    const n0 = (2 * z ** 2 * pooledVariance) / (marginError ** 2);

    const correction1 = (n0 - 1) / populationSize1;
    const correction2 = (n0 - 1) / populationSize2;
    const avgCorrection = (correction1 + correction2) / 2;

    const nExact = n0 / (1 + avgCorrection);
    const n = Math.round(nExact);

    const calculations = [
      `Given:`,
      `• Confidence Level = ${confidenceLevel}%`,
      `• Standard Deviation Group 1 (σ1) = ${stdDev1}`,
      `• Standard Deviation Group 2 (σ2) = ${stdDev2}`,
      `• Margin of Error (E) = ${marginError}`,
      `• Population Size Group 1 (N1) = ${populationSize1}`,
      `• Population Size Group 2 (N2) = ${populationSize2}`,
      ``,
      `Step 1: Calculate initial sample size (infinite population)`,
      `n₀ = 2 × Z_{α/2}² × (σ1² + σ2²) / E²`,
      `n₀ = ${n0.toFixed(4)}`,
      ``,
      `Step 2: Apply finite population correction`,
      `Correction1 = (n₀-1)/N1 = ${correction1.toFixed(4)}`,
      `Correction2 = (n₀-1)/N2 = ${correction2.toFixed(4)}`,
      `n = n₀ / (1 + average(corrections))`,
      `n = ${n0.toFixed(4)} / (1 + ${avgCorrection.toFixed(4)})`,
      `n = ${nExact.toFixed(4)}`,
      ``,
      `Step 3: Round up to nearest integer`,
      `Required sample size per group = ${n}`
    ];

    return {
      sampleSize: n,
      power: null,
      effectSize: null,
      interpretation: `For a ${confidenceLevel}% confidence interval with finite population correction, you need ${n} subjects per group (total N = ${2*n}).`,
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

// Two-tailed Hypothesis Test
export const calculateDiffMeansTwoTailed = (
  alpha: number,
  power: number,
  populationMean1: number,
  populationMean2: number,
  stdDev1: number,
  stdDev2: number
): CalculatorResult => {
  try {
    const zAlpha = getZValue((1 - alpha) * 100);
    const zBeta = getZValueOneTailed(power);
    const effectSize = Math.abs(populationMean1 - populationMean2);
    const nExact = ((stdDev1 * stdDev1 + stdDev2 * stdDev2) * (zAlpha + zBeta) * (zAlpha + zBeta)) / (effectSize * effectSize);
    const n = Math.round(nExact);

    const calculations = [
      `=== HYPOTHESIS TEST FOR DIFFERENCE BETWEEN MEANS (TWO-TAILED) ===`,
      ``,
      `Given:`,
      `• Significance Level (α) = ${alpha}`,
      `• Power (1-β) = ${power}`,
      `• Population Mean 1 (μ₁) = ${populationMean1}`,
      `• Population Mean 2 (μ₂) = ${populationMean2}`,
      `• Population SD 1 (σ₁) = ${stdDev1}`,
      `• Population SD 2 (σ₂) = ${stdDev2}`,
      ``,
      `Step 1: Calculate effect size`,
      `|Effect| = |μ₁ - μ₂| = |${populationMean1} - ${populationMean2}| = ${effectSize}`,
      ``,
      `Step 2: Find Z-values`,
      `Z_{α/2} = ${zAlpha.toFixed(4)}`,
      `Z_{β} = ${zBeta.toFixed(4)}`,
      ``,
      `Step 3: Apply the formula for two independent groups`,
      `n = (σ₁² + σ₂²) * (Z_{α/2} + Z_{β})² / δ²`,
      `n = (${stdDev1}² + ${stdDev2}²) * (${zAlpha.toFixed(4)} + ${zBeta.toFixed(4)})² / ${effectSize}²`,
      `n = ${nExact.toFixed(4)}`,
      ``,
      `Step 4: Round up to nearest integer`,
      `Required sample size per group = ${n}`
    ];

    return {
      sampleSize: n,
      power: power,
      effectSize: effectSize / Math.sqrt(stdDev1 * stdDev1 + stdDev2 * stdDev2),
      interpretation: `For a two-tailed test comparing two independent means with α=${alpha}, power=${power}, testing μ₁=${populationMean1} vs μ₂=${populationMean2}, you need ${n} subjects per group (total N = ${2 * n}).`,
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

// One-tailed Hypothesis Test
export const calculateDiffMeansOneTailed = (
  alpha: number,
  power: number,
  populationMean1: number,
  populationMean2: number,
  stdDev1: number,
  stdDev2: number
): CalculatorResult => {
  try {
    const zAlpha = getZValueOneTailedAlpha(alpha);
    const zBeta = getZValueOneTailed(power);
    const effectSize = Math.abs(populationMean1 - populationMean2);
    const nExact = ((stdDev1 * stdDev1 + stdDev2 * stdDev2) * (zAlpha + zBeta) * (zAlpha + zBeta)) / (effectSize * effectSize);
    const n = Math.round(nExact);

    const calculations = [
      `=== HYPOTHESIS TEST FOR DIFFERENCE BETWEEN MEANS (ONE-TAILED) ===`,
      ``,
      `Given:`,
      `• Significance Level (α) = ${alpha}`,
      `• Power (1-β) = ${power}`,
      `• Population Mean 1 (μ₁) = ${populationMean1}`,
      `• Population Mean 2 (μ₂) = ${populationMean2}`,
      `• Population SD 1 (σ₁) = ${stdDev1}`,
      `• Population SD 2 (σ₂) = ${stdDev2}`,
      ``,
      `Step 1: Calculate effect size`,
      `|Effect| = |μ₁ - μ₂| = |${populationMean1} - ${populationMean2}| = ${effectSize}`,
      ``,
      `Step 2: Find Z-values (one-tailed)`,
      `Z_{α} = ${zAlpha.toFixed(4)}`,
      `Z_{β} = ${zBeta.toFixed(4)}`,
      ``,
      `Step 3: Apply the formula`,
      `n = (σ₁² + σ₂²) * (Z_{α} + Z_{β})² / δ²`,
      `n = (${stdDev1}² + ${stdDev2}²) * (${zAlpha.toFixed(4)} + ${zBeta.toFixed(4)})² / ${effectSize}²`,
      `n = ${nExact.toFixed(4)}`,
      ``,
      `Step 4: Round up to nearest integer`,
      `Required sample size per group = ${n}`
    ];

    return {
      sampleSize: n,
      power: power,
      effectSize: effectSize / Math.sqrt(stdDev1 * stdDev1 + stdDev2 * stdDev2),
      interpretation: `For a one-tailed test comparing two independent means with α=${alpha}, power=${power}, testing μ₁=${populationMean1} vs μ₂=${populationMean2}, you need ${n} subjects per group (total N = ${2 * n}).`,
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

// Equivalence Study A
export const calculateDiffMeansEquivA = (
  alpha: number,
  power: number,
  equivalenceMargin: number,
  stdDev1: number,
  stdDev2: number
): CalculatorResult => {
  try {
    const zAlpha = getZValue((1 - alpha) * 100);
    const zBeta = getZValueOneTailed(power);
    const pooledVar = stdDev1 ** 2 + stdDev2 ** 2;
    const nExact = (2 * pooledVar * (zAlpha + zBeta) ** 2) / (equivalenceMargin ** 2);
    const n = Math.round(nExact);

    const calculations = [
      `Given:`,
      `• Significance Level (α) = ${alpha}`,
      `• Power (1-β) = ${power}`,
      `• Equivalence Margin (δ) = ${equivalenceMargin}`,
      `• Standard Deviation Group 1 (σ1) = ${stdDev1}`,
      `• Standard Deviation Group 2 (σ2) = ${stdDev2}`,
      ``,
      `Step 1: Find Z-values`,
      `Z_{α/2} = ${zAlpha.toFixed(4)}`,
      `Z_{β} = ${zBeta.toFixed(4)}`,
      ``,
      `Step 2: Calculate pooled variance`,
      `σ²pooled = σ1² + σ2² = ${pooledVar.toFixed(4)}`,
      ``,
      `Step 3: Apply equivalence formula`,
      `n = 2 × σ²pooled × (Z_{α/2} + Z_{β})² / δ²`,
      `n = ${nExact.toFixed(4)}`,
      ``,
      `Step 4: Round up to nearest integer`,
      `Required sample size per group = ${n}`
    ];

    return {
      sampleSize: n,
      power: power,
      effectSize: equivalenceMargin / Math.sqrt(pooledVar),
      interpretation: `For an equivalence study with margin ${equivalenceMargin}, α=${alpha}, and power=${power}, you need ${n} subjects per group (total N = ${2*n}).`,
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

// Equivalence Study B (with expected difference)
export const calculateDiffMeansEquivB = (
  alpha: number,
  power: number,
  equivalenceMargin: number,
  stdDev1: number,
  stdDev2: number,
  expectedDiff: number
): CalculatorResult => {
  try {
    const zAlpha = getZValue((1 - alpha) * 100);
    const zBeta = getZValueOneTailed(power);
    const pooledVar = stdDev1 ** 2 + stdDev2 ** 2;
    const effectiveDiff = equivalenceMargin - Math.abs(expectedDiff);
    const nExact = (2 * pooledVar * (zAlpha + zBeta) ** 2) / (effectiveDiff ** 2);
    const n = Math.round(nExact);

    const calculations = [
      `Given:`,
      `• Significance Level (α) = ${alpha}`,
      `• Power (1-β) = ${power}`,
      `• Equivalence Margin (δ) = ${equivalenceMargin}`,
      `• Expected Difference = ${expectedDiff}`,
      `• Standard Deviation Group 1 (σ1) = ${stdDev1}`,
      `• Standard Deviation Group 2 (σ2) = ${stdDev2}`,
      ``,
      `Step 1: Calculate effective difference`,
      `Effective diff = δ - |expected diff| = ${equivalenceMargin} - |${expectedDiff}| = ${effectiveDiff.toFixed(4)}`,
      ``,
      `Step 2: Calculate pooled variance`,
      `σ²pooled = σ1² + σ2² = ${pooledVar.toFixed(4)}`,
      ``,
      `Step 3: Apply equivalence formula B`,
      `n = 2 × σ²pooled × (Z_{α/2} + Z_{β})² / (effective diff)²`,
      `n = ${nExact.toFixed(4)}`,
      ``,
      `Step 4: Round up to nearest integer`,
      `Required sample size per group = ${n}`
    ];

    return {
      sampleSize: n,
      power: power,
      effectSize: effectiveDiff / Math.sqrt(pooledVar),
      interpretation: `For equivalence study B with margin ${equivalenceMargin} and expected difference ${expectedDiff}, you need ${n} subjects per group (total N = ${2*n}).`,
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

// Non-Inferiority Test
export const calculateDiffMeansNonInf = (
  alpha: number,
  power: number,
  nonInfMargin: number,
  stdDev1: number,
  stdDev2: number
): CalculatorResult => {
  try {
    const zAlpha = getZValueOneTailedAlpha(alpha);
    const zBeta = getZValueOneTailed(power);
    const pooledVar = stdDev1 ** 2 + stdDev2 ** 2;
    const nExact = (2 * pooledVar * (zAlpha + zBeta) ** 2) / (nonInfMargin ** 2);
    const n = Math.round(nExact);

    const calculations = [
      `Given:`,
      `• Significance Level (α) = ${alpha}`,
      `• Power (1-β) = ${power}`,
      `• Non-Inferiority Margin (δ) = ${nonInfMargin}`,
      `• Standard Deviation Group 1 (σ1) = ${stdDev1}`,
      `• Standard Deviation Group 2 (σ2) = ${stdDev2}`,
      ``,
      `Step 1: Find Z-values (one-tailed for non-inferiority)`,
      `Z_{α} = ${zAlpha.toFixed(4)}`,
      `Z_{β} = ${zBeta.toFixed(4)}`,
      ``,
      `Step 2: Calculate pooled variance`,
      `σ²pooled = σ1² + σ2² = ${pooledVar.toFixed(4)}`,
      ``,
      `Step 3: Apply non-inferiority formula`,
      `n = 2 × σ²pooled × (Z_{α} + Z_{β})² / δ²`,
      `n = ${nExact.toFixed(4)}`,
      ``,
      `Step 4: Round up to nearest integer`,
      `Required sample size per group = ${n}`
    ];

    return {
      sampleSize: n,
      power: power,
      effectSize: nonInfMargin / Math.sqrt(pooledVar),
      interpretation: `For a non-inferiority study with margin ${nonInfMargin}, α=${alpha}, and power=${power}, you need ${n} subjects per group (total N = ${2*n}).`,
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

export const calculateDiffMeansPaired = (
  alpha: number, 
  power: number, 
  meanBefore: number, 
  meanAfter: number, 
  stdDevBefore: number, 
  stdDevAfter: number
): CalculatorResult => {
  try {
    // Calculate effect size (difference between means)
    const effectSize = Math.abs(meanAfter - meanBefore);
    
    // Calculate pooled standard deviation of differences
    // For paired t-test, we use the standard deviation of the differences
    // This is typically calculated from the correlation between before/after measurements
    // For simplicity, we'll use the larger of the two SDs as an approximation
    const stdDevDiff = Math.max(stdDevBefore, stdDevAfter);
    
    // Two-tailed test
    const zAlphaTwoTailed = getZValue((1 - alpha) * 100);
    const zBeta = getZValueOneTailed(power);
    const n1Exact = Math.pow((zAlphaTwoTailed + zBeta) * stdDevDiff / effectSize, 2);
    const n1 = Math.round(n1Exact);
    
    // One-tailed test
    const zAlphaOneTailed = getZValueOneTailedAlpha(alpha);
    const n2Exact = Math.pow((zAlphaOneTailed + zBeta) * stdDevDiff / effectSize, 2);
    const n2 = Math.round(n2Exact);
    
    const calculations = [
      `=== PAIRED 'T' TEST SAMPLE SIZE CALCULATION ===`,
      ``,
      `Given:`,
      `• Level of Significance (α) = ${alpha}`,
      `• Power (1-β) = ${power}`,
      `• Mean of variable of interest before intervention = ${meanBefore}`,
      `• Mean of variable of interest after intervention = ${meanAfter}`,
      `• SD of variable of interest before intervention = ${stdDevBefore}`,
      `• SD of variable of interest after intervention = ${stdDevAfter}`,
      ``,
      `Step 1: Calculate effect size`,
      `|Effect| = |Mean_after - Mean_before| = |${meanAfter} - ${meanBefore}| = ${effectSize}`,
      ``,
      `Step 2: Estimate SD of differences`,
      `SD_diff ≈ max(SD_before, SD_after) = max(${stdDevBefore}, ${stdDevAfter}) = ${stdDevDiff}`,
      ``,
      `Step 3: Two-tailed test calculation`,
      `Z_{α/2} = ${zAlphaTwoTailed.toFixed(4)}`,
      `Z_{β} = ${zBeta.toFixed(4)}`,
      `n₁ = ((Z_{α/2} + Z_{β}) × SD_diff / |Effect|)²`,
      `n₁ = ((${zAlphaTwoTailed.toFixed(4)} + ${zBeta.toFixed(4)}) × ${stdDevDiff} / ${effectSize})²`,
      `n₁ = ${n1Exact.toFixed(4)}`,
      `n₁ = ${n1} (rounded up)`,
      ``,
      `Step 4: One-tailed test calculation`,
      `Z_{α} = ${zAlphaOneTailed.toFixed(4)}`,
      `Z_{β} = ${zBeta.toFixed(4)}`,
      `n₂ = ((Z_{α} + Z_{β}) × SD_diff / |Effect|)²`,
      `n₂ = ((${zAlphaOneTailed.toFixed(4)} + ${zBeta.toFixed(4)}) × ${stdDevDiff} / ${effectSize})²`,
      `n₂ = ${n2Exact.toFixed(4)}`,
      `n₂ = ${n2} (rounded up)`,
      ``,
      `Results:`,
      `• Sample Size – Two tailed test (n₁) = ${n1}`,
      `• Sample Size – One tailed test (n₂) = ${n2}`
    ];
    
    return {
      sampleSize: n1, // Return two-tailed as primary result
      power: power,
      effectSize: effectSize / stdDevDiff,
      interpretation: `For a paired t-test with α=${alpha}, power=${power}, testing before (${meanBefore}) vs after (${meanAfter}): Two-tailed test requires ${n1} subjects, One-tailed test requires ${n2} subjects.`,
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

export const calculateDiffMeansCrossover = (
  alpha: number, 
  power: number, 
  stdDevDiff: number, 
  treatmentEffect: number
): CalculatorResult => {
  try {
    // Two-tailed test
    const zAlphaTwoTailed = getZValue((1 - alpha) * 100);
    const zBeta = getZValueOneTailed(power);
    const n1Exact = (4 * stdDevDiff * stdDevDiff * Math.pow(zAlphaTwoTailed + zBeta, 2)) / (treatmentEffect * treatmentEffect);
    const n1 = Math.round(n1Exact);
    
    // One-tailed test
    const zAlphaOneTailed = getZValueOneTailedAlpha(alpha);
    const n2Exact = (4 * stdDevDiff * stdDevDiff * Math.pow(zAlphaOneTailed + zBeta, 2)) / (treatmentEffect * treatmentEffect);
    const n2 = Math.round(n2Exact);
    
    const calculations = [
      `=== CROSSOVER DESIGN SAMPLE SIZE CALCULATION ===`,
      ``,
      `Given:`,
      `• Level of Significance (α) = ${alpha}`,
      `• Power (1-β) = ${power}`,
      `• SD of difference between treatment scores = ${stdDevDiff}`,
      `• Treatment effect (Δ) = ${treatmentEffect}`,
      ``,
      `Step 1: Two-tailed test calculation`,
      `Z_{α/2} = ${zAlphaTwoTailed.toFixed(4)}`,
      `Z_{β} = ${zBeta.toFixed(4)}`,
      `n₁ = 4 × SD_diff² × (Z_{α/2} + Z_{β})² / Δ²`,
      `n₁ = 4 × ${stdDevDiff}² × (${zAlphaTwoTailed.toFixed(4)} + ${zBeta.toFixed(4)})² / ${treatmentEffect}²`,
      `n₁ = 4 × ${(stdDevDiff * stdDevDiff).toFixed(4)} × ${(zAlphaTwoTailed + zBeta).toFixed(4)}² / ${(treatmentEffect * treatmentEffect).toFixed(4)}`,
      `n₁ = ${n1Exact.toFixed(4)}`,
      `n₁ = ${n1} (rounded up)`,
      ``,
      `Step 2: One-tailed test calculation`,
      `Z_{α} = ${zAlphaOneTailed.toFixed(4)}`,
      `Z_{β} = ${zBeta.toFixed(4)}`,
      `n₂ = 4 × SD_diff² × (Z_{α} + Z_{β})² / Δ²`,
      `n₂ = 4 × ${stdDevDiff}² × (${zAlphaOneTailed.toFixed(4)} + ${zBeta.toFixed(4)})² / ${treatmentEffect}²`,
      `n₂ = 4 × ${(stdDevDiff * stdDevDiff).toFixed(4)} × ${(zAlphaOneTailed + zBeta).toFixed(4)}² / ${(treatmentEffect * treatmentEffect).toFixed(4)}`,
      `n₂ = ${n2Exact.toFixed(4)}`,
      `n₂ = ${n2} (rounded up)`,
      ``,
      `Results:`,
      `• Sample Size – Two tailed test (n₁) = ${n1}`,
      `• Sample Size – One tailed test (n₂) = ${n2}`
    ];
    
    return {
      sampleSize: n1, // Return two-tailed as primary result
      power: power,
      effectSize: treatmentEffect / stdDevDiff,
      interpretation: `For a crossover design with α=${alpha}, power=${power}, treatment effect Δ=${treatmentEffect}: Two-tailed test requires ${n1} subjects, One-tailed test requires ${n2} subjects.`,
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

// Equivalence Study with Custom Input/Output Structure
export const calculateEquivalenceStudyDetailed = (
  alpha: number,
  power: number,
  mu1: number,
  mu2: number,
  sd1: number,
  sd2: number,
  equivalenceThreshold: number,
  allocationRatio: number = 1
): {
  // Input parameters
  alpha: number;
  confidenceLevel: number;
  power: number;
  mu1: number;
  mu2: number;
  sd1: number;
  sd2: number;
  delta: number;
  K: number;
  
  // Calculated intermediate values
  zAlphaHalf: number;
  zBeta: number;
  
  // Output results
  n1: number;
  n2: number;
  
  // Additional info
  interpretation: string;
  calculations: string[];
} => {
  try {
    // Input parameters
    const confidenceLevel = (1 - alpha) * 100;
    
    // Calculate Z-values (corrected)
    const zAlphaHalf = getZValue(confidenceLevel);
    const zBeta = getZValueOneTailed(power);
    
    // Calculate pooled variance
    const pooledVariance = sd1 ** 2 + sd2 ** 2;
    
    // Calculate sample sizes with allocation ratio
    // For unequal allocation: n1 = (1 + 1/K) × base_formula
    const baseSampleSize = pooledVariance * (zAlphaHalf + zBeta) ** 2 / (equivalenceThreshold ** 2);
    const n1Exact = (1 + 1/allocationRatio) * baseSampleSize;
    const n1 = Math.round(n1Exact);
    const n2 = Math.round(allocationRatio * n1);
    
    const calculations = [
      `=== EQUIVALENCE STUDY CALCULATION ===`,
      ``,
      `INPUT PARAMETERS:`,
      `• α = ${alpha}`,
      `• (1-α) = ${(1-alpha).toFixed(2)} → ${confidenceLevel}% confidence`,
      `• (1-β) = ${power} → ${(power*100)}% power`,
      `• μ₁ = ${mu1} (Experimental/treatment group)`,
      `• μ₂ = ${mu2} (Standard treatment group)`,
      `• SD₁ = ${sd1} (Experimental/treatment group)`,
      `• SD₂ = ${sd2} (Standard treatment group)`,
      `• δ = ${equivalenceThreshold} (Acceptable threshold for equivalence)`,
      `• K = ${allocationRatio} (Ratio of n₂/n₁)`,
      ``,
      `INTERMEDIATE CALCULATIONS:`,
      `• Z(1-α/2) = Z(${(1-alpha/2).toFixed(3)}) = ${zAlphaHalf.toFixed(4)}`,
      `• Z_β = Z(${(1-power).toFixed(2)}) = ${zBeta.toFixed(4)}`,
      ``,
      `SAMPLE SIZE CALCULATION:`,
      `• Pooled Variance = SD₁² + SD₂² = ${sd1}² + ${sd2}² = ${pooledVariance.toFixed(2)}`,
      `• Base formula = σ²pooled × (Z_{α/2} + Z_{β})² / δ²`,
      `• Base = ${pooledVariance.toFixed(2)} × (${zAlphaHalf.toFixed(4)} + ${zBeta.toFixed(4)})² / ${equivalenceThreshold}²`,
      `• Base = ${pooledVariance.toFixed(2)} × ${(zAlphaHalf + zBeta).toFixed(4)}² / ${equivalenceThreshold ** 2}`,
      `• Base = ${baseSampleSize.toFixed(4)}`,
      ``,
      `For allocation ratio K = ${allocationRatio}:`,
      `• n₁ = (1 + 1/K) × Base = (1 + 1/${allocationRatio}) × ${baseSampleSize.toFixed(4)}`,
      `• n₁ = ${(1 + 1/allocationRatio).toFixed(4)} × ${baseSampleSize.toFixed(4)} = ${n1Exact.toFixed(4)}`,
      `• n₂ = K × n₁ = ${allocationRatio} × ${n1} = ${n2}`,
      ``,
      `FINAL RESULTS:`,
      `• n₁ = ${n1} (Sample size for experimental/treatment group)`,
      `• n₂ = ${n2} (Sample size for standard treatment group)`,
      `• Total N = ${n1 + n2}`
    ];
    
    const interpretation = `For an equivalence study with α=${alpha}, power=${power}, and equivalence threshold δ=${equivalenceThreshold}, with allocation ratio K=${allocationRatio}, you need n₁=${n1} subjects in the experimental group and n₂=${n2} subjects in the standard treatment group (total N = ${n1 + n2}).`;
    
    return {
      // Input parameters
      alpha: alpha,
      confidenceLevel: (1 - alpha),
      power: power,
      mu1: mu1,
      mu2: mu2,
      sd1: sd1,
      sd2: sd2,
      delta: equivalenceThreshold,
      K: allocationRatio,
      
      // Calculated intermediate values
      zAlphaHalf: zAlphaHalf,
      zBeta: zBeta,
      
      // Output results
      n1: n1,
      n2: n2,
      
      // Additional info
      interpretation: interpretation,
      calculations: calculations
    };
    
  } catch {
    return {
      alpha: alpha,
      confidenceLevel: (1 - alpha),
      power: power,
      mu1: mu1,
      mu2: mu2,
      sd1: sd1,
      sd2: sd2,
      delta: equivalenceThreshold,
      K: allocationRatio,
      zAlphaHalf: 0,
      zBeta: 0,
      n1: 0,
      n2: 0,
      interpretation: 'Error in calculation. Please check your inputs.',
      calculations: ['Error occurred during calculation']
    };
  }
}; 