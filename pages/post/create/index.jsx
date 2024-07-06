import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';

export default function NewPost() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm();

  const [formData, setFormData] = useState({
    title: '',
    tags: '',
    content: '',
    cover: ''
  });

  const [preSave, setPreSave] = useState(null);

  useEffect(() => {
    if (preSave !== null) {
      localStorage.setItem('postSaved', JSON.stringify(preSave));
    }
  }, [preSave]);

  const onSubmitHandler = (data) => {
    setFormData(data);
  };

  const handlePublish = () => {
    alert('New post created');
    router.push('/');
  };

  return (
    <main className='bg-gray-900 min-h-screen w-screen text-lg'>
      {/* Aquí va el resto del código de tu componente */}
      <form onSubmit={handleSubmit(onSubmitHandler)} className='px-4 py-6'>
        <label htmlFor='title' className='block mb-2 text-white'>
          Title
        </label>
        <input
          id='title'
          type='text'
          {...register('title', { required: true })}
          className={clsx(
            'w-full p-2 bg-gray-800 text-white rounded border border-gray-600 focus:outline-none focus:border-indigo-600',
            { 'border-red-500': errors.title }
          )}
        />
        {errors.title && (
          <span className='block mt-2 text-red-500'>This field is required</span>
        )}

        {/* Repeat similar structure for other form fields */}

        <button
          type='submit'
          className='mt-4 py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700'
        >
          Save
        </button>
        <button
          type='button'
          onClick={handlePublish}
          className='ml-2 py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700'
        >
          Publish
        </button>
      </form>
    </main>
  );
}
