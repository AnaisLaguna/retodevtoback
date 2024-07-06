import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

export default function LeftSidebar() {
  const [isLogged, setIsLogged] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLogged(false);
    }
  }, [isLogged]);

  return (
    <div className='flex flex-col w-64 text-base bg-black text-white'>
      <div
        id='loginBox'
        className={clsx('grid border rounded-md bg-gray-800 border-zinc-200 p-3', {
          hidden: !isLogged,
        })}
      >
        <h5 className='p-3 font-bold text-xl text-white'>
          DEV Community is a community of 1,184,207 amazing developers
        </h5>
        <p className='p-3 text-white'>
          We are a place where coders share, stay up-to-date, and grow their
          careers.
        </p>
        <div className='grid gap-2'>
          <button
            id='createAccountButton'
            type='button'
            className='hover:bg-indigo-600 border-2 border-indigo-600 text-indigo-600 hover:text-white font-semibold py-2 px-6 rounded-md'
          >
            <Link href='/user/signup'>Create account</Link>
          </button>
          <button
            id='loginButton'
            type='button'
            className='hover:bg-violet-100 py-2 px-4 rounded-md'
          >
            <Link href='/user/login'>Log in</Link>
          </button>
        </div>
      </div>
      <div className='flex flex-col'>
        <div className='labelbox2'>
          <ul className='p-3'>
            <li className='p-[6px] hover:bg-violet-100 hover:text-blue-700 hover:font-semibold'>
              <a target='_blank' href='https://dev.to/' className='icon'>
                🏠 Home{' '}
              </a>
            </li>
            <li className='p-[6px] hover:bg-violet-100 hover:text-blue-700 hover:font-semibold'>
              <a target='_blank' href='#' className='icon'>
                📚 Reading List{' '}
              </a>
            </li>
            <li className='p-[6px] hover:bg-violet-100 hover:text-blue-700 hover:font-semibold'>
              <a target='_blank' href='https://dev.to/pod' className='icon'>
                🎙️ Podcast{' '}
              </a>
            </li>
            <li className='p-[6px] hover:bg-violet-100 hover:text-blue-700 hover:font-semibold'>
              <a target='_blank' href='https://dev.to/videos' className='icon'>
                📽️ Videos{' '}
              </a>
            </li>
            <li className='p-[6px] hover:bg-violet-100 hover:text-blue-700 hover:font-semibold'>
              <a target='_blank' href='https://dev.to/tags' className='icon'>
                🏷️ Tags{' '}
              </a>
            </li>
            <li className='p-[6px] hover:bg-violet-100 hover:text-blue-700 hover:font-semibold'>
              <a target='_blank' href='https://dev.to/tags' className='icon'>
                💡 FAQ{' '}
              </a>
            </li>
            <li className='p-[6px] hover:bg-violet-100 hover:text-blue-700 hover:font-semibold'>
              <a
                target='_blank'
                href='https://shop.forem.com/'
                className='icon'
              >
                🛍️ Forem Shop{' '}
              </a>
            </li>
            <li className='p-[6px] hover:bg-violet-100 hover:text-blue-700 hover:font-semibold'>
              <a
                target='_blank'
                href='https://dev.to/dev-advertising-options'
                className='icon'
              >
                ❤️ Advertise on DEV{' '}
              </a>
            </li>
            <li className='p-[6px] hover:bg-violet-100 hover:text-blue-700 hover:font-semibold'>
              <a target='_blank' href='https://dev.to/about' className='icon'>
                🆒 About{' '}
              </a>
            </li>
            <li className='p-[6px] hover:bg-violet-100 hover:text-blue-700 hover:font-semibold'>
              <a target='_blank' href='https://dev.to/contact' className='icon'>
                📯 Contact{' '}
              </a>
            </li>
            <li className='p-[6px] hover:bg-violet-100 hover:text-blue-700 hover:font-semibold'>
              <a target='_blank' href='https://dev.to/guides' className='icon'>
                📖 Guides{' '}
              </a>
            </li>
            <li className='p-[6px] hover:bg-violet-100 hover:text-blue-700 hover:font-semibold'>
              <a
                target='_blank'
                href='https://dev.to/software-comparisons'
                className='icon'
              >
                🤔 Software Comparisons{' '}
              </a>
            </li>
          </ul>
          <h2 className='font-bold p-2'>Other</h2>
          <ul className='ps-3'>
            <li className='p-[6px] hover:bg-violet-100 hover:text-blue-700 hover:font-semibold'>
              <a href='#' className='icon'>
                👍 Code of Conduct{' '}
              </a>
            </li>
            <li className='p-[6px] hover:bg-violet-100 hover:text-blue-700 hover:font-semibold'>
              <a href='#' className='icon'>
                🤓 Privacy Policy{' '}
              </a>
            </li>
            <li className='p-[6px] hover:bg-violet-100 hover:text-blue-700 hover:font-semibold'>
              <a href='#' className='icon'>
                👀 Terms of use{' '}
              </a>
            </li>
          </ul>
          <nav className='flex gap-3'>
            <a target='_blank' href='https://twitter.com/thepracticaldev'>
              <img
                className='h-6 w-6 p-1 rounded-md hover:bg-violet-100'
                src='/twitterblack.svg'
                alt='N/A'
              />
            </a>
            <a target='_blank' href='https://facebook.com/thepracticaldev'>
              <img
                className='h-6 w-6 p-1 rounded-md hover:bg-violet-100'
                src='/facebook.svg'
                alt='N/A'
              />
            </a>
            <a target='_blank' href='https://github.com/forem'>
              <img
                className='h-6 w-6 p-1 rounded-md hover:bg-violet-100'
                src='/github.svg'
                alt='N/A'
              />
            </a>
            <a target='_blank' href='https://instagram.com/thepracticaldev'>
              <img
                className='h-6 w-6 p-1 rounded-md hover:bg-violet-100'
                src='/instagram.svg'
                alt='N/A'
              />
            </a>
            <a target='_blank' href='https://twitch.com/thepracticaldev'>
              <img
                className='h-6 w-6 p-1 rounded-md hover:bg-violet-100'
                src='/twitch.svg'
                alt='N/A'
              />
            </a>
            <a target='_blank' href='https://fosstodon.org/@thepracticaldev'>
              <img
                className='h-6 w-6 p-1 rounded-md hover:bg-violet-100'
                src='/snapchat.svg'
                alt='N/A'
              />
            </a>
          </nav>
          <h2 className='font-bold p-2'>Popular Tags</h2>
          <ul className='ps-3'>
            <li className='p-[6px] hover:bg-violet-100 hover:text-blue-700 hover:font-semibold'>
              <a className='tag' target='_blank' href='#'>
                #webdev
              </a>
            </li>
            <li className='p-[6px] hover:bg-violet-100 hover:text-blue-700 hover:font-semibold'>
              <a
                className='tag'
                target='_blank'
                href='https://dev.to/t/javascript'
              >
                #javascript
              </a>
            </li>
            <li className='p-[6px] hover:bg-violet-100 hover:text-blue-700 hover:font-semibold'>
              <a
                className='tag'
                target='_blank'
                href='https://dev.to/t/beginners'
              >
                #beginners
              </a>
            </li>
            <li className='p-[6px] hover:bg-violet-100 hover:text-blue-700 hover:font-semibold'>
              <a
                className='tag'
                target='_blank'
                href='https://dev.to/t/programming'
              >
                #programming
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
