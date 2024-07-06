import { useState, useEffect } from 'react';
import Link from 'next/link';
import Footer from '../../../components/Footer';

export default function New() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null); // Estado para almacenar el token
  const [errorAlert, setErrorAlert] = useState(false); // Estado para mostrar alerta de error
  const [successAlert, setSuccessAlert] = useState(false); // Estado para mostrar alerta de éxito

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Simulación de inicio de sesión (reemplaza con tu lógica real)
      if (username === 'admin' && password === 'password') {
        // Suponiendo que el inicio de sesión fue exitoso
        setToken('dummyToken123'); // Setear un token ficticio
        setSuccessAlert(true); // Mostrar alerta de sesión iniciada
        setTimeout(() => {
          setSuccessAlert(false); // Ocultar la alerta después de 2 segundos
        }, 2000);
        localStorage.setItem('token', 'dummyToken123'); // Almacenar el token ficticio en localStorage
      } else {
        // Mostrar alerta de error si las credenciales son incorrectas
        setErrorAlert(true);
        setTimeout(() => {
          setErrorAlert(false);
        }, 2000);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const handleLogout = () => {
    setToken(null); // Limpiar el token del estado
    localStorage.removeItem('token'); // Limpiar el token del localStorage
  };

  // Comprobar si hay un token almacenado al cargar la página
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken); // Establecer el token desde el localStorage
    }
  }, []);

  return (
    <main className='bg-gray-900 min-h-screen flex flex-col justify-center'>
      <div className='w-[680px] flex flex-col items-center text-center pt-6 px-12 text-xl gap-3 mx-auto text-white'>
        <Link href='/'>
          <img
            className='w-16'
            src='https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png'
            alt='Dev.to'
          ></img>
        </Link>
        <h5 className='p-3 font-bold text-4xl'>Join the DEV Community</h5>
        <p className='text-lg'>
          DEV Community is a community of 1,380,964 amazing developers
        </p>

        {/* Enlaces de registro con diferentes proveedores */}
        <Link
          href='https://appleid.apple.com/auth/authorize?client_id=to.dev&nonce=JtBoajErW7UtxsYQ8Sn8XA&redirect_uri=https%3A%2F%2Fdev.to%2Fusers%2Fauth%2Fapple%2Fcallback&response_mode=form_post&response_type=code&scope=email+name&state=2f391ba581f05da4263e304478caaff65c48260365ecf541'
          className='w-full flex p-4 border border-gray-700 rounded-md hover:bg-gray-800'
        >
          <img className='h-6 w-6' src='/apple.svg' alt='' />
          <span className='text-center w-full text-base font-semibold'>
            Sign up with Apple
          </span>
        </Link>
        <Link
          href='https://account.forem.com/users/sign_in'
          className='w-full flex p-4 border border-gray-700 rounded-md hover:bg-gray-800'
        >
          <img className='h-6 w-6' src='/equalizer.svg' alt='' />
          <span className='text-center w-full text-base font-semibold'>
            Sign up with Forem
          </span>
        </Link>
        <Link
          href='https://github.com/login/oauth/authorize?client_id=d7251d40ac9298bdd9fe&redirect_uri=https%3A%2F%2Fdev.to%2Fusers%2Fauth%2Fgithub%2Fcallback&response_type=code&scope=user%3Aemail&state=99398c2f459f98faa72f414c4948db6e373b77ff0c53a898'
          className='w-full flex p-4 border border-gray-700 rounded-md hover:bg-gray-800'
        >
          <img className='h-6 w-6' src='/github.svg' alt='' />
          <span className='text-center w-full text-base font-semibold'>
            Sign up with GitHub
          </span>
        </Link>
        <Link
          href='https://api.x.com/oauth/authenticate?oauth_token=OWeCIAAAAAAAa8cGAAABkIXWVpY'
          className='w-full flex p-4 border border-gray-700 rounded-md hover:bg-gray-800'
        >
          <img className='h-6 w-6' src='/twitter.svg' alt='' />
          <span className='text-center w-full text-base font-semibold'>
            Sign up with Twitter
          </span>
        </Link>
        <Link
          href='https://accounts.google.com/'
          className='w-full flex p-4 border border-gray-700 rounded-md hover:bg-gray-800'
        >
          <img className='h-6 w-6' src='/email.svg' alt='' />
          <span className='text-center w-full text-base font-semibold'>
            Sign up with Email
          </span>
        </Link>

        {/* Texto legal */}
        <p className='text-base text-center italic px-12 py-4 text-gray-300'>
          By signing in, you are agreeing to our{' '}
          <span className='text-blue-400'>
            privacy policy, terms of use
          </span>{' '}
          and <span className='text-blue-400'>code of conduct.</span>
        </p>
        <hr className='text-gray-700 h-1 w-[580px] items-baseline' />

        {/* Mostrar alerta de error al iniciar sesión */}
        {errorAlert && (
          <div className='bg-red-500 text-white py-2 px-4 rounded-md mb-4'>
            Error: Invalid username or password
          </div>
        )}

        {/* Mostrar alerta de sesión iniciada */}
        {successAlert && (
          <div className='bg-green-500 text-white py-2 px-4 rounded-md mb-4'>
            Session started!
          </div>
        )}

        {/* Mostrar mensaje y botón de cierre de sesión si hay un token almacenado */}
        {token ? (
          <div className='flex flex-col items-center mt-4'>
            <p className='text-lg'>You are logged in.</p>
            <button
              onClick={handleLogout}
              className='mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none'
            >
              Log out
            </button>
          </div>
        ) : (
          // Formulario de inicio de sesión
          <div className='flex justify-center mt-8'>
            <form
              onSubmit={handleLogin}
              className='bg-gray-800 rounded-lg shadow-lg p-8 text-white max-w-[400px] mx-auto'
            >
              <h2 className='text-2xl font-bold mb-4 text-center'>Log in</h2>
              <div className='mb-4'>
                <label htmlFor='username' className='block mb-1'>
                  Username
                </label>
                <input
                  type='text'
                  id='username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className='w-full px-3 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>
              <div className='mb-6'>
                <label htmlFor='password' className='block mb-1'>
                  Password
                </label>
                <input
                  type='password'
                  id='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full px-3 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>
              <button
                type='submit'
                className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none'
              >
                Log in
              </button>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
