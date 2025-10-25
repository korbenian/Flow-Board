'use client'

import { useState } from 'react'
import Input from '../components/Input'
import { Profile, useTask } from './../components/context/TaskContext'
export default function EditProfile ({
  user,
  onClose
}: {
  user: Profile
  onClose: () => void
}) {
  const { Saveprofile } = useTask()
  const [formData, setFormData] = useState<Profile>(user)
  const handleChange = (key: keyof Profile, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }
  const Saving = () => {
    Saveprofile(formData)
    onClose()
  }

  return (
    <div className='p-6 bg-gradient-to-b from-sky-100 to-white rounded-xl shadow-lg w-full max-w-lg mx-auto flex flex-col gap-5'>
      <h2 className='text-2xl font-bold text-blue-700 text-center'>
        ✏️ Редактирование профиля
      </h2>

      {/* Аватар отдельно */}
      <div className='flex flex-col items-center gap-2'>
        <label className='text-gray-600 text-sm'>Загрузите фотографию</label>
        <Input
          type='file'
          accept='image/*'
          className='w-full cursor-pointer border border-blue-300 rounded-md'
        />
      </div>

      {/* Все остальные поля */}
      {(
        [
          { key: 'name', placeholder: 'Введите Ваше имя', label: 'Имя' },
          {
            key: 'pseudoname',
            placeholder: 'Введите Ваш псевдоним',
            label: 'Псевдоним'
          },
          { key: 'age', placeholder: 'Введите Ваш возраст', label: 'Возраст' },
          { key: 'sex', placeholder: 'Ваш пол', label: 'Пол' },
          {
            key: 'description',
            placeholder: 'Опишите себя',
            label: 'Описание'
          },
          {
            key: 'location',
            placeholder: 'Ваше местоположение',
            label: 'Город / Страна'
          },
          { key: 'email', placeholder: 'Введите почту', label: 'Email' }
        ] as const
      ).map(field => (
        <div key={field.key} className='flex flex-col gap-1'>
          <label className='text-sm font-medium text-gray-700'>
            {field.label}
          </label>
          <Input
            value={formData[field.key] || ''}
            type='text'
            placeholder={field.placeholder}
            className='w-full bg-white border border-blue-300 rounded-md px-3 py-2 shadow-sm focus:ring focus:ring-blue-200'
            onChange={e => handleChange(field.key, e.target.value)}
          />
        </div>
      ))}

      {/* Кнопки */}
      <div className='flex justify-between pt-3'>
        <button
          className='bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 active:scale-95 transition'
          onClick={Saving}
        >
          ✅ Сохранить
        </button>
        <button
          className='bg-red-400 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-500 active:scale-95 transition'
          onClick={onClose}
        >
          ❌ Отменить
        </button>
      </div>
    </div>
  )
}
