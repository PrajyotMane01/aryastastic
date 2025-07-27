"use client";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-teal-50 to-blue-100 py-12 px-4 flex flex-col items-center" style={{ paddingTop: '80px' }}>
      {/* Header Bar */}
      <div className="w-full max-w-4xl mx-auto mb-8">
        <div className="bg-cyan-900 text-yellow-300 text-center py-3 rounded-t-xl font-semibold text-lg tracking-wide shadow-md uppercase">
          ayra Statistical Consultancy and Solutions Services
        </div>
        <div className="bg-white/90 text-slate-700 px-6 py-4 rounded-b-xl shadow-md border border-cyan-200 text-base font-light">
          Statistical consulting services for Data Management and Statistical Analysis, designing and validating questionnaire tools, as well as for organizing, carrying out, and publishing research in the domains of clinical, social science, psychology, economics and business.
        </div>
      </div>

      {/* Why consult a statistician? */}
      <div className="w-full max-w-4xl mx-auto mb-8">
        <div className="bg-white/90 rounded-xl shadow-md border border-cyan-200 px-6 py-8 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-cyan-800 mb-4">
            Why is it essential to consult a statistician before conducting a Quantitative Research?
          </h2>
          <div className="text-base md:text-lg text-slate-700 mb-2 font-medium">
            <span className="block text-slate-800 font-serif mb-2">&quot;There is growing concern that a substantial proportion of scientific research may in fact be false.&quot;</span>
            <span className="block text-xs text-slate-500 mb-2">(Ioannidis J.P.A. Why Most Published Research Findings Are False. PLoS Med 2(8): e124, 2005)</span>
            <span className="block text-slate-800 font-serif mb-2">&quot;The most published research is not reproducible, not replicable, or false.&quot;</span>
            <span className="block text-xs text-slate-500">(Ref: John P. Ioannidis et al. Page 5, Nature Publication Research Policy Panel Annual Review of Statistics and its Application Vol 10: 109-132, 2023)</span>
          </div>
        </div>
      </div>

      {/* Factors Section */}
      <div className="w-full max-w-4xl mx-auto mb-8">
        <div className="bg-white/90 rounded-xl shadow-md border border-cyan-200 px-6 py-8">
          <h3 className="text-xl md:text-2xl font-semibold text-rose-700 mb-4 text-left">
            The validity, reliability, usefulness, and generalizability of clinical, social science, psychology, and business research findings are determined by the following factors:
          </h3>
          <ul className="list-disc pl-6 text-slate-700 space-y-2 text-base">
            <li>How well-crafted are the goals and research questions in relation to setting, place, time, and person?</li>
            <li>How well was the population under investigation identified?</li>
            <li>If required, how well was the comparison population identified?</li>
            <li>How well-defined and justified are the inclusion and exclusion criteria?</li>
            <li>To what extent does the study&apos;s design align with the research question?</li>
            <li>To what extent are all input, exposures, predictors, potential confounders, extraneous variable, and outcome variables identified and measured?</li>
            <li>Is any proxy variable used? If yes, to what extent is it justified?</li>
            <li>If required, was issue of multicollinearity identified and addressed?</li>
            <li>Was the issue of measurement error, confounding and bias sufficiently addressed during the design process?</li>
            <li>Was the sample size determined using the appropriate inputs in accordance with the goals and study design?</li>
            <li>To what extent the study subjects were selected using the sampling method?</li>
            <li>Were reliable and valid tools used to gather data or measure a certain aspect of research.</li>
            <li>To what degree was the data gathered accurately according to the research question?</li>
            <li>What was the quality of the statistical analysis used?</li>
            <li>How accurately were the results interpreted in light of the limitations?</li>
          </ul>
        </div>
      </div>

      {/* Guidance Section */}
      <div className="w-full max-w-4xl mx-auto mb-8">
        <div className="bg-white/90 rounded-xl shadow-md border border-cyan-200 px-6 py-6 text-center">
          <p className="text-base md:text-lg text-slate-700 mb-2">
            In order to maintain the overall integrity of the scientific investigation, it is crucial to appropriately address any statistical issues that may arise in any of these fields. Ignoring these worries could result in a total waste of time and money, which is unethical considering the possibility that study participants could suffer negative consequences without advancing scientific knowledge.
          </p>
          <p className="text-lg md:text-xl font-semibold text-cyan-700 mt-4">
            Statistical guidance can mitigate various issues and noise in the data by transforming your data into evidence and knowledge that is valid, reliable, and helpful.
          </p>
        </div>
      </div>
    </div>
  );
}