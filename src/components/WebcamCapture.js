import React, { useRef, useCallback, useState } from 'react'
import Webcam from 'react-webcam'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import { useDispatch } from 'react-redux'
import { setCameraImage } from '../features/camera/cameraSlice'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const videoConstraints = {
  width: 250,
  height: 400,
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
  )
}

export default WebCamCapture

const WebcamCapture = styled.div`
  position: relative;

  .webcamCapture__button {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    color: white;
  }
`
