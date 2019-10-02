import React, { useState } from 'react'
import styled from 'styled-components'
import { CARDIFY } from './style/mixins';
import { Loader } from './Loader'
import { getClosestExp } from '../lib/api';

const StyledAccountForm = styled.div`
  ${CARDIFY}
`

const StyledInput = styled.input`
  border-radius: 5px;
  border: 1px solid #4be3f7;
  padding: 10px;
  width: 400px;
  font-size: large;
  background-color: white;
`

const Submit = styled.button.attrs({ type: 'submit' })`
  background-color: #162950;
  padding: 10px;
  color: #4be3f7;
  height: 40px;
  margin: 5px;
  border-radius: 5px;
  border: 2px solid #4be3f7;
`


export function AccountForm ({ callback }) {
  const [loading, setLoading] = useState(false)
  async function submitForm (event) {
    event.preventDefault()
    setLoading(true)
    const url = event.target.elements[0].value
    const legends = await getClosestExp(url)
    setLoading(false)
    callback(legends)
  }
  return (
    <StyledAccountForm>
      {loading && <Loader />}
      <form onSubmit={submitForm}>
        <StyledInput
          disabled={loading}
          size="20"
          type="text"
          placeholder="enter steam URL or character name"
          defaultValue=""/>
        <Submit 
          type="submit"
          disabled={loading}>Send
        </Submit>
      </form>
    </StyledAccountForm>  
  )
}