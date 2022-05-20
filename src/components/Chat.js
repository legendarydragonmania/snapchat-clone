import React from 'react'
import styled from 'styled-components'
import { Avatar } from '@mui/material'
import StopRoundedIcon from '@mui/icons-material/StopRounded'
import IconButton from '@mui/material/IconButton'

const Chat = ({ id, userName, profilePic, imageUrl, timestamp, read }) => {
  return (
    <Wrapper>
      <Avatar src={profilePic} className='chat__avatar' />
      <ChatInfo>
        <h4>{userName}</h4>
        <p>Tap to view - {timestamp}</p>
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
