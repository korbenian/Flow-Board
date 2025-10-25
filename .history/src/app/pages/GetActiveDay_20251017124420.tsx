import { collection, getDoc, query, where } from 'firebase/firestore'
import { db } from '../../../firebase'
import { useTask } from '../components/context/TaskContext'
async function getWeekDays (userEmail: string) {
  const q = query(collection(db, 'Visits'), where('user', '==', userEmail))
  const snap = await getDoc(q)
}
