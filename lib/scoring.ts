export type ScoreInputs = {
  freshness: number;
  relevance: number;
  novelty: number;
  moneySignal: number;
  discussionPotential: number;
  confidence: number;
};

export function scoreOpportunity(input: ScoreInputs) {
  const raw =
    input.freshness * 0.24 +
    input.relevance * 0.22 +
    input.novelty * 0.16 +
    input.moneySignal * 0.16 +
    input.discussionPotential * 0.14 +
    input.confidence * 0.08;

  return Math.round(Math.max(0, Math.min(10, raw)) * 10) / 10;
}
