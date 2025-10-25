import { getDoc, query, where } from 'firebase/firestore'
import { db } from '../../../firebase'
import { useTask } from '../components/context/TaskContext'
async function getWeekDays (userEmail: string) {
  const { userEmail } = useTask()
  const q = query(db, 'Visits', where('user', '==', userEmail))
  const snap = await getDoc(q)
}
