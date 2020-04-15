import React, { useEffect, useState } from 'react'

import { ControlsPanel } from './ControlsPanel'
import { AccountForm } from './AccountForm'
import { UserStats } from './UserStats'
import { CharList } from './CharList'
import { Loader } from './Loader'

import './index.css'

import { getLegends } from '../lib/api'
import { UserContext } from '../context/UserContext'
import { LegendsContext } from '../context/LegendsContext'
import { ControlsContext } from '../context/ControlsContext'
import { sortFunctions, sortLegends } from '../lib/sortLegends'

function App () {
  const [legends, setLegends] = useState([])
  const [user, setUser] = useState(null)
  const [controls, setControls] = useState({
    sortFunction: sortFunctions[0],
  })

  function onUserFound (user) {
    setUser(user)
    const { sortFunction } = controls
    const sortedLegends = sortLegends({ legends, user, sortFunction })
    setLegends(sortedLegends)
  }

  useEffect(() => {
    const fetchLegends = async () => {
      try {
        const legends = await getLegends()
        setLegends(legends)
      } catch (ex) {
        alert('unable to fetch legends')
        console.error({
          message: ex.message,
          stack: ex.stack,
        })
      }
    }
    fetchLegends()
  }, [legends.length])

  if (legends.length === 0) {
    return (<>
      <Loader />
    </>)
  }

  return (<>
    <LegendsContext.Provider value={{ legends, setLegends }}>
      <UserContext.Provider value={{ user, setUser }}>
        <ControlsContext.Provider value={{ controls, setControls }}>
          <AccountForm {...{ onUserFound, user }}/>
          <UserStats {...{ user }}/>
          <ControlsPanel />
          <CharList {...{ legends }} />
        </ControlsContext.Provider>
      </UserContext.Provider>
    </LegendsContext.Provider>
  </>)
}

export default App
