import styled from 'styled-components'
import React from 'react'

function AppBackground({ children }) {
  return <AppBackgroundComponent>{children}</AppBackgroundComponent>
}

export default AppBackground

const AppBackgroundComponent = styled.div`
  background: url('https://www.pngkey.com/png/full/859-8598072_picture-freeuse-library-silhouette-mobile-at-getdrawings-cell.png')
    no-repeat center;
  background-size: contain;
  width: 250px;
  height: 400px;
  padding: 60px 80px 50px 30px;
  display: flex;
  justify-content: center;
`
