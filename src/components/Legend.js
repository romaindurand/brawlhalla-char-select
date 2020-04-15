import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { StatBar } from './StatBar'
import { CARDIFY, COLORS } from './style/mixins'

export function Legend ({ legend }) {
  if (!legend) return null
  const legendImageName = legend.legend_name_key
    .split(' ')
    .map(namePart => namePart.replace(/^./, namePart[0].toUpperCase()))
    .join('') + '.png'
  const legendImagePath = `/images/legends/${legendImageName}`
  return (<StyledLegend {...{ legend }}>
    <LegendImage
      src={legendImagePath}
      alt={legend.bio_name}
      onError={handleImgFallback}
    />
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
    {legend.owned &&
      <ExpContainer>
        <div>Level {legend.level}</div>
        <div>Win rate: {Math.round(legend.winRate * 10000) / 100}%</div>
        <ExpBox>
          <ExpBar style={{ width: `${legend.percent * 100}%` }}></ExpBar>
          <ExpLabel>{legend.currentXp} / {legend.xpToLvlUp + legend.currentXp}</ExpLabel>
        </ExpBox>
      </ExpContainer>
    }
    {/* <pre>{JSON.stringify(legend)}</pre> */}
  </StyledLegend>)
}

function handleImgFallback (error) {
  if (error.target.src === '/images/legends/default.png') return
  error.target.src = '/images/legends/default.png'
}

Legend.propTypes = {
  legend: PropTypes.any,
}

const StyledLegend = styled.div`
  filter: grayscale(${({ legend }) => legend.owned === false ? 1 : 0});
  ${CARDIFY}
  background-color: ${COLORS.LEGEND_BG};
  color: ${COLORS.BH_BLUE};
  cursor: pointer;
  box-sizing: content-box;
  display: inline-block;

  &:hover {
    border: 1px solid ${COLORS.BH_BLUE};
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
  margin-top: 5px;
  position: relative;
  border-radius: 3px;
  border: 1px solid ${COLORS.BH_BLUE};
  height: 10px;
  background-color: darkgray;
`

const ExpBar = styled.div`
  background-color: ${COLORS.BH_BLUE};
  height: 10px;
`

const ExpLabel = styled.span`
  position: absolute;
  font-size: 10px;
  text-align: center;
  font-weight: bold;
  left: 50%;
  color: ${COLORS.LEGEND_BG};
  transform: translate(-50%, -100%);
`

const ExpContainer = styled.div`
  margin-top: 10px;
  font-size: 12px;
`
