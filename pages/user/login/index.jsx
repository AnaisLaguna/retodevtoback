import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordIcon, setPasswordIcon] = useState('😒'); // Emoji por defecto para contraseña oculta

  function simulateLogin(data) {
    // Simula una respuesta del servidor para el inicio de sesión
    const simulatedUser = {
      id: '1',
      email: data.email,
      first_name: 'John',
      profile_picture: 'https://example.com/profile.png',
    };
    return simulatedUser;
  }

  function onSubmit(data) {
    if (!validateEmail(data.email)) {
      window.alert('Ingrese una dirección de correo electrónico válida.');
      return;
    }

    // Simula el inicio de sesión
    const user = simulateLogin(data);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', 'imulated-token');

    // Redirige después de simular el inicio de sesión
    router.push('/');
  }

  // Función para validar el formato del correo electrónico
  function validateEmail(email) {
    const re =
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(String(email).toLowerCase());
  }

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setPasswordIcon(showPassword ? '😒' : '😎'); // Cambia el emoji según el estado actual
  };

  return (
    <main className='bg-gray-900 min-h-screen w-full flex flex-col pt-12'>
      <div className='w-[680px] flex flex-col items-center text-center pt-6 px-12 text-xl gap-3 mx-auto'>
        <Link href='/'>
          <img width={70} height={70} src='/devlogo.png' alt='Dev.to'></img>
        </Link>
        <h5 className='p-3 font-bold text-4xl text-white'>Join the DEV Community</h5>
        <p className='text-lg text-white'>
          DEV Community is a community of 1,380,964 amazing developers
        </p>

        <div className='py-6 relative'>
          <hr className='text-white h-1 w-[580px] items-baseline' />
          <p className=' bg-gray-900 px-2 text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-4 text-lg text-white'>
            OR
          </p>
        </div>
        <form
          className='grid gap-4 items-start text-start w-full py-3'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <p className='py-2 font-semibold text-white'>Email</p>
            <input
              type='text'
              name='email'
              placeholder='Enter your email'
              className={clsx('block w-full p-3 border border-white rounded-md text-black', {
                'border-2 border-red-500': errors.email,
              })}
              required
              {...register('email', {
                minLength: {
                  value: 3,
                  message: 'Enter at least 3 characters',
                },
                validate: (value) => validateEmail(value) || <span className='text-white'>Enter a valid email address</span>,
              })}
            />
            {errors.email && <p className='text-white'>{errors.email.message}</p>}
          </div>
          <div className='relative'>
            <p className='py-2 font-semibold text-white'>Password</p>
            <input
              type={showPassword ? 'text' : 'password'}
              name='password'
              placeholder='Ingresa tu contraseña'
              className='p-3 pl-10 pr-12 block w-full border border-white rounded-md shadow-sm sm:text-sm text-black'
              required
              {...register('password')}
            />
            <div className='absolute inset-y-0 right-0 flex items-center'>
              <button
                type='button'
                onClick={togglePasswordVisibility}
                className='text-2xl focus:outline-none'
              >
                {passwordIcon}
              </button>
            </div>
            {errors.root && <p className='text-red-500'>{errors.root.message}</p>}
          </div>

          <button
            type='submit'
            className='mt-3 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-xl font-medium text-white bg-orange-500 hover:bg-orange-700'
          >
            Log in
          </button>
          <p className='text-base text-center italic px-12 py-4 text-white'>
            By signing in, you are agreeing to our{' '}
            <span className='text-[rgb(59,73,223)]'>privacy policy, terms of use</span> and{' '}
            <span className='text-[rgb(59,73,223)]'>code of conduct.</span>
          </p>
          <hr className='text-white h-1 w-[580px] items-baseline' />
          <p className='text-center text-lg px-12 py-4 text-white'>
            New to DEV Community?{' '}
            <span className='text-[rgb(59,73,223)]'>
              {' '}
              <Link href='/user/signup'>Create account</Link>
            </span>
          </p>
        </form>
      </div>
    </main>
  );
}
