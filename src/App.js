import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Error from './pages/Error'
import Preview from './pages/Preview'
import styled from 'styled-components'
import Chats from './pages/Chats'
import ChatView from './pages/ChatView'
import AuthWrapper from './pages/AuthWrapper'
import { useAuth0 } from '@auth0/auth0-react'
import logo from './assets/snaplogo.png'
import WebCamCapture from './components/WebcamCapture'
import PrivateRoute from './pages/PrivateRoute'

function App() {
  const { isAuthenticated, user } = useAuth0()
  const isUser = isAuthenticated && user

  return (
    <AuthWrapper>
      <Wrapper>
        <Router>
          {isUser ? (
            <>
              <img src={logo} className='logo' />
              <Routes>
                <Route
                  path='/'
                  element={
                    <PrivateRoute>
                      <WebCamCapture />
                    </PrivateRoute>
                  }
                />
                <Route
                  path='/preview'
                  element={
                    <PrivateRoute>
                      <Preview />
                    </PrivateRoute>
                  }
                />
                <Route
                  path='/chats'
                  element={
                    <PrivateRoute>
                      <Chats />
                    </PrivateRoute>
                  }
                />
                <Route
                  path='/chats/view/:id'
                  element={
                    <PrivateRoute>
                      <ChatView />
                    </PrivateRoute>
                  }
                />
                <Route path='*' element={<Error />} />
              </Routes>
            </>
          ) : (
            <Login />
          )}
        </Router>
      </Wrapper>
    </AuthWrapper>
  )
}

export default App

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fefc01;
  height: 100vh;
  .logo {
    object-fit: contain;
    height: 100px;
  }
`
