export type OpportunityKind = "post" | "reply" | "follow";

export type FeedbackTag =
  | "sounds-like-me"
  | "too-corporate"
  | "too-shilly"
  | "too-long"
  | "more-casual";

export type Opportunity = {
  id: string;
  kind: OpportunityKind;
  score: number;
  urgency: "hot" | "fresh" | "watch";
  title: string;
  sourceName: string;
  sourceUrl: string;
  xPostUrl?: string;
  profileUrl?: string;
  sourceText?: string;
  whyItMatters: string;
  angle: string;
  draft?: string;
  variants?: string[];
  accountHandle?: string;
  accountReason?: string;
  tags: string[];
  observedAt: string;
};

export type StyleFeedback = {
  opportunityId: string;
  tag: FeedbackTag;
  createdAt: string;
};
