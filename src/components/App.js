import React, { useEffect, useState } from 'react';
import { AccountForm } from './AccountForm';
import { CharList } from './CharList';
import { Loader } from './Loader';
import './index.css'
import { getLegends } from '../lib/api';


function App() {
  const [legends, setLegends] = useState([]);
  function onAccountFound (accountLegends) {
    setLegends(legends.map(legend => {
      const accountLegend = accountLegends.find(accountLegend => accountLegend.name === legend.legend_name_key)
      accountLegend.name = undefined
      return { ...legend, ...accountLegend }
    }).sort((a, b) => a.xpToLvlUp - b.xpToLvlUp))
  }
  useEffect(() => {
    const fetchLegends = async () => {
      const legends = await getLegends()
      setLegends(legends)
    }
    fetchLegends()
  }, [legends.length])

  if (legends.length === 0) return (<>
    <Loader />
  </>)

  return (<>
    <AccountForm callback={onAccountFound} />
    <CharList legends={legends}/>
  </>)
}

export default App;
