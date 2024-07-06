import { useEffect, useState } from 'react'
import clsx from 'clsx'

export default function PostCard(props) {
  const [date, setDate] = useState(null)
  const [screen, setScreen] = useState(null)

  useEffect(() => {
    if (props) {
      const dateObj = new Date(props.createdAt)
      const month = dateObj.toLocaleString('default', { month: 'short' })
      const day = dateObj.getDate()
      setDate(`${month} ${day}`)
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setScreen('mobile')
      } else if (width >= 640 && width < 1024) {
        setScreen('tablet')
      } else {
        setScreen('xl')
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <article
      className={clsx('bg-gray-900 text-white pb-4 text-lg overflow-hidden', {
        'w-full rounded-md ': screen !== 'mobile'
      })}
    >
      {
        <div className='grid gap-2 md:gap-8 md:border-2 border-gray-700'>
          <img
            src={props?.cover || 'https://via.placeholder.com/800x600'}
            alt='post picture'
            className='m-auto'
          />
          <div className='px-4 grid gap-8'>
            <div className={clsx('flex items-center gap-2', {})}>
              <img
                className='w-8 md:w-10 rounded-full'
                src={props?.user?.profile_picture || 'https://via.placeholder.com/40'}
                alt='user'
              />
              <div className=''>
                <p className='font-semibold'>
                  {props?.user?.first_name || 'Anonymous'}
                </p>
                <p className='text-xs capitalize'>{date || 'Something'}</p>
              </div>
            </div>
            <div className='grid gap-2 md:px-8'>
              <h1 className='font-bold md:font-extrabold capitalize text-3xl'>
                {props?.title || 'Title'}
              </h1>
              <div className='flex gap-2'>
                {props?.tags?.split(',').map((tag, index) => (
                  <span key={`tag-${index}`} className='text-base'>
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      }
    </article>
  )
}
