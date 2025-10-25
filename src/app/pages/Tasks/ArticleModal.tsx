'use client'
import { useEffect, useState } from 'react'

export default function ArticleModal ({
  id,
  onClose
}: {
  id: number
  onClose: () => void
}) {
  const [article, setArticle] = useState<any | null>(null)

  useEffect(() => {
    const fetchArticle = async () => {
      const res = await fetch(`https://dev.to/api/articles/${id}`)
      const data = await res.json()
      setArticle(data)
    }
    fetchArticle()
  }, [id])

  if (!article) {
    return (
      <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-40'>
        <div className='bg-white p-6 rounded-lg'>Загрузка...</div>
      </div>
    )
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30'>
      <div className='bg-white w-3/4 max-h-[80vh] overflow-auto p-6 rounded-lg relative'>
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-lg font-bold'
        >
          ✖
        </button>

        <h2 className='text-2xl font-bold mb-2'>{article.title}</h2>
        <p className='text-gray-500 mb-4'>
          Автор: {article.user?.name || 'Unknown'}
        </p>

        <img
          src={article.cover_image || '/placeholder.jpg'}
          alt='cover'
          className='mb-4 rounded-md'
        />

        <div
          className='prose'
          dangerouslySetInnerHTML={{ __html: article.body_html }}
        />
      </div>
    </div>
  )
}
