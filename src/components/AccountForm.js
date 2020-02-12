import React, { useState } from 'react'
import styled from 'styled-components'
import { CARDIFY } from './style/mixins';
import { Loader } from './Loader'
import { findAccount } from '../lib/api';

export function AccountForm ({ callback, totalLvl = 0 }) {
  const [loading, setLoading] = useState(false)
  async function submitForm (event) {
    event.preventDefault()
    setLoading(true)
    try {
      const accountInput = event.target.elements[0].value
      const stats = await findAccount(accountInput)
      callback(stats)
    } catch (ex) {
      const message = await ex.response.json()
      alert(message.error)
    }
    setLoading(false)
  }
  return (
    <StyledAccountForm>
      {loading && <Loader />}
      <form onSubmit={submitForm}>
        <StyledInput
          disabled={loading}
          size="20"
          type="text"
          placeholder="enter steam URL"
        />
        <Submit disabled={loading}>Send</Submit>
      </form>
      {totalLvl > 0 && <span>Total levels : {totalLvl}</span>}
    </StyledAccountForm>  
  )
}

const StyledAccountForm = styled.div`
  color: #4be3f7;
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