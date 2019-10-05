import React, { useEffect, useState } from 'react';
import { AccountForm } from './AccountForm';
import { CharList } from './CharList';
import { Loader } from './Loader';
import './index.css'
import { getLegends } from '../lib/api';
import { ControlsPanel } from './Filters';
import getXpTarget from '../lib/exp'

function App() {
  const [legends, setLegends] = useState([]);
  function onAccountFound (accountLegends) {
    setLegends(legends.map(legend => {
      const accountLegend = accountLegends.find(accountLegend => accountLegend.name === legend.legend_name_key)
      if (!accountLegend) return {
        ...legend,
        level: 1,
        percent: 0,
        xp: 0,
        xpToLvlUp: getXpTarget(1)
      }
      accountLegend.name = undefined
      return { ...legend, ...accountLegend }
    }).sort((a, b) => a.xpToLvlUp - b.xpToLvlUp))
  }
  useEffect(() => {
    const fetchLegends = async () => {
      try {
        const legends = await getLegends()
        setLegends(legends)
      } catch (ex) {
        alert(ex)
      }
    }
    fetchLegends()
  }, [legends.length])

  if (legends.length === 0) return (<>
    <Loader />
  </>)

  const totalLvl = legends.reduce((memo, legend) => {
    return memo + (legend.level || 0)
  }, 0)

  return (<>
    <AccountForm callback={onAccountFound} totalLvl={totalLvl} />
    {/* <ControlsPanel /> */}
    <CharList legends={legends} />
  </>)
}

export default App;
