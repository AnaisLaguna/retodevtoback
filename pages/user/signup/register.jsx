import Navbar from '@/components/Navbar'
import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form'
import { useState } from 'react'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm()
  const router= useRouter()
  const [isChecked, setIsChecked] = useState(false)

  const onSubmit = (data) => {
        fetch('https://node-backend-2-prod.up.railway.app/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name: data.name,
        last_name: data.lastname,
        email: data.email,
        gender: 'Female',
        password: data.password,
        phone: '1234567893',
        profile_picture: data.profileimg
      })
    })
    .then(res=>{
      console.log('user created')
      router.push('/user/login')
    }).catch(err=> console.log('Unable to create user', err))
  }

  return (
    <main className='min-h-screen flex flex-col gap-8 pb-10 bg-zinc-100'>
      <Navbar />
      <section className='mx-auto bg-white py-8 px-10 rounded-lg w-[680px] grid gap-8 border-2'>
        <p className='font-bold text-xl'>Create your account</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='grid gap-4 text-lg font-semibold'
        >
          <p>
            Profile Picture <span className='text-red-700'>*</span>
          </p>
          <input
            {...register('profileimg', { required: true })}
            className='p-2 w-full border border-zinc-400 hover:border-zinc-5000 rounded-lg'
            required
          />
          {errors.profileimg && <span>Name is required</span>}
          <p>
            Name <span className='text-red-700'>*</span>
          </p>
          <input
            {...register('name', { required: true })}
            className='p-2 w-full border border-zinc-400 hover:border-zinc-5000 rounded-lg'
            required
          />
          {errors.name && <span>Name is required</span>}
          <p>
            Last Name <span className='text-red-700'>*</span>
          </p>
          <input
            {...register('lastname', { required: true })}
            className='p-2 w-full border border-zinc-400 hover:border-zinc-500 rounded-lg'
            required
          />
          {errors.lastname && <span>Username is required</span>}
          <p>
            Email <span className='text-red-700'>*</span>
          </p>
          <input
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            className='p-2 w-full border border-zinc-400 hover:border-zinc-500 rounded-lg'
            required
          />
          {errors.email && <span>Invalid email address</span>}
          <p>
            Password <span className='text-red-700'>*</span>
          </p>
          <input
            type='password'
            {...register('password', { required: true, minLength: 6 })}
            className='p-2 w-full border border-zinc-400 hover:border-zinc-500 rounded-lg'
          />
          {errors.password && (
            <span>Password must be at least 6 characters</span>
          )}
          <p>
            Password Confirmation<span className='text-red-700'>*</span>
          </p>
          <input
            type='password'
            {...register('passwordConfirm', { required: true, minLength: 6 })}
            className='p-2 w-full border border-zinc-400 hover:border-zinc-500 rounded-lg'
            required
          />
          {errors.password && (
            <span>Password must be at least 6 characters</span>
          )}
          {errors.passwordConfirm && (
            <span className='text-red-700'>Passwords do not match</span>
          )}
          <div className='flex items-center justify-between py-2 px-4 bg-zinc-100 border border-zinc-400 rounded-md w-[340px] gap-3'>
            <div className='flex gap-2 items-center'>
              <Controller
                name='robotCheckbox'
                control={control}
                defaultValue={false}
                id='robotCheckbox'
                render={({ field }) =>
                  isChecked ? (
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className='text-green-500 w-8 h-8'
                      onClick={() => setIsChecked(true)}
                    />
                  ) : (
                    <input
                      type='checkbox'
                      {...field}
                      id='robotCheckbox'
                      className='h-6 w-6 rounded-md border-gray-300 focus:ring-indigo-500'
                      onChange={(e) => setIsChecked(e.target.checked)}
                    />
                  )
                }
              />

              <label htmlFor='robotCheckbox' className='ml-2'>
                No soy un robot
              </label>
            </div>
            <div className='grid'>
              <img
                src='https://www.gstatic.com/recaptcha/api2/logo_48.png'
                alt='reCAPTCHA'
                className='w-10 mx-auto'
              />
              <p className='text-xs text-zinc-500'>reCAPTCHA</p>
            </div>
          </div>

          <button
            type='submit'
            className='bg-blue-700 hover:bg-blue-900 w-24 p-1 rounded-md text-white'
          >
            Sign Up
          </button>
        </form>
      </section>
    </main>
  )
}
