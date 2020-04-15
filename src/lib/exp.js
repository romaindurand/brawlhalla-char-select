const levelTargets = [
  0, 210, 368, 455, 542, 628, 737, 867, 997, 1127,
  1278, 1430, 1582, 1733, 1907, 2080, 2253, 2427, 2622, 2817,
  3012, 3207, 3402, 3618, 3813, 4030, 4247, 4463, 4680, 4918,
  5135, 5373, 5612, 5850, 6088, 6372, 6565, 6803, 7063, 7302,
  7562, 7800, 8060, 8320, 8580, 8840, 9122, 9382, 9642, 9923,
  10183, 10465, 10747, 11007, 11288, 11570, 11852, 12113, 12415, 12718,
  13000, 13282, 13585, 13867, 14170, 14473, 14755, 15058, 15362, 15665,
  15968, 16272, 16575, 16878, 17182, 17507, 17810, 18113, 18438, 18742,
  19067, 19370, 19695, 20020, 20323, 20648, 20973, 21298, 21623, 21948,
  22273,
  22610, // 91
  22941, // 92
  23272, // 93
  23603, // 94
  23934, // 95
  24267, 24592, 24917, 25263,
]
const xpToLvl100 = levelTargets.reduce((sum, xpTarget) => sum + xpTarget, 0)

// xp formula above lvl 99 is ax²+bx+c
const a = 1.04
const b = 159
const c = -671

function getLevelUpXpTargetAboveLimit (level) {
  const ax2 = (a * (Math.pow(level, 2)))
  const bx = (b * level)
  return Math.round(ax2 + bx + c)
}

function getLevelUpXpTarget (level) {
  if (level < 100) return levelTargets[level]
  return getLevelUpXpTargetAboveLimit(level)
}

function computeRemainingXp (legend) {
  let percent = legend.xp_percentage
  let level = legend.level
  const xpTarget = getLevelUpXpTarget(level)

  if (legend.level === 100) {
    let remainingXp = legend.xp - xpToLvl100
    let charLevel
    for (charLevel = 100; remainingXp > getLevelUpXpTarget(charLevel); charLevel++) {
      const targetXp = getLevelUpXpTarget(charLevel)
      remainingXp -= targetXp
    }
    level = charLevel
    percent = Math.abs(remainingXp) / getLevelUpXpTarget(level)
  }

  const currentXp = Math.round(xpTarget * percent)
  const totalXp = legend.xp
  const winRate = legend.wins / legend.games
  // console.log(legend)

  return {
    name: legend.legend_name_key,
    level,
    percent,
    currentXp,
    xpToLvlUp: xpTarget - currentXp,
    totalXp,
    winRate,
    matchtime: legend.matchtime,
  }
}

module.exports = {
  computeRemainingXp,
}
