# Social Agent

A lightweight editorial copilot for growing a Solana-native X account without automating prohibited engagement.

## V1

The first version is intentionally credential-free. It includes:

- A ranked opportunity queue for posts, replies, and accounts worth following.
- Natural English drafts in the target voice: casual, curious, builder-native, never shilly.
- "Open on X", copy, rewrite, skip, and feedback actions.
- Local feedback memory so the interface already learns which suggestions feel like you.
- A provider boundary for plugging in live research, Gemini, PostgreSQL/Neon, and X links later.
- No automated likes, follows, unsolicited replies, or browser automation.

## Local development

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

No environment variables are required for the demo.

## Next integrations

1. Free/low-cost research sources for Solana signals.
2. Gemini generation/scoring.
3. Neon/PostgreSQL persistence.
4. Scheduled ingestion.
5. Optional official X API publishing later.

Credentials are intentionally deferred until the core product flow is validated.
