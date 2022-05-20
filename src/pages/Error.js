import React from 'react'
import styled from 'styled-components'
import error from '../assets/404.png'

const Error = () => {
  return (
    <Wrapper>
      <h1>Ooops, something went wrong. Please try again later!</h1>
      <img
        src={error}
        alt='404'
      />
    </Wrapper>
  )
}

export default Error

const Wrapper = styled.div``
