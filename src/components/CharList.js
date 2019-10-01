import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Loader } from './Loader';
import { Legend } from './Legend';

const StyledCharList = styled.div`
  border-radius: 3px;
  border: 1px solid grey;
  padding: 10px;
  margin: 10px;
`


export function CharList ({legends}) {
  if (!legends) return null
  return (
    <StyledCharList>
      {legends.map(legend =>
        <Legend legend={legend} />)
      }
    </StyledCharList>  
  )
}