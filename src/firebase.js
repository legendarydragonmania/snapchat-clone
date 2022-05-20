import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyANDCru94ID3X0u7cUf9jRq9A9jAsSCdHc',
  authDomain: 'snapchat-clone-5841f.firebaseapp.com',
  projectId: 'snapchat-clone-5841f',
  storageBucket: 'snapchat-clone-5841f.appspot.com',
  messagingSenderId: '879234296984',
  appId: '1:879234296984:web:e9a68648d0499e22f2b4ed',
}

const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp)

const storage = getStorage(firebaseApp)

export { db, storage }
