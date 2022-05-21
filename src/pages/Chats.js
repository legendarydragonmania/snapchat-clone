import React, { useState, useEffect } from 'react'
import { Avatar } from '@mui/material'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded'
import { db } from '../firebase'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import Chat from '../components/Chat'
import { useAuth0 } from '@auth0/auth0-react'

const Chats = () => {
  const { user, logout } = useAuth0()
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()
  const colRef = collection(db, 'posts')
  const q = query(colRef, orderBy('timestamp', 'desc'))

  useEffect(() => {
    onSnapshot(q, (snapshot) =>
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    )
  }, [])

  const exit = () => {
    navigate('/')
  }

  return (
    <Wrapper>
      <ChatsHeader>
        <Avatar
          className='chats__avatar'
          src={user.picture}
          onClick={() => logout({ returnTo: window.location.origin })}
        />
        <div className='chats__search'>
          <SearchIcon />
          <input type='text' placeholder='Friends' />
        </div>
        {posts.length >= 1 ? (
          <ChatBubbleIcon className='chats__chatIcon' fontSize='small' />
        ) : (
          <CameraAltRoundedIcon
            className='chats__chatIcon'
            fontSize='small'
            onClick={exit}
            style={{ cursor: 'pointer' }}
          />
        )}
      </ChatsHeader>
      <ChatPosts>
        {posts.map(
          ({ id, imageUrl, profilePic, read, timestamp, userName }) => (
            <Chat
              key={id}
              id={id}
              userName={userName}
              image={imageUrl}
              timestamp={new Date(timestamp?.toDate()).toUTCString()}
              read={read}
              profilePic={profilePic}
            />
          )
        )}
      </ChatPosts>
    </Wrapper>
  )
}

export default Chats

const Wrapper = styled.div`
  position: relative;
  height: 500px;
  width: 250px;
  background: url('https://www.pngkey.com/png/full/859-8598072_picture-freeuse-library-silhouette-mobile-at-getdrawings-cell.png')
    no-repeat center;
  background-size: contain;
  padding-top: 80px;
  padding-left: 5px;
  padding-right: 10px;
`

const ChatPosts = styled.div`
  height: 75%;
  background-color: white;
  box-shadow: 1px -7px 7px -6px rgba(0, 0, 0, 0.44);
  margin-top: -9px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: scroll;

  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`

const ChatsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 5px;
  background-color: #059ee0;
  height: 10%;

  .chats__avatar {
    width: 25px !important;
    height: 25px !important;
    cursor: pointer;
  }

  .chats__search {
    display: flex;
    align-items: center;
    flex: 1;
    padding-left: 8px;
    > input {
      outline-width: 0;
      background-color: transparent;
      border: none;
      font-size: 12px;
      flex: 1;
      color: white;
      margin-left: 5px;

      ::placeholder {
        color: white;
        opacity: 1;
      }
    }
  }
`
