import {
  addDoc,
  arrayUnion,
  collection,
  query,
  updateDoc
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../../firebase'
import { useTask } from '../components/context/TaskContext'
import techStack from '../../app/pages/Profile'
import { doc, setDoc } from 'firebase/firestore'
interface TechSelectorProps {
  onChange?: (techs: string[]) => void
}

const POPULAR_TECHS = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C#',
  'Go',
  'Rust',
  'C++',
  'PHP',
  'Ruby'
]

export default function TechSelector ({ onChange }: TechSelectorProps) {
  const [selected, setSelected] = useState<string[]>([])
  const [isAddingCustom, setIsAddingCustom] = useState(false)
  const [customValue, setCustomValue] = useState('')
  const { userEmail } = useTask()

  const toggleTech = async (tech: string) => {
    const newList = selected.includes(tech)
      ? selected.filter(t => t !== tech)
      : [...selected, tech]

    setSelected(newList)
    onChange?.(newList)
    const userRef = doc(db, 'Profile', userEmail!) // ✅ Сохраняем туда же, где и профиль

    await setDoc(userRef, { techStack: newList }, { merge: true })
  }
  useEffect(() => {
    const res = query(collection(db, 'profile', userEmail!))
  })
  const addCustomTech = async () => {
    const tech = customValue.trim()
    if (tech === '') return

    toggleTech(tech)

    if (!userEmail) {
      console.error('❌ userEmail отсутствует, не могу сохранить в Firestore')
      return
    }

    try {
      const userRef = doc(db, 'Profile', userEmail) // ✅ Сохраняем туда же, где и профиль

      await setDoc(userRef, { techStack: arrayUnion(tech) }, { merge: true })

      setIsAddingCustom(false)
      setCustomValue('')
    } catch (err) {
      console.error('Ошибка при сохранении технологии:', err)
    }
  }

  return (
    <div className='flex flex-wrap gap-2'>
      {POPULAR_TECHS.map(tech => (
        <button
          key={tech}
          onClick={() => toggleTech(tech)}
          className={`px-3 py-1 rounded-full border cursor-pointer ${
            selected.includes(tech)
              ? 'bg-blue-600 text-white border-blue-600'
              : 'border-gray-400 text-gray-700'
          }`}
        >
          {tech}
        </button>
      ))}

      {!isAddingCustom && (
        <button
          onClick={() => setIsAddingCustom(true)}
          className='px-3 py-1 rounded-full border border-dashed border-gray-400 text-gray-500'
        >
          + Другая...
        </button>
      )}

      {isAddingCustom && (
        <div className='flex gap-2'>
          <input
            type='text'
            placeholder='Введите технологию'
            value={customValue}
            onChange={e => setCustomValue(e.target.value)}
            className='px-2 py-1 border rounded'
          />
          <button
            onClick={addCustomTech}
            className='px-3 py-1 bg-green-600 text-white rounded'
          >
            Добавить
          </button>
        </div>
      )}
    </div>
  )
}
