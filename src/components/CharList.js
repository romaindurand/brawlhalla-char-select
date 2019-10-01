import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ky from 'ky'
import { Loader } from './Loader';
import { Legend } from './Legend';

const StyledCharList = styled.div`
  border-radius: 3px;
  border: 1px solid grey;
  padding: 10px;
  margin: 10px;
`


export function CharList () {
  const [legends, setLegends] = useState([]);
  useEffect(() => {
    const fetchLegends = async () => {
      const port = process.env.REACT_APP_API_PORT
      const legends = await ky.get(`http://localhost:${port}/legends`).json()
      setLegends(legends)
    }
    fetchLegends()
  }, [legends.length])

  if (legends.length === 0) return <Loader />

  return (
    <StyledCharList>
      {legends.map(legend =>
        <Legend legend={legend} />)
      }
    </StyledCharList>  
  )
}