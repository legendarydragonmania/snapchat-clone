import { Button } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import logo from '../assets/snaplogo.png'
import { useAuth0 } from '@auth0/auth0-react'

const Login = () => {
  const { loginWithRedirect } = useAuth0()
  return (
    <Wrapper>
      <div className='login__container'>
        <img src={logo} />
        <Button variant='outlined' onClick={loginWithRedirect}>
          Sign in
        </Button>
      </div>
    </Wrapper>
  )
}

export default Login

const Wrapper = styled.div`
  background-color: #feff00;
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;

  .login__container {
    display: flex;
    flex-direction: column;
    img {
      height: 300px;
      object-fit: contain;
    }

    > button {
      color: black !important;
      border: 1px solid black !important;
    }
  }
`
