import { query, where } from 'firebase/firestore'
import { db } from '../../../firebase'
import { useTask } from '../components/context/TaskContext'
const getWeekDays = () => {
  const { userEmail } = useTask()
  const q = query(db, 'Visits', where('user', '==', userEma))
}
