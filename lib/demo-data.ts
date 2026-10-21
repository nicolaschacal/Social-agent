import type { Opportunity } from "./types";

export const demoOpportunities: Opportunity[] = [
  {
    id: "samsung-usdc",
    kind: "post",
    score: 9.4,
    urgency: "hot",
    title: "Samsung + USDC distribution",
    sourceName: "Solana ecosystem signal",
    sourceUrl: "https://x.com/search?q=Samsung%20Solana%20USDC",
    whyItMatters:
      "Consumer distribution matters more than the headline. If normal users can hold and move dollars without thinking about crypto, the interesting question becomes where that money goes next.",
    angle:
      "Ignore the 'Samsung bullish on SOL' framing. Think about apps that capture spending, saving, lending and trading once dollars are already onchain.",
    draft:
      "still thinking about the Samsung thing\n\n80M devices is obviously a huge number but I think the interesting part isn't distribution\n\nit's what happens after normal users have actual dollars sitting on Solana\n\nsomeone needs to build the places where that money goes",
    variants: [
      "the Samsung integration is interesting but I'm way more curious about what happens after the USDC lands\n\nonce normal users have dollars sitting on Solana, every consumer app is suddenly competing for that money",
      "maybe I'm overthinking this but Samsung + USDC feels less like a crypto story and more like a distribution story\n\nif the wallet disappears into the UX, users don't need to decide to 'use Solana' at all",
    ],
    tags: ["payments", "stablecoins", "consumer"],
    observedAt: "2026-10-21T08:10:00Z",
  },
  {
    id: "founder-reply",
    kind: "reply",
    score: 9.1,
    urgency: "hot",
    title: "Good early reply surface",
    sourceName: "@examplefounder",
    sourceUrl: "https://x.com/",
    sourceText:
      "Stablecoins are becoming the default settlement layer for internet businesses.",
    whyItMatters:
      "The original post already has the audience. A thoughtful early reply can create profile discovery without manufacturing a separate post.",
    angle:
      "Push the idea one step further: users may never know which chain settles the payment, so infrastructure wins by becoming invisible.",
    draft:
      "this is the part I keep coming back to\n\nif this actually works, the end user probably won't know or care what chain settled anything\n\nthe winning infrastructure becomes invisible",
    variants: [
      "I think the weird end state is that 'using crypto' disappears as a concept\n\npeople just move dollars and the chain becomes plumbing",
      "exactly. the UX gets interesting when nobody has to make a conscious decision to go onchain",
    ],
    tags: ["reply", "stablecoins", "payments"],
    observedAt: "2026-10-21T08:18:00Z",
  },
  {
    id: "volume-watch",
    kind: "post",
    score: 8.6,
    urgency: "fresh",
    title: "Protocol volume is moving",
    sourceName: "Onchain metric",
    sourceUrl: "https://defillama.com/chain/Solana",
    whyItMatters:
      "A sharp change in usage can be more interesting than a token move, especially when the reason is not yet obvious.",
    angle:
      "Do not call it bullish yet. Publicly note that the number looks weird, say you are digging, and come back only if you find a real driver.",
    draft:
      "seeing a weird amount of volume moving through a few Solana apps today\n\nnot sure what's driving it yet so I'm not going to pretend I have a thesis\n\nbut definitely going down the rabbit hole",
    variants: [
      "one of those days where the numbers look more interesting than the timeline\n\ntrying to figure out what's actually driving the Solana volume before having an opinion",
    ],
    tags: ["defi", "volume", "research"],
    observedAt: "2026-10-21T07:52:00Z",
  },
  {
    id: "follow-builder",
    kind: "follow",
    score: 8.2,
    urgency: "fresh",
    title: "Potential high-signal builder",
    sourceName: "@newsolanabuilder",
    sourceUrl: "https://x.com/",
    whyItMatters:
      "Following high-signal builders improves the future research graph and exposes launches before they become broad ecosystem news.",
    angle:
      "This account repeatedly posts product details rather than token promotion.",
    accountHandle: "@newsolanabuilder",
    accountReason: "Building a consumer Solana app and posting frequent product updates.",
    tags: ["builder", "consumer"],
    observedAt: "2026-10-21T07:40:00Z",
  },
  {
    id: "build-in-public",
    kind: "post",
    score: 7.9,
    urgency: "watch",
    title: "Turn today's build into an ecosystem observation",
    sourceName: "Your own build",
    sourceUrl: "https://github.com/nicolaschacal",
    whyItMatters:
      "Build-in-public works better when the implementation detail becomes evidence for a broader observation other builders or users care about.",
    angle:
      "Lead with the problem you discovered, not the feature you shipped.",
    draft:
      "spent way too much time today thinking about Solana payment UX\n\nI keep coming back to the same thing: users shouldn't need SOL just to pay someone\n\nif we want normal people here, the chain has to disappear from the experience",
    variants: [
      "building payment stuff on Solana keeps making one thing painfully obvious\n\nnormal users should never need to understand gas\n\nthey just want to pay",
    ],
    tags: ["build-in-public", "payments"],
    observedAt: "2026-10-20T23:30:00Z",
  },
];
