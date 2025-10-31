'use client'

import { Task } from '../../components/Utils'
import { doc, updateDoc } from 'firebase/firestore'
import { useTask } from '../../components/context/TaskContext'
import { db } from '../../../../firebase'
import { useState } from 'react'
import ConfirmModal from './ConfirmModal'
import TaskEditing from './TaskEditinig'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function TaskView ({ task }: { task: Task }) {
  const t = useTranslations('taskView')
  const [showConfirm, setShowConfirm] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const { removeTask, handleSave } = useTask()

  const handleSaveAndClose = async (
    id: string,
    title: string,
    deadline: string
  ) => {
    await handleSave(id, title, deadline)
    setIsEditing(false)
  }

  return (
    <div className='relative w-full dark:border-white border border-gray-200 shadow-sm  rounded-xl p-5 flex flex-col md:flex-row gap-6 transition'>
      {/* Левая часть */}
      <div className='flex-1'>
        <div className='flex items-center justify-between text-amber-900 dark:text-white'>
          <h1 className='font-semibold text-lg   dark:text-white'>
            {task.title}
          </h1>

          <select
            value={task.status}
            onChange={async e => {
              const newStatus = e.target.value
              const ref = doc(db, 'cards', task.id)
              try {
                await updateDoc(ref, { status: newStatus })
              } catch {
                console.warn('Документ не найден, удаляю из локального state')
                removeTask(task.id)
              }
            }}
            className='px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50'
          >
            <option value='To Do'>🔴 {t('todo')}</option>
            <option value='In Progress'>🟡 {t('inProgress')}</option>
            <option value='Done'>✅ {t('done')}</option>
          </select>
        </div>

        <h2 className='text-sm text-gray-500 mt-1'>
          {t('deadline')}: {task.deadline}
        </h2>

        <div className='mt-4 flex gap-3'>
          <button
            className='px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition'
            onClick={() => setShowConfirm(true)}
          >
            {t('delete')}
          </button>

          <button
            className='px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition'
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? t('close') : t('edit')}
          </button>
        </div>

        {showConfirm && (
          <ConfirmModal
            message={t('confirmDelete')}
            onConfirm={async () => {
              await removeTask(task.id)
              setShowConfirm(false)
            }}
            onCancel={() => setShowConfirm(false)}
          />
        )}
      </div>

      {/* Анимированная форма редактирования */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            key='editForm'
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className='flex-1 border-l border-gray-200 pl-6'
          >
            <TaskEditing task={task} onSave={handleSaveAndClose} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
