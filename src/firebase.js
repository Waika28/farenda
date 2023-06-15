import { initializeApp } from 'firebase/app'
import { initializeFirestore, persistentLocalCache, CACHE_SIZE_UNLIMITED } from 'firebase/firestore'

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyAXIX84H7KsYzZHxfJWCoVGjRQFuXv9Vq8",
  authDomain: "farenda-dab7b.firebaseapp.com",
  projectId: "farenda-dab7b",
  storageBucket: "farenda-dab7b.appspot.com",
  messagingSenderId: "750334561302",
  appId: "1:750334561302:web:2ab84ce2fde75ab5273937",
  measurementId: "G-QXQK64Q606"
})

const firestore = initializeFirestore(firebaseApp, {
  localCache: persistentLocalCache(),
  cache: {
    sizeBytes: CACHE_SIZE_UNLIMITED
  },
})
