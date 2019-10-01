import React from 'react'
import styled from 'styled-components'
import { StatBar } from './StatBar'
import { CARDIFY } from './style/mixins'

const StyledLegend = styled.div`
  ${CARDIFY}
  color: #4be3f7;
  cursor: pointer;
  box-sizing: content-box;
  display: inline-block;

  &:hover {
    border: 1px solid #4be3f7;
  }
`
const LegendImage = styled.img`
  position: relative;
  display: block;
  left: 50%;
  transform: translateX(-50%);
`

const LegendName = styled.div`
  text-align: center;
  font-weight: bold;
`

const LegendBio = styled.div`
  text-align: center;
  color: #06BAD2;
  font-size: 11px;
  margin-bottom: 10px;
`

const ExpBox = styled.div`
  border-radius: 3px;
  border: 1px solid #4be3f7;
  height: 10px;
  background-color: darkgray;
`

const ExpBar = styled.div`
  background-color: #4be3f7;
  height: 10px;
`

const ExpContainer = styled.div`
  margin-top: 10px;
`


export function Legend ({legend}) {
  const legendImageName = legend.legend_name_key
    .split(' ')
    .map(namePart => namePart.replace(/^./, namePart[0].toUpperCase()))
    .join('') + '.png'
  const legendImagePath = `/images/legends/${legendImageName}`
  return (<StyledLegend>
    <LegendImage src={legendImagePath} alt={legend.bio_name} />
    <LegendName>{legend.bio_name}</LegendName>
    <LegendBio>{legend.bio_aka}</LegendBio>
    <div>
      <StatBar stat="str" value={legend.strength} />
      <StatBar stat="def" value={legend.defense} />
    </div>
    <div>
      <StatBar stat="dex" value={legend.dexterity} />
      <StatBar stat="spd" value={legend.speed} />
    </div>
    {legend.xp &&
      <ExpContainer>
        <div>Level {legend.level}</div>
        <div>Exp left: {Math.round(legend.xpToLvlUp)}</div>
        <ExpBox><ExpBar style={{width: `${legend.percent * 100}%`}}></ExpBar></ExpBox>
      </ExpContainer>
    }
    {/* <pre>{JSON.stringify(legend)}</pre> */}
  </StyledLegend>)
}