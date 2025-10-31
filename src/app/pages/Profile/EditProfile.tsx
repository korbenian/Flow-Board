'use client'

import { useState } from 'react'
import Input from '../../components/Input'
import { useTranslations } from 'next-intl'
import { Profile, useTask } from '../../components/context/TaskContext'
export default function EditProfile ({
  user,
  onClose
}: {
  user: Profile
  onClose: () => void
}) {
  const { Saveprofile } = useTask()
  const [formData, setFormData] = useState<Profile>(user)
  const t = useTranslations('profileEdit')
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
        ✏️ {t('title')}
      </h2>

      {/* Фото */}
      <div className='flex flex-col items-center gap-2'>
        <label className='text-gray-600 text-sm'>{t('uploadLabel')}</label>
        <Input
          type='file'
          accept='image/*'
          className='w-full cursor-pointer border border-blue-300 rounded-md'
        />
      </div>

      {/* Поля */}
      {(
        [
          {
            key: 'name',
            placeholder: t('namePlaceholder'),
            label: t('nameLabel')
          },
          {
            key: 'pseudoname',
            placeholder: t('pseudoPlaceholder'),
            label: t('pseudoLabel')
          },
          {
            key: 'age',
            placeholder: t('agePlaceholder'),
            label: t('ageLabel')
          },
          {
            key: 'sex',
            placeholder: t('sexPlaceholder'),
            label: t('sexLabel')
          },
          {
            key: 'description',
            placeholder: t('descPlaceholder'),
            label: t('descLabel')
          },
          {
            key: 'location',
            placeholder: t('locationPlaceholder'),
            label: t('locationLabel')
          },
          {
            key: 'email',
            placeholder: t('emailPlaceholder'),
            label: t('emailLabel')
          }
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
          ✅ {t('saveBtn')}
        </button>
        <button
          className='bg-red-400 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-500 active:scale-95 transition'
          onClick={onClose}
        >
          ❌ {t('cancelBtn')}
        </button>
      </div>
    </div>
  )
}
