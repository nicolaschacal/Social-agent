"use client";

import { useEffect, useMemo, useState } from "react";
import { demoOpportunities } from "@/lib/demo-data";
import type {
  FeedbackTag,
  Opportunity,
  OpportunityKind,
  StyleFeedback,
} from "@/lib/types";

type Filter = "all" | OpportunityKind;

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "post", label: "Posts" },
  { key: "reply", label: "Replies" },
  { key: "follow", label: "Follows" },
];

const feedbackLabels: { tag: FeedbackTag; label: string }[] = [
  { tag: "sounds-like-me", label: "Sounds like me" },
  { tag: "too-corporate", label: "Too corporate" },
  { tag: "too-shilly", label: "Too shilly" },
  { tag: "too-long", label: "Too long" },
  { tag: "more-casual", label: "More casual" },
];

function urgencyLabel(opportunity: Opportunity) {
  if (opportunity.urgency === "hot") return "HOT";
  if (opportunity.urgency === "fresh") return "FRESH";
  return "WATCH";
}

function timeLabel(iso: string) {
  const date = new Date(iso);
  const minutes = Math.max(
    1,
    Math.round((Date.now() - date.getTime()) / (1000 * 60)),
  );

  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

export default function Home() {
  const [filter, setFilter] = useState<Filter>("all");
  const [queue, setQueue] = useState<Opportunity[]>(demoOpportunities);
  const [draftVariant, setDraftVariant] = useState<Record<string, number>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<StyleFeedback[]>([]);
  const [showTraining, setShowTraining] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("social-agent-feedback");
      if (saved) setFeedback(JSON.parse(saved));
    } catch {
      // Local storage is optional; the app still works without it.
    }
  }, []);

  const visible = useMemo(() => {
    const sorted = [...queue].sort((a, b) => b.score - a.score);
    if (filter === "all") return sorted;
    return sorted.filter((item) => item.kind === filter);
  }, [filter, queue]);

  const stats = useMemo(
    () => ({
      hot: queue.filter((item) => item.urgency === "hot").length,
      posts: queue.filter((item) => item.kind === "post").length,
      replies: queue.filter((item) => item.kind === "reply").length,
      follows: queue.filter((item) => item.kind === "follow").length,
    }),
    [queue],
  );

  function currentDraft(item: Opportunity) {
    const options = [item.draft, ...(item.variants ?? [])].filter(
      (value): value is string => Boolean(value),
    );
    if (!options.length) return "";
    const index = draftVariant[item.id] ?? 0;
    return options[index % options.length];
  }

  function rewrite(item: Opportunity) {
    const optionCount = [item.draft, ...(item.variants ?? [])].filter(Boolean)
      .length;
    if (optionCount <= 1) return;
    setDraftVariant((current) => ({
      ...current,
      [item.id]: ((current[item.id] ?? 0) + 1) % optionCount,
    }));
  }

  async function copyDraft(item: Opportunity) {
    const draft = currentDraft(item);
    if (!draft) return;
    await navigator.clipboard.writeText(draft);
    setCopiedId(item.id);
    window.setTimeout(() => setCopiedId(null), 1200);
  }

  function skip(id: string) {
    setQueue((current) => current.filter((item) => item.id !== id));
  }

  function saveFeedback(opportunityId: string, tag: FeedbackTag) {
    const entry: StyleFeedback = {
      opportunityId,
      tag,
      createdAt: new Date().toISOString(),
    };

    const next = [entry, ...feedback].slice(0, 100);
    setFeedback(next);
    try {
      window.localStorage.setItem("social-agent-feedback", JSON.stringify(next));
    } catch {
      // No-op when storage is unavailable.
    }
  }

  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand">
          <div className="brandMark">S</div>
          <div>
            <div className="brandName">Social Agent</div>
            <div className="brandSub">Solana signal desk</div>
          </div>
        </div>

        <div className="topActions">
          <span className="statusDot">
            <i />
            Demo radar
          </span>
          <button
            className="ghostButton"
            onClick={() => setShowTraining((value) => !value)}
          >
            Style memory · {feedback.length}
          </button>
        </div>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">TODAY&apos;S QUEUE</p>
          <h1>Find the signal.<br />Keep the human voice.</h1>
          <p className="heroText">
            Ranked Solana opportunities for posts, replies and people worth
            following. The agent does the research. You make the final click.
          </p>
        </div>

        <div className="stats">
          <div className="stat">
            <strong>{stats.hot}</strong>
            <span>hot now</span>
          </div>
          <div className="stat">
            <strong>{stats.posts}</strong>
            <span>post ideas</span>
          </div>
          <div className="stat">
            <strong>{stats.replies}</strong>
            <span>replies</span>
          </div>
          <div className="stat">
            <strong>{stats.follows}</strong>
            <span>follows</span>
          </div>
        </div>
      </section>

      {showTraining && (
        <section className="trainingPanel">
          <div>
            <p className="eyebrow">STYLE MEMORY</p>
            <h2>The agent learns from your clicks.</h2>
            <p>
              V1 keeps feedback locally in this browser. Once persistence is
              connected, this becomes part of the agent&apos;s long-term editorial
              memory.
            </p>
          </div>
          <div className="memorySummary">
            {feedback.length === 0 ? (
              <span>No feedback yet.</span>
            ) : (
              feedback.slice(0, 6).map((item, index) => (
                <span key={`${item.createdAt}-${index}`}>
                  {item.tag.replaceAll("-", " ")}
                </span>
              ))
            )}
          </div>
        </section>
      )}

      <nav className="filters" aria-label="Opportunity filters">
        {filters.map((item) => (
          <button
            key={item.key}
            className={filter === item.key ? "filter active" : "filter"}
            onClick={() => setFilter(item.key)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <section className="queue">
        {visible.length === 0 ? (
          <div className="emptyState">
            <strong>Queue cleared.</strong>
            <p>Nothing left in this view. Switch filters or refresh the radar.</p>
          </div>
        ) : (
          visible.map((item) => {
            const draft = currentDraft(item);
            return (
              <article className="card" key={item.id}>
                <div className="cardTop">
                  <div className="scoreWrap">
                    <span className={`urgency ${item.urgency}`}>
                      {urgencyLabel(item)}
                    </span>
                    <strong className="score">{item.score.toFixed(1)}</strong>
                  </div>
                  <span className="age">{timeLabel(item.observedAt)}</span>
                </div>

                <div className="cardHeader">
                  <div>
                    <span className="kind">{item.kind}</span>
                    <h2>{item.title}</h2>
                  </div>
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="sourceLink"
                  >
                    Open source ↗
                  </a>
                </div>

                {item.sourceText && (
                  <blockquote className="sourceText">{item.sourceText}</blockquote>
                )}

                {item.kind === "follow" ? (
                  <div className="followBlock">
                    <strong>{item.accountHandle}</strong>
                    <p>{item.accountReason}</p>
                  </div>
                ) : (
                  <div className="draftBlock">
                    <div className="draftLabel">Suggested {item.kind}</div>
                    <p>{draft}</p>
                  </div>
                )}

                <div className="reasonGrid">
                  <div>
                    <span>WHY IT MATTERS</span>
                    <p>{item.whyItMatters}</p>
                  </div>
                  <div>
                    <span>YOUR ANGLE</span>
                    <p>{item.angle}</p>
                  </div>
                </div>

                <div className="tags">
                  {item.tags.map((tag) => (
                    <span key={tag}>#{tag}</span>
                  ))}
                </div>

                <div className="actions">
                  {item.kind === "follow" ? (
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="primaryButton"
                    >
                      Open profile
                    </a>
                  ) : (
                    <>
                      <button
                        className="primaryButton"
                        onClick={() => copyDraft(item)}
                      >
                        {copiedId === item.id ? "Copied" : "Copy"}
                      </button>
                      <button
                        className="secondaryButton"
                        onClick={() => rewrite(item)}
                      >
                        Rewrite
                      </button>
                    </>
                  )}
                  <button className="skipButton" onClick={() => skip(item.id)}>
                    Skip
                  </button>
                </div>

                {item.kind !== "follow" && (
                  <div className="feedbackRow">
                    <span>Train voice:</span>
                    {feedbackLabels.map((feedbackItem) => (
                      <button
                        key={feedbackItem.tag}
                        onClick={() =>
                          saveFeedback(item.id, feedbackItem.tag)
                        }
                      >
                        {feedbackItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </article>
            );
          })
        )}
      </section>

      <footer>
        <span>V1 · manual X actions · no credentials required</span>
        <span>Research + Gemini + memory come next.</span>
      </footer>
    </main>
  );
}
