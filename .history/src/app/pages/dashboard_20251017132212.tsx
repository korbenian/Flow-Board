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
  const [count, setCount] = useState(0)
  const [tcount, settCount] = useState(0)
  const [visitData, setVisitData] = useState<{ day: string; count: number }[]>(
    []
  )
  // ----- mock data -----
  const { datas } = getWeekDays()
  const { userEmail } = useTask()

  useEffect(() => {
    if (!userEmail) return
    getWeekDays(userEmail!).then(datas => setVisitData(datas))
  }, [userEmail])

  const getDonetasks = async () => {
    const get = query(collection(db, 'cards'), where('status', '==', 'Done'))
    const snaps = await getDocs(get)
    return snaps.size
  }
  useEffect(() => {
    if (!userEmail) return // Ждём пока email загрузится

    const getDonetasks = async () => {
      const q = query(
        collection(db, 'cards'), // проверь путь!
        where('status', '==', 'Done'),
        where('owner', '==', userEmail)
      )
      const snaps = await getDocs(q)
      console.log(
        '✅ Done tasks:',
        snaps.docs.map(d => d.data())
      ) // ВАЖНО
      settCount(snaps.size)
    }

    getDonetasks()
  }, [userEmail])

  useEffect(() => {
    if (!userEmail) return
    const LogVisit = async () => {
      try {
        await addDoc(collection(db, 'Visits'), {
          user: userEmail,
          timestamp: serverTimestamp()
        })
        console.log('✅ Visit logged')
      } catch (error) {
        console.error('❌ Error logging visit:', error)
      }
    }
    LogVisit()
  }, [userEmail])

  async function getCountUsers () {
    const ref = collection(db, 'Profile')
    const snapshot = await getDocs(ref)
    console.log(
      '🔥 Docs in Profile:',
      snapshot.docs.map(d => d.id)
    )
    return snapshot.size // ← здесь число пользователей
  }
  useEffect(() => {
    getCountUsers().then(count => setCount(count))
  }, [])

  const metrics = [
    { id: 1, title: 'Orders', value: 128, trend: '+12%', icon: ShoppingBag },
    {
      id: 2,
      title: 'total number of users',
      value: count,
      icon: Users
    },
    {
      id: 3,
      title: 'Tasks Done',
      value: tcount,
      icon: CheckCircle
    },
    { id: 4, title: 'Revenue', value: '$1,240', trend: '+5%', icon: DollarSign }
  ]

  const salesData = [
    { day: 'Mon', sales: 12 },
    { day: 'Tue', sales: 19 },
    { day: 'Wed', sales: 8 },
    { day: 'Thu', sales: 15 },
    { day: 'Fri', sales: 22 },
    { day: 'Sat', sales: 17 },
    { day: 'Sun', sales: 25 }
  ]

  const activities = [
    { id: 1, text: 'User Alex completed Task #24' },
    { id: 2, text: 'New order from client Maria' },
    { id: 3, text: "Lesson 'React Basics' viewed 3 times" }
  ]

  return (
    <div className='flex min-h-screen'>
      {/* Sidebar слева */}
      <Sidebar />

      {/* Основной контент */}
      <div className='flex-1 p-6 space-y-6'>
        {/* top metrics */}
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

        {/* chart + side */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* chart */}
          <div className='bg-white shadow rounded-2xl p-4 lg:col-span-2'>
            <h2 className='text-lg font-semibold mb-4'>Sales This Week</h2>
            <ResponsiveContainer width='100%' height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='day' />
                <YAxis />
                <Tooltip />
                <Line
                  type='monotone'
                  dataKey='sales'
                  stroke='#3b82f6'
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* activities */}
          <div className='bg-white shadow rounded-2xl p-4'>
            <h2 className='text-lg font-semibold mb-4'>Recent Activities</h2>
            <ul className='space-y-3'>
              {activities.map(a => (
                <li key={a.id} className='text-sm text-gray-700'>
                  • {a.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
