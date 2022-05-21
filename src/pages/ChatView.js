import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { db } from '../firebase'
import { useParams } from 'react-router-dom'
import { deleteDoc, doc } from 'firebase/firestore'
import AppBackground from '../components/AppBackground'

const ChatView = () => {
  const { selectedImage } = useSelector((store) => store.app)
  const { id } = useParams()
  const navigate = useNavigate()
  const docRef = doc(db, 'posts', id)
  const exit = () => {
    navigate('/chats', { replace: 'true' })
  }

  useEffect(() => {
    if (!selectedImage) {
      exit()
    }
  }, [selectedImage])

  return (
    <AppBackground>
      <Wrapper>
        <img src={selectedImage} onClick={exit} />
        <div className='chatView__timer'>
          <CountdownCircleTimer
            isPlaying
            duration={10}
            strokeWidth={6}
            size={50}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
          >
            {({ remainingTime }) => {
              if (remainingTime === 0) {
                deleteDoc(docRef).then(() => exit())
              }
              return remainingTime
            }}
          </CountdownCircleTimer>
        </div>
      </Wrapper>
    </AppBackground>
  )
}

export default ChatView

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  > img {
    cursor: pointer;
  }

  .chatView__timer {
    position: absolute;
    top: 0;
    right: -50px;
    margin: 10px;
  }
`
