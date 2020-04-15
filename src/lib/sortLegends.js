const sortOptions = [
  {
    name: 'Release date',
    sortFn: (a, b) => a.legend_id - b.legend_id,
  }, {
    name: 'Name',
    sortFn: (a, b) => a.bio_name > b.bio_name ? 1 : -1,
  }, {
    name: 'Closest to level up',
    sortFn: (a, b) => {
      if (isOneLegendNonOwned(a, b)) return ownedLegendFirst(a, b)
      return (a.xpToLvlUp || Infinity) - (b.xpToLvlUp || Infinity)
    },
  }, {
    name: 'Current XP',
    sortFn: (a, b) => {
      if (isOneLegendNonOwned(a, b)) return ownedLegendFirst(a, b)
      return (b.currentXp || 0) - (a.currentXp || 0)
    },
  }, {
    name: 'Total XP',
    sortFn: (a, b) => {
      if (isOneLegendNonOwned(a, b)) return ownedLegendFirst(a, b)
      return (b.totalXp || 0) - (a.totalXp || 0)
    },
  }, {
    name: 'Win rate',
    sortFn: (a, b) => {
      if (isOneLegendNonOwned(a, b)) return ownedLegendFirst(a, b)
      return (b.winRate || 0) - (a.winRate || 0)
    },
  },
]

export function sortLegends ({ legends, user, sortFunction }) {
  let legendsToSort = legends
  if (user) {
    const userLegends = user.legends
    legendsToSort = getMergedLegends(legends, userLegends)
  }
  return [...legendsToSort].sort(sortFunction)
}

function ownedLegendFirst (a, b) {
  if (a.owned) return -1
  return 1
}
function isOneLegendNonOwned (a, b) {
  return (!a.owned || !b.owned) && (a.owned || b.owned)
}
export const sortLabels = sortOptions.map(sortFn => sortFn.name)
export const sortFunctions = sortOptions.map(sortFn => sortFn.sortFn)
export function findFunctionByLabel (label) {
  return sortFunctions[sortLabels.findIndex(sortLabel => sortLabel === label)]
}
export function getMergedLegends (legends, userLegends) {
  return legends.map(legend => {
    const userLegend = findMatchingUserLegend(legend, userLegends)
    return { ...legend, ...userLegend }
  })
}
export function findMatchingUserLegend (legend, userLegends) {
  const userLegend = userLegends.find(userLegend => userLegend.name === legend.legend_name_key)
  if (userLegend) return { ...userLegend, owned: true }
  return { owned: false }
}
