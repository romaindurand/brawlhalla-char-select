import React from 'react'
import styled from 'styled-components'
import { CARDIFY } from './style/mixins'

const sortOptions = [
  'Release date',
  'Name',
  'Closest to level up',
  'XP',
  'Win rate'
]

export function ControlsPanel () {
  return <StyledPanel>
    <div>
      <span>Sort by</span>
      <SortSelect>
        {sortOptions.map(sortOption => <option value={sortOption}>{sortOption}</option>)}
      </SortSelect>
    </div>
  </StyledPanel>
}

const StyledPanel = styled.div`
  ${CARDIFY};
  color: #4be3f7;
`

const SortSelect = styled.select`
  border-radius: 3px;
  padding: 5px;
  margin-left: 10px;
  font-size: larger;
  border: 1px solid #4be3f7;
`