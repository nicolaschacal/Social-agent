"use client";

import { useEffect, useMemo, useState } from "react";
import { demoOpportunities } from "@/lib/demo-data";
import type { FeedbackTag, Opportunity, StyleFeedback } from "@/lib/types";

const feedbackLabels: { tag: FeedbackTag; label: string }[] = [
  { tag: "sounds-like-me", label: "Sounds like me" },
  { tag: "too-corporate", label: "Too corporate" },
  { tag: "too-shilly", label: "Too shilly" },
  { tag: "too-long", label: "Too long" },
  { tag: "more-casual", label: "More casual" },
];

function urgencyLabel(item: Opportunity) {
  if (item.urgency === "hot") return "Do this now";
  if (item.urgency === "fresh") return "Fresh";
  return "Worth watching";
}

function actionLabel(item: Opportunity) {
  if (item.kind === "reply") return "Reply";
  if (item.kind === "follow") return "Follow";
  return "Post";
}

export default function Home() {
  const initialQueue = useMemo(
    () => [...demoOpportunities].sort((a, b) => b.score - a.score),
    [],
  );

  const [queue, setQueue] = useState<Opportunity[]>(initialQueue);
  const [completed, setCompleted] = useState(0);
  const [draftVariant, setDraftVariant] = useState<Record<string, number>>({});
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<StyleFeedback[]>([]);
  const [showDetails, setShowDetails] = useState(false);
  const [showTraining, setShowTraining] = useState(false);
  const [lastAction, setLastAction] = useState<{
    item: Opportunity;
    result: "done" | "skipped";
  } | null>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("social-agent-feedback");
      if (saved) setFeedback(JSON.parse(saved));
    } catch {}
  }, []);

  const current = queue[0];
  const total = initialQueue.length;
  const progress = total ? Math.round((completed / total) * 100) : 100;

  function currentDraft(item: Opportunity) {
    const options = [item.draft, ...(item.variants ?? [])].filter(
      (value): value is string => Boolean(value),
    );
    if (!options.length) return "";
    return options[(draftVariant[item.id] ?? 0) % options.length];
  }

  function rewrite(item: Opportunity) {
    const options = [item.draft, ...(item.variants ?? [])].filter(Boolean);
    if (options.length <= 1) return;

    setDraftVariant((state) => ({
      ...state,
      [item.id]: ((state[item.id] ?? 0) + 1) % options.length,
    }));
    setCopied(false);
  }

  async function copyDraft(item: Opportunity) {
    const text = currentDraft(item);
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
  }

  function advance(result: "done" | "skipped") {
    if (!current) return;
    setLastAction({ item: current, result });
    setQueue((items) => items.slice(1));
    setCompleted((value) => value + 1);
    setCopied(false);
    setShowDetails(false);
    setShowTraining(false);
  }

  function undo() {
    if (!lastAction) return;
    setQueue((items) => [lastAction.item, ...items]);
    setCompleted((value) => Math.max(0, value - 1));
    setLastAction(null);
  }

  function saveFeedback(tag: FeedbackTag) {
    if (!current) return;
    const entry: StyleFeedback = {
      opportunityId: current.id,
      tag,
      createdAt: new Date().toISOString(),
    };
    const next = [entry, ...feedback].slice(0, 100);
    setFeedback(next);

    try {
      window.localStorage.setItem("social-agent-feedback", JSON.stringify(next));
    } catch {}
  }

  if (!current) {
    return (
      <main className="agentShell">
        <header className="agentHeader">
          <div className="brand">
            <div className="brandMark">S</div>
            <div>
              <div className="brandName">Social Agent</div>
              <div className="brandSub">Solana growth copilot</div>
            </div>
          </div>
          <span className="liveBadge"><i /> session complete</span>
        </header>

        <section className="completeScreen">
          <div className="completeOrb">✓</div>
          <p className="eyebrow">QUEUE CLEARED</p>
          <h1>You&apos;re done for now.</h1>
          <p>
            The agent has no more actions in this session. When live research is
            connected, new opportunities will appear here automatically.
          </p>
          <div className="completeStats">
            <strong>{completed}</strong>
            <span>actions reviewed</span>
          </div>
          <button className="secondaryButton" onClick={undo} disabled={!lastAction}>
            Undo last action
          </button>
        </section>
      </main>
    );
  }

  const draft = currentDraft(current);
  const exactXPostUrl =
    current.xPostUrl && /^https:\/\/(www\.)?x\.com\/[^/]+\/status\/\d+/.test(current.xPostUrl)
      ? current.xPostUrl
      : null;
  const primaryExternalUrl =
    current.kind === "follow"
      ? current.profileUrl ?? current.sourceUrl
      : exactXPostUrl ?? current.sourceUrl;
  const externalLabel =
    current.kind === "follow"
      ? "Open profile ↗"
      : exactXPostUrl
        ? "Open on X ↗"
        : "Open source ↗";

  return (
    <main className="agentShell">
      <header className="agentHeader">
        <div className="brand">
          <div className="brandMark">S</div>
          <div>
            <div className="brandName">Social Agent</div>
            <div className="brandSub">Solana growth copilot</div>
          </div>
        </div>

        <div className="agentStatus">
          <span className="liveBadge"><i /> agent online</span>
          <span className="counter">{completed + 1}/{total}</span>
        </div>
      </header>

      <div className="progressTrack" aria-label="Session progress">
        <div style={{ width: `${progress}%` }} />
      </div>

      <section className="agentStage">
        <div className="agentThinking">
          <span className="pulseOrb">S</span>
          <div>
            <span className="thinkingLabel">NEXT BEST ACTION</span>
            <p>
              I found something worth your attention. This is the highest-scored
              item in your queue right now.
            </p>
          </div>
        </div>

        <article className="actionCard">
          <div className="actionMeta">
            <span className={`actionType ${current.kind}`}>
              {actionLabel(current)}
            </span>
            <span className={`urgency ${current.urgency}`}>
              {urgencyLabel(current)}
            </span>
            <span className="score">{current.score.toFixed(1)}/10</span>
          </div>

          <h1>{current.title}</h1>

          {current.sourceText && (
            <blockquote className="sourceText">{current.sourceText}</blockquote>
          )}

          {current.kind === "follow" ? (
            <div className="followBlock">
              <span className="draftLabel">ACCOUNT TO CHECK</span>
              <strong>{current.accountHandle}</strong>
              <p>{current.accountReason}</p>
            </div>
          ) : (
            <div className="draftBlock">
              <div className="draftHeader">
                <span className="draftLabel">I&apos;D SAY THIS</span>
                <button className="tinyButton" onClick={() => rewrite(current)}>
                  Rewrite
                </button>
              </div>
              <p>{draft}</p>
            </div>
          )}

          <div className="primaryActions">
            {current.kind === "follow" ? (
              <a
                href={primaryExternalUrl}
                target="_blank"
                rel="noreferrer"
                className="primaryButton"
              >
                {externalLabel}
              </a>
            ) : (
              <>
                <button className="primaryButton" onClick={() => copyDraft(current)}>
                  {copied ? "Copied ✓" : "Copy text"}
                </button>
                <a
                  href={primaryExternalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="secondaryButton"
                >
                  {externalLabel}
                </a>
              </>
            )}

            <button className="doneButton" onClick={() => advance("done")}>
              Done · next →
            </button>
          </div>

          <div className="decisionRow">
            <button className="skipButton" onClick={() => advance("skipped")}>
              Skip
            </button>
            <button
              className="detailButton"
              onClick={() => setShowDetails((value) => !value)}
            >
              {showDetails ? "Hide reasoning" : "Why this?"}
            </button>
            <button
              className="detailButton"
              onClick={() => setShowTraining((value) => !value)}
            >
              Train voice
            </button>
          </div>

          {showDetails && (
            <div className="reasonPanel">
              <div>
                <span>WHY I PICKED IT</span>
                <p>{current.whyItMatters}</p>
              </div>
              <div>
                <span>ANGLE</span>
                <p>{current.angle}</p>
              </div>
              <div className="tagLine">
                {current.tags.map((tag) => (
                  <span key={tag}>#{tag}</span>
                ))}
              </div>
            </div>
          )}

          {showTraining && current.kind !== "follow" && (
            <div className="trainingPanel">
              <span>How does this sound?</span>
              <div>
                {feedbackLabels.map((item) => (
                  <button key={item.tag} onClick={() => saveFeedback(item.tag)}>
                    {item.label}
                  </button>
                ))}
              </div>
              <small>{feedback.length} style signals saved on this device.</small>
            </div>
          )}
        </article>

        <div className="sessionFooter">
          <span>{queue.length - 1} actions waiting after this one</span>
          {lastAction && (
            <button onClick={undo}>
              Undo {lastAction.result === "done" ? "done" : "skip"}
            </button>
          )}
        </div>
      </section>
    </main>
  );
}
