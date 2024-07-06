import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUnicorn, faHeart, faAward, faDizzy, faFire } from '@fortawesome/free-solid-svg-icons';

export default function PostFull() {
  const [postInfo, setPostInfo] = useState(null);
  const [date, setDate] = useState(null);
  const [screen, setScreen] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreen('mobile');
      } else if (width >= 640 && width < 1024) {
        setScreen('tablet');
      } else {
        setScreen('xl');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (id) {
      fetchPostData(id);
    }
  }, [id]);

  const fetchPostData = (postId) => {
    fetch(`https://node-backend-2-prod.up.railway.app/post/${postId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setPostInfo(data.data);
      })
      .catch((err) => {
        console.error('Error fetching post:', err);
        setPostInfo(null); // Clear postInfo if fetch fails
      });
  };

  const handleLoadPost = () => {
    if (id) {
      fetchPostData(id);
    }
  };

  useEffect(() => {
    if (postInfo) {
      const dateObj = new Date(postInfo.createdAt);
      const month = dateObj.toLocaleString('default', { month: 'short' });
      const day = dateObj.getDate();
      setDate(`${month} ${day}`);
    }
  }, [postInfo]);

  return (
    <article
      className={clsx('bg-black pb-4 text-lg mt-12 overflow-hidden', {
        'w-full rounded-md': screen !== 'mobile'
      })}
    >
      <div className='grid gap-2 md:gap-8'>
        {postInfo && (
          <>
            <img src={postInfo.cover} alt='post picture' className='content-fit' />
            <div className='px-4 grid gap-8'>
              <div className='flex items-center gap-2 md:px-8'>
                <img
                  className='w-10 rounded-full'
                  src={postInfo.user?.profile_picture || '/default-profile-pic.jpg'}
                  alt='user profile'
                />
                <div>
                  <p className='font-semibold'>{postInfo.user?.name || 'Anonymous'}</p>
                  <p className='text-xs capitalize'>{date || 'Unknown Date'}</p>
                </div>
              </div>
              <div className='grid gap-2 md:px-8'>
                <div className={clsx('flex gap-4 md:justify-start justify-around', {})}>
                  <span>
                    <FontAwesomeIcon icon={faUnicorn} /> 45
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faHeart} /> 12
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faAward} /> 16
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faDizzy} /> 8
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faFire} /> 7
                  </span>
                </div>

                <h1 className='font-bold md:font-extrabold capitalize text-3xl'>
                  {postInfo.title}
                </h1>
                <div className='flex gap-2'>
                  {postInfo.tags?.split(',').map((tag, index) => (
                    <span key={`tag-${index}`} className='text-base'>
                      #{tag.trim()}
                    </span>
                  ))}
                </div>

                <p className='text-justify pt-4 text-lg md:text-base'>{postInfo.content}</p>
              </div>
            </div>
          </>
        )}
        {!postInfo && (
          <div className='text-white text-center'>
            <p>Click the button below to load post details.</p>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'
              onClick={handleLoadPost}
            >
              Load Post
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
