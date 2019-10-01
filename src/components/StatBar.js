import React from 'react'
import styled from 'styled-components'

const StyledStatBar = styled.div`
  display: inline-block;
  position: relative;
  height: 23px;
  width: 129px;
`

const StatBarBg = styled.img`
  position: absolute;
`
const StatIcon = styled.img`
  position: absolute;
  top: 1px;
  left: 1px;
`

const StatPoints = styled.div`
  position: absolute;
  top: 2px;
  left: 37px;
`

const StatPoint = styled.img.attrs(props => ({
  src: '/images/ui/statPoint.png'
}))`
  position: relative;
  display: inline-block;
`

export function StatBar ({stat, value}) {
  const points = new Array(+value - 1).fill(0).map(() => <StatPoint />)

  return (
    <StyledStatBar>
      <StatBarBg src="/images/ui/statBar.png" />
      <StatIcon src={`/images/ui/${stat}.png`}/>
      <StatPoints>{points}</StatPoints>
    </StyledStatBar>
  )
}