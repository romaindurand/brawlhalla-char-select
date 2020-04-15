import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled from 'styled-components'
import { CARDIFY, COLORS } from './style/mixins'
import { Loader } from './Loader'
import { findAccount } from '../lib/api'

export function AccountForm ({ onUserFound }) {
  const [loading, setLoading] = useState(false)
  async function submitForm (event) {
    event.preventDefault()
    setLoading(true)
    try {
      const accountInput = event.target.elements[0].value
      const stats = await findAccount(accountInput)
      onUserFound(stats)
    } catch (ex) {
      console.error(ex.message)
      console.error(ex.stack)
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
          defaultValue={process.env.NODE_ENV !== 'production' ? 'https://steamcommunity.com/id/Iceshigh' : ''}
        />
        <Submit disabled={loading}>Send</Submit>
      </form>
    </StyledAccountForm>
  )
}

AccountForm.propTypes = {
  onUserFound: PropTypes.func,
}

const StyledAccountForm = styled.div`
  color: ${COLORS.BH_BLUE};
  ${CARDIFY}
`

const StyledInput = styled.input`
  border-radius: 5px;
  border: 1px solid ${COLORS.BH_BLUE};
  padding: 10px;
  width: 400px;
  font-size: large;
  background-color: white;
`

const Submit = styled.button.attrs({ type: 'submit' })`
  background-color: ${COLORS.LEGEND_BG};
  padding: 10px;
  color: ${COLORS.BH_BLUE};
  height: 40px;
  margin: 5px;
  border-radius: 5px;
  border: 2px solid ${COLORS.BH_BLUE};
`
