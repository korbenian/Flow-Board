import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics, isSupported } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyC0qVFWq7vSaaERcS-qZ0KD2trT7o9mgtw',
  authDomain: 'training-17059.firebaseapp.com',
  projectId: 'training-17059',
  storageBucket: 'training-17059.firebasestorage.app',
  messagingSenderId: '514245279981',
  appId: '1:514245279981:web:dc9cbf188d41880228cce4',
  measurementId: 'G-ZDFCS1Q513'
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)

// 👇 Analytics только в браузере
let analytics: ReturnType<typeof getAnalytics> | null = null

if (typeof window !== 'undefined') {
  isSupported().then(supported => {
    if (supported) {
      analytics = getAnalytics(app)
    }
  })
}

export { analytics }
