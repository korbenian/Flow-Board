import { collection, getDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../firebase'
import { useTask } from '../components/context/TaskContext'
import { object } from 'framer-motion/client'
import { count } from 'console'
async function getWeekDays (userEmail: string) {
  const q = query(collection(db, 'Visits'), where('user', '==', userEmail))
  const snap = await getDocs(q)

  const days = {
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
    Sun: 0
  }
  snap.forEach(doc => {
    const data = doc.data()
    const ts = data.timestamp?.toDate()
    if (!ts) return

    const day = ts.toLocaleString('en-US', {
      weekday: 'short'
    }) as keyof typeof days // Например "Mon"
    if (days[day] !== undefined) {
      days[day]++
    }
    return Object.entries(days).map(([day, count]) => ({
      day,
      visits: count
    }))
  })
}
