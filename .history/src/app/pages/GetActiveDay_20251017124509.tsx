import { collection, getDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../firebase'
import { useTask } from '../components/context/TaskContext'
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
}
