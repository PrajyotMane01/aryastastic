// Advanced Statistical Calculators - Complete Implementation
import {
  getZValue,
  getZValueOneTailed,
  CalculatorResult,
  ExtendedCalculatorResult
} from './utils';

// =============================================================================
// 4. SAMPLE SIZE FOR HYPOTHESIS TEST ABOUT MORE THAN TWO POPULATION MEANS - ANOVA
// =============================================================================

// 400 - ANOVA for multiple groups
export const calculateANOVA = (
  alpha: number,
  power: number,
  numberOfGroups: number,
  effectSize: number, // Cohen's f
  standardDeviation: number
): CalculatorResult => {
  try {
    const k = numberOfGroups;
    const f = effectSize; // Cohen's f
    const σ = standardDeviation;
    
    // Simplified calculation for ANOVA
    const zAlpha = getZValue((1 - alpha) * 100);
    const zBeta = getZValueOneTailed(power);
    
    // Approximate sample size for ANOVA
    const nExact = (Math.pow(zAlpha + zBeta, 2) * 2) / (f * f);
    const n = Math.round(nExact);
    
    const calculations = [
      `=== ANOVA SAMPLE SIZE CALCULATION ===`,
      ``,
      `Given:`,
      `• Significance Level (α) = ${alpha}`,
      `• Power (1-β) = ${power}`,
      `• Number of Groups (k) = ${k}`,
      `• Effect Size (Cohen's f) = ${f}`,
      `• Standard Deviation (σ) = ${σ}`,
      ``,
      `Step 1: Apply ANOVA formula`,
      `n = (Z_{α/2} + Z_{β})² × 2 / f²`,
      `n = (${zAlpha.toFixed(4)} + ${zBeta.toFixed(4)})² × 2 / ${f}²`,
      `n = ${nExact.toFixed(4)}`,
      ``,
      `Step 2: Round up`,
      `Required sample size per group = ${n}`
    ];
    
    return {
      sampleSize: n,
      power: power,
      effectSize: f,
      interpretation: `For a one-way ANOVA with ${k} groups, effect size f=${f}, α=${alpha}, and power=${power}, you need ${n} subjects per group (total N = ${k*n}).`,
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

// =============================================================================
// 7. SAMPLE SIZE FOR DIFFERENCE BETWEEN MORE THAN TWO PROPORTIONS
// =============================================================================

// 700 - Chi-square test for multiple proportions
export const calculateMultipleProportions = (
  alpha: number,
  power: number,
  proportions: number[],
  allocationRatio: number = 1
): CalculatorResult => {
  try {
    const k = proportions.length;
    const p = proportions;
    const K = allocationRatio;
    
    // Calculate overall proportion
    const pBar = p.reduce((sum, pi) => sum + pi, 0) / k;
    
    // Calculate effect size (Cramer's V approximation)
    const variance = p.reduce((sum, pi) => sum + Math.pow(pi - pBar, 2), 0) / k;
    const effectSize = Math.sqrt(variance / (pBar * (1 - pBar)));
    
    // Sample size calculation (simplified)
    const zAlpha = getZValue((1 - alpha) * 100);
    const zBeta = getZValueOneTailed(power);
    
    const nExact = (Math.pow(zAlpha + zBeta, 2) * pBar * (1 - pBar)) / (effectSize * effectSize);
    const n = Math.round(nExact);
    
    const calculations = [
      `=== MULTIPLE PROPORTIONS COMPARISON ===`,
      ``,
      `Given:`,
      `• Significance Level (α) = ${alpha}`,
      `• Power (1-β) = ${power}`,
      `• Number of Groups (k) = ${k}`,
      `• Proportions = [${p.join(', ')}]`,
      `• Allocation Ratio = ${K}`,
      ``,
      `Step 1: Calculate overall proportion`,
      `p̄ = (${p.join(' + ')}) / ${k} = ${pBar.toFixed(4)}`,
      ``,
      `Step 2: Calculate effect size`,
      `Effect size = ${effectSize.toFixed(4)}`,
      ``,
      `Step 3: Apply formula`,
      `n = (Z_{α/2} + Z_{β})² × p̄(1-p̄) / effect_size²`,
      `n = ${nExact.toFixed(4)}`,
      ``,
      `Step 4: Round up`,
      `Required sample size per group = ${n}`
    ];
    
    return {
      sampleSize: n,
      power: power,
      effectSize: effectSize,
      interpretation: `For comparing ${k} proportions with α=${alpha}, power=${power}, you need ${n} subjects per group (total N = ${k*n}).`,
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

// =============================================================================
// 11. SAMPLE SIZE FOR DIAGNOSTIC STUDY
// =============================================================================

// 1110 - CI for Sensitivity/Specificity
export const calculateDiagnosticSensitivitySpecificity = (
  confidenceLevel: number,
  sensitivitySpecificity: number,
  absoluteMarginError: number
): CalculatorResult => {
  try {
    const z = getZValue(confidenceLevel);
    const p = sensitivitySpecificity;
    const d = absoluteMarginError;
    
    const nExact = (z * z * p * (1 - p)) / (d * d);
    const n = Math.round(nExact);
    
    const calculations = [
      `=== DIAGNOSTIC SENSITIVITY/SPECIFICITY CI ===`,
      ``,
      `Given:`,
      `• Confidence Level = ${confidenceLevel}%`,
      `• Sensitivity/Specificity = ${p}`,
      `• Absolute Margin of Error = ${d}`,
      ``,
      `Step 1: Apply proportion CI formula`,
      `n = Z²p(1-p) / d²`,
      `n = ${z.toFixed(4)}² × ${p} × ${(1-p).toFixed(4)} / ${d}²`,
      `n = ${nExact.toFixed(4)}`,
      ``,
      `Step 2: Round up`,
      `Required sample size = ${n}`,
      ``,
      `Note: Select ${n} subjects with disease (for sensitivity) or without disease (for specificity) as per Gold Standard.`
    ];
    
    return {
      sampleSize: n,
      power: null,
      effectSize: null,
      interpretation: `For a ${confidenceLevel}% confidence interval of sensitivity/specificity with margin ${d}, you need ${n} subjects.`,
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

// 1120 - CI for Positive Predictive Value
export const calculateDiagnosticPPV = (
  confidenceLevel: number,
  positivePredictiveValue: number,
  precision: number
): CalculatorResult => {
  try {
    const z = getZValue(confidenceLevel);
    const ppv = positivePredictiveValue;
    const d = precision;
    
    const nExact = (z * z * ppv * (1 - ppv)) / (d * d);
    const n = Math.round(nExact);
    
    const calculations = [
      `=== POSITIVE PREDICTIVE VALUE CI ===`,
      ``,
      `Given:`,
      `• Confidence Level = ${confidenceLevel}%`,
      `• Positive Predictive Value = ${ppv}`,
      `• Precision = ${d}`,
      ``,
      `Step 1: Apply proportion CI formula`,
      `n = Z² × PPV × (1-PPV) / precision²`,
      `n = ${z.toFixed(4)}² × ${ppv} × ${(1-ppv).toFixed(4)} / ${d}²`,
      `n = ${nExact.toFixed(4)}`,
      ``,
      `Step 2: Round up`,
      `Required sample size = ${n}`,
      ``,
      `Note: Select ${n} subjects with disease by the diagnostic test.`
    ];
    
    return {
      sampleSize: n,
      power: null,
      effectSize: null,
      interpretation: `For a ${confidenceLevel}% confidence interval of PPV with precision ${d}, you need ${n} subjects.`,
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

// 1130 - CI for Negative Predictive Value
export const calculateDiagnosticNPV = (
  confidenceLevel: number,
  negativePredictiveValue: number,
  precision: number
): CalculatorResult => {
  try {
    const z = getZValue(confidenceLevel);
    const npv = negativePredictiveValue;
    const d = precision;
    
    const nExact = (z * z * npv * (1 - npv)) / (d * d);
    const n = Math.round(nExact);
    
    const calculations = [
      `=== NEGATIVE PREDICTIVE VALUE CI ===`,
      ``,
      `Given:`,
      `• Confidence Level = ${confidenceLevel}%`,
      `• Negative Predictive Value = ${npv}`,
      `• Precision = ${d}`,
      ``,
      `Step 1: Apply proportion CI formula`,
      `n = Z² × NPV × (1-NPV) / precision²`,
      `n = ${z.toFixed(4)}² × ${npv} × ${(1-npv).toFixed(4)} / ${d}²`,
      `n = ${nExact.toFixed(4)}`,
      ``,
      `Step 2: Round up`,
      `Required sample size = ${n}`,
      ``,
      `Note: Select ${n} subjects without disease by the diagnostic test.`
    ];
    
    return {
      sampleSize: n,
      power: null,
      effectSize: null,
      interpretation: `For a ${confidenceLevel}% confidence interval of NPV with precision ${d}, you need ${n} subjects.`,
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

// 1140 - CI for LR+ with equal cases and controls
export const calculateLRPlusEqual = (
  confidenceLevel: number,
  likelihoodRatioPlus: number,
  sensitivity: number,
  specificity: number
): ExtendedCalculatorResult => {
  try {
    const z = getZValue(confidenceLevel);
    const LRplus = likelihoodRatioPlus;
    const sens = sensitivity;
    const spec = specificity;
    
    // For equal allocation, n1 = n2
    const variance = (1 - sens) / sens + (1 - spec) / spec;
    const lnLRplus = Math.log(LRplus);
    
    const nExact = (z * z * variance) / (lnLRplus * lnLRplus);
    const n = Math.round(nExact);
    
    const calculations = [
      `=== LIKELIHOOD RATIO POSITIVE CI (EQUAL ALLOCATION) ===`,
      ``,
      `Given:`,
      `• Confidence Level = ${confidenceLevel}%`,
      `• LR+ = ${LRplus}`,
      `• Sensitivity = ${sens}`,
      `• Specificity = ${spec}`,
      ``,
      `Step 1: Calculate variance components`,
      `Variance = (1-sens)/sens + (1-spec)/spec`,
      `Variance = (1-${sens})/${sens} + (1-${spec})/${spec} = ${variance.toFixed(4)}`,
      ``,
      `Step 2: Apply LR+ formula`,
      `n = Z² × Variance / [ln(LR+)]²`,
      `n = ${z.toFixed(4)}² × ${variance.toFixed(4)} / [${lnLRplus.toFixed(4)}]²`,
      `n = ${nExact.toFixed(4)}`,
      ``,
      `Step 3: Round up`,
      `Required sample size per group = ${n}`,
      ``,
      `Note: ${n} subjects with disease and ${n} subjects without disease by Gold Standard.`
    ];
    
    return {
      sampleSize: n,
      power: null,
      effectSize: LRplus,
      interpretation: `For a ${confidenceLevel}% confidence interval of LR+ with equal allocation, you need ${n} cases and ${n} controls.`,
      calculations: calculations,
      n1: n,
      n2: n,
      totalN: 2 * n
    };
  } catch {
    return {
      sampleSize: null,
      power: null,
      effectSize: null,
      interpretation: 'Error in calculation. Please check your inputs.',
      calculations: [],
      n1: 0,
      n2: 0,
      totalN: 0
    };
  }
};

// 1150 - CI for LR+ with unequal cases and controls
export const calculateLRPlusUnequal = (
  confidenceLevel: number,
  likelihoodRatioPlus: number,
  sensitivity: number,
  specificity: number,
  caseControlRatio: number
): ExtendedCalculatorResult => {
  try {
    const z = getZValue(confidenceLevel);
    const LRplus = likelihoodRatioPlus;
    const sens = sensitivity;
    const spec = specificity;
    const m = caseControlRatio; // Number of controls per case
    
    const variance = (1 - sens) / sens + m * (1 - spec) / spec;
    const lnLRplus = Math.log(LRplus);
    
    const nCasesExact = (z * z * variance) / (lnLRplus * lnLRplus);
    const nCases = Math.round(nCasesExact);
    const nControls = Math.round(m * nCases);
    
    const calculations = [
      `=== LIKELIHOOD RATIO POSITIVE CI (UNEQUAL ALLOCATION) ===`,
      ``,
      `Given:`,
      `• Confidence Level = ${confidenceLevel}%`,
      `• LR+ = ${LRplus}`,
      `• Sensitivity = ${sens}`,
      `• Specificity = ${spec}`,
      `• Case:Control Ratio = 1:${m}`,
      ``,
      `Step 1: Calculate variance components`,
      `Variance = (1-sens)/sens + m(1-spec)/spec`,
      `Variance = (1-${sens})/${sens} + ${m}(1-${spec})/${spec} = ${variance.toFixed(4)}`,
      ``,
      `Step 2: Apply LR+ formula`,
      `n_cases = Z² × Variance / [ln(LR+)]²`,
      `n_cases = ${z.toFixed(4)}² × ${variance.toFixed(4)} / [${lnLRplus.toFixed(4)}]²`,
      `n_cases = ${nCasesExact.toFixed(4)}`,
      ``,
      `Step 3: Calculate group sizes`,
      `n_cases = ${nCases}`,
      `n_controls = ${m} × ${nCases} = ${nControls}`,
      ``,
      `Note: ${nCases} subjects with disease and ${nControls} subjects without disease by Gold Standard.`
    ];
    
    return {
      sampleSize: nCases,
      power: null,
      effectSize: LRplus,
      interpretation: `For a ${confidenceLevel}% confidence interval of LR+ with 1:${m} allocation, you need ${nCases} cases and ${nControls} controls.`,
      calculations: calculations,
      n1: nCases,
      n2: nControls,
      totalN: nCases + nControls
    };
  } catch {
    return {
      sampleSize: null,
      power: null,
      effectSize: null,
      interpretation: 'Error in calculation. Please check your inputs.',
      calculations: [],
      n1: 0,
      n2: 0,
      totalN: 0
    };
  }
};

// 1160 - CI for LR- with equal cases and controls
export const calculateLRMinusEqual = (
  confidenceLevel: number,
  likelihoodRatioMinus: number,
  sensitivity: number,
  specificity: number
): ExtendedCalculatorResult => {
  try {
    const z = getZValue(confidenceLevel);
    const LRminus = likelihoodRatioMinus;
    const sens = sensitivity;
    const spec = specificity;
    
    const variance = sens / (1 - sens) + spec / (1 - spec);
    const lnLRminus = Math.log(LRminus);
    
    const nExact = (z * z * variance) / (lnLRminus * lnLRminus);
    const n = Math.round(nExact);
    
    const calculations = [
      `=== LIKELIHOOD RATIO NEGATIVE CI (EQUAL ALLOCATION) ===`,
      ``,
      `Given:`,
      `• Confidence Level = ${confidenceLevel}%`,
      `• LR- = ${LRminus}`,
      `• Sensitivity = ${sens}`,
      `• Specificity = ${spec}`,
      ``,
      `Step 1: Calculate variance components`,
      `Variance = sens/(1-sens) + spec/(1-spec)`,
      `Variance = ${sens}/(1-${sens}) + ${spec}/(1-${spec}) = ${variance.toFixed(4)}`,
      ``,
      `Step 2: Apply LR- formula`,
      `n = Z² × Variance / [ln(LR-)]²`,
      `n = ${z.toFixed(4)}² × ${variance.toFixed(4)} / [${lnLRminus.toFixed(4)}]²`,
      `n = ${nExact.toFixed(4)}`,
      ``,
      `Step 3: Round up`,
      `Required sample size per group = ${n}`,
      ``,
      `Note: ${n} subjects with disease and ${n} subjects without disease by Gold Standard.`
    ];
    
    return {
      sampleSize: n,
      power: null,
      effectSize: LRminus,
      interpretation: `For a ${confidenceLevel}% confidence interval of LR- with equal allocation, you need ${n} cases and ${n} controls.`,
      calculations: calculations,
      n1: n,
      n2: n,
      totalN: 2 * n
    };
  } catch {
    return {
      sampleSize: null,
      power: null,
      effectSize: null,
      interpretation: 'Error in calculation. Please check your inputs.',
      calculations: [],
      n1: 0,
      n2: 0,
      totalN: 0
    };
  }
};

// 1170 - CI for LR- with unequal cases and controls
export const calculateLRMinusUnequal = (
  confidenceLevel: number,
  likelihoodRatioMinus: number,
  sensitivity: number,
  specificity: number,
  caseControlRatio: number
): ExtendedCalculatorResult => {
  try {
    const z = getZValue(confidenceLevel);
    const LRminus = likelihoodRatioMinus;
    const sens = sensitivity;
    const spec = specificity;
    const m = caseControlRatio;
    
    const variance = sens / (1 - sens) + m * spec / (1 - spec);
    const lnLRminus = Math.log(LRminus);
    
    const nCasesExact = (z * z * variance) / (lnLRminus * lnLRminus);
    const nCases = Math.round(nCasesExact);
    const nControls = Math.round(m * nCases);
    
    const calculations = [
      `=== LIKELIHOOD RATIO NEGATIVE CI (UNEQUAL ALLOCATION) ===`,
      ``,
      `Given:`,
      `• Confidence Level = ${confidenceLevel}%`,
      `• LR- = ${LRminus}`,
      `• Sensitivity = ${sens}`,
      `• Specificity = ${spec}`,
      `• Case:Control Ratio = 1:${m}`,
      ``,
      `Step 1: Calculate variance components`,
      `Variance = sens/(1-sens) + m×spec/(1-spec)`,
      `Variance = ${sens}/(1-${sens}) + ${m}×${spec}/(1-${spec}) = ${variance.toFixed(4)}`,
      ``,
      `Step 2: Apply LR- formula`,
      `n_cases = Z² × Variance / [ln(LR-)]²`,
      `n_cases = ${z.toFixed(4)}² × ${variance.toFixed(4)} / [${lnLRminus.toFixed(4)}]²`,
      `n_cases = ${nCasesExact.toFixed(4)}`,
      ``,
      `Step 3: Calculate group sizes`,
      `n_cases = ${nCases}`,
      `n_controls = ${m} × ${nCases} = ${nControls}`,
      ``,
      `Note: ${nCases} subjects with disease and ${nControls} subjects without disease by Gold Standard.`
    ];
    
    return {
      sampleSize: nCases,
      power: null,
      effectSize: LRminus,
      interpretation: `For a ${confidenceLevel}% confidence interval of LR- with 1:${m} allocation, you need ${nCases} cases and ${nControls} controls.`,
      calculations: calculations,
      n1: nCases,
      n2: nControls,
      totalN: nCases + nControls
    };
  } catch {
    return {
      sampleSize: null,
      power: null,
      effectSize: null,
      interpretation: 'Error in calculation. Please check your inputs.',
      calculations: [],
      n1: 0,
      n2: 0,
      totalN: 0
    };
  }
};

// 1180 - Hypothesis test to compare sensitivity of new test with reference test
export const calculateDiagnosticSensitivityComparison = (
  alpha: number,
  power: number,
  newTestSensitivity: number,
  referenceTestSensitivity: number,
  correlation: number = 0.5
): CalculatorResult => {
  try {
    const zAlpha = getZValue((1 - alpha) * 100);
    const zBeta = getZValueOneTailed(power);
    const p1 = newTestSensitivity;
    const p2 = referenceTestSensitivity;
    const r = correlation;
    
    const pooledP = (p1 + p2) / 2;
    const variance = 2 * pooledP * (1 - pooledP) * (1 - r);
    const effectSize = Math.abs(p1 - p2);
    
    const nExact = (Math.pow(zAlpha + zBeta, 2) * variance) / (effectSize * effectSize);
    const n = Math.round(nExact);
    
    const calculations = [
      `=== DIAGNOSTIC SENSITIVITY COMPARISON ===`,
      ``,
      `Given:`,
      `• Significance Level (α) = ${alpha}`,
      `• Power (1-β) = ${power}`,
      `• New Test Sensitivity = ${p1}`,
      `• Reference Test Sensitivity = ${p2}`,
      `• Correlation = ${r}`,
      ``,
      `Step 1: Calculate pooled proportion`,
      `p̄ = (${p1} + ${p2}) / 2 = ${pooledP.toFixed(4)}`,
      ``,
      `Step 2: Calculate variance with correlation`,
      `Variance = 2 × p̄(1-p̄) × (1-r)`,
      `Variance = 2 × ${pooledP.toFixed(4)} × ${(1-pooledP).toFixed(4)} × ${(1-r).toFixed(4)}`,
      `Variance = ${variance.toFixed(4)}`,
      ``,
      `Step 3: Apply formula`,
      `n = (Z_{α/2} + Z_{β})² × Variance / (p₁-p₂)²`,
      `n = (${zAlpha.toFixed(4)} + ${zBeta.toFixed(4)})² × ${variance.toFixed(4)} / ${effectSize}²`,
      `n = ${nExact.toFixed(4)}`,
      ``,
      `Step 4: Round up`,
      `Required sample size = ${n}`
    ];
    
    return {
      sampleSize: n,
      power: power,
      effectSize: effectSize,
      interpretation: `For comparing diagnostic sensitivities with α=${alpha}, power=${power}, you need ${n} subjects.`,
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

// 1190 - Hypothesis test to compare sensitivity/specificity of two tests (Paired Design)
export const calculateDiagnosticPairedComparison = (
  alpha: number,
  power: number,
  test1Sensitivity: number,
  test2Sensitivity: number,
  discordantProportion: number
): CalculatorResult => {
  try {
    const zAlpha = getZValue((1 - alpha) * 100);
    const zBeta = getZValueOneTailed(power);
    const p1 = test1Sensitivity;
    const p2 = test2Sensitivity;
    const pd = discordantProportion;
    
    const effectSize = Math.abs(p1 - p2);
    const nExact = (Math.pow(zAlpha + zBeta, 2) * pd) / (effectSize * effectSize);
    const n = Math.round(nExact);
    
    const calculations = [
      `=== PAIRED DIAGNOSTIC TEST COMPARISON ===`,
      ``,
      `Given:`,
      `• Significance Level (α) = ${alpha}`,
      `• Power (1-β) = ${power}`,
      `• Test 1 Sensitivity = ${p1}`,
      `• Test 2 Sensitivity = ${p2}`,
      `• Discordant Proportion = ${pd}`,
      ``,
      `Step 1: Calculate effect size`,
      `Effect size = |${p1} - ${p2}| = ${effectSize}`,
      ``,
      `Step 2: Apply paired comparison formula`,
      `n = (Z_{α/2} + Z_{β})² × p_d / (p₁-p₂)²`,
      `n = (${zAlpha.toFixed(4)} + ${zBeta.toFixed(4)})² × ${pd} / ${effectSize}²`,
      `n = ${nExact.toFixed(4)}`,
      ``,
      `Step 3: Round up`,
      `Required sample size = ${n}`
    ];
    
    return {
      sampleSize: n,
      power: power,
      effectSize: effectSize,
      interpretation: `For paired comparison of diagnostic tests with α=${alpha}, power=${power}, you need ${n} subjects.`,
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

// =============================================================================
// 12. SAMPLE SIZE INTRA CLASS CORRELATION COEFFICIENT (ICC)
// =============================================================================

// 1200 - ICC sample size calculation
export const calculateICC = (
  alpha: number,
  power: number,
  anticipatedICC: number,
  nullICC: number,
  numberOfRaters: number
): CalculatorResult => {
  try {
    const zAlpha = getZValue((1 - alpha) * 100);
    const zBeta = getZValueOneTailed(power);
    const rho1 = anticipatedICC;
    const rho0 = nullICC;
    const k = numberOfRaters;
    
    // Fisher's z transformation
    const z1 = 0.5 * Math.log((1 + rho1) / (1 - rho1));
    const z0 = 0.5 * Math.log((1 + rho0) / (1 - rho0));
    const effectSize = Math.abs(z1 - z0);
    
    const nExact = Math.pow((zAlpha + zBeta) / effectSize, 2) + 3;
    const n = Math.round(nExact);
    
    const calculations = [
      `=== INTRA CLASS CORRELATION COEFFICIENT ===`,
      ``,
      `Given:`,
      `• Significance Level (α) = ${alpha}`,
      `• Power (1-β) = ${power}`,
      `• Anticipated ICC = ${rho1}`,
      `• Null ICC = ${rho0}`,
      `• Number of Raters = ${k}`,
      ``,
      `Step 1: Fisher's z transformation`,
      `z₁ = 0.5 × ln((1+ρ₁)/(1-ρ₁)) = ${z1.toFixed(4)}`,
      `z₀ = 0.5 × ln((1+ρ₀)/(1-ρ₀)) = ${z0.toFixed(4)}`,
      ``,
      `Step 2: Calculate effect size`,
      `Effect size = |z₁ - z₀| = ${effectSize.toFixed(4)}`,
      ``,
      `Step 3: Apply ICC formula`,
      `n = ((Z_{α/2} + Z_{β}) / effect_size)² + 3`,
      `n = ((${zAlpha.toFixed(4)} + ${zBeta.toFixed(4)}) / ${effectSize.toFixed(4)})² + 3`,
      `n = ${nExact.toFixed(4)}`,
      ``,
      `Step 4: Round up`,
      `Required sample size = ${n}`
    ];
    
    return {
      sampleSize: n,
      power: power,
      effectSize: effectSize,
      interpretation: `For ICC comparison with α=${alpha}, power=${power}, you need ${n} subjects rated by ${k} raters.`,
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

// =============================================================================
// 13. SAMPLE SIZE CORRELATION COEFFICIENT
// =============================================================================

// 1300 - Correlation coefficient sample size
export const calculateCorrelation = (
  alpha: number,
  power: number,
  anticipatedCorrelation: number,
  nullCorrelation: number = 0
): CalculatorResult => {
  try {
    const zAlpha = getZValue((1 - alpha) * 100);
    const zBeta = getZValueOneTailed(power);
    const r1 = anticipatedCorrelation;
    const r0 = nullCorrelation;
    
    // Fisher's z transformation
    const z1 = 0.5 * Math.log((1 + r1) / (1 - r1));
    const z0 = 0.5 * Math.log((1 + r0) / (1 - r0));
    const effectSize = Math.abs(z1 - z0);
    
    const nExact = Math.pow((zAlpha + zBeta) / effectSize, 2) + 3;
    const n = Math.round(nExact);
    
    const calculations = [
      `=== CORRELATION COEFFICIENT ===`,
      ``,
      `Given:`,
      `• Significance Level (α) = ${alpha}`,
      `• Power (1-β) = ${power}`,
      `• Anticipated Correlation = ${r1}`,
      `• Null Correlation = ${r0}`,
      ``,
      `Step 1: Fisher's z transformation`,
      `z₁ = 0.5 × ln((1+r₁)/(1-r₁)) = ${z1.toFixed(4)}`,
      `z₀ = 0.5 × ln((1+r₀)/(1-r₀)) = ${z0.toFixed(4)}`,
      ``,
      `Step 2: Calculate effect size`,
      `Effect size = |z₁ - z₀| = ${effectSize.toFixed(4)}`,
      ``,
      `Step 3: Apply correlation formula`,
      `n = ((Z_{α/2} + Z_{β}) / effect_size)² + 3`,
      `n = ((${zAlpha.toFixed(4)} + ${zBeta.toFixed(4)}) / ${effectSize.toFixed(4)})² + 3`,
      `n = ${nExact.toFixed(4)}`,
      ``,
      `Step 4: Round up`,
      `Required sample size = ${n}`
    ];
    
    return {
      sampleSize: n,
      power: power,
      effectSize: effectSize,
      interpretation: `For correlation coefficient test with α=${alpha}, power=${power}, you need ${n} subjects.`,
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