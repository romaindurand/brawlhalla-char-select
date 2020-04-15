import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { CARDIFY } from './style/mixins'
export function UserStats ({ user }) {
  if (!user) return null
  const totalLevels = user.legends.reduce((memo, legend) => memo + legend.level, 0)
  const matchTime = Math.round(
    user.legends.reduce((memo, legend) => memo + legend.matchtime, 0) / 3600)

  return <StyledUserStats>
    <div>Total levels : {totalLevels}</div>
    <div>Play time : {matchTime}h</div>
  </StyledUserStats>
}

UserStats.propTypes = {
  user: PropTypes.object,
}

const StyledUserStats = styled.div`
  ${CARDIFY}
`
