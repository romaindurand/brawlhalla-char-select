import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ky from 'ky'
import { Loader } from './Loader';
import { Legend } from './Legend';
import { CARDIFY } from './style/mixins';

const StyledAccountForm = styled.div`
  ${CARDIFY}
`
async function submitForm (event) {
  event.preventDefault()
  const url = event.target.elements[0].value
  const port = process.env.REACT_APP_API_PORT
  const legends = await ky.post(`http://localhost:${port}/closest-exp`, {
    json: {
      steamUrl: url
    }
  }).json()
  console.log({legends})
  debugger
}

export function AccountForm () {


  return (
    <StyledAccountForm>
      <form onSubmit={submitForm}>
        <input
          type="text"
          placeholder="enter steam URL or character name"
          value="https://steamcommunity.com/id/romaindurand/"
          style={{ width: 250 }}/>
        <button type="submit">Send</button>
      </form>
    </StyledAccountForm>  
  )
}