import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import PostCard from '@/components/PostCard';
import LeftSidebar from '@/components/LeftSideBar';
import RightSide from '@/components/RightSide';

export default function Home({ posts }) {
  return (
    <main className='min-h-screen w-screen bg-black text-white'>
      <Navbar posts={posts} />
      <section className='w-full pt-[72px] flex gap-3 max-w-screen-xl m-auto'>
        <div className='md:block hidden'>
          <LeftSidebar />
        </div>
        <div>
          <div className='flex gap-3 text-lg'>
            <p className='p-2 hover:bg-white hover:text-indigo-600 rounded-mdv font-bold'>
              Relevant
            </p>
            <p className='p-2 hover:bg-white hover:text-indigo-600 rounded-md'>
              Latest
            </p>
            <p className='p-2 hover:bg-white hover:text-indigo-600 rounded-md'>
              Top
            </p>
          </div>

          <div className='grid grid-cols-1 gap-4'>
            {posts.map((post, index) => {
              const id = post._id;
              return (
                <Link key={`post-${index}`} href={`/post/${id}`}>
                  <PostCard
                    title={post.title}
                    tags={post.tags}
                    content={post.content}
                    cover={post.cover}
                    createdAt={post.createdAt}
                    user={{
                      ...post.user,
                      first_name: 'anns', 
                      profile_picture: 'https://via.placeholder.com/150',
                    }}
                  />
                </Link>
              );
            })}
          </div>
        </div>
        <div className='lg:block hidden'>
          <RightSide />
        </div>
      </section>
    </main>
  );
}

export async function getServerSideProps() {
  try {
    const response = await fetch('https://node-backend-2-prod.up.railway.app/post', {
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers your API requires
      },
    });
    if (!response.ok) {
      throw new Error('Unable to fetch posts');
    }
    const data = await response.json();
    const posts = data.data; // Assuming your data structure is { data: [...] }

    return {
      props: {
        posts,
      },
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      props: {
        posts: [],
      },
    };
  }
}
