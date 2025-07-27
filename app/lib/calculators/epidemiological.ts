// Sample Size Calculator for Epidemiological Studies — Complete Implementation
import {
  getZValue,
  getZValueOneTailed,
  CalculatorResult
} from './utils';

// =============================================================================
// 9. SAMPLE SIZE FOR COHORT STUDY - RELATIVE RISK (RR)
// =============================================================================

// 901 - CI for RR with relative margin
export const calculateCohortStudyCI = (
  confidenceLevel: number,
  anticipatedRR: number,
  relativeMarginError: number,
  exposureRate: number,
  allocationRatio: number = 1
): CalculatorResult => {
  try {
    const z = getZValue(confidenceLevel);
    const RR = anticipatedRR;
    const r = relativeMarginError;
    const Pe = exposureRate; // Proportion exposed
    const K = allocationRatio;
    
    // For RR confidence interval: n = Z² × (1/Pe + K/Pu) / (ln(RR) × r)²
    // where Pu = Pe × RR (proportion with outcome in unexposed)
    const Pu = Pe / RR; // Assuming Pe is the outcome rate in exposed
    
    const variance = (1 / Pe + K / Pu);
    const lnRR = Math.log(RR);
    const nExact = (z * z * variance) / (lnRR * lnRR * r * r);
    const n1 = Math.round(nExact);
    const n2 = Math.round(K * n1);
    
    const calculations = [
      `=== CI FOR RELATIVE RISK (COHORT STUDY) ===`,
      ``,
      `Given:`,
      `• Confidence Level = ${confidenceLevel}%`,
      `• Anticipated RR = ${RR}`,
      `• Relative Margin of Error = ${(r*100).toFixed(1)}%`,
      `• Outcome Rate in Exposed (Pe) = ${Pe}`,
      `• Allocation Ratio (K) = ${K}`,
      ``,
      `Step 1: Calculate outcome rate in unexposed`,
      `Pu = Pe / RR = ${Pe} / ${RR} = ${Pu.toFixed(4)}`,
      ``,
      `Step 2: Calculate variance components`,
      `Variance = 1/Pe + K/Pu = 1/${Pe} + ${K}/${Pu.toFixed(4)} = ${variance.toFixed(4)}`,
      ``,
      `Step 3: Apply RR CI formula`,
      `n₁ = Z² × Variance / [ln(RR) × r]²`,
      `n₁ = ${z.toFixed(4)}² × ${variance.toFixed(4)} / [${lnRR.toFixed(4)} × ${r}]²`,
      `n₁ = ${nExact.toFixed(4)}`,
      ``,
      `Step 4: Calculate group sizes`,
      `n₁ = ${n1} (exposed group)`,
      `n₂ = ${n2} (unexposed group)`
    ];
    
    return {
      sampleSize: n1,
      power: null,
      effectSize: RR,
      interpretation: `For a ${confidenceLevel}% confidence interval of RR with ${(r*100).toFixed(1)}% relative margin, you need n₁=${n1} exposed and n₂=${n2} unexposed subjects.`,
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

// 902 - Hypothesis test for RR
export const calculateCohortStudyTest = (
  alpha: number,
  power: number,
  nullRR: number,
  alternativeRR: number,
  outcomeRateControl: number,
  allocationRatio: number = 1
): CalculatorResult => {
  try {
    const zAlpha = getZValue((1 - alpha) * 100);
    const zBeta = getZValueOneTailed(power);
    
    const RR0 = nullRR;
    const RR1 = alternativeRR;
    const Pc = outcomeRateControl; // Outcome rate in control (unexposed) group
    const K = allocationRatio;
    
    // Calculate exposed group rates
    const Pe0 = Pc * RR0; // Under null hypothesis
    const Pe1 = Pc * RR1; // Under alternative hypothesis
    
    // Variance calculations
    const var0 = (1 - Pe0) / Pe0 + K * (1 - Pc) / Pc; // Under null
    const var1 = (1 - Pe1) / Pe1 + K * (1 - Pc) / Pc; // Under alternative
    
    const lnRR0 = Math.log(RR0);
    const lnRR1 = Math.log(RR1);
    const deltaLnRR = Math.abs(lnRR1 - lnRR0);
    
    const nExact = (Math.pow(zAlpha * Math.sqrt(var0) + zBeta * Math.sqrt(var1), 2)) / (deltaLnRR * deltaLnRR);
    const n1 = Math.round(nExact);
    const n2 = Math.round(K * n1);
    
    const calculations = [
      `=== HYPOTHESIS TEST FOR RELATIVE RISK ===`,
      ``,
      `Given:`,
      `• Significance Level (α) = ${alpha}`,
      `• Power (1-β) = ${power}`,
      `• Null RR (RR₀) = ${RR0}`,
      `• Alternative RR (RR₁) = ${RR1}`,
      `• Control Group Outcome Rate = ${Pc}`,
      `• Allocation Ratio (K) = ${K}`,
      ``,
      `Step 1: Calculate exposed group rates`,
      `Pe₀ = Pc × RR₀ = ${Pe0.toFixed(4)}`,
      `Pe₁ = Pc × RR₁ = ${Pe1.toFixed(4)}`,
      ``,
      `Step 2: Calculate log-scale effect`,
      `Δ(ln RR) = |ln(RR₁) - ln(RR₀)| = ${deltaLnRR.toFixed(4)}`,
      ``,
      `Step 3: Calculate variances`,
      `Var₀ = (1-Pe₀)/Pe₀ + K(1-Pc)/Pc = ${var0.toFixed(4)}`,
      `Var₁ = (1-Pe₁)/Pe₁ + K(1-Pc)/Pc = ${var1.toFixed(4)}`,
      ``,
      `Step 4: Apply formula`,
      `n₁ = [Z_{α/2}√Var₀ + Z_{β}√Var₁]² / [Δ(ln RR)]²`,
      `n₁ = ${nExact.toFixed(4)}`,
      ``,
      `Step 5: Calculate group sizes`,
      `n₁ = ${n1}, n₂ = ${n2}`
    ];
    
    return {
      sampleSize: n1,
      power: power,
      effectSize: RR1,
      interpretation: `For testing RR: H₀: RR=${RR0} vs H₁: RR=${RR1} with α=${alpha}, power=${power}, you need n₁=${n1} and n₂=${n2}.`,
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
// 10. SAMPLE SIZE FOR CASE-CONTROL STUDY - ODDS RATIO (OR)
// =============================================================================

// 1010 - CI for OR with relative margin
export const calculateCaseControlCI = (
  confidenceLevel: number,
  anticipatedOR: number,
  relativeMarginError: number,
  exposureRateControls: number,
  caseControlRatio: number = 1
): CalculatorResult => {
  try {
    const z = getZValue(confidenceLevel);
    const OR = anticipatedOR;
    const r = relativeMarginError;
    const P0 = exposureRateControls; // Exposure rate in controls
    const m = caseControlRatio; // Number of controls per case
    
    // Calculate exposure rate in cases
    const P1 = (OR * P0) / (1 + P0 * (OR - 1));
    
    // Variance for OR on log scale
    const variance = (1 / (P1 * (1 - P1))) + (m / (P0 * (1 - P0)));
    const lnOR = Math.log(OR);
    
    const nCasesExact = (z * z * variance) / (lnOR * lnOR * r * r);
    const nCases = Math.round(nCasesExact);
    const nControls = Math.round(m * nCases);
    
    const calculations = [
      `=== CI FOR ODDS RATIO (CASE-CONTROL STUDY) ===`,
      ``,
      `Given:`,
      `• Confidence Level = ${confidenceLevel}%`,
      `• Anticipated OR = ${OR}`,
      `• Relative Margin of Error = ${(r*100).toFixed(1)}%`,
      `• Exposure Rate in Controls (P₀) = ${P0}`,
      `• Case:Control Ratio = 1:${m}`,
      ``,
      `Step 1: Calculate exposure rate in cases`,
      `P₁ = (OR × P₀) / (1 + P₀ × (OR - 1))`,
      `P₁ = ${P1.toFixed(4)}`,
      ``,
      `Step 2: Calculate variance`,
      `Var = 1/[P₁(1-P₁)] + m/[P₀(1-P₀)]`,
      `Var = ${variance.toFixed(4)}`,
      ``,
      `Step 3: Apply OR CI formula`,
      `n(cases) = Z² × Var / [ln(OR) × r]²`,
      `n(cases) = ${nCasesExact.toFixed(4)}`,
      ``,
      `Step 4: Calculate group sizes`,
      `Cases = ${nCases}`,
      `Controls = ${nControls}`
    ];
    
    return {
      sampleSize: nCases,
      power: null,
      effectSize: OR,
      interpretation: `For a ${confidenceLevel}% confidence interval of OR with ${(r*100).toFixed(1)}% relative margin, you need ${nCases} cases and ${nControls} controls.`,
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

// 1020 - Hypothesis test for OR
export const calculateCaseControlTest = (
  alpha: number,
  power: number,
  nullOR: number,
  alternativeOR: number,
  exposureRateControls: number,
  caseControlRatio: number = 1
): CalculatorResult => {
  try {
    const zAlpha = getZValue((1 - alpha) * 100);
    const zBeta = getZValueOneTailed(power);
    
    const OR0 = nullOR;
    const OR1 = alternativeOR;
    const P0 = exposureRateControls;
    const m = caseControlRatio;
    
    // Calculate exposure rates in cases under each hypothesis
    const P1_0 = (OR0 * P0) / (1 + P0 * (OR0 - 1)); // Under null
    const P1_1 = (OR1 * P0) / (1 + P0 * (OR1 - 1)); // Under alternative
    
    // Variance calculations
    const var0 = (1 / (P1_0 * (1 - P1_0))) + (m / (P0 * (1 - P0)));
    const var1 = (1 / (P1_1 * (1 - P1_1))) + (m / (P0 * (1 - P0)));
    
    const lnOR0 = Math.log(OR0);
    const lnOR1 = Math.log(OR1);
    const deltaLnOR = Math.abs(lnOR1 - lnOR0);
    
    const nCasesExact = (Math.pow(zAlpha * Math.sqrt(var0) + zBeta * Math.sqrt(var1), 2)) / (deltaLnOR * deltaLnOR);
    const nCases = Math.round(nCasesExact);
    const nControls = Math.round(m * nCases);
    
    const calculations = [
      `=== HYPOTHESIS TEST FOR ODDS RATIO ===`,
      ``,
      `Given:`,
      `• Significance Level (α) = ${alpha}`,
      `• Power (1-β) = ${power}`,
      `• Null OR (OR₀) = ${OR0}`,
      `• Alternative OR (OR₁) = ${OR1}`,
      `• Exposure Rate in Controls = ${P0}`,
      `• Case:Control Ratio = 1:${m}`,
      ``,
      `Step 1: Calculate exposure rates in cases`,
      `P₁₀ = ${P1_0.toFixed(4)} (under H₀)`,
      `P₁₁ = ${P1_1.toFixed(4)} (under H₁)`,
      ``,
      `Step 2: Calculate log-scale effect`,
      `Δ(ln OR) = |ln(OR₁) - ln(OR₀)| = ${deltaLnOR.toFixed(4)}`,
      ``,
      `Step 3: Apply formula`,
      `n(cases) = [Z_{α/2}√Var₀ + Z_{β}√Var₁]² / [Δ(ln OR)]²`,
      `n(cases) = ${nCasesExact.toFixed(4)}`,
      ``,
      `Step 4: Calculate group sizes`,
      `Cases = ${nCases}, Controls = ${nControls}`
    ];
    
    return {
      sampleSize: nCases,
      power: power,
      effectSize: OR1,
      interpretation: `For testing OR: H₀: OR=${OR0} vs H₁: OR=${OR1} with α=${alpha}, power=${power}, you need ${nCases} cases and ${nControls} controls.`,
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