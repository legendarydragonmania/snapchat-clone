import React from 'react'
import styled from 'styled-components'
import { Avatar } from '@mui/material'
import StopRoundedIcon from '@mui/icons-material/StopRounded'
import { useDispatch } from 'react-redux'
import { selectImage } from '../features/app/appSlice'
import TimeAgo from 'react-timeago'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useNavigate } from 'react-router-dom'

const Chat = ({ id, userName, profilePic, image, timestamp, read }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const docRef = doc(db, 'posts', id)
  const open = () => {
    if (!read) {
      dispatch(selectImage(image))
      updateDoc(docRef, {
        read: true,
      })
      navigate(`/chats/view/${id}`, { replace: true })
    }
  }
  return (
    <Wrapper onClick={open}>
      <Avatar src={profilePic} className='chat__avatar' />
      <ChatInfo>
        <h4>{userName}</h4>
        <p>
          Tap to view - <TimeAgo date={timestamp} />
        </p>
      </ChatInfo>

      {!read && <StopRoundedIcon className='chat__readIcon' />}
    </Wrapper>
  )
}

export default Chat

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border-bottom: 1px solid whitesmoke;
  cursor: pointer;

  .chat__avatar {
    height: 35px !important;
    width: 35px !important;
  }

  .chat__readIcon {
    color: #ed3b55;
  }
`

const ChatInfo = styled.div`
  padding-left: 5px;
  flex: 1;

  > h4 {
    font-size: 11px;
    font-weight: 500;
  }

  > p {
    font-size: 9px;
  }
`
