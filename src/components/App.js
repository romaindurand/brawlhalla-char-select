import React, { useEffect, useState } from 'react';
import ky from 'ky'
import { AccountForm } from './AccountForm';
import { CharList } from './CharList';
import { Loader } from './Loader';
import './index.css'


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
      const port = process.env.REACT_APP_API_PORT
      const legends = await ky.get(`http://localhost:${port}/legends`).json()
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
