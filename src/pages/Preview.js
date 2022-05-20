import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { resetCameraImage } from '../features/camera/cameraSlice'
import CloseIcon from '@mui/icons-material/Close'
import TextFieldsIcon from '@mui/icons-material/TextFields'
import NoteIcon from '@mui/icons-material/Note'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import CropIcon from '@mui/icons-material/Crop'
import TimerIcon from '@mui/icons-material/Timer'
import SendIcon from '@mui/icons-material/Send'
import { v4 as uuidv4 } from 'uuid'
import { storage, db } from '../firebase'
import { ref, getDownloadURL, uploadString } from 'firebase/storage'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

const Preview = () => {
  const colRef = collection(db, 'posts')
  const dispatch = useDispatch()
  const { cameraImage } = useSelector((store) => store.camera)
  const navigate = useNavigate()
  useEffect(() => {
    if (!cameraImage) {
      navigate('/', { replace: true })
    }
  }, [cameraImage, navigate])
  const closePreview = () => {
    dispatch(resetCameraImage())
  }
  const sendPost = () => {
    const id = uuidv4()
    const fileRef = ref(storage, `posts/${id}`)
    uploadString(fileRef, cameraImage, 'data_url')
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          console.log(url)
          addDoc(colRef, {
            imageUrl: url,
            userName: 'Somebody Else',
            read: false,
            profilePic:
              'https://thumbs.dreamstime.com/b/girl-headphones-sitting-laptop-customer-support-center-via-phone-mail-operator-service-icons-concept-vector-164113938.jpg',
            timestamp: serverTimestamp(),
          })
        })
        navigate('/chats', { replace: true })
      })
      .catch((error) => console.log(error))
  }
  return (
    <Wrapper>
      <CloseIcon className='preview__close' onClick={closePreview} />
      <div className='preview__toolbarRight'>
        <TextFieldsIcon />
        <NoteIcon />
        <MusicNoteIcon />
        <AttachFileIcon />
        <CropIcon />
        <TimerIcon />
      </div>
      {cameraImage && <img src={cameraImage} alt='your image' />}
      <div onClick={sendPost} className='preview__footer'>
        <h2>Send Now</h2>
        <SendIcon className='preview__sendIcon' fontSize='small' />
      </div>
    </Wrapper>
  )
}

export default Preview

const Wrapper = styled.div`
  position: relative;

  .preview__close {
    position: absolute;
    top: 0;
    margin: 5px;
    cursor: pointer;
    color: white;
  }

  .preview__toolbarRight {
    color: white;
    position: absolute;
    right: 0;
    display: flex;
    flex-direction: column;
    margin: 5px;

    .MuiSvgIcon-root {
      font-size: 20px !important;
      margin-bottom: 8px;
      cursor: pointer;
    }
  }

  .preview__footer {
    background-color: #fefc01;
    color: black;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 30px;
    padding: 7px;
    cursor: pointer;
    position: absolute;
    bottom: 0;
    right: -25px;
    transform: translate(-50%, -50%);

    h2 {
      font-size: 8px;
      margin-right: 3px;
    }

    .preview__sendIcon {
      font-size: 10px !important;
    }
  }
`
