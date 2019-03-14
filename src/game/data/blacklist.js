const blacklistStr = `con connard connar conard conar débile débil
debile debil stupide stupid merde pute conne conn
connasse connase conasse conase pd pétasse petasse pétase petase
fuck enculer enculé encule salope salop sale-chien sale-merde
nique-ta-mère nique-ta-mere nique-ta-race nique-ta-soeur nique-ton-frère
nique-ton-frere nique-ton-père nique-ton-pere nigga nigger`;

export const blacklist = blacklistStr.split(/\s/).map(word => word.replace(/-/g, ' '));

export const replacing = [
  'gentil',
  'meilleur',
  'beau',
  'mâlin',
  'mignon',
  'magnifique',
  'super',
  'génie',
  'dieu',
  'pote',
  'ami',
  'sympas',
  'cool',
  'chanceux',
];

const dragonBlacklistStr = `dragons-sont-nul dragon-sont-nul dragon-est-nul
dragons-son-nul dragon-son-nul dragons-est-nul dragon-es-nul dragons-es-nul
dergs-sont-nul derg-sont-nul derg-est-nul
dergs-son-nul derg-son-nul dergs-est-nul derg-es-nul dergs-es-nul
dragons-sont-moche dragon-sont-moche dragon-est-moche
dragons-son-moche dragon-son-moche dragons-est-moche dragon-es-moche dragons-es-moche
dergs-sont-moche derg-sont-moche derg-est-moche
dergs-son-moche derg-son-moche dergs-est-moche derg-es-moche dergs-es-moche`;

export const dragonBlacklist = dragonBlacklistStr.split(/\s/).map(word => word.replace(/-/g, ' '));

export const dragonReplacing = [
  'magnifique',
  'majestueux',
  'beau',
  'adorable',
];
