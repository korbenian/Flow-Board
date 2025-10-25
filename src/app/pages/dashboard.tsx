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
  serverTimestamp,
  orderBy
} from 'firebase/firestore'
import { db } from '../../../firebase'
import {
  Users,
  ShoppingBag,
  CheckCircle,
  // DollarSign, // больше не нужен
  Flame,
  Clock
} from 'lucide-react'
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
  const [actualStreak, setActualStreak] = useState<number | null>(null) // <-- реальный streak

  const { userEmail } = useTask()

  // helper: форматируем дату в YYYY-MM-DD в локальной TZ браузера
  const formatLocalDate = (d: Date) => {
    // en-CA возвращает ISO-подобный формат YYYY-MM-DD
    return d.toLocaleDateString('en-CA')
  }

  // --- Week visits (твой существующий код) ---
  useEffect(() => {
    if (!userEmail) return

    getWeekDays(userEmail).then(data => {
      if (data) setVisitData(data)
    })
  }, [userEmail])

  // --- Done tasks count ---
  useEffect(() => {
    if (!userEmail) return

    const q = query(
      collection(db, 'cards'),
      where('status', '==', 'Done'),
      where('owner', '==', userEmail)
    )
    getDocs(q).then(snaps => settCount(snaps.size))
  }, [userEmail])

  // --- Task count (fixed dependency) ---
  useEffect(() => {
    if (!userEmail) return

    const q = query(collection(db, 'cards'), where('owner', '==', userEmail))
    getDocs(q).then(snap => setTaskCount(snap.size))
  }, [userEmail])

  // --- Log visit on dashboard open ---
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

  // --- Count users ---
  useEffect(() => {
    const ref = collection(db, 'Profile')
    getDocs(ref).then(snapshot => setCount(snapshot.size))
  }, [])

  // --- Recent activities from cards ---
  useEffect(() => {
    if (!userEmail) return

    const q = query(collection(db, 'cards'), where('owner', '==', userEmail))
    getDocs(q).then(snapshot => {
      const acts = snapshot.docs
        .slice(-5)
        .map(doc => {
          const data = doc.data() as any
          return {
            id: doc.id,
            text: `Task "${data.title ?? 'untitled'}" is ${
              data.status ?? 'unknown'
            }`
          }
        })
        .reverse() // чтобы показывать от новых к старым, при необходимости
      setActivities(acts)
    })
  }, [userEmail])

  // --- Streak calculation from Visits collection ---
  useEffect(() => {
    if (!userEmail) return

    // Получаем все Visits текущего пользователя; сортировать не обязательно, мы собираем уникальные даты.
    const q = query(
      collection(db, 'Visits'),
      where('user', '==', userEmail) /* , orderBy('timestamp', 'desc') */
    )

    getDocs(q)
      .then(snapshot => {
        // Собираем все даты, когда был визит (локальная дата)
        const dateSet = new Set<string>()

        snapshot.docs.forEach(doc => {
          const data = doc.data() as any
          const ts = data.timestamp

          let dateObj: Date | null = null

          if (!ts) {
            // если timestamp отсутствует — пропускаем
            return
          }

          // Firestore Timestamp имеет поля seconds / nanoseconds OR может быть JS Date
          if (typeof ts.toDate === 'function') {
            // Firestore Timestamp
            dateObj = ts.toDate()
          } else if (ts instanceof Date) {
            dateObj = ts
          } else if (ts.seconds) {
            dateObj = new Date(
              ts.seconds * 1000 + (ts.nanoseconds ? ts.nanoseconds / 1e6 : 0)
            )
          }

          if (dateObj) {
            const local = formatLocalDate(dateObj)
            dateSet.add(local)
          }
        })

        // Если нет визитов — streak = 0
        if (dateSet.size === 0) {
          setActualStreak(0)
          return
        }

        // Считаем подряд идущие дни начиная с сегодняшней локальной даты
        let streak = 0
        let i = 0
        while (true) {
          const d = new Date()
          d.setDate(d.getDate() - i)
          const expected = formatLocalDate(d)
          if (dateSet.has(expected)) {
            streak++
            i++
          } else {
            break
          }
        }
        setActualStreak(streak)
      })
      .catch(err => {
        console.error('Error fetching Visits for streak:', err)
        setActualStreak(0)
      })
  }, [userEmail])

  const metrics = [
    { id: 1, title: 'Task Created', value: taskCount, icon: ShoppingBag },
    { id: 2, title: 'total number of users', value: count, icon: Users },
    { id: 3, title: 'Tasks Done', value: tcount, icon: CheckCircle },
    {
      id: 4,
      title: 'Discipline Streak',
      // показываем реальное значение, если оно ещё не загрузилось — placeholder '—'
      value: actualStreak !== null ? `${actualStreak} days` : '—',
      icon: Flame,
      trend: actualStreak && actualStreak > 0 ? `+1` : undefined
    }
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
