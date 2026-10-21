import type { Opportunity } from "./types";

export const demoOpportunities: Opportunity[] = [
  {
    id: "samsung-usdc",
    kind: "post",
    score: 9.4,
    urgency: "hot",
    title: "Samsung + USDC distribution",
    sourceName: "Solana ecosystem signal",
    sourceUrl: "https://solana.com/news",
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
    id: "stablecoin-reply",
    kind: "reply",
    score: 9.1,
    urgency: "hot",
    title: "Solana stablecoin supply hit a new ATH",
    sourceName: "@solana",
    sourceUrl: "https://x.com/solana/status/2103484678590353515",
    xPostUrl: "https://x.com/solana/status/2103484678590353515",
    sourceText:
      "Stablecoin supply on Solana hits a new all-time high of $17.3B.",
    whyItMatters:
      "The original post already has the audience. A useful reply can move the conversation from the headline number to what that capital can actually do onchain.",
    angle:
      "The interesting question is not just how much stablecoin supply exists, but which apps capture the next dollar once it arrives.",
    draft:
      "the number is big but I think the more interesting question is where the next dollar goes after it lands on Solana\n\npayments, lending, trading, consumer apps... that's the part I'm watching",
    variants: [
      "17.3B sitting on Solana is one thing\n\nwhat I'm more interested in is which products become the default place that money gets spent, invested or moved",
      "stablecoin supply keeps climbing and I still think people are underestimating the second-order effect\n\nmore dollars onchain means more competition for where those dollars actually go",
    ],
    tags: ["reply", "stablecoins", "capital"],
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
    title: "High-signal payments account",
    sourceName: "@solanapayments",
    sourceUrl: "https://x.com/solanapayments",
    profileUrl: "https://x.com/solanapayments",
    whyItMatters:
      "Following high-signal ecosystem accounts improves the future research graph and exposes payment launches before they become broad Solana news.",
    angle:
      "This account consistently surfaces payment integrations, stablecoin rails and real-world adoption signals.",
    accountHandle: "@solanapayments",
    accountReason:
      "Focused on payment infrastructure, stablecoins and real-world Solana adoption.",
    tags: ["payments", "stablecoins"],
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
