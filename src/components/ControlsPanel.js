import React, { useContext } from 'react'
import styled from 'styled-components'
import { CARDIFY, COLORS } from './style/mixins'
import { UserContext } from '../context/UserContext'
import { LegendsContext } from '../context/LegendsContext'
import { ControlsContext } from '../context/ControlsContext'
import { findFunctionByLabel, sortLabels, sortLegends } from '../lib/sortLegends'

export function ControlsPanel () {
  const { user } = useContext(UserContext)
  const { legends, setLegends } = useContext(LegendsContext)
  const { controls, setControls } = useContext(ControlsContext)
  console.log({ user })
  const filteredSortOptions = sortLabels
    .filter((_, index) => {
      if (user) return true
      return index < 2
    })
    .map(sortOption => (
      <option value={sortOption} key={sortOption}>
        {sortOption}
      </option>
    ))
  function handleSortChange (event) {
    const sortValue = event.target.value
    const sortFunction = findFunctionByLabel(sortValue)
    setControls({ ...controls, sortValue, sortFunction })
    const sortedLegends = sortLegends({ legends, user, sortFunction })
    setLegends(sortedLegends)
  }
  return <StyledPanel>
    <div>
      <span>Sort by</span>
      <SortSelect onChange={handleSortChange}>
        { filteredSortOptions }
      </SortSelect>
    </div>
  </StyledPanel>
}

const StyledPanel = styled.div`
  ${CARDIFY};
  color: ${COLORS.BH_BLUE};
`

const SortSelect = styled.select`
  border-radius: 3px;
  padding: 5px;
  margin-left: 10px;
  font-size: larger;
  border: 1px solid ${COLORS.BH_BLUE};
`
