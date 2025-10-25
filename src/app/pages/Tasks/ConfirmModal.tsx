'use client'
import React from 'react'

interface confirm {
  message: string
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmModal: React.FC<confirm> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className='fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded-xl shadow-lg w-96'>
        <p className='text-lg font-medium mb-4'>{message}</p>
        <div className='flex justify-end gap-4'>
          <button
            onClick={onCancel}
            className='px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition'
          >
            Отмена
          </button>
          <button
            onClick={onConfirm}
            className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition'
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  )
}
export default ConfirmModal
