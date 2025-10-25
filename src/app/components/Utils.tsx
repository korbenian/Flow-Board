//C:\Users\01\training\src\app\components\Utils.tsx
import { deleteDoc, doc, getDoc } from 'firebase/firestore'
import { nanoid } from 'nanoid'
import { useState } from 'react'
import { db } from '../../../firebase'
import { error } from 'console'
export type Task = {
  id: string
  title: string
  deadline: string
  isDone: boolean
  isEditing: boolean
  status: string
}
export function useTask () {
  const [tasks, setTasks] = useState<Task[]>([])

  const handleNewTask = () => {
    setTasks([
      ...tasks,
      {
        id: nanoid(),
        title: '',
        deadline: '',
        isDone: false,
        isEditing: true,
        status: ''
      }
    ])
  }
  const removeTask = async (id: string) => {
    setTasks(tasks.filter(task => task.id != id))
    await deleteDoc(doc(db, 'cards', id))
  }
  const handleSave = (id: string, title: string, deadline: string) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, title, deadline, isEditing: false } : task
      )
    )
  }
  return { tasks, setTasks, handleNewTask, handleSave, removeTask }
}
