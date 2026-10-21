import type { Opportunity } from "./types";

export interface SignalProvider {
  name: string;
  collect(): Promise<Opportunity[]>;
}

export interface DraftProvider {
  generate(opportunity: Opportunity): Promise<{
    draft: string;
    variants?: string[];
  }>;
}

/**
 * Integrations intentionally stop at this boundary in V1.
 * Later implementations can use public research sources, Gemini,
 * PostgreSQL/Neon, and (optionally) the official X API.
 */
export const providerStatus = {
  research: "demo",
  drafting: "demo",
  persistence: "local-browser",
  xActions: "manual",
} as const;
