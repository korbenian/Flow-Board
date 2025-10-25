// src/app/components/context/TaskContext.tsx
'use client'
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect
} from 'react'
import { nanoid } from 'nanoid'
import {
  deleteDoc,
  doc,
  getDoc,
  addDoc,
  collection,
  setDoc,
  updateDoc,
  query,
  where,
  onSnapshot,
  getDocs
} from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db } from '../../../../firebase'
import { useSession } from 'next-auth/react'
import { a } from 'framer-motion/client'
const storage = getStorage()
export type Task = {
  id: string
  title: string
  deadline: string
  isDone: boolean
  status: string
  isEditing: boolean
}
export type Profile = {
  name: string
  age: string
  pseudoname: string
  sex: string
  description: string
  location: string
  email: string
  avatarUrl?: string
  techStack: string[]
}

type TaskContextType = {
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
  handleNewTask: () => void
  handleSave: (id: string, title: string, deadline: string) => void
  removeTask: (id: string) => void
  Saveprofile: (profile: Profile) => void
  profile: Profile | null
  setProfile: (profile: Profile | null) => void
  userEmail: string | undefined | null
  getCountUsers: () => void
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([])
  const { data: session } = useSession()
  const [profile, setProfile] = useState<Profile | null>(null)
  const userEmail = session?.user?.email
  const Saveprofile = async (profile: Profile) => {
    try {
      const ref = doc(db, 'Profile', userEmail!)
      await setDoc(ref, { ...profile, email: userEmail }, { merge: true })
      setProfile(profile) // ✅ локально обновили — UI перерендерится
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    const getProfile = async () => {
      try {
        const ref = doc(db, 'Profile', userEmail!)
        const snapshot = await getDoc(ref)
        if (snapshot.exists()) {
          setProfile(snapshot.data() as Profile)
        }
      } catch (err) {
        console.error(err)
      }
    }
    if (userEmail) getProfile()
  }, [userEmail])

  const getCountUsers = async () => {
    const ref = collection(db, 'profile')
    const snap = getDocs(ref)
    return (await snap).size
  }

  const saveAvatar = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'your_unsigned_preset') // создадим в Cloudinary
    formData.append('folder', 'avatars')

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload`,
      {
        method: 'POST',
        body: formData
      }
    )

    const data = await res.json()

    if (!data.secure_url) {
      console.error('Ошибка загрузки', data)
      return
    }

    const updated = { ...profile, avatarUrl: data.secure_url } as Profile
    await Saveprofile(updated)
  }

  // ➕ создать задачу
  const handleNewTask = async () => {
    console.log('💥 handleNewTask запущена')
    try {
      const docRef = await addDoc(collection(db, 'cards'), {
        title: '',
        deadline: '',
        status: 'To Do',
        isDone: false,
        owner: userEmail,
        createdAt: new Date(),
        isEditing: true
      })

      console.log('✅ Добавлено в Firestore:', docRef.id)
    } catch (error) {
      console.error('❌ Firebase addDoc ERROR:', error)
    }
  }

  useEffect(() => {
    if (!userEmail) return
    const q = query(collection(db, 'cards'), where('owner', '==', userEmail))
    const unSubscribe = onSnapshot(q, snapshot => {
      const userTasks = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Task[]
      setTasks(userTasks)
    })
    return unSubscribe
  }, [userEmail])

  // 💾 сохранить изменения
  const handleSave = async (id: string, title: string, deadline: string) => {
    if (!id) {
      console.error('❌ Нет id у задачи')
      return
    }

    try {
      const ref = doc(db, 'cards', id)
      await setDoc(
        ref,
        {
          title,
          deadline,
          status: 'To Do',
          isEditing: false
        },
        { merge: true } // 🔥 чтобы не потерять старые поля
      )

      setTasks(prev =>
        prev.map(task =>
          task.id === id
            ? { ...task, title, deadline, status: 'To Do', isEditing: false }
            : task
        )
      )

      console.log('✅ Сохранено в Firestore:', id)
    } catch (error) {
      console.error('❌ Ошибка при setDoc:', error)
    }
  }

  // ❌ удалить задачу
  const removeTask = async (id: string) => {
    console.log('[TaskContext] removeTask called id=', id)
    try {
      const ref = doc(db, 'cards', id)
      await deleteDoc(ref)
      console.log('[TaskContext] deleteDoc resolved for id=', id)

      setTasks(tasks.filter(task => task.id !== id))
    } catch (err) {
      console.error('[TaskContext] delete error:', err)
    }
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        handleNewTask,
        handleSave,
        removeTask,
        Saveprofile,
        profile,
        setProfile,
        userEmail
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export const useTask = () => {
  const context = useContext(TaskContext)
  if (!context) throw new Error('useTask must be used within TaskProvider')
  return context
}
