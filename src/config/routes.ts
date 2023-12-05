const routes = {
  home: '/',
  explorerBlocks: '/explorer/blocks',
  explorerTx: '/explorer/tx',
  blockDetail: (blockId) => `/explorer/blocks/${blockId}`,
  transactionDetail: (txId) => `/explorer/tx/${txId}`,
  minimal: '/minimal',
  livePricing: '/live-pricing',
  retro: '/retro',
  swap: '/swap',
  liquidity: '/liquidity',
  liquidityPosition: '/liquidity-position',
  farms: '/farms',
  createNft: '/create-nft',
  nftDetails: '/nft-details',
  search: '/search',
  notification: '/notifications',
  vote: '/vote',
  proposals: '/proposals',
  createProposal: '/proposals/create',
  charts: '/charts',
  profile: '/profile',
  portfolio: '/profile?view=portfolio',
  history: '/profile?view=history',
  classic: '/classic',
  coinDetails: '/coin-details',
  signIn: '/authentication',
  signUp: '/authentication/sign-up',
  resetPin: '/authentication/reset-pin',
  forgetPassword: '/authentication/forget-password',
  tradingBot: '/trading-bot',
  tradingBotSpotGrid: '/spot-grid-bot',
  tradingBotFuturesGrid: '/futures-grid-bot',
  tradingBotMartingale: '/martingale-bot',
  tradingBotInfinityGrid: '/infinity-grid-bot',
  pages: '/pages',
};

export default routes;
