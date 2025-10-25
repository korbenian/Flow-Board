'use client'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import {
  collection,
  getDocs,
  where,
  query,
  addDoc,
  serverTimestamp
} from 'firebase/firestore'
import { db } from '../../../firebase'
import { Users, ShoppingBag, CheckCircle, DollarSign } from 'lucide-react'
import { useTask } from '../components/context/TaskContext'
import Sidebar from '../sidebar/sidebar'
import { useEffect, useState } from 'react'
import { getWeekDays } from './GetActiveDay'

export default function Dashboard () {
  const [activities, setActivities] = useState<{ id: string; text: string }[]>(
    []
  )
  const [taskCount, setTaskCount] = useState(0)
  const [count, setCount] = useState(0)
  const [tcount, settCount] = useState(0)
  const [visitData, setVisitData] = useState<{ day: string; visits: number }[]>(
    []
  )

  const { userEmail } = useTask()

  useEffect(() => {
    if (!userEmail) return

    getWeekDays(userEmail).then(data => {
      if (data) setVisitData(data)
    })
  }, [userEmail])

  useEffect(() => {
    if (!userEmail) return

    const q = query(
      collection(db, 'cards'),
      where('status', '==', 'Done'),
      where('owner', '==', userEmail)
    )
    getDocs(q).then(snaps => settCount(snaps.size))
  }, [userEmail])

  useEffect(() => {
    if (!userEmail) return

    const q = query(collection(db, 'cards'), where('owner', '==', userEmail))
    getDocs(q).then(snap => setTaskCount(snap.size))
  })

  useEffect(() => {
    if (!userEmail) return

    const LogVisit = async () => {
      try {
        await addDoc(collection(db, 'Visits'), {
          user: userEmail,
          timestamp: serverTimestamp()
        })
      } catch (error) {
        console.error('❌ Error logging visit:', error)
      }
    }
    LogVisit()
  }, [userEmail])

  useEffect(() => {
    const ref = collection(db, 'Profile')
    getDocs(ref).then(snapshot => setCount(snapshot.size))
  }, [])

  useEffect(() => {
    if (!userEmail) return

    const q = query(collection(db, 'cards'), where('owner', '==', userEmail))
    getDocs(q).then(snapshot => {
      const acts = snapshot.docs.slice(-5).map(doc => {
        const data = doc.data()
        return {
          id: doc.id,
          text: `Task "${data.title}" is ${data.status}`
        }
      })
      setActivities(acts)
    })
  }, [userEmail])

  const metrics = [
    { id: 1, title: 'Task Created', value: taskCount, icon: ShoppingBag },
    { id: 2, title: 'total number of users', value: count, icon: Users },
    { id: 3, title: 'Tasks Done', value: tcount, icon: CheckCircle },
    { id: 4, title: 'Revenue', value: '$1,240', trend: '+5%', icon: DollarSign }
  ]

  return (
    <div className='flex min-h-screen'>
      <Sidebar />

      <div className='flex-1 p-6 space-y-6'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {metrics.map(m => (
            <div
              key={m.id}
              className='bg-white shadow rounded-2xl p-4 flex items-center gap-3'
            >
              <m.icon className='text-blue-500' size={28} />
              <div>
                <p className='text-sm text-gray-500'>{m.title}</p>
                <p className='text-lg font-semibold'>{m.value}</p>
                <p className='text-xs text-green-500'>{m.trend}</p>
              </div>
            </div>
          ))}
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          <div className='bg-white shadow rounded-2xl p-4 lg:col-span-2'>
            <h2 className='text-lg font-semibold mb-4'>
              Activity for this week
            </h2>
            <ResponsiveContainer width='100%' height={300}>
              <LineChart data={visitData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='day' />
                <YAxis />
                <Tooltip />
                <Line
                  type='monotone'
                  dataKey='visits'
                  stroke='#3b82f6'
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className='bg-white shadow rounded-2xl p-4'>
            <h2 className='text-lg font-semibold mb-4'>Recent Activities</h2>
            <ul className='space-y-3'>
              {activities.length > 0 ? (
                activities.map(a => (
                  <li key={a.id} className='text-sm text-gray-700'>
                    • {a.text}
                  </li>
                ))
              ) : (
                <li className='text-sm text-gray-400'>No recent activity</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
