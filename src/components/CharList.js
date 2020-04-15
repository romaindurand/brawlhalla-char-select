import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { Legend } from './Legend'

export function CharList ({ legends }) {
  if (!legends) return null
  return (
    <StyledCharList>
      {legends.map(legend => {
        return <Legend {...{ legend }} key={legend.legend_id}/>
      })

      }
    </StyledCharList>
  )
}

CharList.propTypes = {
  userLegends: PropTypes.any,
  legends: PropTypes.any,
}

const StyledCharList = styled.div`
  border-radius: 3px;
  border: 1px solid grey;
  padding: 10px;
  margin: 10px;
`
