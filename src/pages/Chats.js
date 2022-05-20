import React, { useState, useEffect } from 'react'
import { Avatar } from '@mui/material'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'
import { db } from '../firebase'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import Chat from '../components/Chat'

const Chats = () => {
  const [posts, setPosts] = useState([])
  const colRef = collection(db, 'posts')
  const q = query(colRef, orderBy('timestamp', 'desc'))

  useEffect(() => {
    onSnapshot(q, (snapshot) =>
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    )
  }, [])
  console.log(posts)

  return (
    <Wrapper>
      <ChatsHeader>
        <Avatar className='chats__avatar' />
        <div className='chats__search'>
          <SearchIcon />
          <input type='text' placeholder='Friends' />
        </div>
        <ChatBubbleIcon className='chats__chatIcon' fontSize='small' />
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
  height: 400px;
  width: 250px;
`

const ChatPosts = styled.div`
  height: 359px;
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
  padding-right: 5px;
  background-color: #059ee0;
  height: 50px;

  .chats__avatar {
    width: 25px !important;
    height: 25px !important;
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
