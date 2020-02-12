import PropTypes from 'prop-types'
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

export function ControlsPanel ({ callback }) {
  function handleSortChange (event) {
    const sortValue = event.target.value
    const sortIndex = sortOptions.findIndex(sortOption => sortOption === sortValue)
    const needsAccount = sortIndex >= 2
    callback(null, { needsAccount, sortValue })
  }
  return <StyledPanel>
    <div>
      <span>Sort by</span>
      <SortSelect onChange={handleSortChange}>
        {sortOptions.map(sortOption => (
          <option
            value={sortOption}
            key={sortOption}
          >
            {sortOption}
          </option>
        ))}
      </SortSelect>
    </div>
  </StyledPanel>
}

ControlsPanel.propTypes = {
  callback: PropTypes.any
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
