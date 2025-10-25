//C:\Users\01\training\src\app\pages\TaskEditing.tsx
'use client'
import { useState } from 'react'
import Input from '../../components/Input'
import { Task } from '../../components/context/TaskContext'
import { useTask } from '../../components/context/TaskContext'
export default function TaskEditing ({
  task,
  onSave
}: {
  task: Task
  onSave: (id: string, title: string, deadline: string) => void
}) {
  const [title, setTitle] = useState(task.title)
  const [deadline, setDeadline] = useState(task.deadline)
  const [isEditing, SetIsEditing] = useState(false)
  const { removeTask } = useTask()
  const handleAddTask = async () => {
    await onSave(task.id, title, deadline) // 🔑 сохраняем через контекст
  }

  return (
    <div>
      <div className='flex items-center gap-3'>
        <Input
          type='text'
          placeholder='Введите задачу...'
          value={title}
          onChange={e => setTitle(e.target.value)}
          className='w-96'
        />
      </div>
      <div className='mt-2'>
        <label className='text-sm text-gray-600'>
          Дедлайн до:
          <Input
            type='date'
            value={deadline}
            onChange={e => setDeadline(e.target.value)}
            className='ml-2 w-40'
          />
        </label>
      </div>
      <div className='flex gap-2 '>
        <button
          onClick={handleAddTask}
          className='mt-2 px-3 py-1 bg-green-600 text-white rounded-lg'
        >
          Создать
        </button>
        <button
          className='mt-2 px-3 py-1 bg-red-600 text-white rounded-lg'
          onClick={async () => {
            await removeTask(task.id)
          }}
        >
          Удалить
        </button>
      </div>
    </div>
  )
}
