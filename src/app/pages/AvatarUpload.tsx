// AvatarUpload.tsx
'use client'

import { useTask } from '../components/context/TaskContext'
import { useState } from 'react'

export default function AvatarUpload () {
  const { profile, Saveprofile } = useTask()
  const [loading, setLoading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'avatar_preset') // ТВОЙ PRESET

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dia6epw5k/image/upload`,
      {
        method: 'POST',
        body: formData
      }
    )

    const data = await res.json()

    if (data.secure_url) {
      await Saveprofile({
        ...profile!,
        avatarUrl: data.secure_url
      })
    }

    setLoading(false)
  }

  return (
    <div className='flex items-center gap-4'>
      <img
        src={profile?.avatarUrl || '/default-avatar.png'}
        alt='avatar'
        className='w-52 h-52 rounded-full object-cover border'
      />
      <label className='cursor-pointer bg-blue-600 text-white px-3 py-1 rounded'>
        {loading ? 'Загрузка...' : 'Изменить аватар'}
        <input type='file' className='hidden' onChange={handleUpload} />
      </label>
    </div>
  )
}
