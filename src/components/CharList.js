import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { Legend } from './Legend'

export function CharList ({ legends, accountLegends }) {
  if (!legends) return null
  return (
    <StyledCharList>
      {legends.map(staticLegend => {
        // debugger
        const accountLegend = accountLegends.find(accountLegend => accountLegend.name === staticLegend.legend_name_key)
        return <Legend
          legend={staticLegend}
          key={staticLegend.legend_id}
          accountLegend={accountLegend}
        />
      })

      }
    </StyledCharList>
  )
}

CharList.propTypes = {
  accountLegends: PropTypes.any,
  legends: PropTypes.any
}

const StyledCharList = styled.div`
  border-radius: 3px;
  border: 1px solid grey;
  padding: 10px;
  margin: 10px;
`
