import React, { useRef, useCallback, useState } from 'react'
import Webcam from 'react-webcam'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import { useDispatch } from 'react-redux'
import { setCameraImage } from '../features/camera/cameraSlice'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import AppBackground from './AppBackground'

const videoConstraints = {
  width: 190,
  height: 280,
  facingMode: 'user',
}

function WebCamCapture() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const webcamRef = useRef(null)
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    dispatch(setCameraImage(imageSrc))
    navigate('/preview')
  }, [webcamRef])
  return (
    <AppBackground>
      <WebcamCapture>
        <Webcam
          audio={false}
          height={videoConstraints.height}
          ref={webcamRef}
          screenshotFormat='image/jpeg'
          width={videoConstraints.width}
          videoConstraints={videoConstraints}
        />
        <RadioButtonUncheckedIcon
          className='webcamCapture__button'
          onClick={capture}
          fontSize='large'
        />
      </WebcamCapture>
    </AppBackground>
  )
}

export default WebCamCapture

// const AppBackground = styled.div`
//   background: url('https://www.pngkey.com/png/full/859-8598072_picture-freeuse-library-silhouette-mobile-at-getdrawings-cell.png')
//     no-repeat center;
//   background-size: contain;
//   width: 250px;
//   height: 400px;
//   padding: 60px 80px 50px 30px;
//   display: flex;
//   justify-content: center;
// `

const WebcamCapture = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  .webcamCapture__button {
    z-index: 100;
    position: absolute;
    bottom: 0;
    left: 70%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    color: white;
  }
`
