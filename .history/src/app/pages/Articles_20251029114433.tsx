'use client'
import { useEffect, useState } from 'react'
import ArticleModal from './Tasks/ArticleModal'
import Sidebar from '../sidebar/sidebar'
import { useTranslations } from 'next-intl'
export default function ArticlesPage () {
  const [articles, setArticles] = useState<any[]>([])
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null)
  const t = useTranslations('articl')
  useEffect(() => {
    const fetchArticles = async () => {
      const res = await fetch('https://dev.to/api/articles?per_page=10')
      const data = await res.json()
      setArticles(data)
    }
    fetchArticles()
  }, [])

  return (
    <div className='flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300'>
      {/* Sidebar слева */}
      <div className='w-64 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white transition-colors duration-300'>
        <Sidebar />
      </div>

      {/* Контент справа */}
      <div className='flex-1 p-6'>
        <h1 className='text-2xl font-bold mb-4 text-gray-900 dark:text-white'>
          {t('art')}
        </h1>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {articles.map(article => (
            <div
              key={article.id}
              className='p-4 rounded-lg cursor-pointer bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md dark:shadow-gray-700 hover:shadow-lg transition-shadow duration-300'
              onClick={() => setSelectedArticle(article)}
            >
              <h2 className='font-semibold text-lg'>{article.title}</h2>
              <p className='text-sm text-gray-600 dark:text-gray-400 mt-2'>
                {article.description || 'No description'}
              </p>
            </div>
          ))}
        </div>

        {selectedArticle && (
          <ArticleModal
            id={selectedArticle.id}
            onClose={() => setSelectedArticle(null)}
          />
        )}
      </div>
    </div>
  )
}
