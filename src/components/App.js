import React, { useEffect, useState } from 'react'
import { AccountForm } from './AccountForm'
import { CharList } from './CharList'
import { Loader } from './Loader'
import './index.css'
import { getLegends } from '../lib/api'
import { ControlsPanel } from './ControlsPanel'
import getXpTarget from '../lib/exp'

function App () {
  const [legends, setLegends] = useState([])
  const [stats, setStats] = useState({ legends: [] })

  function onAccountFound (stats) {
    setStats(stats)
    const legendsWithAccountData = mergeLegendsWithAccountData(legends, stats.legends)
    setLegends(legendsWithAccountData)
  }

  function onControlsChanged (controls) {
    console.log({ controls })
  }
  useEffect(() => {
    const fetchLegends = async () => {
      try {
        const legends = await getLegends()
        setLegends(legends)
      } catch (ex) {
        alert('unable to fetch legends')
      }
    }
    fetchLegends()
  }, [legends.length])

  if (legends.length === 0) {
    return (<>
      <Loader />
    </>)
  }

  const totalLvl = legends.reduce((memo, legend) => {
    return memo + (legend.level || 0)
  }, 0)

  return (<>
    <AccountForm
      callback={onAccountFound}
      totalLvl={totalLvl}
    />
    <ControlsPanel
      callback={onControlsChanged}
    />
    <CharList legends={legends} accountLegends={stats.legends} />
  </>)
}

export default App

function mergeLegendsWithAccountData (staticLegends, accountLegends) {
  return staticLegends.map(staticLegend => {
    const accountLegend = accountLegends.find(accountLegend => accountLegend.name === staticLegend.legend_name_key)
    if (!accountLegend) {
      return {
        ...staticLegend,
        level: 1,
        percent: 0,
        xp: 0,
        xpToLvlUp: getXpTarget(1)
      }
    }
    accountLegend.name = undefined
    return { ...staticLegend, ...accountLegend }
  }).sort((a, b) => a.xpToLvlUp - b.xpToLvlUp)
}
