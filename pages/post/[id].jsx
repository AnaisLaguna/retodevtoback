import Navbar from '@/components/Navbar'
import PostFull from '@/components/PostFull'
import PostLeftMenu from '@/components/PostPageLeftMenu'

export default function Post() {
  return (
    <div className='flex flex-col gap-4 bg-zinc-100 min-h-screen overflow-hidden'>
      <Navbar />
      <div className='flex sm:pr-4'>
        <PostLeftMenu />
        <PostFull />
      </div>
    </div>
  )
}
