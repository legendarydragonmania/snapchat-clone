import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Error from './pages/Error'
import Preview from './pages/Preview'
import styled from 'styled-components'
import Chats from './pages/Chats'

function App() {
  return (
    <Wrapper>
      <Router>
        <div className='app__body'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/preview' element={<Preview />} />
            <Route path='/chats' element={<Chats />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<Error />} />
          </Routes>
        </div>
      </Router>
    </Wrapper>
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
`
