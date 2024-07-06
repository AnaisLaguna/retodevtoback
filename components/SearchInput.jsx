import { useForm } from 'react-hook-form'
import clsx from 'clsx'

export default function SearchInput(props) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm()

  const onSubmit = (data) => {
    const search = data.search.toLowerCase().split(/[ ,]+/)
    const matches = props.list.filter(item => {
      const title = item.title.toLowerCase()
      const words = title.split(/[ ,]+/)
      return search.some(word => words.includes(word))
    })
    if (matches.length > 0) {
      props.function(matches)
      console.log(matches)
    } else {
      props.function([])
      alert('Your search doesn´t match any result')
    }
  }

  

  return (
    <form
      className={clsx('flex p-1 justify-between')}
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type='text'
        className=''
        id='searchInput'
        placeholder='Search...'
        {...register("search")}
      />
      <button id='searchButton' className='' type='submit' >
        <img className='h-8 w-8' src='/search.svg' alt='' />
      </button>
    </form>
  )
}
