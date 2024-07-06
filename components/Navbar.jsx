import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';

const SearchInput = ({ list, setSearchPosts }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    setSearchPosts(list.filter((post) =>
      post.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  };

  return (
    <div className={clsx('relative', 'bg-gray-800', 'p-2', 'rounded-lg')}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Buscar.."
        className={clsx('w-full', 'h-9', 'text-white', 'bg-transparent', 'focus:outline-none')}
      />
    </div>
  );
};

export default function Navbar({ posts, setSearchPosts }) {
  const [screen, setScreen] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [isLogged, setIsLogged] = useState(null);
  const [userPost, setUserPost] = useState(null);
  const router = useRouter(); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    setUserPost(JSON.parse(localStorage.getItem('user')));
    setIsLogged(!!token);
  }, []);

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

  const handleLogout = () => {
    localStorage.removeItem('token');  
    localStorage.removeItem('user');   
    setIsLogged(false);                 
    router.push('/');                   
  };

  return (
    <nav className="bg-white text-lg border-zinc-100">
      <section className="w-full fixed top-0 bg-gray-800 px-2 flex justify-between items-center xl:px-[72px]">
        <div className="p-2 flex gap-4 items-center">
          <div className="flex gap-2 items-center">
            <img
              className="h-8 w-8 sm:hidden"
              src="/menu.svg"
              alt=""
            />
            <Link href="/" className="flex items-center">
              <img className="h-12" src="/devlogo.png" alt="Dev.to" />
            </Link>
          </div>
          <div
            className={clsx(
              'md:w-80 xl:w-96 w-72 border-2 rounded-lg sm:block hidden',
              { hidden: !showSearch }
            )}
          >
            <SearchInput list={posts} setSearchPosts={setSearchPosts} />
          </div>
        </div>
        <div className="flex gap-1 md:gap-2 items-center flex-grow justify-end"> {/* Ajuste a justify-end para posicionar elementos a la derecha */}
          <div className="flex gap-1 md:gap-2 items-center">
            <button
              id="searchButton"
              className={clsx(
                'h-12 w-12 px-1 rounded-md flex items-center justify-center',
                { hidden: showSearch || screen !== 'mobile' }
              )}
              type="button"
              onClick={() => setShowSearch(true)}
            >
              <img
                className="h-8 w-8 text-transparent text-indigo-400"
                src="/search.svg"
                alt=""
              />
            </button>
            <div className="">
              {!isLogged ? (
                <>
                  <button
                    id="loginButton"
                    type="button"
                    className={clsx(
                      'hover:text-white font-semibold py-2 px-6 rounded-md',
                      { hidden: isLogged }
                    )}
                  >
                    <Link href="/user/login">Log in</Link>
                  </button>
                  <button
                    id="createAccountButton"
                    type="button"
                    className={clsx(
                      'hover:bg-indigo-600 border-2 border-indigo-600 text-indigo-600 hover:text-white font-semibold py-2 px-6 rounded-md',
                      { hidden: showSearch || screen === 'mobile' || isLogged }
                    )}
                  >
                    <Link href="/user/signup">Create account</Link>
                  </button>
                </>
              ) : (
                <button
                  id="logoutButton"
                  type="button"
                  className={clsx(
                    'bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-md',
                    { hidden: !isLogged }
                  )}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
          <div
            id="loggedBoxNav"
            className={clsx('flex items-center gap-2', {
              hidden: !isLogged || showSearch,
            })}
          >
            {/* Otro contenido que desees mostrar para usuarios autenticados */}
          </div>
        </div>
      </section>
    </nav>
  );
}
