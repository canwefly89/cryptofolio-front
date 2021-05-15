export const CHART_TYPE = {
  EXCHANGE: "EXCHANGE",
  CATEGORY: "CATEGORY",
  PORTFOLIO: "PORTFOLIO",
  MYPORTFOLIO: "MYPORTFOLIO",
};

export const VIEW_TYPE = {
  BASIC: "BASIC",
  SEPARATE: "SEPARATE",
};

export const CIRCLE_TYPE = {
  PRICE: "PRICE",
  MARKETCAP: "MARKETCAP",
  CATEGORY: "CATEGORY",
};

export const CHART_SIZE = {
  BUBBLE_WIDTH: 1600,
  BUBBLE_HEIGHT: 1100,
  PIE_WIDTH: 1200,
  PIE_HEIGHT: 1000,
};

export const COLORS = {
  MOUSEOVER_TARGET: "blue",
  SEARCH_TARGET: "red",
  UPBIT: "#0a3587",
  BINANCE: "#f6cc28",
  BOTH_EXCHANGE: "#ff6b6b",
};

export const PRICE_RANGE = {
  MAX: 70000,
  // MIN: 10000,
  MIN: 2e-7,
};

export const MARKETCAP_RANGE = {
  MIN: 10000000,
  MAX: 1200000000000,
  TEXT: 7500000000,
};

export const CATEGORY_RANGE = {
  MIN: 1,
  MAX: 10,
};

export const PORTFOLIO_RANGE = {
  MIN: 1,
  MAX: 5,
};

export const EXCHANGE_MARK = {
  UPBIT:
    "data:image/png;base64,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",
  BINANCE:
    "https://lh3.googleusercontent.com/proxy/ct9aScENFHSw8efPUrXVYdKFNyBy4mhQfXs1E9L-r_4w3SuhVcg5kEDEDjQSsMmHRFgToHI6HEyU-BCcWDdpgujko6G67prCrZD_j1yo0lWAt-uYu7kCGmG_r7O7JYJQPMeY9tRpFIQZD8MXw7M5IZcOOf0BvXs8rue6YkGakuoo7aULMNVVQHqBCirRxIJWx35sO_ZlVFqOKyLwmSHLkcoICnrVbvSaWh8iwobWfuTSwwP88h1pSM2IDxt0SLpzdu5YPET-0JqiEYgYsg1UQueJBtwQDJRQ3eShLGMXe5U",
};

export const COLOR_SET = [
  "schemeSet1",
  "schemeSet2",
  "schemeSet3",
  "schemeCategory10",
  "schemeAccent",
  "schemeDark2",
  "schemePastel1",
  "schemePastel2",
  "schemeTableau10",
  "schemePaired",
];

export const CATEGORIES = [
  "Tourism",
  "Retail",
  "Media",
  "Sharing Economy",
  "Entertainment",
  "Loyalty",
  "Marketing",
  "Content Creation",
  "Energy",
  "binance smart chain",
  "Yield farming",
  "Storage",
  "Analytics",
  "Video",
  "Logistics",
  "Fan token",
  "Filesharing",
  "Distributed Computing",
  "Winklevoss Capital",
  "Scaling",
  "DAO",
  "Framework Ventures",
  "Smart Contracts",
  "Asset management",
  "Cosmos Ecosystem",
  "Kinetic Capital",
  "Huobi Capital",
  "Masternodes",
  "IoT",
  "Decentralized exchange",
  "Cybersecurity",
  "Privacy",
  "Binance Launchpool",
  "Research",
  "ParaFi capital",
  "lending-borowing",
  "Yield Aggregator",
  "Paradigm XZY Screener",
  "Health",
  "DeFi",
  "Memes",
  "collectibles-nfts",
  "Centralized exchange",
  "Oracles",
  "Derivatives",
  "Synthetics",
  "Gaming",
  "Polkadot Ecosystem",
  "Binance Launchpad",
  "Yearn Partnerships",
  "ai-big-data",
  "Hospitality",
  "Identity",
  "Insurance",
  "Interoperability",
  "Music",
  "AMM",
  "DeFiance Capital",
  "DAO Maker",
  "Avalanche Ecosystem",
  "Wrapped Tokens",
  "Metaverse",
  "Sports",
  "Gambling",
  "Stablecoin",
  "Solana Ecosystem",
  "platform",
  "pow",
  "mineable",
  "services",
  "payments",
];

export const PORTFOLIOS = [
  "DragonFly Capital Portfolio",
  "Fenbushi Capital Portfolio",
  "1Confirmation Portfolio",
  "Galaxy Digital Portfolio",
  "Blockchain Capital Portfolio",
  "Fabric Ventures Portfolio",
  "LedgerPrime Portfolio",
  "BoostVC Portfolio",
  "USV Portfolio",
  "DCG Portfolio",
  "Polychain Capital Portfolio",
  "Pantera Capital Portfolio",
  "Alameda Research Portfolio",
  "Binance Labs Portfolio",
  "Hashkey Capital Portfolio",
  "Multicoin Capital Portfolio",
  "Placeholder Ventures Portfolio",
  "Three Arrows Capital Portfolio",
  "CMS Holdings Portfolio",
  "A16Z Portfolio",
  "electric-capital-portfolio",
  "Exnetwork Capital Portfolio",
  "Coinbase Ventures Portfolio",
  "Coinfund Portfolio",
];
