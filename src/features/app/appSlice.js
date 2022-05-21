import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedImage: null,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,

  reducers: {
    selectImage: (state, action) => {
      state.selectedImage = action.payload
    },
    resetImage: (state) => {
      state.selectedImage = null
    },
  },
})

export const { selectImage } = appSlice.actions

export default appSlice.reducer
